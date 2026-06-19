import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import AnimatedIcon from "@/components/ui/AnimatedIcon";
import CyclingWord from "@/components/ui/CyclingWord";
import FloatingCTA from "@/components/ui/FloatingCTA";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Agencelepanaf: Agence Web Digitale à Casablanca",
  description:
    "Le Panaf est une Agence web digitale qui conçoit des sites web performants pour des entreprises francophones en Afrique et en Europe.",
};

const services = [
  {
    tag: "Accompagnement continu",
    titre: "Présence digitale",
    description: "Nous pilotons votre visibilité en ligne : site, SEO, contenu, analytics. Vous vous concentrez sur votre métier.",
    href: "/services/presence-digitale",
    color: "bg-accent",
    textColor: "text-white",
    tagColor: "bg-white/20 text-white",
    linkColor: "text-white/80 hover:text-white",
  },
  {
    tag: "Projet ponctuel",
    titre: "Création de site web",
    description: "Audit, design, développement sur mesure, SEO, formation. Livré clé en main en 4 à 8 semaines.",
    href: "/services/creation-site-web",
    color: "bg-surface",
    textColor: "text-foreground",
    tagColor: "bg-accent-green/10 text-accent-green",
    linkColor: "text-foreground-muted hover:text-foreground",
  },
];

const etapesMethode = [
  { num: "01", titre: "Cadrage stratégique" },
  { num: "02", titre: "Stratégie de marque" },
  { num: "03", titre: "Architecture & contenu" },
  { num: "04", titre: "Design UI" },
  { num: "05", titre: "Développement" },
  { num: "06", titre: "Lancement" },
];


export default async function HomePage() {
  const { data: projetEnCours } = await supabase
    .from('projets')
    .select('nom, emoji')
    .in('statut', ['en_cours', 'vedette'])
    .order('ordre', { ascending: true })
    .limit(1)
    .maybeSingle()

  return (
    <div>

      {/* ── HERO ── fond clair, typo éditoriale Gemeos */}
      <section className="relative min-h-dvh bg-background flex flex-col px-6 sm:px-8 lg:px-12 pt-20 md:pt-22.5 pb-16">

        {/* Trait décoratif horizontal discret */}
        <div className="absolute top-0 left-0 right-0 h-px bg-border pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full flex flex-col my-auto items-center text-center">

          {/* Label avec icône animée */}
          <RevealOnScroll>
            <div className="flex items-center gap-3 mb-5 sm:mb-10">
              <AnimatedIcon
                src="/icon-slogan.png"
                alt="Icône Le Panaf"
                size={36}
                priority
              />
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-foreground-muted whitespace-nowrap">
                Votre visibilité, notre engagement
              </p>
            </div>
          </RevealOnScroll>

          {/* H1 avec mots cycliques */}
          <RevealOnScroll delay={0.04}>
            <h1 className="font-display font-light leading-[1.1] tracking-tight mb-5 sm:mb-10">
              {/* Ligne 1 : fixe */}
              <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground font-lucky font-light">
                On crée des sites web
              </span>

              {/* Ligne 2 : mot cyclique (cible) */}
              <span
                className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-accent overflow-hidden h-[1.2em] uppercase"
                style={{ fontFamily: "'Bangers', sans-serif", letterSpacing: "0.05em", textShadow: "2px 2px 0px rgba(0,0,0,0.15)" }}
              >
                <CyclingWord
                  words={["pour les entreprises", "pour les hotels", " pour les STARTUPS", "pour les restaurants"]}
                  interval={2400}
                />
              </span>

              {/* Ligne 3 : fixe */}
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground font-lucky font-light">
                qui génèrent
              </span>

              {/* Ligne 4 : mot cyclique (résultat) */}
              <span
                className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-accent-green overflow-hidden h-[1.2em] uppercase"
                style={{ fontFamily: "'Bangers', sans-serif", letterSpacing: "0.05em", textShadow: "2px 2px 0px rgba(0,0,0,0.15)" }}
              >
                <CyclingWord
                  words={["des clients !", "des visites !", "des leads !", "des commandes !"]}
                  interval={2400}
                />
              </span>
            </h1>
          </RevealOnScroll>

          {/* Pills checkmark */}
          <RevealOnScroll delay={0.08}>
            <div className="flex gap-1 sm:gap-1.5 justify-center">
              {["Présence digitale", "Stratégie", "Contenu", "SEO"].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 bg-accent-green/10 text-accent-green text-[10px] sm:text-xs font-medium px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-accent-green/20 whitespace-nowrap"
                  style={{ boxShadow: "0 2px 6px 0 rgba(45,74,62,0.13)" }}
                >
                  <svg width="11" height="11" viewBox="0 0 13 13" fill="none" aria-hidden>
                    <rect width="13" height="13" rx="3" fill="#2D4A3E"/>
                    <path d="M3 6.5L5.5 9L10 4" stroke="#FAFAF7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {tag}
                </span>
              ))}
            </div>
          </RevealOnScroll>


          {/* CTA */}
          <div className="mt-8 sm:mt-10 w-full">
            <RevealOnScroll delay={0.1}>
              <div className="flex flex-wrap gap-3 justify-center items-center">
                <Button href="/realisations" variant="primary" className="text-sm px-7 py-3.5">
                  Nos réalisations →
                </Button>

                {/* Teaser projet en cours — dynamique depuis Supabase */}
                {projetEnCours?.nom && (
                  <Link
                    href="/realisations#en-cours"
                    className="flex items-center gap-3 bg-surface border border-border hover:border-accent rounded-full pl-2 pr-5 py-2 transition-all duration-200 group"
                  >
                    <div className="w-9 h-9 rounded-full shrink-0 bg-linear-to-br from-amber-400/50 to-orange-500/40 flex items-center justify-center text-lg leading-none">
                      {projetEnCours.emoji ?? '🏗️'}
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] text-foreground-muted flex items-center gap-1.5 leading-none mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse inline-block" />
                        Projet en cours
                      </p>
                      <p className="text-xs font-semibold text-foreground leading-none group-hover:text-accent transition-colors duration-200">
                        {projetEnCours.nom} →
                      </p>
                    </div>
                  </Link>
                )}
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* Bouton CTA mobile — apparaît en bas du hero avec animation */}
        <FloatingCTA />

      </section>

      {/* ── NOS SERVICES ── */}
      <section className="px-4 sm:px-6 lg:px-8 pt-4 pb-10 md:pt-6 md:pb-14">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <p className="text-xs font-semibold tracking-widest uppercase text-foreground-muted mb-2">
              Ce que nous faisons
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
              Deux façons de travailler ensemble
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((s, i) => (
              <RevealOnScroll key={s.titre} delay={i * 0.08}>
                <div className={`${s.color} rounded-2xl p-8 h-full flex flex-col gap-5 shadow-sm`}>
                  <span className={`inline-block text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full w-fit ${s.tagColor}`}>
                    {s.tag}
                  </span>
                  <div className="flex-1">
                    <h3 className={`font-display text-2xl md:text-3xl mb-3 ${s.textColor}`}>
                      {s.titre}
                    </h3>
                    <p className={`text-sm leading-relaxed ${s.color === "bg-accent" ? "text-white/75" : "text-foreground-muted"}`}>
                      {s.description}
                    </p>
                  </div>
                  <Link
                    href={s.href}
                    className={`inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 ${s.linkColor}`}
                  >
                    Découvrir →
                  </Link>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOUBLE REGARD ── */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-dark overflow-hidden relative">
        <div className="absolute inset-0 bg-accent-green/5 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <RevealOnScroll>
            <p className="text-xs font-semibold tracking-widest uppercase text-dark-muted mb-2">
              Notre différence
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-6 max-w-3xl">
              Pourquoi notre double regard change tout
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                titre: "Cycles de décision",
                corps: "Souvent une décision demande plusieurs échanges et une phase de confiance. Nous construisons cette confiance dès le premier clic.",
              },
              {
                titre: "Standards premium",
                corps: "Performance, accessibilité, SEO technique : nous appliquons les exigences des marchés les plus matures à chaque projet.",
              },
              {
                titre: "Contraintes terrain",
                corps: "Mobile-first absolu, connectivité variable, référencement bilingue -> nous avons la maîtrise des réalités terrains.",
              },
            ].map((item, i) => (
              <RevealOnScroll key={item.titre} delay={i * 0.08}>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h3 className="text-base font-semibold text-white mb-3">{item.titre}</h3>
                  <p className="text-sm text-dark-muted leading-relaxed">{item.corps}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── MÉTHODE ── */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-surface">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <p className="text-xs font-semibold tracking-widest uppercase text-foreground-muted mb-2">
              Comment nous travaillons
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
              Une méthode en 6 étapes
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {etapesMethode.map((e, i) => (
              <RevealOnScroll key={e.num} delay={i * 0.05}>
                <div className="bg-background rounded-2xl p-4 text-center border border-border">
                  <p className="text-2xl font-bold text-border mb-2">{e.num}</p>
                  <p className="text-xs font-medium text-foreground leading-snug">{e.titre}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={0.2}>
            <Link href="/notre-methode" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-colors duration-200">
              Lire la méthode complète →
            </Link>
          </RevealOnScroll>
        </div>
      </section>
   
      {/* ── CTA FINAL ── */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <div className="bg-dark rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
              <h2 className="font-display text-3xl md:text-5xl text-white mb-4 relative">
                Discutons de votre présence digitale
              </h2>
              <p className="text-white/60 mb-8 text-sm max-w-md mx-auto relative">
                Nous lisons chaque demande personnellement. Réponse sous 24h ouvrées.
              </p>
              <Button href="/contact" variant="primary" className="text-sm px-8 py-4 relative">
                Prendre contact →
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

    </div>
  );
}
