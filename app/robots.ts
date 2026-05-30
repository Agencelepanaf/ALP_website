import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/mentions-legales", "/politique-confidentialite"],
    },
    sitemap: "https://agencelepanaf.com/sitemap.xml",
  };
}
