import type { NextConfig } from "next";

// Récupérer le hostname Supabase depuis les variables d'env pour restreindre remotePatterns
const supabaseHostname = process.env.SUPABASE_URL
  ? new URL(process.env.SUPABASE_URL).hostname
  : "*.supabase.co"; // Fallback seulement si SUPABASE_URL n'est pas défini

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        // Restreint au hostname exact du projet (ex: maakjobylzqkymuuibvt.supabase.co)
        // au lieu du wildcard *.supabase.co qui autoriserait n'importe quel sous-domaine
        hostname: supabaseHostname,
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
  async headers() {
    return [
      {
        // Appliquer les headers de sécurité sur toutes les routes
        source: "/(.*)",
        headers: [
          // Empêche le navigateur d'inférer le Content-Type (MIME sniffing)
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Protège contre le clickjacking (iframes)
          { key: "X-Frame-Options", value: "DENY" },
          // Limite les informations envoyées dans le Referer header
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Désactive les fonctionnalités navigateur inutiles
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          // Force HTTPS (1 an) — à activer seulement en production via proxy.ts
          // HSTS est géré dans proxy.ts pour avoir le contrôle par environnement
        ],
      },
    ];
  },
};

export default nextConfig;
