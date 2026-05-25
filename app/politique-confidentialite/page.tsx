import type { Metadata } from "next";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité du site lepanaf.com",
  robots: { index: false, follow: false },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <Section className="pt-36">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl tracking-tight mb-10">
          Politique de confidentialité
        </h1>

        <h2 className="text-base font-semibold mt-8 mb-3">Données collectées</h2>
        <p className="text-sm text-gray-muted leading-relaxed mb-4">
          Nous collectons uniquement les données que vous nous transmettez volontairement via le
          formulaire de contact : nom, email, nom d&apos;entreprise, description du projet.
        </p>
        <p className="text-sm text-gray-muted leading-relaxed">
          Des données de navigation peuvent être collectées via Google Analytics et Meta Pixel
          si ces outils sont activés : pages visitées, durée de visite, type d&apos;appareil, pays
          d&apos;origine. Ces données sont agrégées et anonymisées.
        </p>

        <h2 className="text-base font-semibold mt-8 mb-3">Finalité du traitement</h2>
        <ul className="text-sm text-gray-muted leading-relaxed space-y-2 list-disc list-inside">
          <li>Répondre à vos demandes de contact</li>
          <li>Améliorer l&apos;expérience du site via les statistiques d&apos;audience</li>
          <li>Mesurer l&apos;efficacité de nos communications (si Meta Pixel activé)</li>
        </ul>

        <h2 className="text-base font-semibold mt-8 mb-3">Conservation des données</h2>
        <p className="text-sm text-gray-muted leading-relaxed">
          Les données de contact sont conservées pendant la durée nécessaire au traitement de
          votre demande, puis supprimées sauf si une relation commerciale se noue. Les données
          analytiques sont conservées selon les politiques des outils tiers (Google, Meta).
        </p>

        <h2 className="text-base font-semibold mt-8 mb-3">Vos droits</h2>
        <p className="text-sm text-gray-muted leading-relaxed">
          Vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données
          personnelles. Pour exercer ces droits, contactez-nous à contact@agencelepanaf.com. Nous
          répondons sous 72h ouvrées.
        </p>

        <h2 className="text-base font-semibold mt-8 mb-3">Outils tiers</h2>
        <p className="text-sm text-gray-muted leading-relaxed mb-3">
          Ce site peut utiliser les services suivants, chacun disposant de sa propre politique
          de confidentialité :
        </p>
        <ul className="text-sm text-gray-muted leading-relaxed space-y-2 list-disc list-inside">
          <li>Google Analytics (Google LLC) — analyse d&apos;audience</li>
          <li>Meta Pixel (Meta Platforms) — mesure de campagnes publicitaires</li>
          <li>Vercel (Vercel Inc.) — hébergement du site</li>
        </ul>

        <h2 className="text-base font-semibold mt-8 mb-3">Contact</h2>
        <p className="text-sm text-gray-muted leading-relaxed">
          Pour toute question relative à cette politique :{" "}
          <a
            href="mailto:contact@agencelepanaf.com"
            className="text-foreground hover:text-accent-terra transition-colors duration-200"
          >
            contact@agencelepanaf.com
          </a>
        </p>

        <p className="text-xs text-gray-muted mt-12">
          Dernière mise à jour : avril 2026
        </p>
      </div>
    </Section>
  );
}
