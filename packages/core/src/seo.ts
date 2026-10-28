import { TIER_LABELS, type Tier } from "./evidence";
import type { FieldResearchMonograph } from "./article";
import type { SynthesisLever, TopicStatus } from "./types";

export const DEFAULT_SITE_URL = "https://alexanderslibrary.org";
export const SITE_NAME = "Alexander's Library";
export const SITE_TAGLINE = "The Tree of Knowledge & Graded Scientific Record";
export const SITE_DESCRIPTION =
  "An open encyclopaedic Tree of Knowledge synthesised from peer-reviewed literature, clinical trial registries, and empirical studies, with every claim graded T1–T6 by study design.";

export const CORE_SEO_KEYWORDS: string[] = [
  "Alexander's Library",
  "Tree of Knowledge",
  "scientific synthesis",
  "evidence grading",
  "systematic review",
  "meta-analysis",
  "randomised controlled trial",
  "reproductive medicine",
  "human fertility",
  "embryo grading",
  "physics and cosmology",
  "quantum mechanics",
  "modified gravity",
  "mathematics and stochastic calculus",
  "quantitative finance",
  "Europe PMC",
  "OpenAlex",
  "ClinicalTrials.gov",
];

/**
 * Normalises a configured site URL or domain into a canonical origin without a trailing slash.
 * Supports bare domains (e.g. `newdomain.org` -> `https://newdomain.org`), localhost (`http://localhost:3000`),
 * and full URLs (`https://newdomain.org/path` -> `https://newdomain.org`).
 */
export function normaliseSiteUrl(rawUrl?: string | null, fallback: string = DEFAULT_SITE_URL): string {
  const trimmed = (rawUrl ?? "").trim();
  if (!trimmed) return normaliseOriginOrFallback(fallback);

  const withoutQuotes = trimmed.replace(/^['"]+|['"]+$/g, "").trim();
  if (!withoutQuotes) return normaliseOriginOrFallback(fallback);

  const hasProtocol = /^https?:\/\//i.test(withoutQuotes);
  const isLocal =
    /^(?:https?:\/\/)?(?:localhost|127\.0\.0\.1|0\.0\.0\.0)(?::\d+)?(?:\/|$)/i.test(withoutQuotes);
  const candidate = hasProtocol
    ? withoutQuotes
    : `${isLocal ? "http" : "https"}://${withoutQuotes.replace(/^\/+/, "")}`;

  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return normaliseOriginOrFallback(fallback);
    }
    return parsed.origin.replace(/\/+$/, "");
  } catch {
    return normaliseOriginOrFallback(fallback);
  }
}

function normaliseOriginOrFallback(fallback: string): string {
  try {
    const parsed = new URL(fallback);
    return parsed.origin.replace(/\/+$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

/**
 * Builds an absolute canonical URL from a site origin and a relative path,
 * stripping query strings, hash fragments, duplicate slashes, and trailing slashes.
 */
export function buildCanonicalUrl(siteUrl: string, path?: string | null): string {
  const base = normaliseSiteUrl(siteUrl);
  const rawPath = (path ?? "").trim().split(/[?#]/)[0] ?? "";
  const cleanSegments = rawPath
    .split("/")
    .map((s) => s.trim())
    .filter(Boolean);
  if (cleanSegments.length === 0) return base;
  return `${base}/${cleanSegments.join("/")}`;
}

/**
 * Safely serializes a JSON-LD payload for embedding inside `<script type="application/ld+json">`,
 * escaping `<`, `>`, `&`, and line separators to prevent script-tag injection.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/**
 * Normalises whitespace and truncates text cleanly on a word boundary for meta descriptions.
 */
export function truncateSeoText(text: string, maxLength: number = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;
  const sliced = clean.slice(0, Math.max(1, maxLength - 1));
  const lastSpace = sliced.lastIndexOf(" ");
  const boundary = lastSpace >= Math.floor(maxLength * 0.6) ? sliced.slice(0, lastSpace) : sliced;
  return `${boundary.replace(/[,.;:–—-]+$/g, "").trim()}…`;
}

export interface TopicSeoSourceItem {
  title: string;
  doi?: string | null;
  year?: number | null;
  authors?: string[];
  url?: string | null;
  venue?: string | null;
}

export interface TopicSeoInput {
  siteUrl: string;
  canonicalPath: string;
  title: string;
  brief: string;
  summary?: string | null;
  status: TopicStatus;
  lastResearchedAt?: Date | string | null;
  ancestors: { title: string; slug: string }[];
  children?: { title: string; slug: string; brief?: string | null }[];
  sourcesCount: number;
  claimsCount: number;
  bestTier?: Tier | null;
  isClinicalTopic?: boolean;
  monograph?: Pick<FieldResearchMonograph, "title" | "subtitle" | "synopsis" | "keyTakeaways"> | null;
  levers?: Pick<SynthesisLever, "name" | "category" | "verdict" | "effect">[];
  sources?: TopicSeoSourceItem[];
}

export interface TopicSeoMetadata {
  title: string;
  socialTitle: string;
  description: string;
  socialDescription: string;
  canonicalUrl: string;
  canonicalRelativePath: string;
  section: string;
  keywords: string[];
  publishedIso: string | null;
  scholarlyMeta: Record<string, string | string[]>;
}

function toIsoDateString(d?: Date | string | null): string | null {
  if (!d) return null;
  try {
    const parsed = new Date(d);
    if (isNaN(parsed.getTime())) return null;
    return parsed.toISOString();
  } catch {
    return null;
  }
}

/**
 * Builds rich, deterministic SEO metadata, OpenGraph copy, and HighWire/Dublin Core
 * academic citation tags for any topic branch in the Tree of Knowledge.
 */
export function buildTopicSeoMetadata(input: TopicSeoInput): TopicSeoMetadata {
  const rawNested = input.canonicalPath
    .trim()
    .replace(/^\/+/, "")
    .replace(/^topic\/+/i, "")
    .replace(/\/+$/, "");
  const canonicalRelativePath = `/topic/${rawNested}`;
  const canonicalUrl = buildCanonicalUrl(input.siteUrl, canonicalRelativePath);

  const parentTitle =
    input.ancestors.length > 0 ? input.ancestors[input.ancestors.length - 1]!.title : "Tree of Knowledge";
  const rootTitle = input.ancestors.length > 0 ? input.ancestors[0]!.title : input.title;

  const title =
    input.title.length < 36 && parentTitle && parentTitle !== input.title
      ? `${input.title} (${parentTitle})`
      : input.title;

  const tierPrefix = input.bestTier ? `${input.bestTier} Graded ` : "";
  const socialTitle = `${input.title} — ${tierPrefix}Scientific Synthesis | ${SITE_NAME}`;

  const metricsParts: string[] = [];
  if (input.bestTier) {
    metricsParts.push(`Peak ${input.bestTier} (${TIER_LABELS[input.bestTier]})`);
  }
  if (input.sourcesCount > 0) {
    metricsParts.push(`${input.sourcesCount} ${input.sourcesCount === 1 ? "source" : "sources"}`);
  }
  if (input.claimsCount > 0) {
    metricsParts.push(`${input.claimsCount} graded ${input.claimsCount === 1 ? "finding" : "findings"}`);
  }
  const metricsPrefix = metricsParts.length > 0 ? `[${metricsParts.join(" · ")}] ` : "";

  const narrativeSource =
    input.monograph?.synopsis?.trim() ||
    input.summary?.trim() ||
    input.brief.trim() ||
    `Scientific evidence synthesis and graded primary literature for ${input.title}.`;

  const description = truncateSeoText(`${metricsPrefix}${narrativeSource}`, 160);
  const socialDescription = truncateSeoText(`${metricsPrefix}${narrativeSource}`, 220);

  const keywordSet = new Set<string>();
  const addKeyword = (kw?: string | null) => {
    const clean = (kw ?? "").replace(/\s+/g, " ").trim();
    if (clean.length >= 2 && clean.length <= 72 && keywordSet.size < 20) {
      keywordSet.add(clean);
    }
  };

  addKeyword(input.title);
  for (const a of input.ancestors) addKeyword(a.title);
  for (const l of (input.levers ?? []).slice(0, 8)) {
    addKeyword(l.name);
    addKeyword(l.category);
  }
  for (const c of (input.children ?? []).slice(0, 5)) {
    addKeyword(c.title);
  }
  if (input.bestTier) {
    addKeyword(`${input.bestTier} ${TIER_LABELS[input.bestTier]}`);
  }
  addKeyword("systematic review");
  addKeyword("evidence synthesis");
  addKeyword(SITE_NAME);

  const publishedIso = toIsoDateString(input.lastResearchedAt);
  const publicationDate = publishedIso ? publishedIso.slice(0, 10) : "2026-10-01";

  const citationReferences = (input.sources ?? [])
    .slice(0, 12)
    .map((s) => {
      const authorPart = s.authors && s.authors.length > 0 ? `${s.authors[0]}${s.authors.length > 1 ? " et al." : ""}` : "";
      const yearPart = s.year ? ` (${s.year})` : "";
      const venuePart = s.venue ? `. ${s.venue}` : "";
      const doiPart = s.doi ? `. doi:${s.doi}` : "";
      return `${authorPart}${yearPart}. ${s.title}${venuePart}${doiPart}`.replace(/^\.\s*/, "").trim();
    })
    .filter(Boolean);

  const scholarlyMeta: Record<string, string | string[]> = {
    "DC.title": input.monograph?.title || input.title,
    "DC.creator": SITE_NAME,
    "DC.subject": Array.from(keywordSet).slice(0, 8).join("; "),
    "DC.description": socialDescription,
    "DC.publisher": SITE_NAME,
    "DC.type": "Text.Monograph",
    "DC.format": "text/html",
    "DC.language": "en",
    "DC.identifier": canonicalUrl,
    citation_title: input.monograph?.title || input.title,
    citation_author: "Alexander's Library Autonomous Research Synthesis",
    citation_journal_title: `${SITE_NAME} — ${rootTitle}`,
    citation_online_date: publicationDate.replace(/-/g, "/"),
    citation_publication_date: publicationDate.replace(/-/g, "/"),
    citation_public_url: canonicalUrl,
    citation_language: "en",
  };

  if (citationReferences.length > 0) {
    scholarlyMeta.citation_reference = citationReferences;
  }

  return {
    title,
    socialTitle,
    description,
    socialDescription,
    canonicalUrl,
    canonicalRelativePath,
    section: parentTitle,
    keywords: Array.from(keywordSet),
    publishedIso,
    scholarlyMeta,
  };
}

/**
 * Builds Schema.org JSON-LD `@graph` for the home page (`WebSite` with `SearchAction`,
 * `ResearchOrganization`, and `CollectionPage` + `ItemList` of root disciplines).
 */
export function buildWebSiteJsonLd(input: {
  siteUrl: string;
  rootTopics: { title: string; slug: string; brief?: string | null }[];
  authorUrl?: string;
  githubUrl?: string;
}): Record<string, unknown> {
  const base = normaliseSiteUrl(input.siteUrl);
  const authorUrl = input.authorUrl ?? "https://nuuno.art";
  const githubUrl = input.githubUrl ?? "https://github.com/tachyon-ops";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ResearchOrganization",
        "@id": `${base}/#organization`,
        name: SITE_NAME,
        alternateName: "Bibliotheca Alexandrina — The Tree of Knowledge",
        url: base,
        description: SITE_DESCRIPTION,
        founder: {
          "@type": "Person",
          name: "Nuno Ribeiro",
          url: authorUrl,
          sameAs: [authorUrl, githubUrl],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: SITE_NAME,
        alternateName: SITE_TAGLINE,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${base}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${base}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "CollectionPage",
        "@id": `${base}/#webpage`,
        url: base,
        name: `${SITE_NAME} — ${SITE_TAGLINE}`,
        description: SITE_DESCRIPTION,
        isPartOf: { "@id": `${base}/#website` },
        about: { "@id": `${base}/#organization` },
        inLanguage: "en",
        mainEntity: {
          "@type": "ItemList",
          name: "Catalogue of Scientific Disciplines",
          numberOfItems: input.rootTopics.length,
          itemListElement: input.rootTopics.map((root, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: root.title,
            description: root.brief ?? undefined,
            url: buildCanonicalUrl(base, `/topic/${root.slug.replace(/^\/+/, "")}`),
          })),
        },
      },
    ],
  };
}

/**
 * Builds Schema.org JSON-LD `@graph` for a `/topic/[...slug]` monograph page:
 * `BreadcrumbList`, `ScholarlyArticle` (with `MedicalWebPage` on biomedical branches),
 * cited `ScholarlyArticle` references with DOIs, and an `ItemList` of evaluated levers.
 */
export function buildTopicJsonLd(input: TopicSeoInput): Record<string, unknown> {
  const base = normaliseSiteUrl(input.siteUrl);
  const seo = buildTopicSeoMetadata(input);

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Library",
      item: base,
    },
    ...input.ancestors.map((a, idx) => ({
      "@type": "ListItem",
      position: idx + 2,
      name: a.title,
      item: buildCanonicalUrl(base, `/topic/${a.slug.replace(/^\/+/, "")}`),
    })),
    {
      "@type": "ListItem",
      position: input.ancestors.length + 2,
      name: input.title,
      item: seo.canonicalUrl,
    },
  ];

  const citations = (input.sources ?? []).slice(0, 15).map((s) => {
    const doiUrl = s.doi ? `https://doi.org/${s.doi.replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, "")}` : undefined;
    const itemUrl = s.url ?? doiUrl ?? undefined;
    return {
      "@type": "ScholarlyArticle",
      headline: s.title,
      name: s.title,
      ...(s.year ? { datePublished: String(s.year) } : {}),
      ...(s.authors && s.authors.length > 0
        ? {
            author: s.authors.slice(0, 4).map((name) => ({
              "@type": "Person",
              name,
            })),
          }
        : {}),
      ...(s.venue
        ? {
            isPartOf: {
              "@type": "Periodical",
              name: s.venue,
            },
          }
        : {}),
      ...(itemUrl ? { url: itemUrl } : {}),
      ...(doiUrl ? { sameAs: doiUrl, identifier: s.doi } : {}),
    };
  });

  const articleTypes = input.isClinicalTopic
    ? ["ScholarlyArticle", "MedicalWebPage"]
    : "ScholarlyArticle";

  const articleNode: Record<string, unknown> = {
    "@type": articleTypes,
    "@id": `${seo.canonicalUrl}#article`,
    headline: input.monograph?.title || input.title,
    alternativeHeadline: input.monograph?.subtitle || input.brief,
    name: input.title,
    description: seo.socialDescription,
    abstract: input.monograph?.synopsis || input.summary || input.brief,
    url: seo.canonicalUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": seo.canonicalUrl,
    },
    inLanguage: "en",
    isAccessibleForFree: true,
    articleSection: seo.section,
    keywords: seo.keywords.join(", "),
    author: { "@id": `${base}/#organization` },
    publisher: { "@id": `${base}/#organization` },
    isPartOf: { "@id": `${base}/#website` },
    breadcrumb: { "@id": `${seo.canonicalUrl}#breadcrumb` },
    about: [
      {
        "@type": "Thing",
        name: input.title,
        description: input.brief,
      },
      ...input.ancestors.map((a) => ({
        "@type": "Thing",
        name: a.title,
        url: buildCanonicalUrl(base, `/topic/${a.slug.replace(/^\/+/, "")}`),
      })),
    ],
  };

  if (seo.publishedIso) {
    articleNode.dateModified = seo.publishedIso;
    articleNode.datePublished = seo.publishedIso;
  }

  if (citations.length > 0) {
    articleNode.citation = citations;
  }

  if (input.levers && input.levers.length > 0) {
    articleNode.hasPart = {
      "@type": "ItemList",
      name: `${input.title} — Evaluated Decision & Theoretical Framework Ledger`,
      numberOfItems: input.levers.length,
      itemListElement: input.levers.slice(0, 15).map((l, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: `${l.name} (${l.verdict})`,
        description: `${l.category}: ${l.effect}`,
      })),
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${seo.canonicalUrl}#breadcrumb`,
        itemListElement: breadcrumbItems,
      },
      articleNode,
    ],
  };
}

/**
 * Builds Schema.org JSON-LD `@graph` for `/about` ("The Search for the Elixir of Youth").
 */
export function buildAboutJsonLd(input: { siteUrl: string; authorUrl?: string }): Record<string, unknown> {
  const base = normaliseSiteUrl(input.siteUrl);
  const canonicalUrl = buildCanonicalUrl(base, "/about");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Library", item: base },
          { "@type": "ListItem", position: 2, name: "The Search for the Elixir of Youth", item: canonicalUrl },
        ],
      },
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: "The Search for the Elixir of Youth — From Sumer and Alexandria to Autonomous Scientific Synthesis",
        description:
          "From the Sumerian Epic of Gilgamesh and the scrolls of Alexandria to the Scientific and Information Revolutions: why the Tree of Knowledge exists, with primary sources and academic citations.",
        url: canonicalUrl,
        inLanguage: "en",
        isAccessibleForFree: true,
        image: `${base}/archival-library.jpg`,
        author: {
          "@type": "Person",
          name: "Nuno Ribeiro",
          url: input.authorUrl ?? "https://nuuno.art",
        },
        publisher: {
          "@type": "ResearchOrganization",
          "@id": `${base}/#organization`,
          name: SITE_NAME,
          url: base,
        },
        isPartOf: { "@id": `${base}/#website` },
        breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
      },
    ],
  };
}

/**
 * Builds Schema.org JSON-LD `@graph` for `/privacy`.
 */
export function buildPrivacyJsonLd(input: { siteUrl: string }): Record<string, unknown> {
  const base = normaliseSiteUrl(input.siteUrl);
  const canonicalUrl = buildCanonicalUrl(base, "/privacy");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Library", item: base },
          { "@type": "ListItem", position: 2, name: "Legal, Copyright & Privacy Notice", item: canonicalUrl },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        name: "Legal, Copyright & Privacy Notice — Alexander's Library",
        description:
          "Open-access bibliographic compliance, non-hosting of copyrighted full texts, medical disclaimer, and GDPR / Swiss FADP privacy notice for Alexander's Library.",
        url: canonicalUrl,
        inLanguage: "en",
        isPartOf: { "@id": `${base}/#website` },
        breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
      },
    ],
  };
}

export interface LlmsTxtNode {
  slug: string;
  nestedPath: string;
  title: string;
  brief?: string | null;
  depth: number;
  status?: string;
}

/**
 * Builds the `llms.txt` markdown specification file so AI search engines,
 * answer engines, and research crawlers can index the taxonomy, grading system,
 * and canonical URLs of Alexander's Library.
 */
export function buildLlmsTxt(input: { siteUrl: string; nodes: LlmsTxtNode[] }): string {
  const base = normaliseSiteUrl(input.siteUrl);
  const lines: string[] = [
    `# ${SITE_NAME} — ${SITE_TAGLINE}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "## Epistemic Stance & Deterministic Evidence Grading (T1–T6)",
    "",
    "Alexander's Library harvests peer-reviewed literature from Europe PMC and OpenAlex and registered clinical trials from ClinicalTrials.gov. Every extracted claim is graded deterministically in code by study design:",
    "",
    "- **T1 (Synthesis of trials):** Clinical guidelines, systematic reviews, and meta-analyses.",
    "- **T2 (Randomised trials):** At least two independent randomised controlled trials (RCTs) with sample size >= 100.",
    "- **T3 (Observational / single trial):** Large cohort, registry, or case-control studies, or a single RCT.",
    "- **T4 (Small clinical studies):** Cross-sectional studies, case series, case reports, or underpowered trials (n < 100).",
    "- **T5 (Preclinical & mechanistic):** Animal models, in vitro cell studies, and computational simulations.",
    "- **T6 (Commentary & unverified):** Expert opinion, news, or unclassified claims.",
    "",
    "Contested, debated, and frontier hypotheses remain in the archive with explicit controversy flags (`settled`, `debated`, `contested`, `fringe`, `commercial_hype`) and regime breakdown limits.",
    "",
    "## Core Entry Points",
    "",
    `- [The Tree of Knowledge (Home)](${base}): Interactive 3D knowledge constellation and hierarchical catalogue of scientific disciplines.`,
    `- [Search the Scientific Record](${base}/search): Grounded synthesis briefings across graded claims, peer-reviewed papers, clinical trials, and decision ledgers.`,
    `- [The Search for the Elixir of Youth (Chronicle)](${base}/about): Historical and epistemological chronicle from Sumer and Alexandria to autonomous synthesis.`,
    `- [Legal, Copyright & Privacy Notice](${base}/privacy): Open-access API provenance, non-hosting of full texts, and GDPR / Swiss FADP data minimization.`,
    `- [XML Sitemap](${base}/sitemap.xml): Complete machine-readable index of canonical discipline URLs.`,
    `- [RSS 2.0 Feed](${base}/feed.xml): Syndication feed of scientific branches and monographs.`,
    "",
    "## Canonical Disciplines & Field Monographs",
    "",
  ];

  for (const node of input.nodes) {
    const indent = "  ".repeat(Math.max(0, Math.min(4, node.depth)));
    const url = buildCanonicalUrl(base, `/topic/${node.nestedPath.replace(/^\/+/, "")}`);
    const brief = node.brief ? `: ${truncateSeoText(node.brief, 180)}` : "";
    lines.push(`${indent}- [${node.title}](${url})${brief}`);
  }

  lines.push("");
  return lines.join("\n");
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export interface RssFeedItem {
  title: string;
  nestedPath: string;
  description: string;
  category?: string;
  updatedAt?: Date | string | null;
}

/**
 * Builds a valid RSS 2.0 XML feed of scientific branches and monographs.
 */
export function buildRssFeedXml(input: {
  siteUrl: string;
  items: RssFeedItem[];
  buildDate?: Date;
}): string {
  const base = normaliseSiteUrl(input.siteUrl);
  const feedUrl = `${base}/feed.xml`;
  const nowRfc = (input.buildDate ?? new Date("2026-10-28T00:00:00Z")).toUTCString();

  const itemXml = input.items
    .map((item) => {
      const link = buildCanonicalUrl(base, `/topic/${item.nestedPath.replace(/^\/+/, "")}`);
      const pubDate = item.updatedAt ? new Date(item.updatedAt) : null;
      const validPubDate = pubDate && !isNaN(pubDate.getTime()) ? pubDate.toUTCString() : nowRfc;
      return [
        "    <item>",
        `      <title>${escapeXml(item.title)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `      <description>${escapeXml(truncateSeoText(item.description, 320))}</description>`,
        ...(item.category ? [`      <category>${escapeXml(item.category)}</category>`] : []),
        `      <pubDate>${escapeXml(validPubDate)}</pubDate>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(`${SITE_NAME} — ${SITE_TAGLINE}`)}</title>`,
    `    <link>${escapeXml(base)}</link>`,
    `    <description>${escapeXml(SITE_DESCRIPTION)}</description>`,
    "    <language>en</language>",
    `    <lastBuildDate>${escapeXml(nowRfc)}</lastBuildDate>`,
    `    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
    itemXml,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}

/**
 * Builds an OpenSearch Description XML document so web browsers can discover
 * Alexander's Library as a native address-bar search provider.
 */
export function buildOpenSearchXml(input: { siteUrl: string }): string {
  const base = normaliseSiteUrl(input.siteUrl);
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">',
    `  <ShortName>${escapeXml(SITE_NAME)}</ShortName>`,
    `  <Description>${escapeXml("Search graded scientific findings, papers, and clinical trials in Alexander's Library")}</Description>`,
    "  <InputEncoding>UTF-8</InputEncoding>",
    "  <OutputEncoding>UTF-8</OutputEncoding>",
    `  <Url type="text/html" method="get" template="${escapeXml(`${base}/search?q={searchTerms}`)}" />`,
    `  <Url type="application/opensearchdescription+xml" rel="self" template="${escapeXml(`${base}/opensearch.xml`)}" />`,
    "</OpenSearchDescription>",
    "",
  ].join("\n");
}
