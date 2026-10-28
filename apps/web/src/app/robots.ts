import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/topic/", "/og/", "/about", "/privacy", "/llms.txt", "/feed.xml"],
        disallow: ["/search?*", "/*?spawned=*"],
      },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "Applebot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Google-Extended",
        ],
        allow: ["/", "/topic/", "/og/", "/about", "/privacy", "/llms.txt", "/feed.xml"],
        disallow: ["/search?*", "/*?spawned=*"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
