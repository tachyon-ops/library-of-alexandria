import Link from "next/link";
import type { TreeBranch } from "@/lib/data";

const STATUS_WORD: Record<string, string> = {
  idle: "not yet researched",
  queued: "queued",
  researching: "researching",
  ready: "",
  error: "stopped on an error",
};

function Branch({ node, activeSlug }: { node: TreeBranch; activeSlug?: string }) {
  const active = node.slug === activeSlug;
  return (
    <li>
      <Link href={`/topic/${node.slug}`} className="tree-link" data-status={node.status} aria-current={active ? "page" : undefined}>
        <span className="tree-title">{node.title}</span>
        {node.claimCount > 0 && <span className="tree-count">{node.claimCount}</span>}
        {STATUS_WORD[node.status] && <span className="tree-status">{STATUS_WORD[node.status]}</span>}
      </Link>
      {node.children.length > 0 && (
        <ul>
          {node.children.map((c) => (
            <Branch key={c.id} node={c} activeSlug={activeSlug} />
          ))}
        </ul>
      )}
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
