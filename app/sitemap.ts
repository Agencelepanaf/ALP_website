import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

const BASE_URL = "https://agencelepanaf.com";

// Régénère le sitemap toutes les heures pour que les nouveaux articles
// créés via l'admin apparaissent sans redéploiement.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/services/presence-digitale`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/creation-site-web`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/realisations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/notre-methode`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  // Articles publiés récupérés dynamiquement depuis Supabase.
  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const { data: articles } = await supabase
      .from("articles")
      .select("slug, updated_at, published_at")
      .eq("statut", "publie");

    if (articles) {
      articleRoutes = articles
        .filter((a) => a.slug)
        .map((a) => ({
          url: `${BASE_URL}/blog/${a.slug}`,
          lastModified: new Date(a.updated_at || a.published_at || Date.now()),
          changeFrequency: "monthly",
          priority: 0.7,
        }));
    }
  } catch {
    // En cas d'indisponibilité de Supabase, on renvoie au moins les pages statiques.
  }

  return [...staticRoutes, ...articleRoutes];
}
