import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: "Présence digitale — Accompagnement continu pour PME",
  description:
    "L'Agence Le Panaf pilote votre présence en ligne dans la durée : site web, SEO, contenu, analytics. Un partenariat stratégique, pas un livrable ponctuel.",
};

const inclus = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-accent">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    titre: "Site web",
    desc: "Optimisé conversion et SEO, maintenu et mis à jour.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-accent">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    titre: "Contenu",
    desc: "Articles, pages, publications — produits régulièrement.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-accent">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
    titre: "Référencement",
    desc: "SEO local et national. Google, Bing, cartes.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-accent">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    titre: "Analytics",
    desc: "Suivi mensuel avec rapport clair, sans jargon.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-accent">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
    titre: "Optimisations",
    desc: "Ajustements continus basés sur les données réelles.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-accent">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    titre: "Conseil",
    desc: "Disponible au fil de l'eau, par WhatsApp.",
  },
];

const engagements = [
  {
    titre: "Reporting mensuel lisible",
    desc: "Trafic, positions, conversions. Avec des décisions à prendre, pas des tableaux incompréhensibles.",
  },
  {
    titre: "Disponibilité WhatsApp",
    desc: "Pas de ticket, pas d'attente.",
  },
  {
    titre: "Engagement semestriel",
    desc: "Renouvelable chaque semestre. On croit aux relations longues, pas aux contrats forcés.",
  },
];

const faq = [
  {
    q: "Quelle différence avec la création de site ?",
    r: "La création est un livrable ponctuel. La présence digitale est un suivi mensuel : contenu, SEO, analytics, optimisations. Les deux peuvent se combiner.",
  },
  {
    q: "Combien de temps avant de voir des résultats ?",
    r: "Les premières améliorations SEO sont visibles en 3 à 4 mois. Les résultats solides se construisent sur minimum 6 mois. Nous sommes transparents là-dessus dès le départ.",
  },
  {
    q: "Pouvez-vous travailler avec notre site existant ?",
    r: "Oui. Nous analysons ce que vous avez et adaptons le plan d'action. Il n'est pas toujours nécessaire de tout refaire.",
  },
  {
    q: "Comment se déroule le démarrage ?",
    r: "Une séance de cadrage pour comprendre votre activité et vos priorités. Sur cette base, une feuille de route pour les trois premiers mois.",
  },
  {
    q: "Le contenu est-il inclus ?",
    r: "Cela dépend de la formule. Le contenu peut être intégré ou facturé séparément selon le volume souhaité.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Présence digitale",
  provider: { "@type": "Organization", name: "L'Agence Le Panaf", url: "https://agencelepanaf.com" },
  description: "Accompagnement continu SEO, contenu, stratégie digitale pour PME marocaines et africaines.",
  areaServed: ["MA", "DZ", "TN", "SN", "CI"],
  serviceType: "Digital Marketing",
};

export default function PresenceDigitalePage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="bg-background px-4 sm:px-6 lg:px-8 pt-20 md:pt-[90px] pb-10 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-px bg-accent" />
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-foreground-muted">
                Présence digitale
              </p>
            </div>
            <h1 className="font-display font-light leading-[1.05] tracking-tight mb-8">
              <span className="block text-4xl md:text-6xl lg:text-7xl text-foreground">Votre présence digitale,</span>
              <span className="block text-4xl md:text-6xl lg:text-7xl italic text-accent">pilotée dans la durée</span>
            </h1>
            <p className="text-base text-foreground-muted leading-relaxed">
              Un site web est un point de départ. Ce qui fait la différence, c&apos;est ce qu&apos;on en fait sur douze mois.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* CE QUI EST INCLUS */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <p className="text-xs font-semibold tracking-widest uppercase text-foreground-muted mb-2">Ce qui est inclus</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-10">
              Tout ce qu&apos;il faut pour exister en ligne
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {inclus.map((item, i) => (
              <RevealOnScroll key={item.titre} delay={i * 0.06}>
                <div className="bg-surface rounded-2xl p-5 border border-border">
                  <span className="mb-3 block">{item.icon}</span>
                  <h3 className="text-sm font-semibold mb-1">{item.titre}</h3>
                  <p className="text-xs text-foreground-muted leading-relaxed">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI CONTINU */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-14 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <RevealOnScroll>
              <h2 className="font-display text-3xl md:text-4xl text-foreground">
                Pourquoi un suivi continu plutôt qu&apos;un site one-shot
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <div className="space-y-4 text-sm text-foreground-muted leading-relaxed">
                <p>Un site web livré et laissé sans entretien sera, un an plus tard, moins performant qu&apos;au premier jour. Google change. Les concurrents avancent. Les attentes évoluent.</p>
                <p>Un site sans mise à jour, c&apos;est un commercial qui arrête de parler à ses prospects. Les positions s&apos;érodent. Le trafic baisse. Le contenu vieillit.</p>
                <p className="font-medium text-foreground">L&apos;accompagnement continu est l&apos;antidote à cette obsolescence. Nous surveillons, ajustons, produisons — pour que votre site reste un actif, pas une plaquette oubliée.</p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ENGAGEMENTS */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-10">Nos engagements</h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {engagements.map((e, i) => (
              <RevealOnScroll key={e.titre} delay={i * 0.08}>
                <div className="bg-surface rounded-2xl p-6 border border-border border-l-4 border-l-accent shadow-sm">
                  <h3 className="text-base font-semibold mb-2">{e.titre}</h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">{e.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-14 bg-surface">
        <div className="max-w-3xl mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-10">Questions fréquentes</h2>
          </RevealOnScroll>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <RevealOnScroll key={item.q} delay={i * 0.05}>
                <div className="bg-background rounded-2xl p-6 border border-border">
                  <h3 className="text-sm font-semibold mb-2">{item.q}</h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">{item.r}</p>
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
              <div className="absolute inset-0 bg-accent-green/5 pointer-events-none" />
              <h2 className="font-display text-3xl md:text-4xl text-white mb-4 relative">Parlons de votre situation</h2>
              <p className="text-white/60 mb-8 text-sm max-w-md mx-auto relative">
                Un premier échange sans engagement pour évaluer si nous sommes le bon partenaire.
              </p>
              <Button href="/contact" variant="primary" className="px-8 py-3.5 relative">
                Prendre contact →
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
