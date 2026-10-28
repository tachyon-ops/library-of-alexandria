import type { Metadata } from "next";
import { reassessTopicTaxonomyWithAi } from "@lib/agents";
import {
  ALL_SEED_DOSSIERS,
  ENCYCLOPAEDIC_TRUNKS,
  ensureSeedTopic,
  getAncestors,
  getChildren,
  getTopicBySlug,
  listTree,
  logUsage,
  moveTopic,
  openJobCount,
  recentJobs,
  seedTopicDossier,
  topicClaims,
  topicControversies,
  topicEntities,
  topicLinks,
  topicMilestones,
  topicSources,
  type ClaimView,
  type ControversyView,
  type EntityView,
  type MilestoneView,
  type SeedDossier,
  type SeedNode,
  type SourceView,
  type TopicLinkView,
} from "@lib/db";
import {
  buildDynamicFieldArticle,
  buildTopicJsonLd,
  buildTopicSeoMetadata,
  CONTROVERSY_LABELS,
  resolveTopicFromUrlSegments,
  serializeJsonLd,
  shortTopicSegment,
  TIER_LABELS,
  TIERS,
  type Controversy,
  type JobKind,
  type SearchTreeNode,
  type Tier,
  type Topic,
  type TopicSynthesis,
} from "@lib/core";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { researchTopic, triggerRemoteWorker, wakeWorker } from "@/app/actions";
import { AutoRefresh } from "@/components/AutoRefresh";
import { FieldResearchArticle } from "@/components/FieldResearchArticle";
import { NewTopicForm } from "@/components/NewTopicForm";
import { Tree } from "@/components/Tree";
import {
  loadTree,
  normaliseAgePhrasing,
  normaliseTopicSynthesis,
  normaliseTopicTitle,
  normaliseTreeRows,
  sql,
} from "@/lib/data";
import { getSiteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

const ENTITY_HEADINGS: Record<string, string> = {
  clinic: "Clinics",
  treatment: "Treatments on offer",
  trial: "Trials",
  lab: "Research groups",
  company: "Companies",
  regulation: "Law and regulation",
  person: "People",
};

const JOB_WORDS: Record<string, string> = {
  plan: "Planning branches & searches",
  harvest: "Harvesting literature & trials",
  extract: "Extracting findings & study designs",
  scan: "Scanning web for trials & clinics",
  review: "Synthesizing evidence & decision ledger",
};

const PIPELINE_STAGES: { kind: JobKind; label: string; description: string }[] = [
  { kind: "plan", label: "Plan", description: "Taxonomy & search queries" },
  { kind: "harvest", label: "Harvest", description: "Registries & literature" },
  { kind: "extract", label: "Read & Grade", description: "Abstracts & study designs" },
  { kind: "scan", label: "Web Scan", description: "Trials, clinics & groups" },
  { kind: "review", label: "Synthesize", description: "Skeptic review & ledger" },
];

const STAGE_ORDER: Record<string, number> = {
  plan: 0,
  harvest: 1,
  extract: 2,
  scan: 3,
  review: 4,
};

function formatTopicDate(d: Date | string | null | undefined): string | null {
  if (!d) return null;
  try {
    const date = new Date(d);
    if (isNaN(date.getTime())) return null;
    return date.toISOString().slice(0, 10);
  } catch {
    return null;
  }
}

function formatJobTime(d: Date | string | number | null | undefined): string {
  if (!d) return "";
  try {
    const date = new Date(d);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().slice(11, 19) + " UTC";
  } catch {
    return "";
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams?: Promise<{ spawned?: string }>;
}): Promise<Metadata> {
  const { slug: rawSlugParam } = await params;
  const slugSegments = (Array.isArray(rawSlugParam) ? rawSlugParam : [rawSlugParam])
    .map((s) => s.trim())
    .filter(Boolean);
  if (slugSegments.length === 0) {
    return { title: "Topic Not Found", robots: { index: false, follow: false } };
  }

  const lastSegment = slugSegments[slugSegments.length - 1]!;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const hasSpawnedParam = Boolean(resolvedSearchParams?.spawned?.trim());
  const siteUrl = getSiteUrl();
  const db = sql();

  let rawTree: Awaited<ReturnType<typeof listTree>> = [];
  try {
    rawTree = await listTree(db);
  } catch {
    rawTree = [];
  }

  const { nodes: normalisedNodes, byId: nestedById, byRawSlug: nestedBySlug } = normaliseTreeRows(rawTree);
  const resolved = resolveTopicFromUrlSegments(slugSegments, normalisedNodes);
  const candidateSlug = resolved.canonicalSeedSlug ?? resolved.node?.slug ?? lastSegment;

  let topic: Topic | null = null;
  try {
    topic =
      (resolved.node ? await getTopicBySlug(db, resolved.node.slug) : null) ??
      (await getTopicBySlug(db, candidateSlug)) ??
      (await getTopicBySlug(db, lastSegment));
  } catch {
    topic = null;
  }

  const curatedDossier = ALL_SEED_DOSSIERS[topic?.slug ?? candidateSlug];
  if (!topic && !curatedDossier) {
    return { title: "Topic Not Found", robots: { index: false, follow: false } };
  }

  const toNestedPath = (rawSlug: string, id?: string | null): string => {
    if (id && nestedById.has(id)) return nestedById.get(id)!;
    if (nestedBySlug.has(rawSlug)) return nestedBySlug.get(rawSlug)!;
    return shortTopicSegment(rawSlug, normaliseTopicTitle(topic?.title ?? rawSlug));
  };

  const canonicalNestedSlug = topic ? toNestedPath(topic.slug, topic.id) : slugSegments.join("/");

  const [rawAncestors, rawChildren, rawClaims, rawDbSources] = topic
    ? await Promise.all([
        getAncestors(db, topic.id).catch(() => []),
        getChildren(db, topic.id).catch(() => []),
        topicClaims(db, topic.id).catch(() => []),
        topicSources(db, topic.id).catch(() => []),
      ])
    : [[], [], [], []];

  const ancestors = rawAncestors.map((a) => ({
    title: normaliseTopicTitle(a.title),
    slug: toNestedPath(a.slug, a.id),
  }));
  const children = rawChildren.map((c) => ({
    title: normaliseTopicTitle(c.title),
    slug: toNestedPath(c.slug, c.id),
    brief: c.brief ? normaliseAgePhrasing(c.brief) : null,
  }));

  const { claims, dbSources } = mergeCuratedDossierRecords(curatedDossier, rawClaims, rawDbSources, [], []);
  const sources = mergeSources(dbSources, claims);

  const displayTitle = normaliseTopicTitle(topic?.title ?? candidateSlug.replace(/-/g, " "));
  const briefText =
    (topic?.brief ? normaliseAgePhrasing(topic.brief) : null) ??
    (curatedDossier?.summary ? normaliseAgePhrasing(curatedDossier.summary) : null) ??
    `Scientific synthesis, primary literature, and graded evidence across ${displayTitle}.`;
  const effectiveSummary =
    (curatedDossier?.summary ? normaliseAgePhrasing(curatedDossier.summary) : null) ??
    (topic?.summary ? normaliseAgePhrasing(topic.summary) : null) ??
    briefText;

  let rawSynthesis: TopicSynthesis | null = curatedDossier?.synthesis ?? null;
  if (!rawSynthesis && topic?.synthesis) {
    if (typeof topic.synthesis === "string") {
      try {
        rawSynthesis = JSON.parse(topic.synthesis);
      } catch {
        rawSynthesis = null;
      }
    } else if (typeof topic.synthesis === "object") {
      rawSynthesis = topic.synthesis;
    }
  }
  const synthesis = normaliseTopicSynthesis(rawSynthesis);
  const tierOrder: Tier[] = ["T1", "T2", "T3", "T4", "T5", "T6"];
  const bestTier = tierOrder.find((t) => claims.some((c) => c.tier === t)) ?? null;
  const slugLower = (topic?.slug ?? candidateSlug).toLowerCase();
  const isClinicalTopic =
    slugLower.includes("medicine") ||
    slugLower.includes("fertility") ||
    slugLower.includes("ovarian") ||
    slugLower.includes("endometrial") ||
    slugLower.includes("andrology") ||
    slugLower.includes("maternal") ||
    slugLower.includes("gamete") ||
    slugLower.includes("reproductive") ||
    slugLower.includes("geroscience") ||
    slugLower.includes("neuroscience") ||
    ancestors.some((a) => a.slug.includes("medicine") || a.slug.includes("fertility") || a.slug.includes("biomedicine"));

  const seo = buildTopicSeoMetadata({
    siteUrl,
    canonicalPath: canonicalNestedSlug,
    title: displayTitle,
    brief: briefText,
    summary: effectiveSummary,
    status: topic?.status ?? "ready",
    lastResearchedAt: topic?.lastResearchedAt ?? null,
    ancestors,
    children,
    sourcesCount: sources.length,
    claimsCount: claims.length,
    bestTier,
    isClinicalTopic,
    monograph: synthesis?.article ?? null,
    levers: synthesis?.levers ?? [],
    sources: sources.map((s) => ({
      title: s.title,
      doi: s.doi,
      year: s.year,
      authors: s.authors,
      url: s.url,
      venue: s.venue,
    })),
  });

  const ogImageUrl = `/og/${canonicalNestedSlug}`;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    category: isClinicalTopic ? "medical" : "science",
    alternates: {
      canonical: seo.canonicalRelativePath,
    },
    openGraph: {
      type: "article",
      url: seo.canonicalUrl,
      title: seo.socialTitle,
      description: seo.socialDescription,
      section: seo.section,
      tags: seo.keywords.slice(0, 12),
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: seo.socialTitle,
        },
      ],
      ...(seo.publishedIso
        ? {
            publishedTime: seo.publishedIso,
            modifiedTime: seo.publishedIso,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: seo.socialTitle,
      description: seo.socialDescription,
      images: [ogImageUrl],
    },
    robots: {
      index: !hasSpawnedParam,
      follow: true,
    },
    other: seo.scholarlyMeta,
  };
}

export default async function TopicPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams?: Promise<{ spawned?: string }>;
}) {
  const { slug: rawSlugParam } = await params;
  const slugSegments = (Array.isArray(rawSlugParam) ? rawSlugParam : [rawSlugParam])
    .map((s) => s.trim())
    .filter(Boolean);
  if (slugSegments.length === 0) notFound();

  const requestedPath = slugSegments.join("/");
  const lastSegment = slugSegments[slugSegments.length - 1]!;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const db = sql();

  let rawTree = await listTree(db);
  const { nodes: initialNormalisedNodes } = normaliseTreeRows(rawTree);
  const resolved = resolveTopicFromUrlSegments(slugSegments, initialNormalisedNodes);
  const candidateSlug = resolved.canonicalSeedSlug ?? resolved.node?.slug ?? lastSegment;

  let topic =
    (resolved.node ? await getTopicBySlug(db, resolved.node.slug) : null) ??
    (await getTopicBySlug(db, candidateSlug)) ??
    (await getTopicBySlug(db, lastSegment));

  if (
    !topic &&
    (candidateSlug === "inter-transfer-interval-immediate-vs-delayed-frozen-embryo-transfer" ||
      lastSegment === "fet-transfer-interval")
  ) {
    const canonicalSlug = "inter-transfer-interval-immediate-vs-delayed-frozen-embryo-transfer";
    const parent = await getTopicBySlug(db, "endometrial-receptivity-implantation-biology");
    const dossier = ALL_SEED_DOSSIERS[canonicalSlug];
    if (dossier) {
      topic = await ensureSeedTopic(db, {
        slug: canonicalSlug,
        title: "Inter-Transfer Interval: Immediate vs. Delayed Frozen Embryo Transfer (FET) & Endometrial Reset",
        brief:
          "Immediate next-menstrual-cycle Frozen Embryo Transfer (FET) versus multi-month delayed transfer after a failed embryo transfer or retrieval, cryostorage duration safety at −196°C, HPO-axis washout from programmed HRT to natural ovulatory cycles, CD138 chronic endometritis clearance, and strategic optimization before transferring a final remaining embryo.",
        parentId: parent?.id ?? null,
        depth: parent ? parent.depth + 1 : 3,
        summary: dossier.summary,
        dossier,
      });
      await seedTopicDossier(db, topic.id, dossier, { populateTopicFields: false });
      rawTree = await listTree(db);
    }
  }
  if (
    !topic &&
    (candidateSlug === "hyaluronan-embryo-transfer-media-embryoglue-implantation-adherence" ||
      lastSegment === "reproductive-medicine-human-fertility-bb-aa-1pn-2pn-what-grading-methods-are-the-41" ||
      lastSegment === "embryo-glue" ||
      lastSegment === "embryoglue")
  ) {
    const canonicalSlug = "hyaluronan-embryo-transfer-media-embryoglue-implantation-adherence";
    const parent = await getTopicBySlug(db, "endometrial-receptivity-implantation-biology");
    const dossier = ALL_SEED_DOSSIERS[canonicalSlug];
    if (dossier) {
      topic = await ensureSeedTopic(db, {
        slug: canonicalSlug,
        title: "Hyaluronan-Enriched Embryo Transfer Media (EmbryoGlue) & Implantation Adherence",
        brief:
          "Randomised clinical trials, Cochrane meta-analyses, and biophysical mechanisms of hyaluronan-enriched embryo transfer medium (EmbryoGlue, 0.5 mg/mL hyaluronan) versus standard low-hyaluronan transfer media: CD44 and RHAMM receptor-mediated embryo–endometrial apposition, luminal fluid viscosity, live-birth and clinical pregnancy rates across fresh and frozen-thawed embryo transfers (FET), recurrent implantation failure (RIF) and maternal age ≥35 subgroups, multiple pregnancy risk, and ESHRE add-on guidance.",
        parentId: parent?.id ?? null,
        depth: parent ? parent.depth + 1 : 3,
        summary: dossier.summary,
        dossier,
      });
      await seedTopicDossier(db, topic.id, dossier, { populateTopicFields: false });
      rawTree = await listTree(db);
    }
  }
  if (
    !topic &&
    (candidateSlug === "lifestyle-metabolic-and-environmental-fertility-optimization" ||
      lastSegment === "natural-conception-lifestyle" ||
      lastSegment.includes("improve-fertility-organically-conceiving") ||
      lastSegment.includes("lifestyle-metabolic-health-natural-conception"))
  ) {
    const canonicalSlug = "lifestyle-metabolic-and-environmental-fertility-optimization";
    const parent = await getTopicBySlug(db, "reproductive-medicine-human-fertility");
    const dossier = ALL_SEED_DOSSIERS[canonicalSlug];
    if (dossier) {
      topic = await ensureSeedTopic(db, {
        slug: canonicalSlug,
        title: "Lifestyle, Metabolic Health & Natural Conception Optimization",
        brief:
          "Non-assisted reproductive optimization at 40–50: circadian sleep and follicular melatonin signaling, pro-fertility nutrition and targeted micronutrient protocols, oocyte mitochondrial ATP bioenergetics (CoQ10, NAD+, spermidine mitophagy), and organic facilitators (24–36h sperm DNA fragmentation reduction, early-shifted fertile window timing, cervical mucus protection, and endocrine/toxin clearance).",
        parentId: parent?.id ?? null,
        depth: parent ? parent.depth + 1 : 3,
        summary: dossier.summary,
        dossier,
      });
      await seedTopicDossier(db, topic.id, dossier, { populateTopicFields: false });
      rawTree = await listTree(db);
    }
  }
  if (!topic) {
    const findLineage = (nodes: SeedNode[], target: string, trail: SeedNode[] = []): SeedNode[] | null => {
      for (const n of nodes) {
        const nextTrail = [...trail, n];
        if (n.slug === target) return nextTrail;
        if (n.children) {
          const found = findLineage(n.children, target, nextTrail);
          if (found) return found;
        }
      }
      return null;
    };
    const lineage = findLineage(ENCYCLOPAEDIC_TRUNKS, candidateSlug) ?? findLineage(ENCYCLOPAEDIC_TRUNKS, lastSegment);
    if (lineage && lineage.length > 0) {
      let parentId: string | null = null;
      let currentDepth = 0;
      for (const seedNode of lineage) {
        const dossier = ALL_SEED_DOSSIERS[seedNode.slug];
        const ensured = await ensureSeedTopic(db, {
          slug: seedNode.slug,
          title: seedNode.title,
          brief: seedNode.brief,
          parentId,
          depth: currentDepth,
          summary: dossier?.summary ?? `${seedNode.title} investigates ${seedNode.brief}`,
          dossier,
        });
        if (dossier) {
          await seedTopicDossier(db, ensured.id, dossier, { populateTopicFields: false });
        }
        parentId = ensured.id;
        currentDepth = ensured.depth + 1;
        topic = ensured;
      }
      rawTree = await listTree(db);
    }
  }
  if (!topic) notFound();

  const isEmbryoGlueTopic =
    topic.slug === "hyaluronan-embryo-transfer-media-embryoglue-implantation-adherence" ||
    topic.slug === "reproductive-medicine-human-fertility-bb-aa-1pn-2pn-what-grading-methods-are-the-41" ||
    /^embryo\s*glue$/i.test(topic.title.trim()) ||
    topic.title === "Hyaluronan-Enriched Embryo Transfer Media (EmbryoGlue) & Implantation Adherence";

  if (isEmbryoGlueTopic) {
    const endoParent = await getTopicBySlug(db, "endometrial-receptivity-implantation-biology");
    if (endoParent && topic.parentId !== endoParent.id) {
      topic = await moveTopic(db, topic.id, endoParent.id);
      rawTree = await listTree(db);
    }
    const embryoGlueDossier =
      ALL_SEED_DOSSIERS["hyaluronan-embryo-transfer-media-embryoglue-implantation-adherence"];
    if (embryoGlueDossier && topic.status !== "ready") {
      await seedTopicDossier(db, topic.id, embryoGlueDossier);
      topic = (await getTopicBySlug(db, topic.slug)) ?? topic;
      rawTree = await listTree(db);
    }
  } else if (topic.depth >= 4) {
    // Self-heal any leaf topic that was previously placed under a narrow sibling depth>=4 inquiry
    const parentNode = rawTree.find((r) => r.id === topic!.parentId);
    if (parentNode && parentNode.depth >= 4) {
      const treeNodes: SearchTreeNode[] = rawTree.map((r) => ({
        id: r.id,
        parentId: r.parentId,
        slug: r.slug,
        title: normaliseTopicTitle(r.title),
        brief: r.brief,
        depth: r.depth,
      }));
      const assessment = await reassessTopicTaxonomyWithAi(undefined, topic, treeNodes, "", {
        onUsage: (u) => {
          void logUsage(db, {
            jobId: null,
            role: u.role,
            model: u.model,
            inputTokens: u.inputTokens,
            outputTokens: u.outputTokens,
            webSearches: u.webSearches,
          }).catch(() => {});
        },
      });
      if (assessment.shouldMove && assessment.recommendedParentId && assessment.recommendedParentId !== topic.parentId) {
        topic = await moveTopic(db, topic.id, assessment.recommendedParentId);
        rawTree = await listTree(db);
      }
    }
  }

  const { byId: nestedById, byRawSlug: nestedBySlug } = normaliseTreeRows(rawTree);
  const toNestedPath = (rawSlug: string, id?: string | null): string => {
    if (id && nestedById.has(id)) return nestedById.get(id)!;
    if (nestedBySlug.has(rawSlug)) return nestedBySlug.get(rawSlug)!;
    return shortTopicSegment(rawSlug, normaliseTopicTitle(topic.title));
  };

  const canonicalNestedSlug = toNestedPath(topic.slug, topic.id);
  if (requestedPath !== canonicalNestedSlug) {
    const spawnedQuery = resolvedSearchParams?.spawned
      ? `?spawned=${encodeURIComponent(resolvedSearchParams.spawned)}`
      : "";
    redirect(`/topic/${canonicalNestedSlug}${spawnedQuery}`);
  }

  const [roots, rawAncestors, rawChildren, connectedTopics, rawClaims, rawDbSources, entities, rawMilestones, rawDebates, open, jobs] = await Promise.all([
    loadTree(),
    getAncestors(db, topic.id),
    getChildren(db, topic.id),
    topicLinks(db, topic.id),
    topicClaims(db, topic.id),
    topicSources(db, topic.id),
    topicEntities(db, topic.id),
    topicMilestones(db, topic.id),
    topicControversies(db, topic.id),
    openJobCount(db, topic.id),
    recentJobs(db, topic.id, 8),
  ]);

  const ancestors = rawAncestors.map((a) => ({
    ...a,
    slug: toNestedPath(a.slug, a.id),
  }));
  const children = rawChildren.map((c) => ({
    ...c,
    slug: toNestedPath(c.slug, c.id),
  }));

  const isLegacyFetIntervalTopic =
    topic.slug === "advanced-maternal-age-pregnancy-after-40-frontier-studies-on-40-fertility-and-ne-41";
  const isLifestyleConceptionTopic =
    topic.slug === "lifestyle-metabolic-and-environmental-fertility-optimization" ||
    topic.slug.includes("improve-fertility-organically-conceiving") ||
    topic.slug.includes("lifestyle-metabolic-health-natural-conception") ||
    topic.title === "Improve Fertility (organically Conceiving) by Improving Lifestyle" ||
    topic.title === "Lifestyle, Metabolic Health & Natural Conception Optimization";
  const curatedDossier: SeedDossier | undefined = isLegacyFetIntervalTopic
    ? ALL_SEED_DOSSIERS["inter-transfer-interval-immediate-vs-delayed-frozen-embryo-transfer"]
    : isLifestyleConceptionTopic
      ? ALL_SEED_DOSSIERS["lifestyle-metabolic-and-environmental-fertility-optimization"]
      : isEmbryoGlueTopic
        ? ALL_SEED_DOSSIERS["hyaluronan-embryo-transfer-media-embryoglue-implantation-adherence"]
        : ALL_SEED_DOSSIERS[topic.slug];

  const { claims, dbSources, milestones, debates } = mergeCuratedDossierRecords(
    curatedDossier,
    isLegacyFetIntervalTopic || isEmbryoGlueTopic ? [] : (rawClaims ?? []),
    isLegacyFetIntervalTopic || isEmbryoGlueTopic ? [] : (rawDbSources ?? []),
    isLegacyFetIntervalTopic || isEmbryoGlueTopic ? [] : (rawMilestones ?? []),
    isLegacyFetIntervalTopic || isEmbryoGlueTopic ? [] : (rawDebates ?? []),
  );

  const busy =
    !isEmbryoGlueTopic &&
    (open > 0 || topic.status === "queued" || topic.status === "researching");
  const claimNumber = new Map((claims ?? []).map((c, i) => [c.id, i + 1]));
  const sources = mergeSources(dbSources, claims);

  const safeEntities = (isLegacyFetIntervalTopic || isEmbryoGlueTopic ? [] : (entities ?? [])).map((e) => ({
    ...e,
    attributes: e.attributes && typeof e.attributes === "object" ? e.attributes : {},
    sourceUrls: Array.isArray(e.sourceUrls) ? e.sourceUrls : [],
  }));
  const entityGroups = groupBy(safeEntities, (e) => e.kind);
  const safeConnectedTopics = (connectedTopics ?? []).map((l) =>
    isLegacyFetIntervalTopic
      ? {
          ...l,
          slug: toNestedPath(l.slug, l.id),
          note: "Connects immediate next-menstrual-cycle Frozen Embryo Transfer versus a 1–3 month interval for a vitrified blastocyst at −196°C with modifiable endometrial receptivity factors.",
        }
      : {
          ...l,
          slug: toNestedPath(l.slug, l.id),
          note: l.note ? normaliseAgePhrasing(l.note) : null,
        },
  );

  const safeJobs = Array.isArray(jobs) ? jobs : [];
  const activeJob = safeJobs.find((j) => j.status === "running");
  const queuedJobs = safeJobs
    .filter((j) => j.status === "queued")
    .sort((a, b) => (STAGE_ORDER[a.kind] ?? 99) - (STAGE_ORDER[b.kind] ?? 99));
  const running = activeJob ?? queuedJobs[0];
  const failed = safeJobs.find((j) => j.status === "failed");

  if (busy && !activeJob && open > 0) {
    void triggerRemoteWorker();
  }

  const displayTitle = normaliseTopicTitle(topic.title);
  const briefText = isLegacyFetIntervalTopic
    ? "After an unsuccessful embryo transfer, with one remaining vitrified blastocyst: evidence comparing immediate next-menstrual-cycle Frozen Embryo Transfer (FET) versus waiting 1–3 months, cryostorage stability at −196°C, and specific uterine, endocrine, or psychological factors that justify a purposeful interval."
    : isLifestyleConceptionTopic
      ? "Non-assisted reproductive optimization at 40–50: circadian sleep and follicular melatonin signaling, pro-fertility nutrition and targeted micronutrient protocols, oocyte mitochondrial ATP bioenergetics (CoQ10, NAD+, spermidine mitophagy), and organic facilitators (24–36h sperm DNA fragmentation reduction, early-shifted fertile window timing, cervical mucus protection, and endocrine/toxin clearance)."
      : isEmbryoGlueTopic
        ? "Randomised clinical trials, Cochrane meta-analyses, and biophysical mechanisms of hyaluronan-enriched embryo transfer medium (EmbryoGlue, 0.5 mg/mL hyaluronan) versus standard low-hyaluronan transfer media: CD44 and RHAMM receptor-mediated embryo–endometrial apposition, luminal fluid viscosity, live-birth and clinical pregnancy rates across fresh and frozen-thawed embryo transfers (FET), recurrent implantation failure (RIF) and maternal age ≥35 subgroups, multiple pregnancy risk, and ESHRE add-on guidance."
        : (topic.brief ? normaliseAgePhrasing(topic.brief) : null) ??
          (ancestors.length > 0
            ? `Scientific synthesis, primary literature, and graded evidence within ${normaliseTopicTitle(ancestors[ancestors.length - 1]!.title)}.`
            : `Scientific synthesis, primary literature, and graded evidence across ${displayTitle}.`);

  const rawEffectiveSummary =
    (isLegacyFetIntervalTopic || isLifestyleConceptionTopic || isEmbryoGlueTopic) && curatedDossier
      ? curatedDossier.summary
      : (topic.summary ?? curatedDossier?.summary ?? null);
  const effectiveSummary =
    (rawEffectiveSummary ? normaliseAgePhrasing(rawEffectiveSummary) : null) ??
    describeTopicFallback({ ...topic, title: displayTitle }, ancestors, children, sources.length, (claims ?? []).length);

  let rawSynthesis: TopicSynthesis | null = null;
  if ((isLegacyFetIntervalTopic || isLifestyleConceptionTopic || isEmbryoGlueTopic) && curatedDossier?.synthesis) {
    rawSynthesis = curatedDossier.synthesis;
  } else if (typeof topic.synthesis === "string") {
    try {
      rawSynthesis = JSON.parse(topic.synthesis);
    } catch {
      rawSynthesis = null;
    }
  } else if (topic.synthesis && typeof topic.synthesis === "object") {
    rawSynthesis = topic.synthesis;
  }
  if (
    curatedDossier?.synthesis &&
    (!rawSynthesis || (!rawSynthesis.benchmarks?.length && !rawSynthesis.levers?.length))
  ) {
    rawSynthesis = curatedDossier.synthesis;
  } else if (curatedDossier?.synthesis?.article && rawSynthesis) {
    rawSynthesis = { ...rawSynthesis, article: curatedDossier.synthesis.article };
  }
  const synthesis = normaliseTopicSynthesis(rawSynthesis);

  const effectiveGaps = Array.from(
    new Set(
      isLegacyFetIntervalTopic || isLifestyleConceptionTopic || isEmbryoGlueTopic
        ? (curatedDossier?.gaps ?? [])
        : [...(curatedDossier?.gaps ?? []), ...(topic.gaps ?? [])],
    ),
  ).map(normaliseAgePhrasing);

  const benchmarks = Array.isArray(synthesis?.benchmarks) ? synthesis.benchmarks : [];
  const levers = Array.isArray(synthesis?.levers) ? synthesis.levers : [];
  const clinicalQuestions = Array.isArray(synthesis?.clinicalQuestions) ? synthesis.clinicalQuestions : [];
  const sweepQueue = Array.isArray(synthesis?.sweepQueue) ? synthesis.sweepQueue : [];
  const leverCategories = [...new Set(levers.map((l) => l?.category).filter(Boolean))];

  const lastResearchedStr = formatTopicDate(topic.lastResearchedAt);
  const completedKinds = new Set(safeJobs.filter((j) => j.status === "done").map((j) => j.kind));
  const openKinds = new Set(
    safeJobs.filter((j) => j.status === "running" || j.status === "queued").map((j) => j.kind),
  );

  const validMilestones = (milestones ?? []).filter((m) => m && typeof m.year === "number");
  const validDebates = (debates ?? []).map((d) => ({
    ...d,
    kind: normaliseAgePhrasing(d.kind),
    note: normaliseAgePhrasing(d.note),
    claimIds: Array.isArray(d.claimIds) ? d.claimIds : [],
  }));

  const isClinicalTopic =
    isLifestyleConceptionTopic ||
    topic.slug.includes("medicine") ||
    topic.slug.includes("fertility") ||
    topic.slug.includes("ovarian") ||
    topic.slug.includes("endometrial") ||
    topic.slug.includes("andrology") ||
    topic.slug.includes("maternal") ||
    topic.slug.includes("gamete") ||
    topic.slug.includes("reproductive") ||
    topic.slug.includes("geroscience") ||
    topic.slug.includes("neuroscience") ||
    ancestors.some((a) => a.slug.includes("medicine") || a.slug.includes("fertility"));

  const hasIntermediateSections =
    benchmarks.length > 0 ||
    levers.length > 0 ||
    clinicalQuestions.length > 0 ||
    sweepQueue.length > 0 ||
    validMilestones.length > 0 ||
    claims.length > 0 ||
    validDebates.length > 0 ||
    safeEntities.length > 0;

  const spawnedSlugs = (resolvedSearchParams?.spawned ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const treeNodeBySlug = new Map<string, { slug: string; title: string; parentTitle: string | null }>();
  const indexTreeNodes = (nodes: typeof roots, parentTitle: string | null) => {
    for (const n of nodes) {
      treeNodeBySlug.set(n.slug, { slug: n.slug, title: normaliseTopicTitle(n.title), parentTitle });
      if (Array.isArray(n.children) && n.children.length > 0) {
        indexTreeNodes(n.children, normaliseTopicTitle(n.title));
      }
    }
  };
  indexTreeNodes(roots, null);

  const spawnedBranches = spawnedSlugs
    .map((s) => treeNodeBySlug.get(toNestedPath(s)) ?? treeNodeBySlug.get(s))
    .filter((n): n is { slug: string; title: string; parentTitle: string | null } => Boolean(n));

  const monograph = buildDynamicFieldArticle({
    title: displayTitle,
    brief: briefText,
    status: topic.status === "idle" && curatedDossier ? "ready" : topic.status,
    summary: effectiveSummary,
    gaps: effectiveGaps,
    synthesis,
    ancestors: ancestors.map((a) => ({ title: normaliseTopicTitle(a.title), slug: a.slug })),
    children: children.map((c) => ({ title: normaliseTopicTitle(c.title), slug: c.slug, brief: c.brief })),
    claims: claims ?? [],
    sources,
    milestones: validMilestones,
    debates: validDebates,
    entities: safeEntities,
  });

  const topicJsonLd = buildTopicJsonLd({
    siteUrl: getSiteUrl(),
    canonicalPath: canonicalNestedSlug,
    title: displayTitle,
    brief: briefText,
    summary: effectiveSummary,
    status: topic.status === "idle" && curatedDossier ? "ready" : topic.status,
    lastResearchedAt: topic.lastResearchedAt,
    ancestors: ancestors.map((a) => ({ title: normaliseTopicTitle(a.title), slug: a.slug })),
    children: children.map((c) => ({ title: normaliseTopicTitle(c.title), slug: c.slug, brief: c.brief })),
    sourcesCount: sources.length,
    claimsCount: (claims ?? []).length,
    bestTier: monograph.bestTier,
    isClinicalTopic,
    monograph,
    levers,
    sources: sources.map((s) => ({
      title: s.title,
      doi: s.doi,
      year: s.year,
      authors: s.authors,
      url: s.url,
      venue: s.venue,
    })),
  });

  return (
    <main className="topic-layout">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(topicJsonLd) }}
      />
      <AutoRefresh active={busy} />
      <nav className="side" aria-label="Library tree">
        <Tree roots={roots} activeSlug={canonicalNestedSlug} />
      </nav>

      <article className="topic">
        {spawnedBranches.length > 1 && (
          <section className="spawned-branches-banner" role="status" aria-label="AI tree organisation summary">
            <div className="spawned-banner-header">
              <span className="new-topic-kicker">AI Tree Organiser</span>
              <strong>
                Organised &amp; cross-linked {spawnedBranches.length} canonical branches from your inquiry
              </strong>
            </div>
            <ul className="spawned-branches-list">
              {spawnedBranches.map((b, idx) => (
                <li key={b.slug} className={b.slug === canonicalNestedSlug ? "is-current" : ""}>
                  <span className="spawned-index">{idx + 1}.</span>
                  <Link href={`/topic/${b.slug}?spawned=${encodeURIComponent(spawnedSlugs.join(","))}`}>
                    {b.title}
                  </Link>
                  {b.parentTitle && <span className="muted small"> · under {b.parentTitle}</span>}
                  {b.slug === canonicalNestedSlug && <span className="spawned-current-tag">viewing</span>}
                </li>
              ))}
            </ul>
          </section>
        )}
        <nav aria-label="Breadcrumb" className="trail">
          <Link href="/">Library</Link>
          {ancestors.map((a) => (
            <span key={a.id}>
              {" / "}
              <Link href={`/topic/${a.slug}`}>{normaliseTopicTitle(a.title)}</Link>
            </span>
          ))}
        </nav>
        <h1>{displayTitle}</h1>
        <p className="brief">{briefText}</p>

        <form action={researchTopic} className="research-bar">
          <input type="hidden" name="topicId" value={topic.id} />
          <button type="submit" disabled={busy}>
            {busy ? "Research in progress" : lastResearchedStr ? "Research again" : "Research this topic"}
          </button>
          <label className="check">
            <input type="checkbox" name="withBranches" defaultChecked={!lastResearchedStr} /> include the next level of branches
          </label>
          <a href="#sources" className="sources-jump">
            {sources.length} {sources.length === 1 ? "source" : "sources"} ↓
          </a>
          <span className="status-line" role="status">
            {busy && activeJob ? `${JOB_WORDS[activeJob.kind] ?? activeJob.kind}…` : null}
            {busy && !activeJob && running ? `Queued: ${JOB_WORDS[running.kind] ?? running.kind}…` : null}
            {!busy && lastResearchedStr ? `Last researched ${lastResearchedStr}` : null}
            {topic.status === "error" && failed ? ` Stopped: ${failed.error?.split("\n")[0]}` : null}
          </span>
        </form>

        {busy && (
          <section className="research-progress-card" aria-label="Autonomous research progress" role="status">
            <div className="research-progress-header">
              <div className="progress-status-badge">
                <span className="pulse-indicator" aria-hidden="true" />
                <strong>
                  {activeJob
                    ? (JOB_WORDS[activeJob.kind] ?? `Running ${activeJob.kind}`)
                    : running
                      ? `Queued: ${JOB_WORDS[running.kind] ?? running.kind}`
                      : "Autonomous research in progress"}
                </strong>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span className="tasks-count muted small">
                  {open} {open === 1 ? "task" : "tasks"} active in queue
                </span>
                {!activeJob && open > 0 && (
                  <form action={wakeWorker} style={{ margin: 0 }}>
                    <input type="hidden" name="slug" value={canonicalNestedSlug} />
                    <button type="submit" className="small">
                      Wake worker
                    </button>
                  </form>
                )}
              </div>
            </div>

            <ol className="pipeline-stepper" aria-label="Autonomous research pipeline stages">
              {PIPELINE_STAGES.map((stage, idx) => {
                const isCurrent = running?.kind === stage.kind;
                const isDone = !isCurrent && !openKinds.has(stage.kind) && completedKinds.has(stage.kind);
                const isQueued = !isCurrent && !isDone && openKinds.has(stage.kind);
                const stageStatus = isCurrent ? "running" : isDone ? "done" : isQueued ? "queued" : "pending";

                return (
                  <li key={stage.kind} className="stepper-step" data-status={stageStatus}>
                    <div className="step-marker" aria-hidden="true">
                      {isDone ? "✓" : idx + 1}
                    </div>
                    <div className="step-info">
                      <span className="step-label">{stage.label}</span>
                      <span className="step-desc muted small">{stage.description}</span>
                    </div>
                  </li>
                );
              })}
            </ol>

            {safeJobs.length > 0 && (
              <div className="recent-jobs-stream">
                <h4 className="stream-heading small muted">Recent pipeline activity</h4>
                <ul className="activity-list small">
                  {safeJobs.slice(0, 5).map((j) => (
                    <li key={j.id} className="activity-item">
                      <span className={`job-status-tag status-${j.status}`}>{j.status}</span>
                      <span className="job-name">{JOB_WORDS[j.kind] ?? j.kind}</span>
                      {j.error && <span className="job-error-msg muted">{j.error.split("\n")[0]}</span>}
                      {j.createdAt && (
                        <time className="job-time muted">
                          {formatJobTime(j.createdAt)}
                        </time>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="auto-refresh-note muted small" style={{ margin: 0 }}>
              This page automatically refreshes as the research worker completes each stage.
            </p>
          </section>
        )}

        {topic.status === "error" && failed && (
          <section className="research-error-card" role="alert">
            <div className="error-header">
              <strong>Research paused due to an error:</strong>
            </div>
            <p className="error-message" style={{ margin: 0 }}>{failed.error?.split("\n")[0] ?? "Unknown worker error"}</p>
            <p className="muted small" style={{ margin: 0 }}>
              Check API keys or network availability, then click &ldquo;Research again&rdquo; above to retry.
            </p>
          </section>
        )}

        <section className="summary">
          <NodeTopologyMap
            displayTitle={displayTitle}
            ancestors={ancestors}
            childrenNodes={children}
            associatedNodes={safeConnectedTopics}
            showNotes={!hasIntermediateSections}
          />
        </section>

        <FieldResearchArticle
          monograph={monograph}
          sourcesCount={sources.length}
          claimsCount={(claims ?? []).length}
        />

        {benchmarks.length > 0 && (
          <section className="benchmarks-section" aria-label="Baseline probability benchmarks">
            <div className="benchmarks-grid">
              {benchmarks.map((b, i) => (
                <div key={i} className="benchmark-card">
                  <span className="benchmark-metric">{b.metric}</span>
                  <p className="benchmark-label">{b.label}</p>
                  <p className="benchmark-source muted small">
                    {b.sourceUrl ? (
                      <a href={b.sourceUrl} target="_blank" rel="noopener noreferrer">
                        {b.source}
                      </a>
                    ) : (
                      b.source
                    )}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {levers.length > 0 && (
          <section className="decision-ledger-section">
            <h2>{isClinicalTopic ? "Where each lever applies" : "Where each model, theorem & mechanism applies"}</h2>
            <p className="section-note">
              {isClinicalTopic
                ? "A graded decision ledger of interventions across clinical subgroups. Each row names its best landmark evidence, measured effect, clinical reading, and epistemic verdict."
                : "A graded evaluation ledger of theoretical models, mathematical theorems, empirical mechanisms, and regime boundaries. Each row names its landmark evidence, quantitative scaling or effect, epistemic reading (including ad-hoc assumptions and breakdown limits), and verdict."}
            </p>

            <div className="verdict-legend" role="note" aria-label="Verdict legend">
              {isClinicalTopic ? (
                <>
                  <span className="verdict-tag" data-verdict="Supported">Supported: RCT live-birth gain</span>
                  <span className="verdict-tag" data-verdict="Targeted">Targeted: specific subgroup</span>
                  <span className="verdict-tag" data-verdict="Guideline">Guideline: clinical consensus</span>
                  <span className="verdict-tag" data-verdict="Weak">Weak: inconsistent/unproven gain</span>
                  <span className="verdict-tag" data-verdict="Not supported">Not supported: RCTs show no gain</span>
                  <span className="verdict-tag" data-verdict="Trial only">Trial: human trial in progress</span>
                  <span className="verdict-tag" data-verdict="Lab only">Lab: preclinical / cell dish</span>
                </>
              ) : (
                <>
                  <span className="verdict-tag" data-verdict="Supported">Supported: replicated empirical / mathematical proof</span>
                  <span className="verdict-tag" data-verdict="Targeted">Targeted: valid in bounded regime / scale</span>
                  <span className="verdict-tag" data-verdict="Guideline">Guideline: canonical law / standard framework</span>
                  <span className="verdict-tag" data-verdict="Weak">Weak: ad-hoc parameters / low-SNR / contested</span>
                  <span className="verdict-tag" data-verdict="Not supported">Not supported: falsified / null replication</span>
                  <span className="verdict-tag" data-verdict="Trial only">Trial: active experiment / sky survey</span>
                  <span className="verdict-tag" data-verdict="Lab only">Lab: theoretical / numerical simulation</span>
                </>
              )}
            </div>

            {leverCategories.map((category) => {
              const items = levers.filter((l) => l.category === category);
              return (
                <div key={category} className="ledger-category">
                  <h3 className="category-heading">{category}</h3>
                  <div className="ledger-table-wrap">
                    <table className="ledger-table">
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: "24%" }}>
                            {isClinicalTopic ? "Lever & Mechanism" : "Model, Theorem & Mechanism"}
                          </th>
                          <th scope="col" style={{ width: "26%" }}>
                            {isClinicalTopic ? "Best Landmark Evidence" : "Landmark Evidence & Derivation"}
                          </th>
                          <th scope="col" style={{ width: "36%" }}>
                            {isClinicalTopic ? "Measured Effect & Clinical Reading" : "Quantitative Scaling & Regime Reading"}
                          </th>
                          <th scope="col" style={{ width: "14%" }}>Verdict</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((lever, idx) => (
                          <tr key={idx} className="ledger-row">
                            <td className="lever-cell-main">
                              <strong className="lever-name">{lever.name}</strong>
                              {lever.description && <p className="lever-desc muted">{lever.description}</p>}
                            </td>
                            <td className="lever-cell-evidence">
                              <p>{lever.bestEvidence}</p>
                              {lever.sourceUrl && (
                                <p className="small">
                                  <a href={lever.sourceUrl} target="_blank" rel="noopener noreferrer">
                                    Source document →
                                  </a>
                                </p>
                              )}
                            </td>
                            <td className="lever-cell-effect">
                              <p className="lever-effect">
                                <strong>Effect:</strong> {lever.effect}
                              </p>
                              {lever.reading && (
                                <p className="lever-reading muted small">
                                  <strong>{isClinicalTopic ? "Clinical reading:" : "Epistemic & regime reading:"}</strong>{" "}
                                  {lever.reading}
                                </p>
                              )}
                            </td>
                            <td className="lever-cell-verdict">
                              <span className="verdict-tag" data-verdict={lever.verdict}>
                                {lever.verdict}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {clinicalQuestions.length > 0 && (
          <section className="clinic-questions-section">
            <h2>
              {isClinicalTopic
                ? "Questions for specialist consultations"
                : "Key theoretical, empirical & quantitative questions"}
            </h2>
            <p className="section-note">
              {isClinicalTopic
                ? "High-yield clinical and laboratory inquiries directly derived from the evidence record."
                : "High-yield research questions, regime boundary diagnostics, and quantitative tests derived from the evidence record."}
            </p>
            <ol className="clinic-questions">
              {clinicalQuestions.map((q, idx) => (
                <li key={idx}>
                  <span className="question-text">{q}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {sweepQueue.length > 0 && (
          <section className="sweep-queue-section">
            <h2>Queued for next research sweep</h2>
            <p className="section-note">
              {isClinicalTopic
                ? "Frontier clinical trials, emerging biology, and targeted subgroup outcomes tracked by the autonomous research worker."
                : "Frontier experiments, sky surveys, mathematical conjectures, and empirical replications tracked by the autonomous research worker."}
            </p>
            <ul className="sweep-queue">
              {sweepQueue.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {validMilestones.length > 0 && (
          <details className="timeline-details">
            <summary className="timeline-summary">
              <span>
                Historical timeline ({validMilestones.length} {validMilestones.length === 1 ? "milestone" : "milestones"}
                {validMilestones[0]?.year && validMilestones[validMilestones.length - 1]?.year
                  ? `, ${validMilestones[0].year}–${validMilestones[validMilestones.length - 1].year}`
                  : ""})
              </span>
            </summary>
            <ol className="timeline">
              {validMilestones.map((m) => (
                <li key={m.id}>
                  <span className="year">{m.year}</span>
                  <div>
                    <p className="milestone-title">
                      {m.sourceUrl ? (
                        <a href={m.sourceUrl} target="_blank" rel="noopener noreferrer">
                          {m.title}
                        </a>
                      ) : (
                        m.title
                      )}
                    </p>
                    {m.description && <p className="muted">{m.description}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </details>
        )}

        {claims.length > 0 && (
          <details className="collapsible-section" open={levers.length === 0}>
            <summary className="section-summary">
              <span>
                Evidence by study design ({claims.length} {claims.length === 1 ? "finding" : "findings"} across T1–T6)
              </span>
            </summary>
            <p className="section-note" style={{ marginTop: "0.85rem" }}>
              Strongest support first. The bar beside each finding shows its grade.
            </p>
            {TIERS.map((tier) => {
              const rows = claims.filter((c) => c.tier === tier);
              if (rows.length === 0) return null;
              return (
                <div key={tier} className="tier-group">
                  <h3 data-tier={tier}>{TIER_LABELS[tier]}</h3>
                  <ol className="claims">
                    {rows.map((c) => (
                      <ClaimItem key={c.id} claim={c} n={claimNumber.get(c.id)!} />
                    ))}
                  </ol>
                </div>
              );
            })}
          </details>
        )}

        {validDebates.length > 0 && (
          <details className="collapsible-section">
            <summary className="section-summary">
              <span>
                Where the record disagrees ({validDebates.length} {validDebates.length === 1 ? "controversy" : "controversies"})
              </span>
            </summary>
            <ul className="debates" style={{ marginTop: "0.85rem" }}>
              {validDebates.map((d) => (
                <li key={d.id}>
                  <p>{d.note}</p>
                  {(d.claimIds ?? []).length > 0 && (
                    <p className="muted small">
                      Findings {d.claimIds.map((id) => claimNumber.get(id)).filter(Boolean).map((n) => `#${n}`).join(", ")}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </details>
        )}

        {safeEntities.length > 0 && (
          <details className="collapsible-section">
            <summary className="section-summary">
              <span>
                In the world ({safeEntities.length}{" "}
                {isClinicalTopic ? "clinics, treatments, and groups" : "institutes, experiments, and groups"})
              </span>
            </summary>
            <p className="section-note" style={{ marginTop: "0.85rem" }}>
              Found on the web. Only entries a retrieved page supports are kept; verify before acting.
            </p>
            {[...entityGroups.entries()].map(([kind, rows]) => (
              <EntityTable key={kind} title={ENTITY_HEADINGS[kind] ?? kind} rows={rows} />
            ))}
          </details>
        )}

        {hasIntermediateSections && (
          <section className="topology-before-branches">
            <h2>Node lineage &amp; crossover disciplines</h2>
            <p className="section-note">
              Parent lineage, active node, direct child sub-branches, and associated crossover disciplines across the Tree of Knowledge.
            </p>
            <NodeTopologyMap
              displayTitle={displayTitle}
              ancestors={ancestors}
              childrenNodes={children}
              associatedNodes={safeConnectedTopics}
              showNotes
            />
          </section>
        )}

        <section>
          <h2>Branches</h2>
          {children.length > 0 ? (
            <ul className="branches">
              {children.map((c) => (
                <li key={c.id}>
                  <Link href={`/topic/${c.slug}`}>{c.title}</Link>
                  {c.brief && <span className="muted"> {c.brief}</span>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">
              No sub-branches yet. Autonomous research agents and the AI tree organiser spawn canonical sub-disciplines here when needed.
            </p>
          )}
          <NewTopicForm parentId={topic.id} parentTitle={displayTitle} />
        </section>

        <details id="sources" className="collapsible-section">
          <summary className="section-summary">
            <span>Primary indexed sources ({sources.length})</span>
          </summary>
          <p className="section-note" style={{ marginTop: "0.85rem" }}>
            Primary scientific literature, systematic reviews, and clinical trial registrations indexed for this branch.
          </p>
          {sources.length > 0 ? (
            <ol className="sources">
              {sources.map((s) => (
                <li key={s.id}>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.title}
                    </a>
                  ) : (
                    s.title
                  )}
                  {(s.authors ?? []).length > 0 && (
                    <span className="muted">
                      {" — "}
                      {s.authors.slice(0, 3).join(", ")}
                      {s.authors.length > 3 ? " et al." : ""}
                    </span>
                  )}
                  <span className="muted">
                    {" "}
                    {[
                      s.venue,
                      s.year,
                      s.design?.replace(/_/g, " "),
                      s.citedBy && s.citedBy > 0 ? `${s.citedBy} citations` : null,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                  {s.doi && (
                    <span className="muted small">
                      {" · "}
                      <a href={`https://doi.org/${s.doi}`} target="_blank" rel="noopener noreferrer">
                        DOI: {s.doi}
                      </a>
                    </span>
                  )}
                </li>
              ))}
            </ol>
          ) : (
            <p className="muted">
              No sources indexed on this branch yet. Click &ldquo;Research this topic&rdquo; above to harvest primary literature from Europe PMC, OpenAlex, and ClinicalTrials.gov.
            </p>
          )}
        </details>
      </article>
    </main>
  );
}

function ClaimItem({ claim, n }: { claim: ClaimView; n: number }) {
  const flagged = claim.controversy !== "settled";
  const claimSources = Array.isArray(claim.sources) ? claim.sources : [];
  return (
    <li className="claim" data-tier={claim.tier} id={`claim-${n}`}>
      <p className="statement">
        <span className="claim-n">#{n}</span> {claim.statement}
      </p>
      <p className="claim-meta">
        {flagged && <span className="flag" data-kind={claim.controversy}>{CONTROVERSY_LABELS[claim.controversy as Controversy]}</span>}
        {claimSources.slice(0, 4).map((s, i) => (
          <span key={s.id}>
            {i > 0 && "; "}
            {s.url ? (
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {shortTitle(s.title ?? "Source")}
              </a>
            ) : (
              shortTitle(s.title ?? "Source")
            )}
            {s.year ? ` (${s.year})` : ""}
          </span>
        ))}
        {claimSources.length > 4 && <span>; and {claimSources.length - 4} more</span>}
      </p>
      {claim.rationale && <p className="rationale">{claim.rationale}</p>}
    </li>
  );
}

function EntityTable({ title, rows }: { title: string; rows: EntityView[] }) {
  return (
    <div className="entity-group">
      <h3>{title}</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Country</th>
              <th scope="col">What the sources say</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => {
              const attrs = e.attributes && typeof e.attributes === "object" ? Object.entries(e.attributes) : [];
              const sourceUrls = Array.isArray(e.sourceUrls) ? e.sourceUrls : [];
              return (
                <tr key={e.id}>
                  <td>{e.url ? <a href={e.url} target="_blank" rel="noopener noreferrer">{e.name}</a> : e.name}</td>
                  <td>{e.country ?? ""}</td>
                  <td>
                    {e.summary}
                    {attrs.length > 0 && (
                      <dl className="attrs">
                        {attrs.map(([k, v]) => (
                          <div key={k}>
                            <dt>{k}</dt>
                            <dd>{String(v)}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    <span className="muted small">
                      {sourceUrls.map((u, i) => (
                        <a key={u} href={u} target="_blank" rel="noopener noreferrer">
                          {i === 0 ? "source" : ` ${i + 1}`}
                        </a>
                      ))}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function shortTitle(t: string): string {
  return t.length > 70 ? `${t.slice(0, 68)}…` : t;
}

function mergeCuratedDossierRecords(
  dossier: SeedDossier | undefined,
  rawClaims: ClaimView[],
  rawDbSources: SourceView[],
  rawMilestones: MilestoneView[],
  rawDebates: ControversyView[],
): {
  claims: ClaimView[];
  dbSources: SourceView[];
  milestones: MilestoneView[];
  debates: ControversyView[];
} {
  if (!dossier) {
    return {
      claims: rawClaims,
      dbSources: rawDbSources,
      milestones: rawMilestones,
      debates: rawDebates,
    };
  }

  const dbSources = [...rawDbSources];
  const existingSourceKeys = new Set(
    rawDbSources.flatMap((s) =>
      [s.doi?.toLowerCase().trim(), s.url?.toLowerCase().trim(), s.title.toLowerCase().trim()].filter(
        (v): v is string => Boolean(v),
      ),
    ),
  );

  const dossierSourceViews: SourceView[] = dossier.sources.map((s, idx) => ({
    id: `dossier-src-${idx}-${s.externalId}`,
    kind: s.kind,
    origin: s.origin,
    title: s.title,
    url: s.url ?? (s.doi ? `https://doi.org/${s.doi}` : null),
    doi: s.doi ?? null,
    venue: s.venue ?? null,
    year: s.year ?? null,
    authors: s.authors ?? [],
    citedBy: s.citedBy ?? null,
    design: s.design ?? null,
  }));

  for (const ds of dossierSourceViews) {
    const keys = [ds.doi?.toLowerCase().trim(), ds.url?.toLowerCase().trim(), ds.title.toLowerCase().trim()].filter(
      (v): v is string => Boolean(v),
    );
    if (!keys.some((k) => existingSourceKeys.has(k))) {
      dbSources.push(ds);
      for (const k of keys) existingSourceKeys.add(k);
    }
  }

  const existingStatements = new Set(rawClaims.map((c) => c.statement.trim().toLowerCase()));
  const dossierClaimViews: ClaimView[] = [];
  for (let idx = 0; idx < dossier.claims.length; idx++) {
    const c = dossier.claims[idx]!;
    if (existingStatements.has(c.statement.trim().toLowerCase())) continue;
    existingStatements.add(c.statement.trim().toLowerCase());
    const claimSources = c.sourceIndexes
      .map((sIdx) => dossierSourceViews[sIdx])
      .filter((s): s is SourceView => Boolean(s))
      .map((s) => ({
        id: s.id,
        title: s.title,
        url: s.url,
        year: s.year,
        design: s.design,
        venue: s.venue,
      }));
    dossierClaimViews.push({
      id: `dossier-claim-${idx}`,
      statement: c.statement,
      tier: c.tier,
      controversy: c.controversy,
      direction: c.direction,
      confidence: c.confidence,
      rationale: c.rationale,
      sources: claimSources,
    });
  }

  const tierRank: Record<string, number> = { T1: 1, T2: 2, T3: 3, T4: 4, T5: 5, T6: 6 };
  const claims = [...dossierClaimViews, ...rawClaims].sort(
    (a, b) => (tierRank[a.tier] ?? 9) - (tierRank[b.tier] ?? 9) || b.confidence - a.confidence,
  );

  const existingMilestoneTitles = new Set(rawMilestones.map((m) => m.title.trim().toLowerCase()));
  const milestones = [...rawMilestones];
  for (let idx = 0; idx < dossier.milestones.length; idx++) {
    const m = dossier.milestones[idx]!;
    if (existingMilestoneTitles.has(m.title.trim().toLowerCase())) continue;
    existingMilestoneTitles.add(m.title.trim().toLowerCase());
    const linkedSrc = m.sourceIndex !== undefined ? dossierSourceViews[m.sourceIndex] : undefined;
    milestones.push({
      id: `dossier-milestone-${idx}`,
      year: m.year,
      title: m.title,
      description: m.description,
      sourceUrl: linkedSrc?.url ?? null,
    });
  }
  milestones.sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));

  const existingDebateNotes = new Set(rawDebates.map((d) => d.note.trim().toLowerCase()));
  const debates = [...rawDebates];
  for (let idx = 0; idx < dossier.controversies.length; idx++) {
    const d = dossier.controversies[idx]!;
    if (existingDebateNotes.has(d.note.trim().toLowerCase())) continue;
    existingDebateNotes.add(d.note.trim().toLowerCase());
    const resolvedClaimIds = d.claimIndexes
      .map((cIdx) => {
        const stmt = dossier.claims[cIdx]?.statement.trim().toLowerCase();
        if (!stmt) return null;
        return claims.find((cl) => cl.statement.trim().toLowerCase() === stmt)?.id ?? null;
      })
      .filter((id): id is string => Boolean(id));
    debates.push({
      id: `dossier-debate-${idx}`,
      kind: d.kind,
      note: d.note,
      claimIds: resolvedClaimIds,
    });
  }

  return { claims, dbSources, milestones, debates };
}

function mergeSources(dbSources: SourceView[] = [], claims: ClaimView[] = []): SourceView[] {
  const seen = new Map<string, SourceView>();
  for (const s of dbSources ?? []) {
    if (s?.id) seen.set(s.id, s);
  }
  for (const c of claims ?? []) {
    if (!Array.isArray(c?.sources)) continue;
    for (const s of c.sources) {
      if (s?.id && !seen.has(s.id)) {
        seen.set(s.id, {
          id: s.id,
          kind: "paper",
          origin: "literature",
          title: s.title ?? "Untitled",
          url: s.url ?? null,
          doi: null,
          venue: s.venue ?? null,
          year: s.year ?? null,
          authors: [],
          citedBy: null,
          design: s.design ?? null,
        });
      }
    }
  }
  return [...seen.values()].sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || (b.citedBy ?? 0) - (a.citedBy ?? 0));
}

function describeTopicFallback(
  topic: Topic,
  ancestors: Topic[],
  children: Topic[],
  sourceCount: number,
  claimCount: number,
): string {
  const lineage = ancestors.length > 0 ? ` within ${ancestors.map((a) => a.title).join(" › ")}` : "";
  const scopeSentence = topic.brief
    ? `${topic.title} is a scientific branch${lineage} investigating ${topic.brief.charAt(0).toLowerCase()}${topic.brief.slice(1)}`
    : `${topic.title} is a scientific branch${lineage} synthesising primary peer-reviewed literature, clinical trial registries, and empirical evidence across the human population.`;
  const subBranchesSentence =
    children.length > 0
      ? ` This domain encompasses ${children.length} specialised sub-disciplines: ${children.map((c) => c.title).join("; ")}.`
      : "";
  const corpusSentence =
    sourceCount > 0
      ? ` The library currently indexes ${sourceCount} primary ${sourceCount === 1 ? "source" : "sources"}${claimCount > 0 ? ` and ${claimCount} graded ${claimCount === 1 ? "finding" : "findings"}` : ""} for this branch.`
      : "";
  return `${scopeSentence}${subBranchesSentence}${corpusSentence}`;
}

function groupBy<T, K>(xs: T[], key: (x: T) => K): Map<K, T[]> {
  const m = new Map<K, T[]>();
  for (const x of xs) m.set(key(x), [...(m.get(key(x)) ?? []), x]);
  return m;
}

function NodeTopologyMap({
  displayTitle,
  ancestors,
  childrenNodes,
  associatedNodes,
  showNotes = false,
}: {
  displayTitle: string;
  ancestors: Topic[];
  childrenNodes: Topic[];
  associatedNodes: TopicLinkView[];
  showNotes?: boolean;
}) {
  return (
    <div className="node-topology-map" role="region" aria-label="Node hierarchy and crossover map">
      <div className="node-map-row">
        <span className="node-map-label">Hierarchy:</span>
        <div className="node-map-flow">
          {ancestors.length > 0 ? (
            ancestors.map((a) => (
              <span key={a.id} className="node-map-step">
                <Link href={`/topic/${a.slug}`} className="node-map-pill node-map-parent" title="Parent discipline">
                  {normaliseTopicTitle(a.title)}
                </Link>
                <span className="node-map-arrow" aria-hidden="true">
                  →
                </span>
              </span>
            ))
          ) : (
            <span className="node-map-step">
              <Link href="/" className="node-map-pill node-map-parent" title="Root of the Tree of Knowledge">
                Tree of Knowledge (Root)
              </Link>
              <span className="node-map-arrow" aria-hidden="true">
                →
              </span>
            </span>
          )}
          <span className="node-map-pill node-map-self" aria-current="page">
            {displayTitle}
          </span>
          <span className="node-map-arrow" aria-hidden="true">
            →
          </span>
          {childrenNodes.length > 0 ? (
            <span className="node-map-children">
              {childrenNodes.map((c) => (
                <Link key={c.id} href={`/topic/${c.slug}`} className="node-map-pill node-map-child" title={c.brief ?? "Child sub-discipline"}>
                  {normaliseTopicTitle(c.title)}
                </Link>
              ))}
            </span>
          ) : (
            <span className="node-map-empty muted small">Leaf node (no child sub-branches yet)</span>
          )}
        </div>
      </div>

      <div className="node-map-row node-map-crossovers">
        <span className="node-map-label">+ Associated nodes:</span>
        {associatedNodes.length > 0 ? (
          <div className="node-map-assoc-wrap">
            <div className="node-map-flow">
              {associatedNodes.map((l) => (
                <Link
                  key={l.id}
                  href={`/topic/${l.slug}`}
                  className="node-map-pill node-map-assoc"
                  title={l.note ?? l.brief ?? l.relation}
                >
                  <span className="node-map-plus" aria-hidden="true">
                    +
                  </span>{" "}
                  {normaliseTopicTitle(l.title)}{" "}
                  <span className="node-map-rel">({l.relation})</span>
                </Link>
              ))}
            </div>
            {showNotes && (
              <ul className="cross-links node-map-notes">
                {associatedNodes.map((l) => (
                  <li key={l.id}>
                    <span className="relation-badge">+ {l.relation}</span>{" "}
                    <Link href={`/topic/${l.slug}`}>{normaliseTopicTitle(l.title)}</Link>
                    {(l.note ?? l.brief) && <span className="muted"> — {l.note ?? l.brief}</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <span className="node-map-empty muted small">No cross-branch associations recorded yet</span>
        )}
      </div>
    </div>
  );
}
