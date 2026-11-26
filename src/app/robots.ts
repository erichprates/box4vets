import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

/** robots.txt: tudo liberado e o endereco do mapa do site. */
export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_NOINDEX) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
