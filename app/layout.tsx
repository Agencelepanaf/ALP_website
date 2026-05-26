import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import "./globals.css";
import "@fontsource/bangers";
import "@fontsource/luckiest-guy";

// Inter auto-hébergé via next/font — aucune requête vers fonts.googleapis.com au runtime
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const isAdmin = headersList.get('x-is-admin') === '1';

  return (
    <html lang="fr" className={inter.variable}>
      <head>
        {!isAdmin && (
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
                  email: "contact@agencelepanaf.com",
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
        )}
      </head>
      <body className="font-sans antialiased bg-background text-foreground" suppressHydrationWarning>
        {isAdmin ? (
          // Pages admin : pas de header/footer public
          <>{children}</>
        ) : (
          // Pages publiques : structure normale
          <>
            <Header />
            <main>{children}</main>
            <Footer />
            <CookieBanner />
          </>
        )}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
