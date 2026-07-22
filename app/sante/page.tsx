import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { WHATSAPP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Agence web santé à Casablanca : pharmacies et matériel médical",
  description:
    "Le Panaf rend les pharmacies et les fournisseurs de matériel médical visibles en ligne à Casablanca : site web, fiche Google, avis, référencement local. Audit de visibilité offert.",
  alternates: {
    canonical: "https://agencelepanaf.com/sante",
  },
  openGraph: {
    title: "Agence web santé à Casablanca : pharmacies et matériel médical",
    description:
      "Site web, fiche Google, avis et référencement local pour les pharmacies et les fournisseurs de matériel médical. Audit de visibilité offert.",
    url: "https://agencelepanaf.com/sante",
  },
};

// Message WhatsApp pré-rempli spécifique à la page santé.
const WHATSAPP_SANTE = WHATSAPP_URL;

const heroIntro =
  "Vos patients et vos acheteurs cherchent sur Google et Maps avant même d'appeler. Le Panaf transforme la présence en ligne des pharmacies et des fournisseurs de matériel médical en clients réels : des sites et des fiches Google pensés pour votre métier, vos horaires de garde, la réglementation et votre catalogue.";

const constat = [
  "Quand quelqu'un tape « pharmacie de garde » près de chez vous, ou « fournisseur de matériel médical à Casablanca », Google répond en quelques secondes. Si vous n'êtes pas dans cette réponse, c'est un concurrent qui l'est.",
  "La plupart des pharmacies et des distributeurs ont une fiche Google incomplète, un site vieillissant, ou pas de site du tout. Le problème n'est presque jamais la qualité du service. C'est que personne ne vous trouve au moment précis où l'on vous cherche.",
];

const segments = [
  {
    titre: "Pharmacies et parapharmacies",
    desc: "Visibilité locale (fiche Google, pharmacie de garde, votre quartier), avis clients et parapharmacie en click and collect conforme à la loi 17-04. Pas de vente de médicaments en ligne, mais tout ce qui vous rend trouvable et fiable.",
  },
  {
    titre: "Fournisseurs de matériel médical",
    desc: "Un site catalogue clair, la génération de demandes de devis et le référencement de vos dispositifs. Pour que les acheteurs professionnels vous trouvent et vous contactent, au lieu d'aller chez le concurrent mieux référencé.",
  },
  {
    titre: "Cliniques, cabinets et dentistes",
    desc: "Sur recommandation de nos clients santé, nous accompagnons aussi les cabinets qui veulent une présence sérieuse et une prise de rendez-vous simple. C'est un accompagnement secondaire : notre cœur de spécialité reste la pharmacie et le matériel médical.",
  },
];

const offre = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-accent">
        <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    titre: "Fiche Google optimisée",
    desc: "Catégorie juste, services, horaires de garde à jour, quartier mis en avant. La base de votre visibilité locale.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-accent">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
    titre: "Site web pensé métier",
    desc: "Rapide, mobile d'abord, clair. Conçu pour rassurer et faire passer à l'action, pas seulement pour exister.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-accent">
        <path d="M12 2l2.9 6.3 6.8.8-5 4.6 1.3 6.8L12 17.8 5.7 21.4 7 14.5l-5-4.6 6.8-.8L12 2z" />
      </svg>
    ),
    titre: "Avis et réputation",
    desc: "Un système simple pour recueillir des avis au comptoir ou après livraison, et y répondre proprement. Sans filtrage interdit par Google.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-accent">
        <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" />
      </svg>
    ),
    titre: "Informations cohérentes partout",
    desc: "Nom, adresse et téléphone identiques sur Google, votre site et les annuaires. Exactement ce que Google récompense.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-accent">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
    titre: "Requêtes locales ciblées",
    desc: "On identifie ce que tapent vraiment vos clients, par quartier et par besoin, et on construit vos pages autour de ces mots.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-accent">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    titre: "Mesure claire",
    desc: "Un suivi lisible : appels, itinéraires, demandes de devis. Des décisions à prendre, pas des tableaux illisibles.",
  },
];

const raisons = [
  {
    titre: "On parle votre langage métier",
    desc: "Garde, réglementation 17-04, catalogue B2B, preuves locales. Pas de recettes génériques recyclées d'un autre secteur.",
  },
  {
    titre: "On est honnête sur les délais",
    desc: "Une fiche Google progresse en quelques semaines, un bon référencement se construit sur plusieurs mois. On le dit dès le départ.",
  },
  {
    titre: "Un interlocuteur humain",
    desc: "Joignable sur WhatsApp, pas un ticket dans une file. Chaque demande est lue personnellement.",
  },
];

const faq = [
  {
    q: "Puis-je vendre des médicaments en ligne ?",
    r: "Non, la loi 17-04 l'encadre strictement. En revanche, la parapharmacie en click and collect, la visibilité de votre pharmacie et votre réputation en ligne sont parfaitement permises, et c'est là que se trouve la vraie valeur.",
  },
  {
    q: "Je n'ai qu'une fiche Google, pas de site. Par où commencer ?",
    r: "Souvent par la fiche, justement. C'est le levier le plus rapide et le moins cher pour être trouvé. Le site vient ensuite, quand il apporte un vrai plus.",
  },
  {
    q: "En combien de temps serai-je visible ?",
    r: "Une fiche Google bien optimisée progresse en quelques semaines. Le référencement d'un site se construit sur trois à six mois. On préfère vous le dire clairement plutôt que promettre l'impossible.",
  },
  {
    q: "Travaillez-vous en dehors de Casablanca ?",
    r: "Oui. Casablanca est notre point de départ, mais nous accompagnons des clients partout au Maroc et en Afrique francophone.",
  },
  {
    q: "Faut-il un gros budget ?",
    r: "Non. On commence souvent par la visibilité locale, accessible, puis on investit là où ça rapporte vraiment. On s'adapte à votre réalité.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Création de site web et visibilité locale pour la santé",
  serviceType: "Web design et référencement local pour pharmacies et matériel médical",
  provider: {
    "@type": "Organization",
    name: "Agence Le Panaf",
    url: "https://agencelepanaf.com",
  },
  areaServed: ["Casablanca", "MA", "SN", "CI"],
  description:
    "Sites web, fiches Google, avis et référencement local pour les pharmacies, parapharmacies et fournisseurs de matériel médical à Casablanca et au Maroc.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.r },
  })),
};

function WhatsAppButton({ label }: { label: string }) {
  return (
    <a
      href={WHATSAPP_SANTE}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-full bg-[#25D366] text-white hover:opacity-90 active:scale-95 transition-all duration-200"
    >
      <WhatsAppIcon size={18} />
      {label}
    </a>
  );
}

export default function SantePage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section className="bg-background px-4 sm:px-6 lg:px-8 pt-20 md:pt-[90px] pb-10 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-px bg-accent" />
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-foreground-muted">
                Spécialité santé
              </p>
            </div>
            <h1 className="font-display font-light leading-[1.05] tracking-tight mb-8">
              <span className="block text-4xl md:text-6xl lg:text-7xl text-foreground">
                Pharmacies et matériel médical :
              </span>
              <span className="block text-4xl md:text-6xl lg:text-7xl italic text-accent">
                soyez trouvés avant vos concurrents
              </span>
            </h1>
            <p className="text-base text-foreground-muted leading-relaxed max-w-2xl">
              {heroIntro}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/contact" variant="primary" className="px-7 py-3.5">
                Recevoir mon audit de visibilité offert →
              </Button>
              <WhatsAppButton label="Écrire sur WhatsApp" />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* LE CONSTAT */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <RevealOnScroll>
              <h2 className="font-display text-3xl md:text-4xl text-foreground">
                Le problème n&apos;est pas votre officine, c&apos;est votre visibilité
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <div className="space-y-4 text-sm text-foreground-muted leading-relaxed">
                {constat.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
                <p className="font-medium text-foreground">
                  Votre rôle est de bien soigner et bien servir. Le nôtre est de faire en sorte qu&apos;on vous trouve.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* SEGMENTS */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-14 bg-surface">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <p className="text-xs font-semibold tracking-widest uppercase text-foreground-muted mb-2">
              À qui nous nous adressons
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-10">
              Une spécialité claire, deux métiers au cœur
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {segments.map((s, i) => (
              <RevealOnScroll key={s.titre} delay={i * 0.08}>
                <div className="bg-background rounded-2xl p-6 border border-border h-full">
                  <h3 className="text-lg font-semibold text-foreground mb-3">{s.titre}</h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">{s.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CE QUE NOUS METTONS EN PLACE */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <p className="text-xs font-semibold tracking-widest uppercase text-foreground-muted mb-2">
              Ce que nous mettons en place
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-10">
              La visibilité locale, pièce par pièce
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {offre.map((item, i) => (
              <RevealOnScroll key={item.titre} delay={i * 0.06}>
                <div className="bg-surface rounded-2xl p-5 border border-border h-full">
                  <span className="mb-3 block">{item.icon}</span>
                  <h3 className="text-sm font-semibold mb-1 text-foreground">{item.titre}</h3>
                  <p className="text-xs text-foreground-muted leading-relaxed">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI LE PANAF */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-14 bg-surface">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-10">
              Spécialiste affiché, partenaire de proximité
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {raisons.map((r, i) => (
              <RevealOnScroll key={r.titre} delay={i * 0.08}>
                <div className="bg-background rounded-2xl p-6 border border-border border-l-4 border-l-accent shadow-sm h-full">
                  <h3 className="text-base font-semibold mb-2 text-foreground">{r.titre}</h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">{r.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* PREUVE — honnête */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="max-w-3xl mx-auto text-center">
          <RevealOnScroll>
            <p className="text-xs font-semibold tracking-widest uppercase text-foreground-muted mb-2">
              Notre premier cas santé
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-5">
              Une pharmacie du Quartier des Hôpitaux, à Casablanca
            </h2>
            <p className="text-sm text-foreground-muted leading-relaxed mb-8">
              Nous accompagnons actuellement cette pharmacie sur sa fiche Google et son site. L&apos;étude de
              cas chiffrée, positions, avis, appels et itinéraires avant et après, sera publiée dès sa mise en
              ligne complète. Nous préférons montrer des résultats réels plutôt que des promesses.
            </p>
            <Button href="/realisations" variant="secondary" className="px-6 py-3">
              Voir nos réalisations →
            </Button>
          </RevealOnScroll>
        </div>
      </section>

      {/* OFFRE D'ENTRÉE */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-14 bg-surface">
        <div className="max-w-3xl mx-auto text-center">
          <RevealOnScroll>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Commencez par un audit de visibilité offert
            </h2>
            <p className="text-sm text-foreground-muted leading-relaxed mb-8">
              En quinze minutes, nous regardons ensemble votre fiche Google, votre visibilité sur les recherches
              locales et ce que font vos concurrents. Vous repartez avec un plan d&apos;action clair, que vous
              travailliez avec nous ensuite ou non.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button href="/contact" variant="primary" className="px-7 py-3.5">
                Demander mon audit offert →
              </Button>
              <WhatsAppButton label="Écrire sur WhatsApp" />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="max-w-3xl mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-10">Questions fréquentes</h2>
          </RevealOnScroll>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <RevealOnScroll key={item.q} delay={i * 0.05}>
                <div className="bg-surface rounded-2xl p-6 border border-border">
                  <h3 className="text-sm font-semibold mb-2 text-foreground">{item.q}</h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">{item.r}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <div className="bg-dark rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-accent-green/5 pointer-events-none" />
              <h2 className="font-display text-3xl md:text-4xl text-white mb-4 relative">
                Discutons de votre visibilité
              </h2>
              <p className="text-white/60 mb-8 text-sm max-w-md mx-auto relative">
                Un premier échange sans engagement. Nous regardons votre situation et vous disons honnêtement ce
                qui vaut le coup.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 relative">
                <Button href="/contact" variant="primary" className="px-8 py-3.5">
                  Prendre contact →
                </Button>
                <WhatsAppButton label="WhatsApp direct" />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
