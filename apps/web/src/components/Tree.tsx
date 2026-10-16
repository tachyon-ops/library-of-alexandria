import Link from "next/link";
import type { TreeBranch } from "@/lib/data";

const STATUS_WORD: Record<string, string> = {
  idle: "not yet researched",
  queued: "queued",
  researching: "researching",
  ready: "",
  error: "stopped on an error",
};

function containsSlug(node: TreeBranch, slug?: string): boolean {
  if (!slug) return false;
  if (node.slug === slug) return true;
  return node.children.some((c) => containsSlug(c, slug));
}

function subtreeClaims(node: TreeBranch): number {
  return node.claimCount + node.children.reduce((sum, c) => sum + subtreeClaims(c), 0);
}

function Branch({ node, activeSlug }: { node: TreeBranch; activeSlug?: string }) {
  const active = node.slug === activeSlug;
  const totalClaims = subtreeClaims(node);
  const hasChildren = node.children.length > 0;
  const shouldCollapseByDefault = node.depth >= 1 && hasChildren && !containsSlug(node, activeSlug) && totalClaims === 0;

  return (
    <li>
      <div className="tree-row">
        <Link href={`/topic/${node.slug}`} className="tree-link" data-status={node.status} aria-current={active ? "page" : undefined}>
          <span className="tree-title">{node.title}</span>
          {node.claimCount > 0 && <span className="tree-count">{node.claimCount} findings</span>}
          {node.claimCount === 0 && totalClaims > 0 && <span className="tree-count">{totalClaims} in sub-fields</span>}
          {STATUS_WORD[node.status] && <span className="tree-status">{STATUS_WORD[node.status]}</span>}
        </Link>
      </div>
      {hasChildren &&
        (node.depth >= 1 ? (
          <details className="tree-details" open={!shouldCollapseByDefault}>
            <summary className="tree-summary">
              {node.children.length} {node.children.length === 1 ? "sub-discipline" : "sub-disciplines"}
            </summary>
            <ul>
              {node.children.map((c) => (
                <Branch key={c.id} node={c} activeSlug={activeSlug} />
              ))}
            </ul>
          </details>
        ) : (
          <ul>
            {node.children.map((c) => (
              <Branch key={c.id} node={c} activeSlug={activeSlug} />
            ))}
          </ul>
        ))}
    </li>
  );
}

export function Tree({ roots, activeSlug }: { roots: TreeBranch[]; activeSlug?: string }) {
  if (roots.length === 0) return <p className="muted">The library is empty. Start the first branch below.</p>;
  return (
    <ul className="tree">
      {roots.map((r) => (
        <Branch key={r.id} node={r} activeSlug={activeSlug} />
      ))}
    </ul>
  );
}
