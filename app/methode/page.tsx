import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: "Notre méthode — De la stratégie au lancement",
  description:
    "Découvrez comment l'Agence Le Panaf conduit chaque projet : 6 étapes, des livrables clairs, une implication client limitée aux moments essentiels.",
};

const etapes = [
  {
    num: "I",
    titre: "Cadrage stratégique",
    duree: "1 semaine",
    description: "Tout commence par la compréhension. Une phase de découverte pour saisir votre activité, vos marchés, vos cibles, vos concurrents et vos objectifs mesurables.",
    livrables: ["Compte-rendu de la phase de découverte", "Analyse concurrentielle","Feuille de route du projet"],
    clientRole: "Participez à la phase de découverte, partagez vos documents existants, validez le brief final.",
    color: "bg-accent/10",
    numColor: "text-accent",
  },
  {
    num: "II",
    titre: "Stratégie de marque digitale",
    duree: "1 semaine",
    description: "Avant de designer, on définit comment vous voulez être perçu. Positionnement, ton de voix, univers visuel. Cette étape évite les allers-retours coûteux.",
    livrables: ["Moodboard visuelle", "Palette et typographie"],
    clientRole: "Vos retours sur la moodboard. Souvent plus simple que prévu : on sait ce qu'on aime quand on le voit.",
    color: "bg-accent-green/10",
    numColor: "text-accent-green",
  },
  {
    num: "III",
    titre: "Architecture et contenu",
    duree: "1 semaine",
    description: "On structure avant de dessiner. L'architecture détermine ce que trouvent vos visiteurs et comment Google comprend votre site.",
    livrables: ["Plan de site complet", "Wireframes des pages", "Textes finaux", "Mots-clés SEO prioritaires"],
    clientRole: "Fourniture des informations pour la rédaction. Validation des textes avant le design.",
    color: "bg-accent/10",
    numColor: "text-accent",
  },
  {
    num: "IV",
    titre: "Design UI",
    duree: "1 semaine",
    description: "Chaque écran pensé pour la conversion, pas seulement l'esthétique.",
    livrables: ["Maquettes desktop + mobile", "Système de design", "Annotations interactions", "Prototype navigable"],
    clientRole: "On travaille ensemble jusqu'à ce que ce soit juste.",
    color: "bg-accent-green/10",
    numColor: "text-accent-green",
  },
  {
    num: "V",
    titre: "Développement",
    duree: "1 à 2 semaines",
    description: "Performance, accessibilité, SEO, sécurité — testés sur les principaux navigateurs et appareils.",
    livrables: ["Site complet ","SEO technique intégré", "Documentation du code"],
    clientRole: "Validation finale. Accès à votre domaine et hébergement.",
    color: "bg-accent/10",
    numColor: "text-accent",
  },
  {
    num: "VI",
    titre: "Lancement et formation",
    duree: "1 semaine",
    description: "Mise en production, DNS, Search Console, Analytics, soumission aux moteurs. Puis une séance de formation pour votre autonomie.",
    livrables: ["Site en production", "Google Search Console + Analytics", "Guide d'administration", "Séance de formation"],
    clientRole: "Disponibilité pour la formation. Questions et corrections inclus pendant 30 jours.",
    color: "bg-accent-green/10",
    numColor: "text-accent-green",
  },
];

export default function MethodePage() {
  return (
    <div>

      {/* HERO */}
      <section className="bg-background px-4 sm:px-6 lg:px-8 pt-20 md:pt-[90px] pb-10 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-px bg-foreground-muted" />
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-foreground-muted">
                Notre méthode
              </p>
            </div>
            <h1 className="font-display font-light leading-[1.05] tracking-tight mb-8">
              <span className="block text-4xl md:text-6xl lg:text-7xl text-foreground">De la stratégie au lancement</span>
            </h1>
            <p className="text-base text-foreground-muted leading-relaxed">
              Un projet web réussi est un projet structuré. Chaque étape a une raison d&apos;être et des livrables précis.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ÉTAPES */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="max-w-6xl mx-auto space-y-5">
          {etapes.map((etape, i) => (
            <RevealOnScroll key={etape.num} delay={0.05 * i}>
              <div className={`${etape.color} rounded-3xl p-7 md:p-8`}>
                <div className="flex items-start gap-5 mb-6">
                  <span className={`font-display text-5xl leading-none ${etape.numColor}`}>{etape.num}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-3 mb-1">
                      <h2 className="font-display text-xl md:text-2xl text-foreground">{etape.titre}</h2>
                      <span className="text-xs font-medium bg-white text-foreground-muted px-3 py-1 rounded-full">{etape.duree}</span>
                    </div>
                    <p className="text-sm text-foreground-muted leading-relaxed">{etape.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-3">Livrables</p>
                    <ul className="space-y-2">
                      {etape.livrables.map((l, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-foreground">
                          <span className={`mt-0.5 flex-shrink-0 ${etape.numColor}`}>→</span>
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-3">Votre rôle</p>
                    <p className="text-xs text-foreground leading-relaxed">{etape.clientRole}</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* VALEURS */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-14 bg-surface">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-10">Comment nous travaillons avec vous</h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { titre: "Transparence sur le calendrier", desc: "Chaque étape a une durée indicative. Si un délai glisse, vous êtes prévenus immédiatement avec un nouveau calendrier." },
              { titre: "Votre temps est précieux", desc: "Nous limitons votre implication aux moments où votre expertise est vraiment nécessaire. Pas de réunions inutiles." },
              { titre: "Une décision à la fois", desc: "Nous faisons une recommandation claire. Vous approuvez ou orientez. Plus rapide et plus efficace pour tout le monde." },
            ].map((v, i) => (
              <RevealOnScroll key={v.titre} delay={i * 0.08}>
                <div className="bg-background rounded-2xl p-6 border border-border">
                  <h3 className="text-base font-semibold mb-2">{v.titre}</h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">{v.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <div className="bg-dark rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-green/5 pointer-events-none" />
              <h2 className="font-display text-3xl md:text-4xl text-white mb-4 relative">Prêt à commencer ?</h2>
              <p className="text-white/60 mb-8 text-sm max-w-md mx-auto relative">
                La première étape est simple : une conversation. Décrivez-nous votre projet.
              </p>
              <Button href="/contact" variant="primary" className="px-8 py-3.5 relative">
                Démarrer le cadrage →
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
