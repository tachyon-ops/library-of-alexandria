"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { TreeBranch } from "@/lib/data";

interface GraphNode {
  id: string;
  slug: string;
  title: string;
  brief: string | null;
  status: string;
  depth: number;
  relativeDepth: number;
  claimCount: number;
  subtreeClaims: number;
  parentId: string | null;
  path: { id: string; title: string; slug: string }[];
  childCount: number;
  descendantCount: number;
  hiddenDescendantCount: number;
  isCollapsed: boolean;
  x: number;
  y: number;
  z: number;
}

interface GraphEdge {
  source: number;
  target: number;
}

const STATUS_LABEL: Record<string, string> = {
  idle: "Not yet researched",
  queued: "Queued for research",
  researching: "Researching",
  ready: "Researched",
  error: "Stopped on an error",
};

function countDescendants(branch: TreeBranch): number {
  return branch.children.reduce((acc, c) => acc + 1 + countDescendants(c), 0);
}

function sumSubtreeClaims(branch: TreeBranch): number {
  return branch.claimCount + branch.children.reduce((acc, c) => acc + sumSubtreeClaims(c), 0);
}

function findBranchWithTrail(
  roots: TreeBranch[],
  targetId: string,
  trail: { id: string; title: string; slug: string }[] = [],
): { branch: TreeBranch; trail: { id: string; title: string; slug: string }[] } | null {
  for (const r of roots) {
    if (r.id === targetId) return { branch: r, trail };
    const found = findBranchWithTrail(r.children, targetId, [
      ...trail,
      { id: r.id, title: r.title, slug: r.slug },
    ]);
    if (found) return found;
  }
  return null;
}

/**
 * Collects IDs of branches at global depth >= minDepth that have children,
 * so nodes 3 and 4+ hops away can be folded cleanly by default.
 */
function collectDeepBranchIds(roots: TreeBranch[], minDepth: number): Set<string> {
  const out = new Set<string>();
  function visit(b: TreeBranch) {
    if (b.children.length > 0 && b.depth >= minDepth) {
      out.add(b.id);
    }
    for (const c of b.children) visit(c);
  }
  for (const r of roots) visit(r);
  return out;
}

/**
 * Deterministic 3D spherical layout with force relaxation around the active roots,
 * respecting per-branch expand/collapse state.
 */
function buildGraph3D(
  allRoots: TreeBranch[],
  focusRootId: string | null,
  collapsedIds: Set<string>,
): {
  nodes: GraphNode[];
  edges: GraphEdge[];
  focusTrail: { id: string; title: string; slug: string }[];
} {
  const focused = focusRootId ? findBranchWithTrail(allRoots, focusRootId) : null;
  const activeRoots = focused ? [focused.branch] : allRoots;
  const baseTrail = focused ? focused.trail : [];

  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  function walk(
    branch: TreeBranch,
    path: { id: string; title: string; slug: string }[],
    parentIdx: number | null,
    relativeDepth: number,
    siblingIdx: number,
    siblingCount: number,
    parentPos: [number, number, number],
    parentDir: [number, number, number],
  ) {
    const idx = nodes.length;
    const descCount = countDescendants(branch);
    const totalClaims = sumSubtreeClaims(branch);
    const isCollapsed = branch.children.length > 0 && collapsedIds.has(branch.id);

    let x = 0;
    let y = 0;
    let z = 0;
    let dir: [number, number, number] = [0, 1, 0];

    if (parentIdx === null) {
      if (siblingCount <= 1) {
        x = 0;
        y = 0;
        z = 0;
      } else {
        // Place multiple top-level trunks on a balanced 3D orbital ring
        const angle = (siblingIdx / siblingCount) * Math.PI * 2;
        const ringR = Math.min(210, 85 + siblingCount * 14);
        x = Math.cos(angle) * ringR;
        z = Math.sin(angle) * ringR;
        y = ((siblingIdx % 3) - 1) * 26;
        const len = Math.hypot(x, y, z) || 1;
        dir = [x / len, y / len, z / len];
      }
    } else {
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      const theta = goldenAngle * (siblingIdx + 1) + idx * 0.41;
      const radius = relativeDepth === 1 ? 148 : relativeDepth === 2 ? 112 : 84;
      const spread = relativeDepth === 1 ? 0.92 : 0.68;

      const u = siblingCount > 1 ? (siblingIdx / (siblingCount - 1)) * 2 - 1 : 0;
      const rProj = Math.sqrt(Math.max(0.05, 1 - u * u * 0.75));
      const lx = Math.cos(theta) * rProj;
      const ly = u * 0.85;
      const lz = Math.sin(theta) * rProj;

      const dx = parentDir[0] * (1 - spread) + lx * spread;
      const dy = parentDir[1] * (1 - spread) + ly * spread;
      const dz = parentDir[2] * (1 - spread) + lz * spread;
      const len = Math.hypot(dx, dy, dz) || 1;
      dir = [dx / len, dy / len, dz / len];

      x = parentPos[0] + dir[0] * radius;
      y = parentPos[1] + dir[1] * radius;
      z = parentPos[2] + dir[2] * radius;
      edges.push({ source: parentIdx, target: idx });
    }

    nodes.push({
      id: branch.id,
      slug: branch.slug,
      title: branch.title,
      brief: branch.brief,
      status: branch.status,
      depth: branch.depth,
      relativeDepth,
      claimCount: branch.claimCount,
      subtreeClaims: totalClaims,
      parentId: branch.parentId,
      path,
      childCount: branch.children.length,
      descendantCount: descCount,
      hiddenDescendantCount: isCollapsed ? descCount : 0,
      isCollapsed,
      x,
      y,
      z,
    });

    if (!isCollapsed) {
      const nextPath = [...path, { id: branch.id, title: branch.title, slug: branch.slug }];
      branch.children.forEach((child, i) => {
        walk(child, nextPath, idx, relativeDepth + 1, i, branch.children.length, [x, y, z], dir);
      });
    }
  }

  activeRoots.forEach((r, i) => walk(r, baseTrail, null, 0, i, activeRoots.length, [0, 0, 0], [0, 1, 0]));

  // 3D repulsion + parent spring relaxation for clean separation
  for (let iter = 0; iter < 48; iter++) {
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i]!;
      if (a.relativeDepth === 0 && activeRoots.length === 1) continue;
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j]!;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        const distSq = dx * dx + dy * dy + dz * dz + 1;
        const minDist = a.relativeDepth <= 1 && b.relativeDepth <= 1 ? 125 : 72;
        if (distSq < minDist * minDist) {
          const dist = Math.sqrt(distSq);
          const push = ((minDist - dist) / dist) * 0.26;
          if (!(a.relativeDepth === 0 && activeRoots.length === 1)) {
            a.x += dx * push;
            a.y += dy * push;
            a.z += dz * push;
          }
          if (!(b.relativeDepth === 0 && activeRoots.length === 1)) {
            b.x -= dx * push;
            b.y -= dy * push;
            b.z -= dz * push;
          }
        }
      }
    }
    for (const edge of edges) {
      const p = nodes[edge.source]!;
      const c = nodes[edge.target]!;
      const targetLen = c.relativeDepth === 1 ? 142 : c.relativeDepth === 2 ? 104 : 78;
      const dx = c.x - p.x;
      const dy = c.y - p.y;
      const dz = c.z - p.z;
      const dist = Math.hypot(dx, dy, dz) || 1;
      const pull = ((dist - targetLen) / dist) * 0.22;
      c.x -= dx * pull;
      c.y -= dy * pull;
      c.z -= dz * pull;
    }
  }

  return { nodes, edges, focusTrail: baseTrail };
}

export function TopicGraph3D({
  roots,
  crossLinks = [],
}: {
  roots: TreeBranch[];
  crossLinks?: { sourceId: string; targetId: string; relation: string; note: string | null }[];
}) {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Fold branches at depth >= 3 by default so 3- and 4-hop nodes are expandable on demand
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(() => collectDeepBranchIds(roots, 3));
  const [focusRootId, setFocusRootId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [maxDepth, setMaxDepth] = useState<number>(6);
  const [autoRotate, setAutoRotate] = useState(true);

  // When searching, temporarily unfold all branches so matches at depth 4–5 are visible
  const effectiveCollapsed = useMemo(
    () => (query.trim().length > 0 ? new Set<string>() : collapsedIds),
    [collapsedIds, query],
  );

  const { nodes, edges, focusTrail } = useMemo(
    () => buildGraph3D(roots, focusRootId, effectiveCollapsed),
    [roots, focusRootId, effectiveCollapsed],
  );

  const [selectedId, setSelectedId] = useState<string | null>(() => {
    // Default selection to the first trunk with research or the first trunk
    const researched = nodes.find((n) => n.subtreeClaims > 0);
    return researched?.id ?? nodes[0]?.id ?? null;
  });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const viewRef = useRef({
    yaw: 0.42,
    pitch: 0.24,
    zoom: 1.0,
    dragging: false,
    dragMoved: false,
    lastX: 0,
    lastY: 0,
  });

  const projectedRef = useRef<
    { id: string; slug: string; sx: number; sy: number; r: number; zCam: number; visible: boolean }[]
  >([]);

  const normalizedQuery = query.trim().toLowerCase();

  const visibleNodeIds = useMemo(() => {
    const set = new Set<string>();
    for (const n of nodes) {
      if (n.relativeDepth > maxDepth) continue;
      if (
        !normalizedQuery ||
        n.title.toLowerCase().includes(normalizedQuery) ||
        (n.brief?.toLowerCase().includes(normalizedQuery) ?? false) ||
        n.path.some((p) => p.title.toLowerCase().includes(normalizedQuery))
      ) {
        set.add(n.id);
      }
    }
    return set;
  }, [nodes, maxDepth, normalizedQuery]);

  const activeNode = useMemo(
    () => nodes.find((n) => n.id === (hoveredId ?? selectedId)) ?? nodes[0] ?? null,
    [nodes, hoveredId, selectedId],
  );

  const activeBranchTree = useMemo(() => {
    if (!activeNode) return null;
    return findBranchWithTrail(roots, activeNode.id)?.branch ?? null;
  }, [roots, activeNode]);

  const activeCrossBranches = useMemo(() => {
    if (!activeNode || crossLinks.length === 0) return [];
    const results: { branch: TreeBranch; relation: string; note: string | null }[] = [];
    const seen = new Set<string>();
    for (const l of crossLinks) {
      const otherId = l.sourceId === activeNode.id ? l.targetId : l.targetId === activeNode.id ? l.sourceId : null;
      if (!otherId || seen.has(otherId)) continue;
      const found = findBranchWithTrail(roots, otherId);
      if (found) {
        seen.add(otherId);
        results.push({ branch: found.branch, relation: l.relation, note: l.note });
      }
    }
    return results;
  }, [roots, activeNode, crossLinks]);

  function toggleCollapse(id: string) {
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function expandSubtreeOneLevel(branch: TreeBranch) {
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      next.delete(branch.id);
      return next;
    });
  }

  function focusOnBranch(id: string | null) {
    setFocusRootId(id);
    if (id) {
      setSelectedId(id);
      const found = findBranchWithTrail(roots, id);
      if (found) {
        // Unfold the focused node and its direct children up to 2 relative hops
        setCollapsedIds((prev) => {
          const next = new Set(prev);
          next.delete(found.branch.id);
          for (const child of found.branch.children) {
            next.delete(child.id);
          }
          return next;
        });
      }
    }
    viewRef.current.yaw = 0.42;
    viewRef.current.pitch = 0.24;
    viewRef.current.zoom = 1.05;
  }

  // Respect prefers-reduced-motion on initial mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAutoRotate(false);
    }
  }, []);

  // High-DPI canvas sizing with devicePixelContentBoxSize fallback
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const dpc = (entry as ResizeObserverEntry & { devicePixelContentBoxSize?: readonly ResizeObserverSize[] })
        .devicePixelContentBoxSize;
      canvas.width = dpc
        ? dpc[0]!.inlineSize
        : Math.max(300, Math.round(entry.contentRect.width * window.devicePixelRatio));
      canvas.height = dpc
        ? dpc[0]!.blockSize
        : Math.max(260, Math.round(entry.contentRect.height * window.devicePixelRatio));
    });
    const supportsDevicePixelContentBox =
      typeof ResizeObserverEntry !== "undefined" &&
      "devicePixelContentBoxSize" in ResizeObserverEntry.prototype;
    observer.observe(canvas, supportsDevicePixelContentBox ? { box: "device-pixel-content-box" } : {});
    return () => observer.disconnect();
  }, []);

  // Main 3D render loop
  useEffect(() => {
    let rafId = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      const style = getComputedStyle(document.documentElement);
      const colSheet = style.getPropertyValue("--sheet").trim() || "#fbfcfc";
      const colInk = style.getPropertyValue("--ink").trim() || "#172426";
      const colMuted = style.getPropertyValue("--muted").trim() || "#56666a";
      const colRule = style.getPropertyValue("--rule").trim() || "#cfd8d6";
      const colT1 = style.getPropertyValue("--t1").trim() || "#1d3a9e";
      const colT2 = style.getPropertyValue("--t2").trim() || "#3757c0";
      const colT3 = style.getPropertyValue("--t3").trim() || "#6c86d6";
      const colT4 = style.getPropertyValue("--t4").trim() || "#a3b4e6";
      const colErr = style.getPropertyValue("--hype-ink").trim() || "#8c2618";

      const v = viewRef.current;
      if (autoRotate && !v.dragging && !hoveredId) {
        v.yaw += 0.002;
      }

      const w = canvas.width;
      const h = canvas.height;
      const dpr = Math.max(1, w / (canvas.clientWidth || 600));
      ctx.clearRect(0, 0, w, h);

      // Subtle archival coordinate rings
      const cx = w / 2;
      const cy = h / 2;
      ctx.save();
      ctx.strokeStyle = colRule;
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 1 * dpr;
      for (const ringR of [95, 185, 265]) {
        ctx.beginPath();
        ctx.ellipse(
          cx,
          cy,
          ringR * v.zoom * dpr,
          ringR * v.zoom * dpr * Math.max(0.28, Math.abs(Math.sin(v.pitch + 0.55))),
          0,
          0,
          Math.PI * 2,
        );
        ctx.stroke();
      }
      ctx.restore();

      const cosY = Math.cos(v.yaw);
      const sinY = Math.sin(v.yaw);
      const cosP = Math.cos(v.pitch);
      const sinP = Math.sin(v.pitch);
      const fov = 560;

      const proj = nodes.map((n) => {
        const x1 = n.x * cosY - n.z * sinY;
        const z1 = n.x * sinY + n.z * cosY;
        const y2 = n.y * cosP - z1 * sinP;
        const z2 = n.y * sinP + z1 * cosP;

        const scale = (fov / Math.max(160, fov + z2)) * v.zoom * dpr;
        const sx = cx + x1 * scale;
        const sy = cy + y2 * scale;
        const baseR =
          n.relativeDepth === 0 ? 11.2 : n.relativeDepth === 1 ? 8.2 : n.relativeDepth === 2 ? 6.2 : 4.8;
        const claimBoost = Math.min(4.8, Math.sqrt(n.subtreeClaims) * 0.9);
        const r = Math.max(3.2 * dpr, (baseR + claimBoost) * scale);
        const visible = n.relativeDepth <= maxDepth;
        const matched = visibleNodeIds.has(n.id);
        return { node: n, sx, sy, r, zCam: z2, scale, visible, matched };
      });

      projectedRef.current = proj.map((p) => ({
        id: p.node.id,
        slug: p.node.slug,
        sx: p.sx,
        sy: p.sy,
        r: p.r,
        zCam: p.zCam,
        visible: p.visible,
      }));

      // Active lineage set (ancestors + direct children of active node)
      const activeId = hoveredId ?? selectedId;
      const relatedIds = new Set<string>();
      if (activeId) {
        relatedIds.add(activeId);
        let curr = nodes.find((n) => n.id === activeId);
        while (curr?.parentId) {
          relatedIds.add(curr.parentId);
          curr = nodes.find((n) => n.id === curr!.parentId);
        }
        for (const n of nodes) {
          if (n.parentId === activeId) relatedIds.add(n.id);
        }
      }

      // Draw edges sorted back-to-front
      const sortedEdges = [...edges].sort((a, b) => {
        const za = (proj[a.source]!.zCam + proj[a.target]!.zCam) / 2;
        const zb = (proj[b.source]!.zCam + proj[b.target]!.zCam) / 2;
        return zb - za;
      });

      for (const edge of sortedEdges) {
        const a = proj[edge.source]!;
        const b = proj[edge.target]!;
        if (!a.visible || !b.visible) continue;
        const highlighted = relatedIds.has(a.node.id) && relatedIds.has(b.node.id);
        const dimmed = normalizedQuery.length > 0 && !a.matched && !b.matched;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.strokeStyle = highlighted ? colT1 : colRule;
        ctx.lineWidth = (highlighted ? 2.1 : 1.1) * dpr;
        ctx.globalAlpha = dimmed ? 0.14 : highlighted ? 0.92 : 0.58;
        ctx.stroke();
        ctx.restore();
      }

      // Draw cross-branch / cross-trunk bridge arcs when both endpoints are visible
      if (crossLinks.length > 0) {
        const projById = new Map(proj.map((p) => [p.node.id, p]));
        for (const cl of crossLinks) {
          const a = projById.get(cl.sourceId);
          const b = projById.get(cl.targetId);
          if (!a || !b || !a.visible || !b.visible) continue;
          const activeBridge = activeId === a.node.id || activeId === b.node.id;
          ctx.save();
          ctx.beginPath();
          ctx.setLineDash([4 * dpr, 4 * dpr]);
          const mx = (a.sx + b.sx) / 2;
          const my = (a.sy + b.sy) / 2 - 18 * dpr;
          ctx.moveTo(a.sx, a.sy);
          ctx.quadraticCurveTo(mx, my, b.sx, b.sy);
          ctx.strokeStyle = activeBridge ? colT1 : colT2;
          ctx.lineWidth = (activeBridge ? 1.8 : 1.0) * dpr;
          ctx.globalAlpha = activeBridge ? 0.85 : 0.32;
          ctx.stroke();
          ctx.restore();
        }
      }

      // Draw nodes back-to-front
      const sortedNodes = [...proj].sort((a, b) => b.zCam - a.zCam);

      for (const item of sortedNodes) {
        if (!item.visible) continue;
        const { node, sx, sy, r, matched } = item;
        const isSelected = node.id === selectedId;
        const isHovered = node.id === hoveredId;
        const isRelated = relatedIds.has(node.id);
        const dimmed = normalizedQuery.length > 0 && !matched;

        let fill = colT3;
        if (node.status === "error") fill = colErr;
        else if (node.status === "ready" || node.claimCount > 0) fill = colT1;
        else if (node.status === "researching" || node.status === "queued" || node.subtreeClaims > 0) fill = colT2;
        else if (node.relativeDepth === 0) fill = colT1;
        else if (node.relativeDepth === 1) fill = colT2;
        else if (node.relativeDepth === 2) fill = colT3;
        else fill = colT4;

        ctx.save();
        ctx.globalAlpha = dimmed ? 0.2 : 1;

        // Dashed outer cluster ring when a node has folded sub-branches (3 & 4+ hops)
        if (node.isCollapsed && node.hiddenDescendantCount > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.setLineDash([3 * dpr, 2.5 * dpr]);
          ctx.arc(sx, sy, r + 4.5 * dpr, 0, Math.PI * 2);
          ctx.strokeStyle = colT1;
          ctx.lineWidth = 1.4 * dpr;
          ctx.globalAlpha = dimmed ? 0.15 : 0.75;
          ctx.stroke();
          ctx.restore();
        } else if (isSelected || isHovered || node.claimCount > 0) {
          ctx.beginPath();
          ctx.arc(sx, sy, r + (isSelected || isHovered ? 5.5 : 3) * dpr, 0, Math.PI * 2);
          ctx.strokeStyle = isSelected || isHovered ? colT1 : fill;
          ctx.lineWidth = (isSelected || isHovered ? 2 : 1.2) * dpr;
          ctx.globalAlpha = dimmed ? 0.15 : isSelected || isHovered ? 0.9 : 0.4;
          ctx.stroke();
          ctx.globalAlpha = dimmed ? 0.2 : 1;
        }

        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.lineWidth = 1.5 * dpr;
        ctx.strokeStyle = colSheet;
        ctx.stroke();

        // Show labels for roots, relativeDepth 1, folded clusters, hovered/selected, or search matches
        const showLabel =
          node.relativeDepth <= 1 ||
          node.isCollapsed ||
          isSelected ||
          isHovered ||
          (normalizedQuery.length > 0 && matched) ||
          (isRelated && node.relativeDepth <= 2);

        if (showLabel) {
          const fontSize = Math.round(
            (node.relativeDepth === 0 ? 12.5 : node.relativeDepth === 1 ? 11.2 : 10.2) * dpr,
          );
          ctx.font = `${isSelected || isHovered || node.relativeDepth === 0 ? 600 : 500} ${fontSize}px "Public Sans", system-ui, sans-serif`;
          const label =
            node.title.length > 36 && !isSelected && !isHovered ? `${node.title.slice(0, 34)}…` : node.title;
          const foldedTag = node.isCollapsed && node.hiddenDescendantCount > 0 ? ` [+${node.hiddenDescendantCount}]` : "";
          const claimTag = node.claimCount > 0 ? ` (${node.claimCount})` : "";
          const text = `${label}${claimTag}${foldedTag}`;
          const tx = sx + r + 6 * dpr;
          const ty = sy + 3.5 * dpr;

          ctx.lineWidth = 3.2 * dpr;
          ctx.strokeStyle = colSheet;
          ctx.strokeText(text, tx, ty);
          ctx.fillStyle = isSelected || isHovered || node.relativeDepth === 0 ? colInk : colMuted;
          ctx.fillText(text, tx, ty);
        }

        ctx.restore();
      }

      rafId = window.requestAnimationFrame(render);
    };

    rafId = window.requestAnimationFrame(render);
    return () => window.cancelAnimationFrame(rafId);
  }, [nodes, edges, crossLinks, autoRotate, hoveredId, selectedId, maxDepth, normalizedQuery, visibleNodeIds]);

  function findHitNode(clientX: number, clientY: number) {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const dprX = canvas.width / (rect.width || 1);
    const dprY = canvas.height / (rect.height || 1);
    const x = (clientX - rect.left) * dprX;
    const y = (clientY - rect.top) * dprY;

    const candidates = projectedRef.current
      .filter((p) => p.visible)
      .sort((a, b) => a.zCam - b.zCam);

    for (const p of candidates) {
      const dist = Math.hypot(x - p.sx, y - p.sy);
      if (dist <= p.r + 7 * dprX) return p;
    }
    return null;
  }

  return (
    <div className="graph3d-wrap">
      <div className="graph3d-toolbar">
        <label className="graph3d-search">
          <span className="visually-hidden">Filter scientific fields</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter disciplines & sub-branches (e.g. Pregnancy after 40, Pre-eclampsia, Law)…"
          />
        </label>
        <div className="graph3d-controls">
          <label className="graph3d-depth">
            <span>Hops</span>
            <select value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))}>
              <option value={1}>≤ 1 hop</option>
              <option value={2}>≤ 2 hops</option>
              <option value={3}>≤ 3 hops</option>
              <option value={6}>All visible ({nodes.length})</option>
            </select>
          </label>
          <button
            type="button"
            className="quiet-button"
            onClick={() => setCollapsedIds(new Set())}
            title="Unfold all 3rd, 4th, and 5th-order sub-branches"
          >
            Expand all
          </button>
          <button
            type="button"
            className="quiet-button"
            onClick={() => setCollapsedIds(collectDeepBranchIds(roots, 3))}
            title="Fold sub-branches 3 and 4+ hops away into [+N] clusters"
          >
            Collapse deep (≥ 3)
          </button>
          <button
            type="button"
            className="quiet-button"
            aria-pressed={autoRotate}
            onClick={() => setAutoRotate((v) => !v)}
          >
            {autoRotate ? "Pause orbit" : "Orbit 3D"}
          </button>
          <button
            type="button"
            className="quiet-button"
            onClick={() => {
              setFocusRootId(null);
              viewRef.current.yaw = 0.42;
              viewRef.current.pitch = 0.24;
              viewRef.current.zoom = 1.0;
            }}
          >
            Reset view
          </button>
        </div>
      </div>

      {/* Constellation Breadcrumb Bar for stepping across trunks & deep branches */}
      <div className="graph3d-breadcrumbs" aria-label="Constellation branch path">
        <button
          type="button"
          className="crumb-pill"
          data-active={focusRootId === null ? "true" : undefined}
          onClick={() => focusOnBranch(null)}
        >
          All Trunks ({roots.length})
        </button>
        {(activeNode ? activeNode.path : focusTrail).map((seg) => (
          <span key={seg.id} className="crumb-segment">
            <span className="muted" aria-hidden="true">
              ›
            </span>
            <button
              type="button"
              className="crumb-pill"
              data-active={focusRootId === seg.id ? "true" : undefined}
              onClick={() => {
                setSelectedId(seg.id);
                focusOnBranch(seg.id);
              }}
            >
              {seg.title}
            </button>
          </span>
        ))}
        {activeNode && (
          <span className="crumb-segment">
            <span className="muted" aria-hidden="true">
              ›
            </span>
            <span className="crumb-current">
              {activeNode.title} <span className="muted">(depth {activeNode.depth})</span>
            </span>
          </span>
        )}
      </div>

      <div className="graph3d-stage">
        <canvas
          ref={canvasRef}
          className="graph3d-canvas"
          tabIndex={0}
          aria-label="Interactive 3D node map of scientific fields. Use arrow keys or drag to rotate, plus or minus to zoom."
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            viewRef.current.dragging = true;
            viewRef.current.dragMoved = false;
            viewRef.current.lastX = e.clientX;
            viewRef.current.lastY = e.clientY;
          }}
          onPointerMove={(e) => {
            if (viewRef.current.dragging) {
              const dx = e.clientX - viewRef.current.lastX;
              const dy = e.clientY - viewRef.current.lastY;
              if (Math.abs(dx) + Math.abs(dy) > 3) viewRef.current.dragMoved = true;
              viewRef.current.yaw += dx * 0.0075;
              viewRef.current.pitch = Math.max(-1.25, Math.min(1.25, viewRef.current.pitch + dy * 0.0075));
              viewRef.current.lastX = e.clientX;
              viewRef.current.lastY = e.clientY;
              return;
            }
            const hit = findHitNode(e.clientX, e.clientY);
            setHoveredId(hit?.id ?? null);
          }}
          onPointerUp={(e) => {
            const wasDrag = viewRef.current.dragMoved;
            viewRef.current.dragging = false;
            if (!wasDrag) {
              const hit = findHitNode(e.clientX, e.clientY);
              if (hit) {
                // If clicking an already-selected node that has children, toggle its fold state!
                const targetNode = nodes.find((n) => n.id === hit.id);
                if (hit.id === selectedId && targetNode && targetNode.childCount > 0) {
                  toggleCollapse(hit.id);
                } else {
                  setSelectedId(hit.id);
                }
              }
            }
          }}
          onDoubleClick={(e) => {
            const hit = findHitNode(e.clientX, e.clientY);
            if (!hit) return;
            const targetNode = nodes.find((n) => n.id === hit.id);
            if (targetNode && targetNode.childCount > 0) {
              focusOnBranch(targetNode.id);
            } else {
              router.push(`/topic/${hit.slug}`);
            }
          }}
          onWheel={(e) => {
            e.preventDefault();
            const factor = e.deltaY < 0 ? 1.1 : 0.9;
            viewRef.current.zoom = Math.max(0.45, Math.min(2.6, viewRef.current.zoom * factor));
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") viewRef.current.yaw -= 0.1;
            else if (e.key === "ArrowRight") viewRef.current.yaw += 0.1;
            else if (e.key === "ArrowUp") viewRef.current.pitch = Math.max(-1.25, viewRef.current.pitch - 0.1);
            else if (e.key === "ArrowDown") viewRef.current.pitch = Math.min(1.25, viewRef.current.pitch + 0.1);
            else if (e.key === "+" || e.key === "=") viewRef.current.zoom = Math.min(2.6, viewRef.current.zoom * 1.12);
            else if (e.key === "-") viewRef.current.zoom = Math.max(0.45, viewRef.current.zoom * 0.88);
          }}
        />
        <p className="graph3d-hint muted small">
          Drag to orbit · Scroll to zoom · Click a node to inspect (click again to unfold <code>[+N]</code> children) ·
          Double-click a parent to focus its subtree
        </p>
      </div>

      {activeNode && (
        <div className="graph3d-inspector" role="status" aria-live="polite">
          <div className="graph3d-inspector-head">
            <div>
              {activeNode.path.length > 0 && (
                <p className="graph3d-path muted small">
                  {activeNode.path.map((p) => p.title).join(" › ")} · Depth {activeNode.depth}
                </p>
              )}
              <h3 className="graph3d-title">{activeNode.title}</h3>
            </div>
            <div className="graph3d-inspector-actions">
              {activeNode.childCount > 0 && (
                <button
                  type="button"
                  className="quiet-button"
                  onClick={() => toggleCollapse(activeNode.id)}
                >
                  {activeNode.isCollapsed
                    ? `Expand sub-branches (+${activeNode.hiddenDescendantCount})`
                    : `Collapse sub-branches (${activeNode.childCount})`}
                </button>
              )}
              {activeNode.childCount > 0 && (
                <button
                  type="button"
                  className="quiet-button"
                  aria-pressed={focusRootId === activeNode.id}
                  onClick={() =>
                    focusOnBranch(focusRootId === activeNode.id ? activeNode.parentId : activeNode.id)
                  }
                >
                  {focusRootId === activeNode.id ? "↑ Exit subtree focus" : "Focus subtree"}
                </button>
              )}
              <Link href={`/topic/${activeNode.slug}`} className="donate-button">
                Open dossier →
              </Link>
            </div>
          </div>

          {activeNode.brief && <p className="graph3d-brief">{activeNode.brief}</p>}

          <p className="muted small">
            {STATUS_LABEL[activeNode.status] ?? activeNode.status} · {activeNode.claimCount}{" "}
            {activeNode.claimCount === 1 ? "direct finding" : "direct findings"}
            {activeNode.subtreeClaims > activeNode.claimCount
              ? ` (${activeNode.subtreeClaims} across subtree)`
              : ""}{" "}
            · {activeNode.childCount} {activeNode.childCount === 1 ? "direct sub-branch" : "direct sub-branches"}
            {activeNode.descendantCount > activeNode.childCount
              ? ` (${activeNode.descendantCount} total descendants)`
              : ""}
          </p>

          {activeBranchTree && activeBranchTree.children.length > 0 && (
            <div className="graph3d-children">
              <span className="muted small">Step into sub-branch:</span>
              <div className="graph3d-child-pills">
                {activeBranchTree.children.map((child) => {
                  const childDesc = countDescendants(child);
                  return (
                    <button
                      key={child.id}
                      type="button"
                      className="crumb-pill"
                      onClick={() => {
                        expandSubtreeOneLevel(activeBranchTree);
                        setSelectedId(child.id);
                        if (child.depth >= 3 && child.children.length > 0) {
                          expandSubtreeOneLevel(child);
                        }
                      }}
                    >
                      {child.title}
                      {child.claimCount > 0 ? ` (${child.claimCount})` : ""}
                      {childDesc > 0 ? ` · +${childDesc}` : ""}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeCrossBranches.length > 0 && (
            <div className="graph3d-children">
              <span className="muted small">Connected disciplines across the tree:</span>
              <div className="graph3d-child-pills">
                {activeCrossBranches.map(({ branch: linked, relation, note }) => (
                  <button
                    key={linked.id}
                    type="button"
                    className="crumb-pill"
                    title={note ?? linked.brief ?? relation}
                    onClick={() => {
                      const trailFound = findBranchWithTrail(roots, linked.id);
                      if (trailFound) {
                        setCollapsedIds((prev) => {
                          const next = new Set(prev);
                          for (const seg of trailFound.trail) next.delete(seg.id);
                          next.delete(linked.id);
                          return next;
                        });
                      }
                      setFocusRootId(null);
                      setSelectedId(linked.id);
                    }}
                  >
                    ↔ {linked.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
