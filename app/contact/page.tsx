import type { Metadata } from "next";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — Parlons de votre projet",
  description:
    "Décrivez votre projet à Le Panaf. Réponse sous 24h. Pas de devis automatique, pas de relance commerciale agressive.",
};

export default function ContactPage() {
  return (
    <div className="pb-20 md:pb-0">

      {/* HERO */}
      <section className="bg-background px-4 sm:px-6 lg:px-8 pt-[90px] pb-14 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-px bg-accent" />
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-foreground-muted">
                Contact
              </p>
            </div>
            <h1 className="font-display font-light leading-[1.05] tracking-tight mb-6">
              <span className="block text-4xl md:text-5xl lg:text-6xl text-foreground">Parlons de</span>
              <span className="block text-4xl md:text-5xl lg:text-6xl italic text-accent">votre projet</span>
            </h1>
            <p className="text-sm text-foreground-muted max-w-md leading-relaxed">
              Pas de devis automatique, pas de relance agressive. Une réponse honnête sous 24h.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* CONTENU */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 lg:gap-16">

            {/* Formulaire */}
            <RevealOnScroll>
              <div className="bg-surface rounded-3xl p-7 md:p-10 border border-border shadow-sm">
                <h2 className="font-display text-2xl text-foreground mb-7">Votre demande</h2>
                <ContactForm />
              </div>
            </RevealOnScroll>

            {/* Sidebar infos */}
            <div className="flex flex-col gap-5">
              <RevealOnScroll delay={0.1}>
                <div className="bg-surface rounded-2xl p-6 border border-border">
                  <p className="text-xs font-semibold tracking-widest uppercase text-foreground-muted mb-5">Coordonnées</p>
                  <ul className="space-y-4">
                    <li>
                      <p className="text-xs text-foreground-muted mb-0.5">Nous contacter</p>
                      <a href="tel:+212638725690" className="text-sm font-medium hover:text-accent transition-colors duration-200">
                        (+212) 06.38.72.56.90
                      </a>
                    </li>
                    <li>
                      <p className="text-xs text-foreground-muted mb-0.5">Email</p>
                      <a href="mailto:edhem@agencelepanaf.com" className="text-sm font-medium hover:text-accent transition-colors duration-200">
                        edhem@agencelepanaf.com
                      </a>
                    </li>
                    <li>
                      <p className="text-xs text-foreground-muted mb-0.5">Localisation</p>
                      <p className="text-sm font-medium">Casablanca, Maroc</p>
                    </li>
                    <li>
                      <p className="text-xs text-foreground-muted mb-0.5">Délai de réponse</p>
                      <p className="text-sm font-medium">Sous 24h</p>
                    </li>
                  </ul>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.15}>
                <div className="bg-dark rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                    <p className="text-xs font-semibold text-dark-muted">Promesse</p>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed">
                    Votre message arrive directement à l'équipe — pas à un service commercial,
                    pas à un assistant automatique.
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <div className="bg-surface rounded-2xl p-6 border border-border">
                  <p className="text-xs font-semibold tracking-widest uppercase text-foreground-muted mb-4">Nos services</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2.5">
                      <span className="text-accent mt-0.5 text-sm">→</span>
                      <div>
                        <p className="text-sm font-medium">Présence digitale</p>
                        <p className="text-xs text-foreground-muted">Accompagnement continu</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-accent-green mt-0.5 text-sm">→</span>
                      <div>
                        <p className="text-sm font-medium">Création de site web</p>
                        <p className="text-xs text-foreground-muted">Projet ponctuel clé en main</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
