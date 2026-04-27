"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface FormState {
  nom: string;
  email: string;
  entreprise: string;
  typeProjet: string;
  budget: string;
  description: string;
}

const initial: FormState = {
  nom: "",
  email: "",
  entreprise: "",
  typeProjet: "",
  budget: "",
  description: "",
};

const inputBase =
  "w-full px-4 py-3.5 text-sm rounded-xl border border-border bg-surface text-foreground placeholder:text-foreground-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur serveur");
      setStatus("success");
      setForm(initial);
    } catch {
      setStatus("error");
      setErrorMsg("Une erreur s'est produite. Contactez-nous directement à contact@agencelepanaf.com.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-accent-green/10 rounded-2xl p-10 text-center border border-accent-green/20">
        <p className="text-4xl mb-4">✓</p>
        <p className="font-display text-2xl text-foreground mb-2">Message reçu.</p>
        <p className="text-sm text-foreground-muted">
          Nous vous répondons sous 24h ouvrées. Merci de votre confiance.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="nom" className="text-xs font-semibold text-foreground-muted tracking-wide">
            Nom complet <span className="text-accent">*</span>
          </label>
          <input id="nom" name="nom" type="text" required value={form.nom} onChange={handleChange} placeholder="Ahmed Bennani" className={inputBase} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-semibold text-foreground-muted tracking-wide">
            Email <span className="text-accent">*</span>
          </label>
          <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="vous@exemple.com" className={inputBase} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="entreprise" className="text-xs font-semibold text-foreground-muted tracking-wide">Entreprise</label>
        <input id="entreprise" name="entreprise" type="text" value={form.entreprise} onChange={handleChange} placeholder="Nom de votre entreprise" className={inputBase} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="typeProjet" className="text-xs font-semibold text-foreground-muted tracking-wide">Type de projet</label>
          <select id="typeProjet" name="typeProjet" value={form.typeProjet} onChange={handleChange} className={`${inputBase} cursor-pointer`}>
            <option value="">Sélectionner…</option>
            <option value="presence-digitale">Présence digitale</option>
            <option value="creation-site">Création de site web</option>
            <option value="indecis">Je ne sais pas encore</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="budget" className="text-xs font-semibold text-foreground-muted tracking-wide">Budget approximatif</label>
          <select id="budget" name="budget" value={form.budget} onChange={handleChange} className={`${inputBase} cursor-pointer`}>
            <option value="">Sélectionner…</option>
            <option value="moins-30k">Moins de 30 000 MAD</option>
            <option value="30k-80k">30 000 – 80 000 MAD</option>
            <option value="plus-80k">Plus de 80 000 MAD</option>
            <option value="a-discuter">Je veux en discuter</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-xs font-semibold text-foreground-muted tracking-wide">
          Description du projet <span className="text-accent">*</span>
        </label>
        <textarea
          id="description" name="description" required rows={5}
          value={form.description} onChange={handleChange}
          placeholder="Décrivez votre activité, votre besoin, votre calendrier…"
          className={`${inputBase} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-accent bg-accent/10 rounded-xl px-4 py-3">{errorMsg}</p>
      )}

      <Button type="submit" variant="primary" disabled={status === "loading"} className="w-full py-4 text-sm">
        {status === "loading" ? "Envoi en cours…" : "Envoyer le message →"}
      </Button>
    </form>
  );
}
