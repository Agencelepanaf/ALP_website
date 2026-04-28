import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import "./globals.css";
import "@fontsource/bangers";

export const metadata: Metadata = {
  metadataBase: new URL("https://lepanaf.com"),
  title: {
    default: "Le Panaf — Agence de présence digitale à Casablanca",
    template: "%s | Le Panaf",
  },
  description:
    "Le Panaf accompagne les PME au Maroc et en Afrique francophone dans la construction d'une présence en ligne qui attire, convainc et convertit.",
  keywords: ["agence digitale Casablanca", "création site web Maroc", "présence digitale PME Afrique"],
  authors: [{ name: "Le Panaf", url: "https://lepanaf.com" }],
  creator: "Le Panaf",
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: "https://lepanaf.com",
    siteName: "Le Panaf",
    title: "Le Panaf — Agence de présence digitale à Casablanca",
    description:
      "Présence digitale pour les PME et les STARTUPS ambitieuses. Site web, stratégie, contenu, suivi.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Le Panaf — Agence de présence digitale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Panaf — Agence de présence digitale à Casablanca",
    description:
      "Présence digitale pour les PME et les STARTUPS ambitieuses. Basé à Casablanca.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Le Panaf",
              url: "https://lepanaf.com",
              logo: "https://lepanaf.com/logo.svg",
              contactPoint: {
                "@type": "ContactPoint",
                email: "edhem@agencelepanaf.com",
                contactType: "customer service",
                availableLanguage: ["French", "Arabic"],
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Casablanca",
                addressCountry: "MA",
              },
              areaServed: ["MA", "DZ", "TN", "SN", "CI"],
              description:
                "Agence de présence digitale pour les PME et les STARTUPS ambitieuses.",
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
        <AnalyticsProvider />
      </body>
    </html>
  );
}
