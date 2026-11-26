import type { MetadataRoute } from "next";
import { posts } from "@/content/blog";
import { site } from "@/content/site";

export const dynamic = "force-static";

/** Mapa do site para os buscadores: home, blog e uma entrada por materia. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1, changeFrequency: "monthly" },
    { url: `${site.url}/blog`, priority: 0.7, changeFrequency: "weekly" },
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      priority: 0.6,
      changeFrequency: "yearly" as const,
      lastModified: p.data,
    })),
  ];
}
