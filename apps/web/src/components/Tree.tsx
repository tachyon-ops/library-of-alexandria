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

type FoldMode = "focused" | "expanded" | "collapsed";

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
  if (mode === "expanded") return true;
  if (mode === "collapsed") return false;
  // "focused" (default): everything is collapsed all the time and only open what we're in
  return containsSlug(node, activeSlug);
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
  const [mode, setMode] = useState<FoldMode>("focused");
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
          data-active={mode === "focused" ? "true" : undefined}
          onClick={() => selectMode("focused")}
          title="Only unfold the active branch; keep everything else collapsed"
        >
          Active branch only
        </button>
        <button
          type="button"
          className="crumb-pill"
          data-active={mode === "collapsed" ? "true" : undefined}
          onClick={() => selectMode("collapsed")}
        >
          Collapse all
        </button>
        <button
          type="button"
          className="crumb-pill"
          data-active={mode === "expanded" ? "true" : undefined}
          onClick={() => selectMode("expanded")}
        >
          Expand all
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
