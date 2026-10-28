import { buildRssFeedXml } from "@lib/core";
import { getSiteUrl, loadCatalogueNodesForSeo } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const siteUrl = getSiteUrl();
  const nodes = await loadCatalogueNodesForSeo();

  const prioritised = [...nodes]
    .sort((a, b) => Number(b.hasDossier) - Number(a.hasDossier) || b.claimCount - a.claimCount || a.depth - b.depth)
    .slice(0, 80);

  const xml = buildRssFeedXml({
    siteUrl,
    buildDate: new Date(),
    items: prioritised.map((n) => ({
      title: n.title,
      nestedPath: n.nestedPath,
      description:
        n.brief ??
        `Scientific synthesis, primary literature, and graded evidence for ${n.title} in Library of Alexandria.`,
      category: n.rootTitle,
    })),
  });

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
