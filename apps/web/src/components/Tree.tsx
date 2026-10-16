"use client";

import Link from "next/link";
import { useState } from "react";
import type { TreeBranch } from "@/lib/data";

const STATUS_WORD: Record<string, string> = {
  idle: "not yet researched",
  queued: "queued",
  researching: "researching",
  ready: "",
  error: "stopped on an error",
};

type FoldMode = "smart" | "deep-collapsed" | "trunks-only" | "expanded";

function containsSlug(node: TreeBranch, slug?: string): boolean {
  if (!slug) return false;
  if (node.slug === slug) return true;
  return node.children.some((c) => containsSlug(c, slug));
}

function subtreeClaims(node: TreeBranch): number {
  return node.claimCount + node.children.reduce((sum, c) => sum + subtreeClaims(c), 0);
}

function countDescendants(node: TreeBranch): number {
  return node.children.reduce((sum, c) => sum + 1 + countDescendants(c), 0);
}

function isOpenForMode(node: TreeBranch, mode: FoldMode, activeSlug?: string): boolean {
  if (containsSlug(node, activeSlug)) return true;
  if (mode === "expanded") return true;
  if (mode === "trunks-only") return false;
  if (mode === "deep-collapsed") {
    return node.depth < 2 && subtreeClaims(node) > 0;
  }
  // "smart": unfold trunks/branches up to depth 2 that contain findings; fold nodes >= 3 hops away
  if (node.depth >= 3) return false;
  return subtreeClaims(node) > 0;
}

function Branch({
  node,
  activeSlug,
  mode,
  version,
}: {
  node: TreeBranch;
  activeSlug?: string;
  mode: FoldMode;
  version: number;
}) {
  const active = node.slug === activeSlug;
  const totalClaims = subtreeClaims(node);
  const totalDescendants = countDescendants(node);
  const hasChildren = node.children.length > 0;
  const defaultOpen = isOpenForMode(node, mode, activeSlug);

  return (
    <li>
      <div className="tree-row">
        <Link
          href={`/topic/${node.slug}`}
          className="tree-link"
          data-status={node.status}
          aria-current={active ? "page" : undefined}
        >
          <span className="tree-title">{node.title}</span>
          {node.claimCount > 0 && <span className="tree-count">{node.claimCount} findings</span>}
          {node.claimCount === 0 && totalClaims > 0 && <span className="tree-count">{totalClaims} in sub-fields</span>}
          {STATUS_WORD[node.status] && <span className="tree-status">{STATUS_WORD[node.status]}</span>}
        </Link>
      </div>
      {hasChildren && (
        <details key={`${node.id}-${mode}-${version}`} className="tree-details" open={defaultOpen}>
          <summary className="tree-summary">
            {node.children.length} {node.children.length === 1 ? "sub-discipline" : "sub-disciplines"}
            {totalDescendants > node.children.length ? ` (${totalDescendants} in branch)` : ""}
            {node.depth >= 2 ? ` · depth ${node.depth + 1}` : ""}
          </summary>
          <ul>
            {node.children.map((c) => (
              <Branch key={c.id} node={c} activeSlug={activeSlug} mode={mode} version={version} />
            ))}
          </ul>
        </details>
      )}
    </li>
  );
}

export function Tree({ roots, activeSlug }: { roots: TreeBranch[]; activeSlug?: string }) {
  const [mode, setMode] = useState<FoldMode>("smart");
  const [version, setVersion] = useState(0);

  if (roots.length === 0) return <p className="muted">The library is empty. Start the first branch below.</p>;

  function selectMode(nextMode: FoldMode) {
    setMode(nextMode);
    setVersion((v) => v + 1);
  }

  return (
    <div className="tree-container">
      <div className="tree-toolbar" role="group" aria-label="Branch expand and collapse controls">
        <button
          type="button"
          className="crumb-pill"
          data-active={mode === "smart" ? "true" : undefined}
          onClick={() => selectMode("smart")}
          title="Unfold researched trunks and fold branches 3+ hops deep"
        >
          Smart fold (≤ 3 hops)
        </button>
        <button
          type="button"
          className="crumb-pill"
          data-active={mode === "expanded" ? "true" : undefined}
          onClick={() => selectMode("expanded")}
        >
          Expand all
        </button>
        <button
          type="button"
          className="crumb-pill"
          data-active={mode === "trunks-only" ? "true" : undefined}
          onClick={() => selectMode("trunks-only")}
        >
          Collapse all
        </button>
      </div>
      <ul className="tree">
        {roots.map((r) => (
          <Branch key={r.id} node={r} activeSlug={activeSlug} mode={mode} version={version} />
        ))}
      </ul>
    </div>
  );
}
