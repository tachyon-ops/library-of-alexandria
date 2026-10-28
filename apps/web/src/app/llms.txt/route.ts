import { buildLlmsTxt } from "@lib/core";
import { getSiteUrl, loadCatalogueNodesForSeo } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const siteUrl = getSiteUrl();
  const nodes = await loadCatalogueNodesForSeo();
  const content = buildLlmsTxt({
    siteUrl,
    nodes: nodes.map((n) => ({
      slug: n.slug,
      nestedPath: n.nestedPath,
      title: n.title,
      brief: n.brief,
      depth: n.depth,
      status: n.status,
    })),
  });

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
