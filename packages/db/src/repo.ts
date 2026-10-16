import {
  slugify,
  type Controversy,
  type Direction,
  type EntityKind,
  type JobKind,
  type SourceRecord,
  type StudyDesign,
  type Tier,
  type Topic,
  type TopicStatus,
  type TopicSynthesis,
} from "@lib/core";
import type { Sql } from "./client";

/* ---------------------------------------------------------------- topics */

export interface TreeNode {
  id: string;
  parentId: string | null;
  slug: string;
  title: string;
  brief: string | null;
  status: TopicStatus;
  depth: number;
  claimCount: number;
}

export async function createTopic(
  sql: Sql,
  input: { title: string; brief?: string | null; parentId?: string | null },
): Promise<Topic> {
  const parent = input.parentId ? await getTopic(sql, input.parentId) : null;
  const base = slugify(parent ? `${parent.slug}-${input.title}` : input.title);
  let slug = base;
  for (let n = 2; (await sql`SELECT 1 FROM topics WHERE slug = ${slug}`).length > 0; n++) slug = `${base}-${n}`;
  const [row] = await sql<Topic[]>`
    INSERT INTO topics (parent_id, slug, title, brief, depth)
    VALUES (${parent?.id ?? null}, ${slug}, ${input.title.trim()}, ${input.brief ?? null}, ${parent ? parent.depth + 1 : 0})
    RETURNING *`;
  return row!;
}

export async function getTopic(sql: Sql, id: string): Promise<Topic | null> {
  const [row] = await sql<Topic[]>`SELECT * FROM topics WHERE id = ${id}`;
  return row ?? null;
}

const SLUG_PAIRS: [string, string][] = [
  ["human-fertility", "reproductive-medicine-human-fertility"],
  ["human-fertility-using-eggs-vitrified-at-a-younger-age", "ovarian-reserve-oocyte-cryopreservation"],
  ["human-fertility-uterine-receptivity-and-implantation-failure", "endometrial-receptivity-implantation-biology"],
  ["human-fertility-male-factor-after-40", "andrology-male-factor-infertility"],
  ["human-fertility-donor-eggs-in-europe", "assisted-reproductive-technology-gamete-donation"],
  ["human-fertility-frontier-fertility-treatments", "translational-geroprotective-reproductive-biology"],
  ["human-fertility-pregnancy-after-44", "advanced-maternal-age-pregnancy-after-40"],
  ["maternal-fetal-medicine-obstetric-perinatology", "advanced-maternal-age-pregnancy-after-40"],
  [
    "human-fertility-pregnancy-after-44-pre-eclampsia-prophylaxis-and-biomarker-based",
    "pre-eclampsia-pathophysiology-biomarkers-prophylaxis",
  ],
  [
    "human-fertility-male-factor-after-40-paternal-age-effect-on-embryo-and-offspring",
    "paternal-age-effects-on-gamete-embryo-offspring-health",
  ],
  [
    "human-fertility-frontier-fertility-treatments-in-vitro-gametogenesis-ivg",
    "in-vitro-gametogenesis-pluripotent-stem-cell-reprogramming",
  ],
  [
    "human-fertility-frontier-fertility-treatments-mitochondrial-replacement-transfer",
    "mitochondrial-replacement-therapy-ooplasmic-transfer",
  ],
  [
    "human-fertility-frontier-fertility-treatments-ovarian-rejuvenation-intraovarian-",
    "intraovarian-platelet-rich-plasma-stem-cell-biologics",
  ],
  [
    "human-fertility-frontier-fertility-treatments-ovarian-tissue-cryopreservation-tr",
    "ovarian-tissue-cryopreservation-orthotopic-transplantation",
  ],
  [
    "human-fertility-frontier-fertility-treatments-rapamycin-mtor-inhibition-for-ovar",
    "mtor-pathway-modulation-follicular-longevity",
  ],
];

const SLUG_ALIASES = new Map<string, string>([
  ...SLUG_PAIRS.map(([a, b]): [string, string] => [b, a]),
  ...SLUG_PAIRS,
]);

export async function getTopicBySlug(sql: Sql, slug: string): Promise<Topic | null> {
  const [row] = await sql<Topic[]>`SELECT * FROM topics WHERE slug = ${slug}`;
  if (row) return row;
  const alias = SLUG_ALIASES.get(slug);
  if (!alias) return null;
  const [fallback] = await sql<Topic[]>`SELECT * FROM topics WHERE slug = ${alias}`;
  return fallback ?? null;
}

/**
 * Moves a topic (including a root node) under a new parent (or to the root level if
 * newParentId is null), rejecting cycles and recalculating depth across the moved subtree.
 */
export async function moveTopic(sql: Sql, id: string, newParentId: string | null): Promise<Topic> {
  if (newParentId === id) {
    throw new Error("Cannot move a topic under itself");
  }
  const topic = await getTopic(sql, id);
  if (!topic) {
    throw new Error(`Topic not found: ${id}`);
  }
  let baseDepth = 0;
  if (newParentId !== null) {
    const newParent = await getTopic(sql, newParentId);
    if (!newParent) {
      throw new Error(`New parent topic not found: ${newParentId}`);
    }
    const ancestors = await getAncestors(sql, newParentId);
    if (ancestors.some((a) => a.id === id)) {
      throw new Error("Cannot move a topic under one of its own descendants");
    }
    baseDepth = newParent.depth + 1;
  }

  await sql`
    UPDATE topics
    SET parent_id = ${newParentId}
    WHERE id = ${id}`;

  await sql`
    WITH RECURSIVE sub AS (
      SELECT id, ${baseDepth}::int AS new_depth
      FROM topics
      WHERE id = ${id}
      UNION ALL
      SELECT c.id, sub.new_depth + 1
      FROM topics c
      JOIN sub ON c.parent_id = sub.id
    )
    UPDATE topics t
    SET depth = sub.new_depth
    FROM sub
    WHERE t.id = sub.id`;

  return (await getTopic(sql, id))!;
}

/** Root first. */
export async function getAncestors(sql: Sql, id: string): Promise<Topic[]> {
  return sql<Topic[]>`
    WITH RECURSIVE up AS (
      SELECT t.*, 0 AS hop FROM topics t WHERE t.id = (SELECT parent_id FROM topics WHERE id = ${id})
      UNION ALL
      SELECT t.*, up.hop + 1 FROM topics t JOIN up ON t.id = up.parent_id
    )
    SELECT * FROM up ORDER BY hop DESC`;
}

export async function getChildren(sql: Sql, id: string): Promise<Topic[]> {
  return sql<Topic[]>`SELECT * FROM topics WHERE parent_id = ${id} ORDER BY title`;
}

export async function listTree(sql: Sql): Promise<TreeNode[]> {
  return sql<TreeNode[]>`
    SELECT t.id, t.parent_id, t.slug, t.title, t.brief, t.status, t.depth,
           (SELECT count(*)::int FROM claims c WHERE c.topic_id = t.id AND NOT c.superseded) AS claim_count
    FROM topics t ORDER BY t.depth, t.title`;
}

export async function setTopicStatus(sql: Sql, id: string, status: TopicStatus): Promise<void> {
  await sql`UPDATE topics SET status = ${status} WHERE id = ${id}`;
}

export async function setTopicSummaryIfEmpty(sql: Sql, id: string, summary: string): Promise<void> {
  await sql`UPDATE topics SET summary = COALESCE(summary, ${summary}) WHERE id = ${id}`;
}

export async function saveTopicReview(
  sql: Sql,
  id: string,
  summary: string,
  gaps: string[],
  synthesis?: TopicSynthesis | null,
): Promise<void> {
  if (synthesis && Object.keys(synthesis).length > 0) {
    await sql`
      UPDATE topics
      SET summary = ${summary},
          gaps = ${gaps},
          synthesis = ${sql.json(synthesis as never)},
          status = 'ready',
          last_researched_at = now()
      WHERE id = ${id}`;
  } else {
    await sql`
      UPDATE topics
      SET summary = ${summary},
          gaps = ${gaps},
          status = 'ready',
          last_researched_at = now()
      WHERE id = ${id}`;
  }
}

export interface TopicLinkView {
  id: string;
  slug: string;
  title: string;
  brief: string | null;
  relation: string;
  note: string | null;
}

export interface TopicGraphLink {
  sourceId: string;
  targetId: string;
  relation: string;
  note: string | null;
}

/** Connects two topics across branches or trunks (symmetric lookup). */
export async function linkTopics(
  sql: Sql,
  topicId: string,
  linkedTopicId: string,
  relation = "intersects",
  note: string | null = null,
): Promise<void> {
  if (topicId === linkedTopicId) return;
  const [a, b] = topicId < linkedTopicId ? [topicId, linkedTopicId] : [linkedTopicId, topicId];
  await sql`
    INSERT INTO topic_links (topic_id, linked_topic_id, relation, note)
    VALUES (${a}, ${b}, ${relation}, ${note})
    ON CONFLICT (topic_id, linked_topic_id) DO UPDATE SET
      relation = EXCLUDED.relation,
      note = COALESCE(EXCLUDED.note, topic_links.note)`;
}

export async function topicLinks(sql: Sql, topicId: string): Promise<TopicLinkView[]> {
  try {
    return await sql<TopicLinkView[]>`
      SELECT t.id, t.slug, t.title, t.brief, tl.relation, tl.note
      FROM topic_links tl
      JOIN topics t ON t.id = CASE WHEN tl.topic_id = ${topicId} THEN tl.linked_topic_id ELSE tl.topic_id END
      WHERE tl.topic_id = ${topicId} OR tl.linked_topic_id = ${topicId}
      ORDER BY t.title`;
  } catch {
    return [];
  }
}

export async function listTopicLinks(sql: Sql): Promise<TopicGraphLink[]> {
  try {
    return await sql<TopicGraphLink[]>`
      SELECT topic_id AS source_id, linked_topic_id AS target_id, relation, note
      FROM topic_links`;
  } catch {
    return [];
  }
}

/* --------------------------------------------------------------- sources */

export interface StoredSource {
  id: string;
  kind: string;
  title: string;
  url: string | null;
  doi: string | null;
  venue: string | null;
  year: number | null;
  authors: string[];
  abstract: string | null;
  citedBy: number | null;
  declaredDesign: string | null;
  design: StudyDesign | null;
  sampleSize: number | null;
}

export interface SourceView {
  id: string;
  kind: string;
  origin: string;
  title: string;
  url: string | null;
  doi: string | null;
  venue: string | null;
  year: number | null;
  authors: string[];
  citedBy: number | null;
  design: string | null;
}

/**
 * Returns all sources linked to a topic (via topic_sources or claim_sources).
 * If a parent branch has no direct sources yet, falls back to sources across its descendant subtree.
 */
export async function topicSources(sql: Sql, topicId: string): Promise<SourceView[]> {
  const direct = await sql<SourceView[]>`
    SELECT DISTINCT ON (s.id)
      s.id, s.kind, s.origin, s.title,
      COALESCE(s.url, CASE WHEN s.doi IS NOT NULL THEN 'https://doi.org/' || s.doi ELSE NULL END) AS url,
      s.doi, s.venue, s.year, s.authors, s.cited_by,
      COALESCE(s.design, s.declared_design) AS design
    FROM sources s
    WHERE s.id IN (
      SELECT ts.source_id FROM topic_sources ts WHERE ts.topic_id = ${topicId}
      UNION
      SELECT cs.source_id FROM claim_sources cs JOIN claims c ON c.id = cs.claim_id WHERE c.topic_id = ${topicId} AND NOT c.superseded
    )`;
  if (direct.length > 0) {
    return direct.sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || (b.citedBy ?? 0) - (a.citedBy ?? 0));
  }
  const inherited = await sql<SourceView[]>`
    WITH RECURSIVE sub AS (
      SELECT id FROM topics WHERE parent_id = ${topicId}
      UNION ALL
      SELECT t.id FROM topics t JOIN sub ON t.parent_id = sub.id
    )
    SELECT DISTINCT ON (s.id)
      s.id, s.kind, s.origin, s.title,
      COALESCE(s.url, CASE WHEN s.doi IS NOT NULL THEN 'https://doi.org/' || s.doi ELSE NULL END) AS url,
      s.doi, s.venue, s.year, s.authors, s.cited_by,
      COALESCE(s.design, s.declared_design) AS design
    FROM sources s
    WHERE s.id IN (
      SELECT ts.source_id FROM topic_sources ts WHERE ts.topic_id IN (SELECT id FROM sub)
      UNION
      SELECT cs.source_id FROM claim_sources cs JOIN claims c ON c.id = cs.claim_id WHERE c.topic_id IN (SELECT id FROM sub) AND NOT c.superseded
    )`;
  if (inherited.length > 0) {
    return inherited.sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || (b.citedBy ?? 0) - (a.citedBy ?? 0));
  }
  const fromAncestors = await sql<SourceView[]>`
    WITH RECURSIVE up AS (
      SELECT parent_id AS id FROM topics WHERE id = ${topicId} AND parent_id IS NOT NULL
      UNION ALL
      SELECT t.parent_id AS id FROM topics t JOIN up ON t.id = up.id WHERE t.parent_id IS NOT NULL
    )
    SELECT DISTINCT ON (s.id)
      s.id, s.kind, s.origin, s.title,
      COALESCE(s.url, CASE WHEN s.doi IS NOT NULL THEN 'https://doi.org/' || s.doi ELSE NULL END) AS url,
      s.doi, s.venue, s.year, s.authors, s.cited_by,
      COALESCE(s.design, s.declared_design) AS design
    FROM sources s
    WHERE s.id IN (
      SELECT ts.source_id FROM topic_sources ts WHERE ts.topic_id IN (SELECT id FROM up)
      UNION
      SELECT cs.source_id FROM claim_sources cs JOIN claims c ON c.id = cs.claim_id WHERE c.topic_id IN (SELECT id FROM up) AND NOT c.superseded
    )`;
  return fromAncestors.sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || (b.citedBy ?? 0) - (a.citedBy ?? 0));
}

/** Stores sources once (matched by origin id or DOI) and links them to the topic. Returns stored ids. */
export async function upsertSources(sql: Sql, topicId: string, records: SourceRecord[], query: string): Promise<string[]> {
  const ids: string[] = [];
  for (const r of records) {
    const [existing] = await sql<{ id: string }[]>`
      SELECT id FROM sources WHERE external_id = ${r.externalId} OR (${r.doi}::text IS NOT NULL AND doi = ${r.doi}) LIMIT 1`;
    let id: string;
    if (existing) {
      id = existing.id;
      await sql`
        UPDATE sources SET
          abstract = COALESCE(abstract, ${r.abstract}),
          cited_by = GREATEST(COALESCE(cited_by, 0), COALESCE(${r.citedBy}::int, 0)),
          url = COALESCE(url, ${r.url}),
          declared_design = COALESCE(declared_design, ${r.declaredDesign}),
          sample_size = COALESCE(sample_size, ${r.sampleSize}::int)
        WHERE id = ${id}`;
    } else {
      const [row] = await sql<{ id: string }[]>`
        INSERT INTO sources (kind, external_id, origin, title, url, doi, venue, year, authors, abstract, cited_by,
                             declared_design, sample_size, extra)
        VALUES (${r.kind}, ${r.externalId}, ${r.origin}, ${r.title}, ${r.url}, ${r.doi}, ${r.venue}, ${r.year},
                ${r.authors}, ${r.abstract}, ${r.citedBy}, ${r.declaredDesign}, ${r.sampleSize}, ${sql.json(r.extra as never)})
        RETURNING id`;
      id = row!.id;
    }
    await sql`INSERT INTO topic_sources (topic_id, source_id, query) VALUES (${topicId}, ${id}, ${query}) ON CONFLICT DO NOTHING`;
    ids.push(id);
  }
  return ids;
}

export async function unreadSources(sql: Sql, topicId: string, limit: number): Promise<StoredSource[]> {
  return sql<StoredSource[]>`
    SELECT s.* FROM sources s JOIN topic_sources ts ON ts.source_id = s.id
    WHERE ts.topic_id = ${topicId} AND NOT ts.extracted
    -- Citations per year since publication, plus a boost for the last two years,
    -- so new results are read alongside the classics instead of after them.
    ORDER BY COALESCE(s.cited_by, 0)::float / GREATEST(1, extract(year FROM now())::int - COALESCE(s.year, 2000) + 1)
             + CASE WHEN s.year >= extract(year FROM now())::int - 1 THEN 5 ELSE 0 END DESC,
             s.id
    LIMIT ${limit}`;
}

export async function countExtractedSources(sql: Sql, topicId: string): Promise<number> {
  const [row] = await sql<{ n: number }[]>`
    SELECT count(*)::int AS n FROM topic_sources WHERE topic_id = ${topicId} AND extracted`;
  return row?.n ?? 0;
}

export async function countUnreadSources(sql: Sql, topicId: string): Promise<number> {
  const [row] = await sql<{ n: number }[]>`
    SELECT count(*)::int AS n FROM topic_sources WHERE topic_id = ${topicId} AND NOT extracted`;
  return row?.n ?? 0;
}

export async function markExtracted(sql: Sql, topicId: string, sourceIds: string[]): Promise<void> {
  if (sourceIds.length === 0) return;
  await sql`UPDATE topic_sources SET extracted = true WHERE topic_id = ${topicId} AND source_id = ANY(${sourceIds}::uuid[])`;
}

export async function setSourceDesign(sql: Sql, id: string, design: StudyDesign, sampleSize: number | null): Promise<void> {
  await sql`UPDATE sources SET design = ${design}, sample_size = COALESCE(${sampleSize}::int, sample_size) WHERE id = ${id}`;
}

/* ---------------------------------------------------------------- claims */

export interface ClaimView {
  id: string;
  statement: string;
  tier: Tier;
  controversy: Controversy;
  direction: Direction;
  confidence: number;
  rationale: string | null;
  sources: { id: string; title: string; url: string | null; year: number | null; design: string | null; venue: string | null }[];
}

export async function insertClaim(
  sql: Sql,
  c: {
    topicId: string;
    statement: string;
    tier: Tier;
    controversy: Controversy;
    direction: Direction;
    confidence: number;
    rationale: string | null;
    sourceIds: string[];
  },
): Promise<string> {
  return sql.begin(async (tx) => {
    const [row] = await tx<{ id: string }[]>`
      INSERT INTO claims (topic_id, statement, tier, controversy, direction, confidence, rationale)
      VALUES (${c.topicId}, ${c.statement}, ${c.tier}, ${c.controversy}, ${c.direction}, ${c.confidence}, ${c.rationale})
      RETURNING id`;
    for (const sid of c.sourceIds) {
      await tx`INSERT INTO claim_sources (claim_id, source_id) VALUES (${row!.id}, ${sid}) ON CONFLICT DO NOTHING`;
    }
    return row!.id;
  });
}

export async function topicClaims(sql: Sql, topicId: string): Promise<ClaimView[]> {
  return sql<ClaimView[]>`
    SELECT c.id, c.statement, c.tier, c.controversy, c.direction, c.confidence, c.rationale,
           COALESCE(json_agg(json_build_object(
             'id', s.id, 'title', s.title,
             'url', COALESCE(s.url, CASE WHEN s.doi IS NOT NULL THEN 'https://doi.org/' || s.doi ELSE NULL END),
             'year', s.year, 'design', s.design, 'venue', s.venue
           ) ORDER BY s.year DESC NULLS LAST) FILTER (WHERE s.id IS NOT NULL), '[]') AS sources
    FROM claims c
    LEFT JOIN claim_sources cs ON cs.claim_id = c.id
    LEFT JOIN sources s ON s.id = cs.source_id
    WHERE c.topic_id = ${topicId} AND NOT c.superseded
    GROUP BY c.id
    ORDER BY c.tier, c.confidence DESC`;
}

/** Merges duplicates into one claim: the kept claim inherits the dropped claims' sources. */
export async function mergeClaims(sql: Sql, keepId: string, dropIds: string[]): Promise<void> {
  if (dropIds.length === 0) return;
  await sql.begin(async (tx) => {
    await tx`
      INSERT INTO claim_sources (claim_id, source_id)
      SELECT ${keepId}, source_id FROM claim_sources WHERE claim_id = ANY(${dropIds}::uuid[])
      ON CONFLICT DO NOTHING`;
    await tx`UPDATE claims SET superseded = true WHERE id = ANY(${dropIds}::uuid[]) AND id <> ${keepId}`;
  });
}

export async function setClaimControversy(sql: Sql, id: string, controversy: Controversy): Promise<void> {
  await sql`UPDATE claims SET controversy = ${controversy} WHERE id = ${id}`;
}

export async function setClaimTier(sql: Sql, id: string, tier: Tier): Promise<void> {
  await sql`UPDATE claims SET tier = ${tier} WHERE id = ${id}`;
}

export async function claimSourceDesigns(sql: Sql, claimId: string): Promise<{ design: StudyDesign; sampleSize: number | null }[]> {
  return sql<{ design: StudyDesign; sampleSize: number | null }[]>`
    SELECT COALESCE(s.design, 'unknown') AS design, s.sample_size
    FROM claim_sources cs JOIN sources s ON s.id = cs.source_id WHERE cs.claim_id = ${claimId}`;
}

/* ------------------------------------------- entities, milestones, debates */

export interface EntityView {
  id: string;
  kind: EntityKind;
  name: string;
  country: string | null;
  url: string | null;
  summary: string | null;
  attributes: Record<string, string>;
  sourceUrls: string[];
}

export async function upsertEntity(
  sql: Sql,
  topicId: string,
  e: { kind: EntityKind; name: string; country: string | null; url: string | null; summary: string | null; attributes: Record<string, string>; sourceUrls: string[] },
): Promise<void> {
  await sql`
    INSERT INTO entities (topic_id, kind, name, country, url, summary, attributes, source_urls)
    VALUES (${topicId}, ${e.kind}, ${e.name}, ${e.country}, ${e.url}, ${e.summary}, ${sql.json(e.attributes)}, ${e.sourceUrls})
    ON CONFLICT (topic_id, kind, name) DO UPDATE SET
      country = COALESCE(EXCLUDED.country, entities.country),
      url = COALESCE(EXCLUDED.url, entities.url),
      summary = COALESCE(EXCLUDED.summary, entities.summary),
      attributes = entities.attributes || EXCLUDED.attributes,
      source_urls = ARRAY(SELECT DISTINCT unnest(entities.source_urls || EXCLUDED.source_urls)),
      updated_at = now()`;
}

export async function topicEntities(sql: Sql, topicId: string): Promise<EntityView[]> {
  return sql<EntityView[]>`SELECT * FROM entities WHERE topic_id = ${topicId} ORDER BY kind, name`;
}

export interface MilestoneView {
  id: string;
  year: number;
  title: string;
  description: string | null;
  sourceUrl: string | null;
}

export async function insertMilestone(
  sql: Sql,
  m: { topicId: string; year: number; title: string; description: string | null; sourceId: string | null },
): Promise<void> {
  await sql`
    INSERT INTO milestones (topic_id, year, title, description, source_id)
    VALUES (${m.topicId}, ${m.year}, ${m.title}, ${m.description}, ${m.sourceId})
    ON CONFLICT (topic_id, year, title) DO NOTHING`;
}

export async function topicMilestones(sql: Sql, topicId: string): Promise<MilestoneView[]> {
  const direct = await sql<MilestoneView[]>`
    SELECT m.id, m.year, m.title, m.description,
           COALESCE(s.url, CASE WHEN s.doi IS NOT NULL THEN 'https://doi.org/' || s.doi ELSE NULL END) AS source_url
    FROM milestones m LEFT JOIN sources s ON s.id = m.source_id
    WHERE m.topic_id = ${topicId} ORDER BY m.year, m.title`;
  if (direct.length > 0) return direct;
  const inherited = await sql<MilestoneView[]>`
    WITH RECURSIVE sub AS (
      SELECT id FROM topics WHERE parent_id = ${topicId}
      UNION ALL
      SELECT t.id FROM topics t JOIN sub ON t.parent_id = sub.id
    )
    SELECT DISTINCT ON (m.year, m.title)
           m.id, m.year, m.title, m.description,
           COALESCE(s.url, CASE WHEN s.doi IS NOT NULL THEN 'https://doi.org/' || s.doi ELSE NULL END) AS source_url
    FROM milestones m LEFT JOIN sources s ON s.id = m.source_id
    WHERE m.topic_id IN (SELECT id FROM sub)
    ORDER BY m.year, m.title`;
  return inherited;
}

export interface ControversyView {
  id: string;
  kind: string;
  note: string;
  claimIds: string[];
}

export async function replaceControversies(
  sql: Sql,
  topicId: string,
  items: { kind: string; note: string; claimIds: string[] }[],
): Promise<void> {
  await sql.begin(async (tx) => {
    await tx`DELETE FROM controversies WHERE topic_id = ${topicId}`;
    for (const it of items) {
      await tx`INSERT INTO controversies (topic_id, kind, note, claim_ids) VALUES (${topicId}, ${it.kind}, ${it.note}, ${it.claimIds}::uuid[])`;
    }
  });
}

export async function topicControversies(sql: Sql, topicId: string): Promise<ControversyView[]> {
  return sql<ControversyView[]>`SELECT id, kind, note, claim_ids FROM controversies WHERE topic_id = ${topicId} ORDER BY created_at`;
}

/* ------------------------------------------------------------------ jobs */

export interface Job {
  id: string;
  kind: JobKind;
  topicId: string | null;
  payload: Record<string, unknown>;
  attempts: number;
}

export async function enqueueJob(
  sql: Sql,
  kind: JobKind,
  topicId: string | null,
  payload: Record<string, unknown> = {},
  delaySeconds = 0,
): Promise<string> {
  const [row] = await sql<{ id: string }[]>`
    INSERT INTO jobs (kind, topic_id, payload, run_after)
    VALUES (${kind}, ${topicId}, ${sql.json(payload as never)}, now() + make_interval(secs => ${delaySeconds}))
    RETURNING id`;
  return row!.id;
}

/** Takes the next due job; SKIP LOCKED lets several workers run side by side. */
export async function claimNextJob(sql: Sql): Promise<Job | null> {
  const [row] = await sql<Job[]>`
    UPDATE jobs SET status = 'running', locked_at = now(), attempts = attempts + 1
    WHERE id = (
      SELECT id FROM jobs WHERE status = 'queued' AND run_after <= now()
      ORDER BY run_after, id FOR UPDATE SKIP LOCKED LIMIT 1
    )
    RETURNING id, kind, topic_id, payload, attempts`;
  return row ?? null;
}

export async function completeJob(sql: Sql, id: string): Promise<void> {
  await sql`UPDATE jobs SET status = 'done', finished_at = now(), error = NULL WHERE id = ${id}`;
}

/** Retries with exponential backoff; gives up after maxAttempts. Returns true when the job is dead. */
export async function failJob(sql: Sql, job: Job, error: string, maxAttempts = 3): Promise<boolean> {
  const dead = job.attempts >= maxAttempts;
  await sql`
    UPDATE jobs SET
      status = ${dead ? "failed" : "queued"},
      error = ${error.slice(0, 2000)},
      run_after = now() + make_interval(secs => ${30 * 2 ** job.attempts}),
      finished_at = ${dead ? sql`now()` : null}
    WHERE id = ${job.id}`;
  return dead;
}

/** Jobs left in flight after a crash go back to the queue. */
export async function requeueStaleJobs(sql: Sql, olderThanMinutes = 15): Promise<number> {
  const rows = await sql`
    UPDATE jobs SET status = 'queued' WHERE status = 'running' AND locked_at < now() - make_interval(mins => ${olderThanMinutes})
    RETURNING id`;
  return rows.length;
}

export async function openJobCount(sql: Sql, topicId: string): Promise<number> {
  const [row] = await sql<{ n: number }[]>`
    SELECT count(*)::int AS n FROM jobs WHERE topic_id = ${topicId} AND status IN ('queued', 'running')`;
  return row?.n ?? 0;
}

/** Milliseconds until the earliest queued job is due (<= 0 when due now), or null when the queue is empty. */
export async function nextQueuedDelayMs(sql: Sql): Promise<number | null> {
  const [row] = await sql<{ ms: number | null }[]>`
    SELECT (EXTRACT(EPOCH FROM (min(run_after) - now())) * 1000)::int AS ms
    FROM jobs WHERE status = 'queued'`;
  return row?.ms ?? null;
}

export async function recentJobs(sql: Sql, topicId: string, limit = 12) {
  return sql<{ id: string; kind: JobKind; status: string; attempts: number; error: string | null; createdAt: Date }[]>`
    SELECT id, kind, status, attempts, error, created_at FROM jobs WHERE topic_id = ${topicId}
    ORDER BY id DESC LIMIT ${limit}`;
}

/** Starts (or restarts) research on a topic: the web app's "Research" button and the scout both call this. */
export async function requestResearch(sql: Sql, topicId: string, autoDepth: number): Promise<void> {
  await setTopicStatus(sql, topicId, "queued");
  await enqueueJob(sql, "plan", topicId, { autoDepth });
}

/* ----------------------------------------------------------------- usage */

export async function logUsage(
  sql: Sql,
  u: { jobId: string | null; role: string; model: string; inputTokens: number; outputTokens: number; webSearches: number },
): Promise<void> {
  await sql`
    INSERT INTO llm_usage (job_id, role, model, input_tokens, output_tokens, web_searches)
    VALUES (${u.jobId}, ${u.role}, ${u.model}, ${u.inputTokens}, ${u.outputTokens}, ${u.webSearches})`;
}

export async function llmCallsToday(sql: Sql): Promise<number> {
  const [row] = await sql<{ n: number }[]>`SELECT count(*)::int AS n FROM llm_usage WHERE created_at > now() - interval '1 day'`;
  return row?.n ?? 0;
}

export async function usageSummary(sql: Sql) {
  return sql<{ role: string; model: string; calls: number; inputTokens: number; outputTokens: number; webSearches: number }[]>`
    SELECT role, model, count(*)::int AS calls, sum(input_tokens)::int AS input_tokens,
           sum(output_tokens)::int AS output_tokens, sum(web_searches)::int AS web_searches
    FROM llm_usage WHERE created_at > now() - interval '30 days'
    GROUP BY role, model ORDER BY role`;
}
