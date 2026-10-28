import type { MetadataRoute } from "next";
import { buildCanonicalUrl } from "@lib/core";
import { getSiteUrl, loadCatalogueNodesForSeo } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const nodes = await loadCatalogueNodesForSeo();
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: buildCanonicalUrl(siteUrl, "/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: buildCanonicalUrl(siteUrl, "/search"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: buildCanonicalUrl(siteUrl, "/privacy"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  const seenUrls = new Set<string>(entries.map((e) => e.url));

  for (const node of nodes) {
    const url = buildCanonicalUrl(siteUrl, `/topic/${node.nestedPath}`);
    if (seenUrls.has(url)) continue;
    seenUrls.add(url);

    const priority = node.hasDossier
      ? Math.max(0.75, Number((0.95 - Math.min(node.depth, 4) * 0.04).toFixed(2)))
      : Math.max(0.55, Number((0.8 - Math.min(node.depth, 4) * 0.05).toFixed(2)));

    entries.push({
      url,
      lastModified: now,
      changeFrequency: node.hasDossier ? "weekly" : "monthly",
      priority,
    });
  }

  return entries;
}
