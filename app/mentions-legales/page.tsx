import type { Metadata } from "next";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site agencelepanaf.com",
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <Section className="pt-36">
      <div className="max-w-2xl prose prose-sm prose-neutral">
        <h1 className="font-display text-3xl tracking-tight mb-10">Mentions légales</h1>

        <h2 className="text-base font-semibold mt-8 mb-3">Éditeur du site</h2>
        <p className="text-sm text-gray-muted leading-relaxed">
          Agence Le Panaf<br />
          Casablanca, Maroc<br />
          Email : contact@agencelepanaf.com
        </p>

        <h2 className="text-base font-semibold mt-8 mb-3">Hébergement</h2>
        <p className="text-sm text-gray-muted leading-relaxed">
          Ce site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
        </p>

        <h2 className="text-base font-semibold mt-8 mb-3">Propriété intellectuelle</h2>
        <p className="text-sm text-gray-muted leading-relaxed">
          L&apos;ensemble des contenus présents sur ce site — textes, visuels, code, logo — sont la
          propriété exclusive de l&apos;Agence Le Panaf. Toute reproduction, totale ou partielle, sans
          autorisation préalable écrite est interdite.
        </p>

        <h2 className="text-base font-semibold mt-8 mb-3">Données personnelles</h2>
        <p className="text-sm text-gray-muted leading-relaxed">
          Les informations transmises via le formulaire de contact sont utilisées uniquement
          pour répondre à votre demande. Elles ne sont ni vendues ni transmises à des tiers.
          Pour toute demande relative à vos données, contactez-nous à contact@agencelepanaf.com.
        </p>

        <h2 className="text-base font-semibold mt-8 mb-3">Cookies</h2>
        <p className="text-sm text-gray-muted leading-relaxed">
          Ce site peut utiliser des outils d&apos;analyse d&apos;audience (Google Analytics) et de
          publicité (Meta Pixel). Ces outils déposent des cookies techniques. En naviguant
          sur ce site, vous acceptez leur utilisation. Vous pouvez vous y opposer via les
          paramètres de votre navigateur.
        </p>

        <h2 className="text-base font-semibold mt-8 mb-3">Responsabilité</h2>
        <p className="text-sm text-gray-muted leading-relaxed">
          L&apos;Agence Le Panaf s&apos;efforce de fournir des informations exactes et à jour. Toutefois,
          nous ne garantissons pas l&apos;exactitude, la complétude ou l&apos;actualité des informations
          publiées. L&apos;utilisation de ce site se fait sous la responsabilité de l&apos;utilisateur.
        </p>
      </div>
    </Section>
  );
}
