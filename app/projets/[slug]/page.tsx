import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { supabase } from "@/lib/supabase";
import type { Projet } from "@/lib/supabase";

// ── Metadata dynamique ─────────────────────────────────────────────────────────
export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const { data } = await supabase
    .from("projets")
    .select("nom, description, service")
    .eq("slug", slug)
    .single();

  if (!data) return { title: "Projet — Le Panaf" };
  return {
    title: `${data.nom} — Étude de cas · Le Panaf`,
    description: data.description,
  };
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function statutLabel(statut: string) {
  if (statut === "en_cours" || statut === "vedette") return "En cours";
  if (statut === "termine") return "Livré";
  return statut;
}

/** Numérotation des sections selon les blocs présents. */
function buildSectionNums(hasEnjeux: boolean, hasOutils: boolean) {
  let n = 1;
  return {
    approche:  `0${hasEnjeux ? ++n - 1 && n : n++}`,
    enjeu:     hasEnjeux  ? "01" : null,
    appr:      `0${hasEnjeux ? 2 : 1}`,
    outils:    hasOutils  ? `0${hasEnjeux ? 3 : 2}` : null,
    resultats: `0${hasEnjeux ? (hasOutils ? 4 : 3) : (hasOutils ? 3 : 2)}`,
    suite:     `0${hasEnjeux ? (hasOutils ? 5 : 4) : (hasOutils ? 4 : 3)}`,
  };
}

/** Coupe le nom du projet : dernier mot en accent, reste en blanc. */
function splitTitle(nom: string) {
  const words = nom.trim().split(" ");
  if (words.length <= 1) return { first: "", last: nom };
  const last = words.pop()!;
  return { first: words.join(" "), last };
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default async function ProjetDetailPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;

  const { data: projet } = await supabase
    .from("projets")
    .select("*")
    .eq("slug", slug)
    .single<Projet>();

  if (!projet) notFound();

  // Autres projets (max 3, excl. courant)
  const { data: autresProjets } = await supabase
    .from("projets")
    .select("id, nom, slug, service, gradient, emoji, type, ville")
    .neq("slug", slug)
    .order("ordre", { ascending: true })
    .limit(3);

  const isEnCours = projet.statut === "en_cours" || projet.statut === "vedette";

  const hasEnjeux    = (projet.enjeux?.filter(e => e.titre).length ?? 0) > 0;
  const hasApproche  = (projet.approche?.length ?? 0) > 0;
  const hasOutils    = (projet.outils?.length ?? 0) > 0;
  const hasResultats = !isEnCours && (projet.resultats?.filter(r => r.titre).length ?? 0) > 0;

  const nums = buildSectionNums(hasEnjeux, hasOutils);

  const statement = projet.statement?.trim()
    || "Un site qui ne présente pas des services.\nUn site qui vend une expérience.";
  const [stmt1, stmt2] = statement.includes("\n")
    ? statement.split("\n")
    : [statement, null];

  const { first: titleFirst, last: titleLast } = splitTitle(projet.nom);

  return (
    <div>

      {/* ── Hover CSS (Server Component safe) ────────────────────── */}
      <style>{`
        /* ── Dark cell variants ── */
        .case-cell       { background: #0a0a0a; transition: background 0.2s; }
        .case-cell:hover { background: #141414; }
        .case-tool       { background: #0a0a0a; transition: background 0.2s; }
        .case-tool:hover { background: #141414; }

        /* ── Light cell variants ── */
        .case-result-light { background: #ffffff; transition: background 0.2s; }
        .case-result-light:hover { background: #eeede8; }
        .case-project-light { background: #ffffff; transition: background 0.2s; text-decoration: none; display: flex; flex-direction: column; justify-content: space-between; min-height: 210px; padding: 2rem; }
        .case-project-light:hover { background: #eeede8; }
        .case-project-light .case-project-title { color: #0D0D0D; transition: color 0.2s; }
        .case-project-light .case-project-arrow { color: #5C5C5A; transition: all 0.2s; display: inline-block; }
        .case-project-light:hover .case-project-title { color: #e8b84b; }
        .case-project-light:hover .case-project-arrow { color: #e8b84b; transform: translateX(4px); }

        /* ── TOC sidebar ── */
        .case-toc-item { padding: 0.75rem 1.5rem; font-size: 12px; letter-spacing: 0.06em; color: #5C5C5A; text-transform: uppercase; border-left: 2px solid transparent; margin-left: -1px; text-decoration: none; transition: all 0.2s; }
        .case-toc-item:hover { color: #e8b84b; border-left-color: #e8b84b; }

        /* ── CTA ghost button (section dark) ── */
        .case-btn-ghost { padding: 14px 32px; background: transparent; color: #f0ede8; border: 1px solid rgba(255,255,255,0.15); border-radius: 2px; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; transition: border-color 0.2s; }
        .case-btn-ghost:hover { border-color: rgba(255,255,255,0.4); }
      `}</style>

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 lg:px-10 pt-24 overflow-hidden" style={{ background: "#000001", color: "#f0ede8" }}>

        {/* Grille de fond */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow accent */}
        <div
          className="absolute right-0 top-0 w-150 h-125 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 70% 30%, rgba(232,184,75,0.08) 0%, transparent 70%)",
          }}
        />

        {/* ── Mockup décoratif — visible xl+ uniquement ─────────── */}
        <div
          className="absolute hidden xl:block pointer-events-none"
          style={{
            right: "40px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "480px",
            height: "310px",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.7)",
            opacity: 0.65,
          }}
        >
          {/* Barre navigateur */}
          <div style={{
            height: "32px",
            background: "#1c1c1c",
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            gap: "6px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            flexShrink: 0,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f56" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ffbd2e" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#27c93f" }} />
          </div>

          {/* Corps */}
          <div style={{ position: "relative", height: "calc(100% - 32px)", overflow: "hidden" }}>
            {projet.image_url ? (
              /* Image réelle du projet dans le frame */
              <Image
                src={projet.image_url}
                alt={projet.nom}
                fill
                className="object-cover object-top"
                sizes="480px"
              />
            ) : (
              /* Mockup décoratif si pas d'image */
              <div style={{
                height: "100%",
                background: "linear-gradient(135deg, #1a2030, #0f1520)",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}>
                {/* Hero block */}
                <div style={{
                  background: "rgba(232,184,75,0.07)",
                  border: "1px solid rgba(232,184,75,0.15)",
                  borderRadius: "4px",
                  padding: "20px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}>
                  {projet.emoji && (
                    <span style={{ fontSize: "24px", opacity: 0.5 }}>{projet.emoji}</span>
                  )}
                  <div style={{ fontSize: "17px", fontWeight: 900, letterSpacing: "0.1em", color: "#e8b84b" }}>
                    {projet.nom.toUpperCase()}
                  </div>
                  <div style={{ fontSize: "7px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    {projet.ville} · {projet.service}
                  </div>
                </div>

                {/* Cartes services */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                  {(projet.livrables?.slice(0, 3) ?? [projet.type ?? "Design", "UX", "SEO"]).map((label, i) => (
                    <div key={i} style={{
                      background: "#161b22",
                      borderRadius: "4px",
                      border: "1px solid rgba(255,255,255,0.05)",
                      padding: "10px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "6px",
                    }}>
                      <div style={{ width: 14, height: 14, background: "rgba(232,184,75,0.2)", borderRadius: "3px" }} />
                      <div style={{ fontSize: "7px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        {String(label).split(" ").slice(0, 2).join(" ")}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Barre de bas */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "auto" }}>
                  <div style={{ height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "2px", width: "80%" }} />
                  <div style={{ height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "2px", width: "50%" }} />
                  <div style={{ height: "4px", background: "rgba(232,184,75,0.2)", borderRadius: "2px", width: "30%" }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sur xl : le contenu texte se limite à 55% pour laisser place au mockup */}
        <div className="max-w-6xl mx-auto w-full relative xl:pr-[560px]">
          <RevealOnScroll>

            {/* Fil d'Ariane + badge */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <nav
                className="flex items-center gap-2 text-[11px] tracking-wide uppercase"
                style={{ color: "#888880" }}
              >
                <Link href="/projets" className="hover:text-white transition-colors">
                  Projet
                </Link>
                <span style={{ opacity: 0.3 }}>/</span>
                <span>{projet.service}</span>
                <span style={{ opacity: 0.3 }}>/</span>
                <span className="text-white/70">{projet.nom}</span>
              </nav>
              <span
                className="text-[11px] font-semibold tracking-widest uppercase px-3 py-1"
                style={{
                  border: "1px solid rgba(232,184,75,0.3)",
                  color: "#e8b84b",
                  borderRadius: "2px",
                }}
              >
                Étude de cas
              </span>
            </div>

            {/* Titre hero ultra-bold */}
            <h1
              className="font-black leading-none tracking-[-0.03em] mb-6"
              style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
            >
              {titleFirst && (
                <>
                  {titleFirst}
                  <br />
                </>
              )}
              <em className="not-italic" style={{ color: "#e8b84b" }}>{titleLast}</em>
            </h1>

            {/* Sous-titre */}
            <p
              className="text-base md:text-lg leading-[1.8] mb-14 max-w-135"
              style={{ color: "#888880" }}
            >
              {projet.description}
            </p>

          </RevealOnScroll>

          {/* Bande meta */}
          <RevealOnScroll delay={0.06}>
            <div
              className="flex flex-wrap gap-x-10 gap-y-5 pt-7 pb-14"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              {[
                { label: "Secteur",      value: projet.type ?? projet.service },
                { label: "Localisation", value: projet.ville },
                { label: "Prestation",   value: projet.tag ?? projet.service },
                {
                  label: "Statut",
                  value: statutLabel(projet.statut) + (projet.annee ? ` · ${projet.annee}` : ""),
                },
                ...(projet.lien && projet.lien !== "#"
                  ? [{ label: "Résultat", value: "Site live →", href: projet.lien }]
                  : []),
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1.5 min-w-22.5">
                  <span
                    className="text-[10px] tracking-[0.12em] uppercase font-medium"
                    style={{ color: "#888880" }}
                  >
                    {item.label}
                  </span>
                  {"href" in item && item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold transition-opacity hover:opacity-70"
                      style={{ color: "#e8b84b" }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm font-semibold text-white">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>

      </section>

      {/* ══════════════════════════════════════════════════════════
          STATEMENT
      ══════════════════════════════════════════════════════════ */}
      <section
        className="px-6 lg:px-10 py-24 text-center relative overflow-hidden"
        style={{ background: "#F5F5F0", color: "#0D0D0D", borderTop: "1px solid rgba(0,0,0,0.08)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(232,184,75,0.08) 0%, transparent 70%)" }}
        />
        <div className="max-w-3xl mx-auto relative">
          <RevealOnScroll>
            <p
              className="font-black leading-tight tracking-[-0.02em] mb-6"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", color: "#0D0D0D" }}
            >
              {stmt2 ? (
                <>
                  <em className="not-italic" style={{ color: "#e8b84b" }}>{stmt1}</em>
                  <br />
                  {stmt2}
                </>
              ) : (
                <em className="not-italic" style={{ color: "#e8b84b" }}>{stmt1}</em>
              )}
            </p>
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: "#5C5C5A" }}
            >
              Notre conviction derrière chaque projet
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          01 — ENJEU
      ══════════════════════════════════════════════════════════ */}
      {hasEnjeux && (
        <section
          className="px-6 lg:px-10 py-20"
          style={{ background: "#000001", color: "#f0ede8", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="max-w-6xl mx-auto">
            <RevealOnScroll>
              <SectionLabel num="01" label="Enjeu" />
              <h2
                className="font-bold tracking-[-0.02em] mb-4 max-w-2xl"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.1 }}
              >
                Pourquoi ce projet avait besoin<br />
                d&apos;un site{" "}
                <em className="not-italic" style={{ color: "#e8b84b" }}>différent</em>
              </h2>
              <p className="text-base leading-[1.8] mb-14 max-w-150" style={{ color: "#888880" }}>
                Dans un marché où la confiance se construit au premier contact visuel,{" "}
                {projet.nom} avait besoin de plus qu&apos;un simple site d&apos;information.
              </p>
            </RevealOnScroll>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-px overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "4px",
              }}
            >
              {projet.enjeux!.filter(e => e.titre).map((e, i) => (
                <RevealOnScroll key={e.num} delay={i * 0.06}>
                  <div className="case-cell p-8 md:p-10">
                    <p
                      className="font-black leading-none mb-4"
                      style={{
                        fontSize: "4rem",
                        color: "rgba(232,184,75,0.08)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {e.num}
                    </p>
                    <h3
                      className="text-sm font-bold tracking-wider uppercase mb-3"
                      style={{ color: "#f0ede8" }}
                    >
                      {e.titre}
                    </h3>
                    <p className="text-sm leading-[1.7]" style={{ color: "#888880" }}>
                      {e.corps}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          APPROCHE — toujours présente
      ══════════════════════════════════════════════════════════ */}
      <section
        className="px-6 lg:px-10 py-20"
        style={{ background: "#F5F5F0", color: "#0D0D0D", borderTop: "1px solid rgba(0,0,0,0.08)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-10 lg:gap-24 items-start">

            {/* Sidebar sticky */}
            <div className="lg:sticky lg:top-24">
              <RevealOnScroll>
                <SectionLabel num={nums.appr} label="Approche" />
                <h2
                  className="font-bold tracking-[-0.02em] mb-4"
                  style={{ fontSize: "clamp(1.6rem, 3vw, 2rem)", lineHeight: 1.1, color: "#0D0D0D" }}
                >
                  Comment nous l&apos;avons{" "}
                  <em className="not-italic" style={{ color: "#e8b84b" }}>pensé</em>
                </h2>
                <p className="text-sm leading-[1.8] mb-8" style={{ color: "#5C5C5A" }}>
                  Les leviers qui transforment une présence digitale en outil de business.
                </p>

                {/* TOC des blocs d'approche */}
                {hasApproche && (
                  <nav
                    className="flex flex-col"
                    style={{ borderLeft: "1px solid rgba(0,0,0,0.1)" }}
                  >
                    {projet.approche!.map((bloc, i) => (
                      <a
                        key={i}
                        href={`#approche-${i}`}
                        className="case-toc-item"
                      >
                        {bloc.titre}
                      </a>
                    ))}
                  </nav>
                )}

                {/* Livrables si pas de TOC */}
                {!hasApproche && projet.livrables && projet.livrables.length > 0 && (
                  <div
                    className="flex flex-col gap-2 pl-5"
                    style={{ borderLeft: "1px solid rgba(0,0,0,0.1)" }}
                  >
                    {projet.livrables.map((l) => (
                      <span
                        key={l}
                        className="text-sm flex items-center gap-2"
                        style={{ color: "#5C5C5A" }}
                      >
                        <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden>
                          <rect width="13" height="13" rx="3" fill="#2D4A3E" />
                          <path d="M3 6.5L5.5 9L10 4" stroke="#FAFAF7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {l}
                      </span>
                    ))}
                  </div>
                )}
              </RevealOnScroll>
            </div>

            {/* Contenu */}
            <div className="flex flex-col gap-0">

              {/* Image du projet */}
              <RevealOnScroll>
                <div
                  className="relative overflow-hidden mb-10"
                  style={{
                    aspectRatio: "16/10",
                    borderRadius: "4px",
                    border: "1px solid rgba(0,0,0,0.1)",
                    background: projet.image_url
                      ? undefined
                      : "linear-gradient(135deg, #e8e6e0, #d8d6d0)",
                  }}
                >
                  {projet.image_url ? (
                    <Image
                      src={projet.image_url}
                      alt={projet.nom}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-8xl opacity-10">{projet.emoji}</span>
                    </div>
                  )}
                </div>
              </RevealOnScroll>

              {/* Blocs d'approche personnalisés */}
              {hasApproche ? (
                projet.approche!.map((bloc, i) => (
                  <RevealOnScroll key={i} delay={0.04 + i * 0.04}>
                    <div
                      id={`approche-${i}`}
                      className="pt-8 pb-10"
                      style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}
                    >
                      <h3
                        className="font-bold text-xl mb-4 tracking-[-0.01em]"
                        style={{ color: "#0D0D0D" }}
                      >
                        {bloc.titre}
                      </h3>
                      {bloc.corps.split("\n").filter(Boolean).map((para, j) => (
                        <p
                          key={j}
                          className="text-sm leading-[1.8] mb-4"
                          style={{ color: "#5C5C5A" }}
                        >
                          {para}
                        </p>
                      ))}
                      {bloc.citation && (
                        <div
                          className="my-5 py-4 px-5"
                          style={{
                            borderLeft: "2px solid #e8b84b",
                            background: "rgba(232,184,75,0.04)",
                            borderRadius: "0 4px 4px 0",
                          }}
                        >
                          <p
                            className="text-sm italic leading-[1.7]"
                            style={{ color: "#0D0D0D" }}
                          >
                            « {bloc.citation} »
                          </p>
                        </div>
                      )}
                    </div>
                  </RevealOnScroll>
                ))
              ) : (
                /* Blocs génériques si pas de données */
                <>
                  <RevealOnScroll delay={0.04}>
                    <div
                      className="pt-8 pb-10"
                      style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}
                    >
                      <h3 className="font-bold text-xl mb-4 tracking-[-0.01em]" style={{ color: "#0D0D0D" }}>
                        Direction artistique &amp; identité
                      </h3>
                      <p className="text-sm leading-[1.8] mb-4" style={{ color: "#5C5C5A" }}>
                        Le brief était clair : {projet.nom} ne devait pas ressembler à un site ordinaire.
                        Une direction artistique forte, une hiérarchie visuelle maîtrisée, une palette
                        choisie pour instiller la confiance dès le premier scroll.
                      </p>
                      <div
                        className="my-5 py-4 px-5"
                        style={{
                          borderLeft: "2px solid #e8b84b",
                          background: "rgba(232,184,75,0.06)",
                          borderRadius: "0 4px 4px 0",
                        }}
                      >
                        <p className="text-sm italic leading-[1.7]" style={{ color: "#0D0D0D" }}>
                          « Un design premium, c&apos;est un argument commercial silencieux.
                          Il parle avant même que le client ait lu une ligne. »
                        </p>
                      </div>
                    </div>
                  </RevealOnScroll>
                  <RevealOnScroll delay={0.08}>
                    <div
                      className="pt-8 pb-10"
                      style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}
                    >
                      <h3 className="font-bold text-xl mb-4 tracking-[-0.01em]" style={{ color: "#0D0D0D" }}>
                        Expérience utilisateur &amp; parcours clair
                      </h3>
                      <p className="text-sm leading-[1.8] mb-4" style={{ color: "#5C5C5A" }}>
                        Chaque section a un rôle précis : attirer, présenter, lever les objections,
                        convertir. L&apos;utilisateur sait en moins de 30 secondes ce que fait{" "}
                        {projet.nom} et comment le contacter.
                      </p>
                      <div
                        className="my-5 py-4 px-5"
                        style={{
                          borderLeft: "2px solid #e8b84b",
                          background: "rgba(232,184,75,0.06)",
                          borderRadius: "0 4px 4px 0",
                        }}
                      >
                        <p className="text-sm italic leading-[1.7]" style={{ color: "#0D0D0D" }}>
                          Un visiteur qui hésite est un visiteur perdu.
                          La clarté du parcours, c&apos;est de la conversion gratuite.
                        </p>
                      </div>
                    </div>
                  </RevealOnScroll>
                </>
              )}


            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          STACK TECHNIQUE
      ══════════════════════════════════════════════════════════ */}
      {hasOutils && (
        <section
          className="px-6 lg:px-10 py-20"
          style={{ background: "#000001", color: "#f0ede8", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="max-w-6xl mx-auto">
            <RevealOnScroll>
              <SectionLabel num={nums.outils!} label="Stack technique" />
              <h2
                className="font-bold tracking-[-0.02em] mb-4"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.1 }}
              >
                Outils{" "}
                <em className="not-italic" style={{ color: "#e8b84b" }}>choisis</em>{" "}
                avec intention
              </h2>
              <p className="text-base leading-[1.8] mb-14 max-w-150" style={{ color: "#888880" }}>
                Pas de sur-ingénierie. Des outils éprouvés, maîtrisés, adaptés au contexte du projet.
              </p>
            </RevealOnScroll>

            <div
              className="grid gap-px overflow-hidden"
              style={{
                gridTemplateColumns: `repeat(${Math.min(projet.outils!.length, 5)}, 1fr)`,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "4px",
              }}
            >
              {projet.outils!.map((o, i) => (
                <RevealOnScroll key={o.nom} delay={i * 0.06}>
                  <div className="case-tool p-6 md:p-8 flex flex-col items-center gap-3 text-center cursor-default">
                    <div
                      className="w-11 h-11 flex items-center justify-center text-sm font-black"
                      style={{
                        borderRadius: "8px",
                        background: o.couleur ?? "rgba(255,255,255,0.06)",
                        color: "#f0ede8",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {o.icone}
                    </div>
                    <div>
                      <p className="text-sm font-bold" style={{ color: "#f0ede8" }}>{o.nom}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: "#888880" }}>{o.desc}</p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          RÉSULTATS
      ══════════════════════════════════════════════════════════ */}
      {!isEnCours && (
        <section
          className="px-6 lg:px-10 py-20 relative overflow-hidden"
          style={{ background: "#F5F5F0", color: "#0D0D0D", borderTop: "1px solid rgba(0,0,0,0.08)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(232,184,75,0.06) 0%, transparent 70%)" }}
          />
          <div className="max-w-6xl mx-auto relative">
            <RevealOnScroll>
              <SectionLabel num={nums.resultats} label="Résultats" />
              <h2
                className="font-bold tracking-[-0.02em] mb-4"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.1, color: "#0D0D0D" }}
              >
                Ce que le projet a{" "}
                <em className="not-italic" style={{ color: "#e8b84b" }}>accompli</em>
              </h2>
              <p className="text-base leading-[1.8] mb-14 max-w-150" style={{ color: "#5C5C5A" }}>
                Un site qui travaille en continu — visibilité, crédibilité, conversions.
              </p>
            </RevealOnScroll>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-px overflow-hidden"
              style={{
                background: "rgba(0,0,0,0.08)",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "4px",
              }}
            >
              {(hasResultats ? projet.resultats!.filter(r => r.titre) : [
                { icon: "↑", titre: "Valeur perçue élevée",   desc: `Un design premium positionne ${projet.nom} comme référence dans son secteur.` },
                { icon: "⚡", titre: "Engagement direct",      desc: "Un parcours utilisateur pensé pour convertir, sans friction." },
                { icon: "◎", titre: "Visibilité digitale",     desc: `SEO local optimisé dès le lancement — ${projet.ville}, ${projet.type ?? projet.service}.` },
              ]).map((r, i) => (
                <RevealOnScroll key={r.titre} delay={i * 0.07}>
                  <div className="case-result-light p-8 md:p-10 flex flex-col gap-4">
                    <span
                      className="text-2xl leading-none"
                      style={{ color: "#e8b84b" }}
                    >
                      {r.icon}
                    </span>
                    <h3 className="text-base font-bold" style={{ color: "#0D0D0D" }}>{r.titre}</h3>
                    <p className="text-sm leading-[1.6]" style={{ color: "#5C5C5A" }}>{r.desc}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          FINAL STATEMENT
      ══════════════════════════════════════════════════════════ */}
      <section
        className="px-6 lg:px-10 py-24 text-center relative overflow-hidden"
        style={{ background: "#000001", color: "#f0ede8", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232,184,75,0.05) 0%, transparent 70%)" }}
        />
        <div className="max-w-3xl mx-auto relative">
          <RevealOnScroll>
            <p
              className="font-black leading-tight tracking-[-0.02em] mb-6"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}
            >
              Ce n&apos;est pas un site vitrine.<br />
              C&apos;est un{" "}
              <em className="not-italic" style={{ color: "#e8b84b" }}>outil de vente</em> actif,<br />
              24 h/24.
            </p>
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: "#888880" }}
            >
              {projet.nom}
              {projet.lien && projet.lien !== "#"
                ? " — Live depuis son lancement"
                : isEnCours ? " — En cours de réalisation" : ""}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          AUTRES PROJETS
      ══════════════════════════════════════════════════════════ */}
      {autresProjets && autresProjets.length > 0 && (
        <section
          className="px-6 lg:px-10 py-20"
          style={{ background: "#F5F5F0", color: "#0D0D0D", borderTop: "1px solid rgba(0,0,0,0.08)" }}
        >
          <div className="max-w-6xl mx-auto">
            <RevealOnScroll>
              <SectionLabel num={nums.suite} label="Projets suivants" />
              <h2
                className="font-bold tracking-[-0.02em] mb-14"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.1, color: "#0D0D0D" }}
              >
                D&apos;autres{" "}
                <em className="not-italic" style={{ color: "#e8b84b" }}>réalisations</em>
              </h2>
            </RevealOnScroll>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-px overflow-hidden"
              style={{
                background: "rgba(0,0,0,0.08)",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "4px",
              }}
            >
              {autresProjets.map((p, i) => (
                <RevealOnScroll key={p.id} delay={i * 0.07}>
                  {p.slug ? (
                    <Link
                      href={`/projets/${p.slug}`}
                      className="case-project-light group"
                    >
                      <div>
                        <div
                          className="h-10 mb-6 opacity-30"
                          style={{
                            borderRadius: "3px",
                            background: "rgba(0,0,0,0.1)",
                          }}
                        />
                        <p
                          className="text-[10px] font-semibold tracking-[0.12em] uppercase mb-2 text-accent"
                        >
                          {p.service}
                        </p>
                        <p className="case-project-title text-lg font-bold leading-snug">
                          {p.nom}
                        </p>
                        {p.ville && (
                          <p className="text-xs mt-1" style={{ color: "#5C5C5A" }}>{p.ville}</p>
                        )}
                      </div>
                      <span className="case-project-arrow mt-6 text-xl">→</span>
                    </Link>
                  ) : (
                    <div className="flex flex-col justify-between min-h-52.5 p-8" style={{ background: "#FFFFFF" }}>
                      <div>
                        <div
                          className="h-10 mb-6 opacity-30"
                          style={{ borderRadius: "3px", background: "rgba(0,0,0,0.08)" }}
                        />
                        <p
                          className="text-[10px] font-semibold tracking-[0.12em] uppercase mb-2"
                          style={{ color: "#e8b84b" }}
                        >
                          {p.service}
                        </p>
                        <p className="text-lg font-bold leading-snug" style={{ color: "#0D0D0D" }}>{p.nom}</p>
                      </div>
                    </div>
                  )}
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════════ */}
      <section
        className="px-6 lg:px-10 py-20 text-center relative overflow-hidden"
        style={{ background: "#000001", color: "#f0ede8", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none blur-3xl"
          style={{ background: "rgba(232,184,75,0.15)", borderRadius: "9999px" }}
        />
        <div className="max-w-xl mx-auto relative">
          <RevealOnScroll>
            <h2
              className="font-black tracking-[-0.03em] text-white mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Un projet en tête&nbsp;?
            </h2>
            <p className="mb-10 text-sm leading-relaxed mx-auto" style={{ color: "#888880" }}>
              Discutons de ce qu&apos;on peut construire ensemble. Pas de jargon, juste des résultats.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 text-sm font-bold tracking-[0.08em] uppercase transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{
                  padding: "14px 32px",
                  background: "#e8b84b",
                  color: "#fff",
                  borderRadius: "2px",
                  textDecoration: "none",
                }}
              >
                Démarrer un projet
              </a>
              <Link href="/projets" className="case-btn-ghost">
                Voir tous les projets
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

    </div>
  );
}

// ── Composant label de section ────────────────────────────────────────────────
function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6" style={{ color: "#e8b84b" }}>
      <div className="w-8 h-px" style={{ background: "#e8b84b" }} />
      <span className="text-[11px] font-semibold tracking-[0.18em] uppercase">
        {num} — {label}
      </span>
    </div>
  );
}
