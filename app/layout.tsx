import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBannerWrapper from "@/components/CookieBannerWrapper";
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
  metadataBase: new URL("https://agencelepanaf.com"),
  title: {
    default: "Agencelepanaf : Agence Web Digitale à Casablanca",
    template: "%s | Agence Le Panaf",
  },
  description:
    "Le Panaf est une agence digitale au Maroc qui conçoit des sites web performants pour des entreprises francophones en Afrique et en Europe.",
  keywords: ["agence digitale Casablanca", "création site web Maroc", "présence digitale PME Afrique"],
  authors: [{ name: "Agence Le Panaf", url: "https://agencelepanaf.com" }],
  creator: "Agence Le Panaf",
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: "https://agencelepanaf.com",
    siteName: "Agence Le Panaf",
    title: "Agence Le panaf : Agence Web Digitale à Casablanca",
    description:
      "Le Panaf est une agence digitale au Maroc qui conçoit des sites web performants pour des entreprises francophones en Afrique et en Europe.",
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
    title: "Agence Le Panaf : Agence Web Digitale à Casablanca",
    description:
      "Le Panaf est une agence digitale au Maroc qui conçoit des sites web performants pour des entreprises francophones en Afrique et en Europe.",
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
                "@type": "LocalBusiness",
                name: "Le Panaf",
                url: "https://agencelepanaf.com",
                logo: "https://agencelepanaf.com/logo.svg",
                image: "https://agencelepanaf.com/og-image.png",
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
                  "Le Panaf est une agence digitale au Maroc qui conçoit des sites web performants pour des entreprises francophones en Afrique et en Europe.",
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
            <CookieBannerWrapper />
          </>
        )}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
