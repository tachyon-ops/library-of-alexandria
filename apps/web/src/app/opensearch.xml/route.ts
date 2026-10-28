import { buildOpenSearchXml } from "@lib/core";
import { getSiteUrl } from "@/lib/seo";

export function GET(): Response {
  const siteUrl = getSiteUrl();
  const xml = buildOpenSearchXml({ siteUrl });

  return new Response(xml, {
    headers: {
      "Content-Type": "application/opensearchdescription+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
