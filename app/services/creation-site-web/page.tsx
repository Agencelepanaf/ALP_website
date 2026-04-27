import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: "Création de site web — Livrable clé en main",
  description:
    "L'Agence Le Panaf conçoit et développe votre site web en Next.js : audit, design, développement, SEO, formation. Livraison en 4 à 8 semaines.",
};

const inclus = [
  { num: "01", titre: "Audit stratégique", desc: "Analyse marché, concurrents, cibles. La stratégie précède toujours le design." },
  { num: "02", titre: "Conception UX/UI", desc: "Maquettes haute fidélité. Chaque décision de design a une raison fonctionnelle." },
  { num: "03", titre: "Développement Next.js", desc: "Lighthouse 90+, code propre, chargement rapide." },
  { num: "04", titre: "SEO de base", desc: "Métadonnées, structure sémantique, sitemap — les fondations." },
  { num: "05", titre: "Formation", desc: "Vous êtes autonome pour les mises à jour courantes dès la livraison." },
  { num: "06", titre: "Suivi 30 jours", desc: "Un mois de support inclus après le lancement." },
];

const process = [
  { num: "I", titre: "Cadrage", duree: "1 sem.", detail: "Atelier découverte, analyse concurrentielle, définition des objectifs.", client: "2h en atelier + validation du brief" },
  { num: "II", titre: "Stratégie", duree: "1 sem.", detail: "Positionnement, ton de voix, moodboard.", client: "Validation du positionnement" },
  { num: "III", titre: "Contenu", duree: "1–2 sem.", detail: "Wireframes, plan de site, copywriting.", client: "Fourniture des informations, validation des textes" },
  { num: "IV", titre: "Design", duree: "1–2 sem.", detail: "Maquettes Figma desktop + mobile, itérations.", client: "Retours sur 1 à 2 rounds" },
  { num: "V", titre: "Développement", duree: "2–3 sem.", detail: "Intégration, tests, optimisations.", client: "Validation sur l'environnement de recette" },
  { num: "VI", titre: "Lancement", duree: "1 sem.", detail: "Mise en ligne, DNS, formation, suivi.", client: "Accès domaine + disponibilité formation" },
];

const faq = [
  { q: "Quel délai moyen ?", r: "Entre 4 et 8 semaines selon la taille. Un site vitrine de 5 pages : 4 semaines. Un projet complexe : 8 semaines ou plus." },
  { q: "Qui rédige les textes ?", r: "Nous pouvons tout rédiger. Si vous fournissez vos textes, nous les révisons et optimisons pour le web." },
  { q: "Que se passe-t-il après les 30 jours ?", r: "Vous êtes autonome. Si vous souhaitez un suivi, notre service de présence digitale prend le relais." },
  { q: "Le site sera rapide sur mobile ?", r: "Non-négociable. Nous ciblons Lighthouse 90+ sur mobile. Next.js offre des performances nativement supérieures." },
  { q: "Puis-je modifier le site moi-même ?", r: "Oui. La formation est incluse. Selon les besoins, nous configurons aussi un CMS simple." },
  { q: "Proposez-vous l'hébergement ?", r: "Nous déployons sur Vercel (offre gratuite pour la majorité des PME). Pour des besoins spécifiques, on configure la meilleure solution." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Création de site web",
  provider: { "@type": "Organization", name: "Le Panaf", url: "https://lepanaf.com" },
  description: "Sites web sur mesure en Next.js pour PME marocaines et africaines.",
  areaServed: ["MA", "DZ", "TN", "SN", "CI"],
  serviceType: "Web Development",
};

export default function CreationSiteWebPage() {
  return (
    <div className="pb-20 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="bg-background px-4 sm:px-6 lg:px-8 pt-[90px] pb-16 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-px bg-accent-green" />
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-foreground-muted">
                Projet ponctuel
              </p>
            </div>
            <h1 className="font-display font-light leading-[1.05] tracking-tight mb-8">
              <span className="block text-4xl md:text-6xl lg:text-7xl text-foreground">Votre site web,</span>
              <span className="block text-4xl md:text-6xl lg:text-7xl italic text-accent-green">conçu et livré clé en main</span>
            </h1>
            <p className="text-base text-foreground-muted leading-relaxed max-w-lg mb-8">
              Un livrable précis, un calendrier défini, un résultat mesurable.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="flex flex-wrap gap-3">
              {[
                { val: "4–8 sem.", label: "Délai" },
                { val: "Next.js", label: "Technologie" },
                { val: "Lighthouse 90+", label: "Performance" },
              ].map((s) => (
                <div key={s.val} className="rounded-2xl px-5 py-3 border border-border bg-surface">
                  <p className="text-sm font-semibold text-foreground">{s.val}</p>
                  <p className="text-xs text-foreground-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CE QUI EST INCLUS */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-10">Ce qui est inclus</h2>
          </RevealOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {inclus.map((item, i) => (
              <RevealOnScroll key={item.num} delay={i * 0.06}>
                <div className="bg-surface rounded-2xl p-5 border border-border h-full">
                  <p className="text-3xl font-bold text-border mb-3">{item.num}</p>
                  <h3 className="text-sm font-semibold mb-1">{item.titre}</h3>
                  <p className="text-xs text-foreground-muted leading-relaxed">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-surface">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">Le process en 6 étapes</h2>
            <p className="text-sm text-foreground-muted mb-10 max-w-lg">
              Un projet prévisible. Votre implication est limitée aux moments où votre expertise est indispensable.
            </p>
          </RevealOnScroll>
          <div className="space-y-3">
            {process.map((step, i) => (
              <RevealOnScroll key={step.num} delay={i * 0.05}>
                <div className="bg-background rounded-2xl p-5 border border-border grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[3rem_1fr_1fr_auto] gap-4 items-start">
                  <span className="font-display text-2xl text-border leading-none pt-0.5">{step.num}</span>
                  <div>
                    <p className="font-semibold text-sm">{step.titre}</p>
                    <p className="text-xs text-foreground-muted mt-1 leading-relaxed hidden md:block">{step.detail}</p>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-xs text-foreground-muted leading-relaxed">{step.client}</p>
                  </div>
                  <span className="text-xs font-medium bg-accent/10 text-accent px-3 py-1 rounded-full self-start whitespace-nowrap">
                    {step.duree}
                  </span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-10">Questions fréquentes</h2>
          </RevealOnScroll>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <RevealOnScroll key={i} delay={i * 0.05}>
                <div className="bg-surface rounded-2xl p-6 border border-border">
                  <h3 className="text-sm font-semibold mb-2">{item.q}</h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">{item.r}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <div className="bg-dark rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
              <h2 className="font-display text-3xl md:text-4xl text-white mb-4">Prêt à démarrer votre projet ?</h2>
              <p className="text-white/60 mb-8 text-sm max-w-md mx-auto">
                Décrivez-nous votre projet. Nous revenons sous 24h avec une première évaluation honnête.
              </p>
              <Button href="/contact" variant="primary" className="px-8 py-3.5">
                Décrire mon projet →
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
