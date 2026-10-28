import { ImageResponse } from "next/og";
import { resolveTopicFromUrlSegments, SITE_NAME, TIER_LABELS, truncateSeoText, type Tier } from "@lib/core";
import { ALL_SEED_DOSSIERS, getAncestors, getTopicBySlug, listTree, topicClaims, topicSources } from "@lib/db";
import { normaliseAgePhrasing, normaliseTopicTitle, normaliseTreeRows, sql } from "@/lib/data";
import { loadCatalogueNodesForSeo } from "@/lib/seo";

const size = { width: 1200, height: 630 };

const TIER_COLORS: Record<Tier, string> = {
  T1: "#1d4ed8",
  T2: "#2563eb",
  T3: "#3b82f6",
  T4: "#60a5fa",
  T5: "#93c5fd",
  T6: "#94a3b8",
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> },
): Promise<ImageResponse> {
  const { slug: rawSlugParam } = await params;
  const slugSegments = (Array.isArray(rawSlugParam) ? rawSlugParam : [rawSlugParam])
    .map((s) => s.trim())
    .filter(Boolean);
  const lastSegment = slugSegments[slugSegments.length - 1] ?? "topic";

  let title = normaliseTopicTitle(lastSegment.replace(/-/g, " "));
  let brief =
    "Synthesised peer-reviewed literature, clinical trial registries, and study-design-graded findings in Alexander's Library.";
  let trailText = "Library / Tree of Knowledge";
  let bestTier: Tier | null = null;
  let sourcesCount = 0;
  let claimsCount = 0;

  try {
    const db = sql();
    const rawTree = await listTree(db);
    const { nodes: normalisedNodes } = normaliseTreeRows(rawTree);
    const resolved = resolveTopicFromUrlSegments(slugSegments, normalisedNodes);
    const candidateSlug = resolved.canonicalSeedSlug ?? resolved.node?.slug ?? lastSegment;

    const topic =
      (resolved.node ? await getTopicBySlug(db, resolved.node.slug) : null) ??
      (await getTopicBySlug(db, candidateSlug)) ??
      (await getTopicBySlug(db, lastSegment));

    const dossier = ALL_SEED_DOSSIERS[topic?.slug ?? candidateSlug];

    if (topic) {
      title = normaliseTopicTitle(topic.title);
      brief = normaliseAgePhrasing(dossier?.summary ?? topic.summary ?? topic.brief ?? brief);
      const [ancestors, claims, sources] = await Promise.all([
        getAncestors(db, topic.id),
        topicClaims(db, topic.id),
        topicSources(db, topic.id),
      ]);
      if (ancestors.length > 0) {
        trailText = ["Library", ...ancestors.map((a) => normaliseTopicTitle(a.title))].join(" › ");
      }
      claimsCount = Math.max(claims.length, dossier?.claims.length ?? 0);
      sourcesCount = Math.max(sources.length, dossier?.sources.length ?? 0);
      const tierOrder: Tier[] = ["T1", "T2", "T3", "T4", "T5", "T6"];
      const allTiers = [
        ...claims.map((c) => c.tier),
        ...(dossier?.claims.map((c) => c.tier) ?? []),
      ];
      bestTier = tierOrder.find((t) => allTiers.includes(t)) ?? null;
    } else {
      const catalogue = await loadCatalogueNodesForSeo();
      const matched =
        catalogue.find((c) => c.nestedPath === slugSegments.join("/")) ??
        catalogue.find((c) => c.slug === candidateSlug);
      if (matched) {
        title = matched.title;
        if (matched.brief) brief = matched.brief;
        trailText = `Library › ${matched.rootTitle}`;
      }
      if (dossier) {
        brief = normaliseAgePhrasing(dossier.summary);
        claimsCount = dossier.claims.length;
        sourcesCount = dossier.sources.length;
        const tierOrder: Tier[] = ["T1", "T2", "T3", "T4", "T5", "T6"];
        bestTier = tierOrder.find((t) => dossier.claims.some((c) => c.tier === t)) ?? "T1";
      }
    }
  } catch {
    const dossier = ALL_SEED_DOSSIERS[lastSegment];
    if (dossier) {
      brief = normaliseAgePhrasing(dossier.summary);
      claimsCount = dossier.claims.length;
      sourcesCount = dossier.sources.length;
      bestTier = "T1";
    }
  }

  const barColor = bestTier ? TIER_COLORS[bestTier] : "#1d4ed8";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f4ef",
          color: "#191918",
          padding: "52px 64px",
          borderLeft: `20px solid ${barColor}`,
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "2px solid #dedad0",
              paddingBottom: "16px",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                fontSize: 17,
                color: "#575653",
              }}
            >
              {truncateSeoText(trailText, 95)}
            </span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#191918",
                letterSpacing: "0.04em",
              }}
            >
              {SITE_NAME}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: title.length > 75 ? 40 : 48,
              fontWeight: 700,
              lineHeight: 1.14,
              letterSpacing: "-0.02em",
              color: "#191918",
              marginBottom: "20px",
            }}
          >
            {truncateSeoText(title, 115)}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 23,
              lineHeight: 1.42,
              color: "#44433f",
            }}
          >
            {truncateSeoText(brief, 240)}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#efece4",
            padding: "18px 26px",
            borderRadius: "10px",
            border: "1px solid #dedad0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            {bestTier ? (
              <span
                style={{
                  background: barColor,
                  color: "#ffffff",
                  fontSize: 17,
                  fontWeight: 700,
                  padding: "6px 14px",
                  borderRadius: "6px",
                }}
              >
                Peak Evidence: {bestTier} · {TIER_LABELS[bestTier]}
              </span>
            ) : (
              <span
                style={{
                  background: "#191918",
                  color: "#f6f4ef",
                  fontSize: 17,
                  fontWeight: 700,
                  padding: "6px 14px",
                  borderRadius: "6px",
                }}
              >
                Canonical Scientific Discipline
              </span>
            )}
            {sourcesCount > 0 && (
              <span style={{ fontSize: 18, color: "#191918", fontWeight: 600 }}>
                {sourcesCount} Indexed {sourcesCount === 1 ? "Source" : "Sources"}
              </span>
            )}
            {claimsCount > 0 && (
              <span style={{ fontSize: 18, color: "#44433f" }}>
                · {claimsCount} Graded {claimsCount === 1 ? "Finding" : "Findings"}
              </span>
            )}
          </div>
          <span style={{ fontSize: 16, color: "#575653" }}>State of the Field Monograph</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
