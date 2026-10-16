import "server-only";
import { getSql, listTree, type TreeNode } from "@lib/db";

export const sql = () => getSql();

export interface TreeBranch extends TreeNode {
  children: TreeBranch[];
}

export function anyBusy(nodes: TreeBranch[]): boolean {
  return nodes.some((n) => n.status === "queued" || n.status === "researching" || anyBusy(n.children));
}

/** Builds the nested tree from the flat topic list. */
export async function loadTree(): Promise<TreeBranch[]> {
  const rows = await listTree(sql());
  const byId = new Map<string, TreeBranch>(rows.map((r) => [r.id, { ...r, children: [] }]));
  const roots: TreeBranch[] = [];
  for (const node of byId.values()) {
    const parent = node.parentId ? byId.get(node.parentId) : undefined;
    (parent ? parent.children : roots).push(node);
  }
  return roots;
}
