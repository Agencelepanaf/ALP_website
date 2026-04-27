import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ---------- Rate limiting (in-memory, per serverless instance) ----------
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count++;
  return false;
}

// ---------- Validation ----------
interface ContactPayload {
  nom: string;
  email: string;
  entreprise?: string;
  typeProjet?: string;
  budget?: string;
  description: string;
}

function validate(data: unknown): data is ContactPayload {
  if (typeof data !== "object" || data === null) return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.nom === "string" && d.nom.trim().length > 0 &&
    typeof d.email === "string" &&
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(d.email) &&
    typeof d.description === "string" && d.description.trim().length > 0
  );
}

// ---------- Email template ----------
function buildEmailHtml(p: ContactPayload): string {
  const rows: [string, string][] = [
    ["Nom", p.nom],
    ["Email", p.email],
    ["Entreprise", p.entreprise || "—"],
    ["Type de projet", p.typeProjet || "—"],
    ["Budget", p.budget || "—"],
  ];
  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;color:#555;white-space:nowrap">${label}</td><td style="padding:8px 12px;color:#111">${value}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e5e5e5;border-radius:12px;overflow:hidden">
      <div style="background:#C8553D;padding:24px 32px">
        <h1 style="margin:0;color:#fff;font-size:20px">Nouvelle demande de contact</h1>
        <p style="margin:4px 0 0;color:rgba(255,255,255,0.8);font-size:14px">Le Panaf — formulaire de contact</p>
      </div>
      <div style="padding:32px">
        <table style="width:100%;border-collapse:collapse;background:#f9f9f9;border-radius:8px;overflow:hidden">
          ${tableRows}
        </table>
        <div style="margin-top:24px">
          <p style="font-weight:600;color:#555;margin:0 0 8px">Message</p>
          <div style="background:#f9f9f9;border-left:3px solid #C8553D;padding:16px;border-radius:0 8px 8px 0;white-space:pre-wrap;color:#111;font-size:14px;line-height:1.6">${p.description}</div>
        </div>
        <p style="margin:24px 0 0;font-size:12px;color:#999">Reçu le ${new Date().toLocaleString("fr-MA", { timeZone: "Africa/Casablanca" })} (heure de Casablanca)</p>
      </div>
    </div>
  `;
}

// ---------- Handler ----------
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans 15 minutes." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  if (!validate(body)) {
    return NextResponse.json(
      { error: "Champs obligatoires manquants ou invalides" },
      { status: 422 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL_TO;

  if (!apiKey || !toEmail) {
    console.error("[Contact] Variables RESEND_API_KEY ou CONTACT_EMAIL_TO manquantes");
    return NextResponse.json({ error: "Configuration serveur manquante" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Le Panaf <noreply@lepanaf.com>",
    to: [toEmail],
    replyTo: body.email,
    subject: `Nouvelle demande — ${body.nom}${body.entreprise ? ` (${body.entreprise})` : ""}`,
    html: buildEmailHtml(body),
  });

  if (error) {
    console.error("[Contact] Erreur Resend:", error);
    return NextResponse.json({ error: "Échec de l'envoi de l'email" }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
