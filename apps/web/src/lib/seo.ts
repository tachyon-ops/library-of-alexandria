import "server-only";
import { DEFAULT_SITE_URL, normaliseSiteUrl, type TopicStatus } from "@lib/core";
import { ALL_SEED_DOSSIERS, ENCYCLOPAEDIC_TRUNKS, listTree, type SeedNode, type TreeNode } from "@lib/db";
import { normaliseAgePhrasing, normaliseTopicTitle, normaliseTreeRows, sql } from "./data";

/**
 * Resolves the canonical public site origin from environment variables (`NEXT_PUBLIC_SITE_URL`,
 * `SITE_URL`, `VERCEL_PROJECT_PRODUCTION_URL`, or `VERCEL_URL`), falling back cleanly to
 * `http://localhost:3000` in local development or `DEFAULT_SITE_URL` in production.
 */
export function getSiteUrl(): string {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim();

  if (configured) {
    return normaliseSiteUrl(configured);
  }
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  return DEFAULT_SITE_URL;
}

export interface CatalogueSeoNode {
  id: string;
  parentId: string | null;
  slug: string;
  nestedPath: string;
  title: string;
  brief: string | null;
  depth: number;
  status: TopicStatus;
  claimCount: number;
  hasDossier: boolean;
  rootTitle: string;
}

function flattenSeedTrunks(nodes: SeedNode[], parentId: string | null = null, depth: number = 0): TreeNode[] {
  const out: TreeNode[] = [];
  for (const node of nodes) {
    const id = `seed-${node.slug}`;
    const dossier = ALL_SEED_DOSSIERS[node.slug];
    out.push({
      id,
      parentId,
      slug: node.slug,
      title: node.title,
      brief: node.brief,
      status: dossier ? "ready" : "idle",
      depth,
      claimCount: dossier ? dossier.claims.length : 0,
    });
    if (node.children && node.children.length > 0) {
      out.push(...flattenSeedTrunks(node.children, id, depth + 1));
    }
  }
  return out;
}

/**
 * Loads all canonical disciplines and researched branches from Postgres merged with
 * the static `ENCYCLOPAEDIC_TRUNKS` catalogue so sitemaps, `llms.txt`, and RSS feeds
 * are always complete even on cold or unseeded databases.
 */
export async function loadCatalogueNodesForSeo(): Promise<CatalogueSeoNode[]> {
  let dbRows: TreeNode[] = [];
  try {
    dbRows = await listTree(sql());
  } catch {
    dbRows = [];
  }

  const seedRows = flattenSeedTrunks(ENCYCLOPAEDIC_TRUNKS);
  const existingSlugs = new Set(dbRows.map((r) => r.slug));
  const idBySlug = new Map(dbRows.map((r) => [r.slug, r.id]));
  const seedSlugById = new Map(seedRows.map((s) => [s.id, s.slug]));

  const mergedRows: TreeNode[] = [...dbRows];
  for (const sRow of seedRows) {
    if (existingSlugs.has(sRow.slug)) continue;
    const parentSeedSlug = sRow.parentId ? seedSlugById.get(sRow.parentId) : null;
    const resolvedParentId = parentSeedSlug ? (idBySlug.get(parentSeedSlug) ?? sRow.parentId) : null;
    mergedRows.push({
      ...sRow,
      parentId: resolvedParentId,
    });
    existingSlugs.add(sRow.slug);
    idBySlug.set(sRow.slug, sRow.id);
  }

  const { nodes, byId } = normaliseTreeRows(mergedRows);
  const nodeById = new Map(nodes.map((n) => [n.id, n]));

  const findRootTitle = (node: TreeNode): string => {
    let curr: TreeNode | undefined = node;
    const visited = new Set<string>();
    while (curr?.parentId && !visited.has(curr.id)) {
      visited.add(curr.id);
      const next = nodeById.get(curr.parentId);
      if (!next) break;
      curr = next;
    }
    return normaliseTopicTitle(curr?.title ?? node.title);
  };

  return nodes.map((n) => {
    const dossier = ALL_SEED_DOSSIERS[n.slug];
    const nestedPath = byId.get(n.id) ?? n.slug;
    return {
      id: n.id,
      parentId: n.parentId,
      slug: n.slug,
      nestedPath,
      title: normaliseTopicTitle(n.title),
      brief: n.brief
        ? normaliseAgePhrasing(n.brief)
        : dossier?.summary
          ? normaliseAgePhrasing(dossier.summary)
          : null,
      depth: n.depth,
      status: dossier && n.status === "idle" ? "ready" : n.status,
      claimCount: Math.max(n.claimCount, dossier?.claims.length ?? 0),
      hasDossier: Boolean(dossier) || n.status === "ready" || n.claimCount > 0,
      rootTitle: findRootTitle(n),
    };
  });
}
