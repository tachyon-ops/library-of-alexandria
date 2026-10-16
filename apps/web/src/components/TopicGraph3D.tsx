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
  const [autoRotate, setAutoRotate] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    velYaw: 0,
    velPitch: 0,
    zoom: 1.0,
    targetZoom: 1.0,
    camX: 0,
    camY: 0,
    camZ: 0,
    targetCamX: 0,
    targetCamY: 0,
    targetCamZ: 0,
    dragging: false,
    dragMoved: false,
    dragMode: "orbit" as "orbit" | "pan",
    lastX: 0,
    lastY: 0,
  });

  const activePointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchDistRef = useRef<number | null>(null);

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

  // Keep live render state in a ref so the RAF loop runs continuously without tearing down on hover/selection
  const renderStateRef = useRef({
    nodes,
    edges,
    crossLinks,
    autoRotate,
    hoveredId,
    selectedId,
    maxDepth,
    normalizedQuery,
    visibleNodeIds,
  });

  useEffect(() => {
    renderStateRef.current = {
      nodes,
      edges,
      crossLinks,
      autoRotate,
      hoveredId,
      selectedId,
      maxDepth,
      normalizedQuery,
      visibleNodeIds,
    };
  });

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

  function zoomToNode(node: GraphNode) {
    setSelectedId(node.id);
    if (node.childCount > 0 && effectiveCollapsed.has(node.id)) {
      setCollapsedIds((prev) => {
        const next = new Set(prev);
        next.delete(node.id);
        return next;
      });
    }
    viewRef.current.targetCamX = node.x;
    viewRef.current.targetCamY = node.y;
    viewRef.current.targetCamZ = node.z;
    viewRef.current.targetZoom = 1.75;
  }

  function resetView() {
    setFocusRootId(null);
    const v = viewRef.current;
    v.targetCamX = 0;
    v.targetCamY = 0;
    v.targetCamZ = 0;
    v.targetZoom = 1.0;
    v.yaw = 0.42;
    v.pitch = 0.24;
    v.velYaw = 0;
    v.velPitch = 0;
  }

  // Non-passive wheel event listener attached directly to the canvas element:
  // prevents default document scroll while providing smooth, continuous normalized zoom.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      let delta = e.deltaY;
      if (e.deltaMode === 1) {
        delta *= 16;
      } else if (e.deltaMode === 2) {
        delta *= 100;
      }

      // Trackpad pinch-to-zoom (ctrlKey) vs standard wheel/trackpad scroll
      const isPinch = e.ctrlKey;
      const sensitivity = isPinch ? 0.008 : 0.0016;
      const clampedDelta = Math.max(-120, Math.min(120, delta));
      const factor = Math.exp(-clampedDelta * sensitivity);

      const v = viewRef.current;
      v.targetZoom = Math.max(0.4, Math.min(3.2, v.targetZoom * factor));
    };

    canvas.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, []);

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
      const matched = nodes.find((n) => n.id === id);
      if (matched) {
        viewRef.current.targetCamX = matched.x;
        viewRef.current.targetCamY = matched.y;
        viewRef.current.targetCamZ = matched.z;
      }
      viewRef.current.targetZoom = 1.45;
    } else {
      resetView();
    }
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

      const state = renderStateRef.current;
      const v = viewRef.current;

      v.camX += (v.targetCamX - v.camX) * 0.12;
      v.camY += (v.targetCamY - v.camY) * 0.12;
      v.camZ += (v.targetCamZ - v.camZ) * 0.12;
      v.zoom += (v.targetZoom - v.zoom) * 0.14;

      if (!v.dragging) {
        if (Math.abs(v.velYaw) > 0.00002) {
          v.yaw += v.velYaw;
          v.velYaw *= 0.92;
        } else {
          v.velYaw = 0;
        }

        if (Math.abs(v.velPitch) > 0.00002) {
          v.pitch = Math.max(-1.25, Math.min(1.25, v.pitch + v.velPitch));
          v.velPitch *= 0.92;
        } else {
          v.velPitch = 0;
        }

        if (state.autoRotate && !state.hoveredId && Math.abs(v.velYaw) < 0.0001) {
          v.yaw += 0.0004;
        }
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

      const activeId = state.hoveredId ?? state.selectedId;

      const proj = state.nodes.map((n) => {
        const rx = n.x - v.camX;
        const ry = n.y - v.camY;
        const rz = n.z - v.camZ;

        const x1 = rx * cosY - rz * sinY;
        const z1 = rx * sinY + rz * cosY;
        const y2 = ry * cosP - z1 * sinP;
        const z2 = ry * sinP + z1 * cosP;

        const scale = (fov / Math.max(160, fov + z2)) * v.zoom * dpr;
        const sx = cx + x1 * scale;
        const sy = cy + y2 * scale;
        const isActive = n.id === activeId;
        const baseR = isActive
          ? 16.5
          : n.relativeDepth === 0
            ? 11.2
            : n.relativeDepth === 1
              ? 8.2
              : n.relativeDepth === 2
                ? 6.2
                : 4.8;
        const claimBoost = Math.min(4.8, Math.sqrt(n.subtreeClaims) * 0.9);
        const r = Math.max(3.5 * dpr, (baseR + claimBoost) * scale);
        const visible = n.relativeDepth <= state.maxDepth;
        const matched = state.visibleNodeIds.has(n.id);
        return { node: n, sx, sy, r, zCam: z2, scale, visible, matched, isActive };
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

      // Active lineage sets: active node, parent, ancestors, and direct children
      const activeProj = activeId ? proj.find((p) => p.node.id === activeId) : null;
      const parentId = activeProj?.node.parentId ?? null;
      const parentProj = parentId ? proj.find((p) => p.node.id === parentId) : null;

      const ancestorIds = new Set<string>();
      if (activeProj) {
        let currPId = activeProj.node.parentId;
        while (currPId) {
          ancestorIds.add(currPId);
          const pNode = state.nodes.find((n) => n.id === currPId);
          currPId = pNode ? pNode.parentId : null;
        }
      }

      const childIds = new Set<string>();
      if (activeId) {
        for (const n of state.nodes) {
          if (n.parentId === activeId) childIds.add(n.id);
        }
      }

      // 1. Draw background / normal edges (excluding active child tubes and parent conduit)
      const sortedEdges = [...state.edges].sort((a, b) => {
        const za = (proj[a.source]!.zCam + proj[a.target]!.zCam) / 2;
        const zb = (proj[b.source]!.zCam + proj[b.target]!.zCam) / 2;
        return zb - za;
      });

      for (const edge of sortedEdges) {
        const a = proj[edge.source]!;
        const b = proj[edge.target]!;
        if (!a.visible || !b.visible) continue;
        const isChildEdge =
          (a.node.id === activeId && childIds.has(b.node.id)) ||
          (b.node.id === activeId && childIds.has(a.node.id));
        const isParentEdge =
          (a.node.id === activeId && b.node.id === parentId) ||
          (b.node.id === activeId && a.node.id === parentId);
        if (isChildEdge || isParentEdge) continue;

        const dimmed = state.normalizedQuery.length > 0 && !a.matched && !b.matched;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.strokeStyle = colRule;
        ctx.lineWidth = 1.0 * dpr;
        ctx.globalAlpha = dimmed ? 0.08 : 0.22;
        ctx.stroke();
        ctx.restore();
      }

      // 2. Draw cross-branch bridge arcs
      if (state.crossLinks.length > 0) {
        const projById = new Map(proj.map((p) => [p.node.id, p]));
        for (const cl of state.crossLinks) {
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
          ctx.globalAlpha = activeBridge ? 0.85 : 0.25;
          ctx.stroke();
          ctx.restore();
        }
      }

      // 3. Ancestral Conduit: connection from Parent to Active Ball ("parents in another form")
      if (parentProj && activeProj && parentProj.visible && activeProj.visible) {
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([6 * dpr, 4 * dpr]);
        ctx.moveTo(parentProj.sx, parentProj.sy);
        ctx.lineTo(activeProj.sx, activeProj.sy);
        ctx.strokeStyle = colT2;
        ctx.lineWidth = 2.4 * dpr;
        ctx.globalAlpha = 0.85;
        ctx.stroke();

        // Directional chevron along the ancestral line flowing into active ball
        const acDx = activeProj.sx - parentProj.sx;
        const acDy = activeProj.sy - parentProj.sy;
        const acDist = Math.hypot(acDx, acDy) || 1;
        const acUx = acDx / acDist;
        const acUy = acDy / acDist;
        const acNx = -acUy;
        const acNy = acUx;
        const midX = (parentProj.sx + activeProj.sx) / 2;
        const midY = (parentProj.sy + activeProj.sy) / 2;

        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(midX - acUx * 7 * dpr + acNx * 6 * dpr, midY - acUy * 7 * dpr + acNy * 6 * dpr);
        ctx.lineTo(midX + acUx * 4 * dpr, midY + acUy * 4 * dpr);
        ctx.lineTo(midX - acUx * 7 * dpr - acNx * 6 * dpr, midY - acUy * 7 * dpr - acNy * 6 * dpr);
        ctx.strokeStyle = colT1;
        ctx.lineWidth = 2.2 * dpr;
        ctx.stroke();
        ctx.restore();
      }

      // 4. Children as 3D Extruded Volumetric Tubes from the active ball
      if (activeProj && activeProj.visible) {
        const nowTime = performance.now();
        for (const childId of childIds) {
          const cp = proj.find((p) => p.node.id === childId);
          if (!cp || !cp.visible) continue;

          const tDx = cp.sx - activeProj.sx;
          const tDy = cp.sy - activeProj.sy;
          const tDist = Math.hypot(tDx, tDy);
          if (tDist <= 8) continue;

          const ux = tDx / tDist;
          const uy = tDy / tDist;
          const nx = -uy;
          const ny = ux;

          const wA = Math.max(7 * dpr, Math.min(activeProj.r * 0.65, 22 * dpr));
          const wC = Math.max(4.5 * dpr, Math.min(cp.r * 0.65, 14 * dpr));

          const startX = activeProj.sx + ux * (activeProj.r * 0.82);
          const startY = activeProj.sy + uy * (activeProj.r * 0.82);
          const endX = cp.sx - ux * (cp.r * 0.82);
          const endY = cp.sy - uy * (cp.r * 0.82);

          ctx.save();
          // Extruded tube 3D polygon
          ctx.beginPath();
          ctx.moveTo(startX + nx * (wA * 0.5), startY + ny * (wA * 0.5));
          ctx.lineTo(endX + nx * (wC * 0.5), endY + ny * (wC * 0.5));
          ctx.lineTo(endX - nx * (wC * 0.5), endY - ny * (wC * 0.5));
          ctx.lineTo(startX - nx * (wA * 0.5), startY - ny * (wA * 0.5));
          ctx.closePath();

          // 3D cylindrical lighting gradient across tube width
          const tubeGrad = ctx.createLinearGradient(
            startX + nx * (wA * 0.5),
            startY + ny * (wA * 0.5),
            startX - nx * (wA * 0.5),
            startY - ny * (wA * 0.5),
          );
          tubeGrad.addColorStop(0.0, "#0b173c");
          tubeGrad.addColorStop(0.2, colT1);
          tubeGrad.addColorStop(0.48, "#b3ceff"); // Specular gleam highlight
          tubeGrad.addColorStop(0.72, colT2);
          tubeGrad.addColorStop(1.0, "#08102b");
          ctx.fillStyle = tubeGrad;
          ctx.fill();

          // Crisp cylindrical edge contour
          ctx.strokeStyle = "rgba(11, 23, 60, 0.4)";
          ctx.lineWidth = 1 * dpr;
          ctx.stroke();

          // Extrusion socket collar on the active ball's surface
          ctx.save();
          ctx.translate(startX, startY);
          ctx.rotate(Math.atan2(uy, ux));
          ctx.beginPath();
          ctx.ellipse(0, 0, 3.5 * dpr, wA * 0.56, 0, 0, Math.PI * 2);
          ctx.fillStyle = "#091230";
          ctx.fill();
          ctx.strokeStyle = colT1;
          ctx.lineWidth = 1.2 * dpr;
          ctx.stroke();
          ctx.restore();

          // Knowledge flow pulse sliding along the tube
          const pulseT = ((nowTime * 0.0012 + Math.abs(startX * 0.05)) % 1);
          const px = startX + (endX - startX) * pulseT;
          const py = startY + (endY - startY) * pulseT;
          const pw = wA + (wC - wA) * pulseT;
          ctx.beginPath();
          ctx.arc(px, py, pw * 0.45, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(220, 236, 255, 0.85)";
          ctx.fill();
          ctx.restore();
        }
      }

      // 5. Draw nodes back-to-front
      const sortedNodes = [...proj].sort((a, b) => b.zCam - a.zCam);

      for (const item of sortedNodes) {
        if (!item.visible) continue;
        const { node, sx, sy, r, matched, isActive } = item;
        const isAncestor = ancestorIds.has(node.id);
        const isDirectParent = node.id === parentId;
        const isChild = childIds.has(node.id);
        const isSelected = node.id === state.selectedId;
        const isHovered = node.id === state.hoveredId;
        const dimmed = state.normalizedQuery.length > 0 && !matched;

        // --- FORM A: Ancestors / Parents ("seen in another form") ---
        if (isAncestor || isDirectParent) {
          const beaconR = Math.max(13 * dpr, r * (isDirectParent ? 1.4 : 1.15));

          ctx.save();
          ctx.globalAlpha = dimmed ? 0.2 : 1;

          // Outer celestial orbital ring
          ctx.beginPath();
          ctx.setLineDash([3.5 * dpr, 3 * dpr]);
          ctx.arc(sx, sy, beaconR + (isDirectParent ? 8 : 5) * dpr, 0, Math.PI * 2);
          ctx.strokeStyle = colT2;
          ctx.lineWidth = 1.5 * dpr;
          ctx.globalAlpha = 0.75;
          ctx.stroke();

          // Radial ambient aura
          const aura = ctx.createRadialGradient(sx, sy, beaconR * 0.2, sx, sy, beaconR + 10 * dpr);
          aura.addColorStop(0, "rgba(55, 87, 192, 0.35)");
          aura.addColorStop(1, "rgba(55, 87, 192, 0)");
          ctx.fillStyle = aura;
          ctx.beginPath();
          ctx.arc(sx, sy, beaconR + 10 * dpr, 0, Math.PI * 2);
          ctx.fill();

          // Faceted ancestral diamond anchor portal
          ctx.beginPath();
          ctx.moveTo(sx, sy - beaconR);
          ctx.lineTo(sx + beaconR, sy);
          ctx.lineTo(sx, sy + beaconR);
          ctx.lineTo(sx - beaconR, sy);
          ctx.closePath();

          const diamondGrad = ctx.createLinearGradient(
            sx - beaconR,
            sy - beaconR,
            sx + beaconR,
            sy + beaconR,
          );
          diamondGrad.addColorStop(0, "#2a3d6d");
          diamondGrad.addColorStop(0.5, "#172445");
          diamondGrad.addColorStop(1, "#0a1226");
          ctx.fillStyle = diamondGrad;
          ctx.fill();
          ctx.strokeStyle = "#8daef4";
          ctx.lineWidth = 2 * dpr;
          ctx.setLineDash([]);
          ctx.stroke();

          // Core radiant star glyph
          ctx.beginPath();
          ctx.arc(sx, sy, 3.5 * dpr, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();

          // Stately ancestral badge label
          const prefix = isDirectParent ? "⌂ Parent: " : "Ancestral trunk: ";
          const label = `${prefix}${node.title}`;
          ctx.font = `600 ${Math.round(11 * dpr)}px "Public Sans", system-ui, sans-serif`;
          const tx = sx + beaconR + 7 * dpr;
          const ty = sy + 3.5 * dpr;
          ctx.lineWidth = 3.5 * dpr;
          ctx.strokeStyle = colSheet;
          ctx.strokeText(label, tx, ty);
          ctx.fillStyle = colInk;
          ctx.fillText(label, tx, ty);
          ctx.restore();
          continue;
        }

        // --- FORM B: The Active Hero Ball ---
        if (isActive) {
          ctx.save();
          ctx.globalAlpha = dimmed ? 0.2 : 1;

          // Outer glowing corona halo
          ctx.beginPath();
          ctx.arc(sx, sy, r + 7 * dpr, 0, Math.PI * 2);
          ctx.strokeStyle = colT1;
          ctx.lineWidth = 2.2 * dpr;
          ctx.globalAlpha = 0.85;
          ctx.stroke();

          // 3D Spherical radial gradient
          const sphereGrad = ctx.createRadialGradient(
            sx - r * 0.35,
            sy - r * 0.35,
            r * 0.08,
            sx,
            sy,
            r,
          );
          sphereGrad.addColorStop(0.0, "#ffffff");
          sphereGrad.addColorStop(0.2, "#587ee8");
          sphereGrad.addColorStop(0.7, colT1);
          sphereGrad.addColorStop(1.0, "#0a1538");
          ctx.beginPath();
          ctx.arc(sx, sy, r, 0, Math.PI * 2);
          ctx.fillStyle = sphereGrad;
          ctx.fill();
          ctx.strokeStyle = colSheet;
          ctx.lineWidth = 2 * dpr;
          ctx.stroke();

          // Bold hero title label
          const fontSize = Math.round(12.5 * dpr);
          ctx.font = `600 ${fontSize}px "Public Sans", system-ui, sans-serif`;
          const text = `${node.title}${node.claimCount > 0 ? ` (${node.claimCount})` : ""}`;
          const tx = sx + r + 8 * dpr;
          const ty = sy + 4 * dpr;
          ctx.lineWidth = 3.5 * dpr;
          ctx.strokeStyle = colSheet;
          ctx.strokeText(text, tx, ty);
          ctx.fillStyle = colInk;
          ctx.fillText(text, tx, ty);
          ctx.restore();
          continue;
        }

        // --- FORM C: Child Balls at the ends of extruded tubes ---
        if (isChild) {
          ctx.save();
          ctx.globalAlpha = dimmed ? 0.2 : 1;

          const childGrad = ctx.createRadialGradient(
            sx - r * 0.32,
            sy - r * 0.32,
            r * 0.08,
            sx,
            sy,
            r,
          );
          childGrad.addColorStop(0.0, "#e8efff");
          childGrad.addColorStop(0.25, "#688ee8");
          childGrad.addColorStop(0.75, colT2);
          childGrad.addColorStop(1.0, "#0d1b46");
          ctx.beginPath();
          ctx.arc(sx, sy, r, 0, Math.PI * 2);
          ctx.fillStyle = childGrad;
          ctx.fill();
          ctx.strokeStyle = colSheet;
          ctx.lineWidth = 1.5 * dpr;
          ctx.stroke();

          // Child label
          const childFont = Math.round(11 * dpr);
          ctx.font = `500 ${childFont}px "Public Sans", system-ui, sans-serif`;
          const foldTag =
            node.isCollapsed && node.hiddenDescendantCount > 0
              ? ` [+${node.hiddenDescendantCount}]`
              : "";
          const claimTag = node.claimCount > 0 ? ` (${node.claimCount})` : "";
          const text = `${node.title}${claimTag}${foldTag}`;
          const tx = sx + r + 6 * dpr;
          const ty = sy + 3.5 * dpr;
          ctx.lineWidth = 3.2 * dpr;
          ctx.strokeStyle = colSheet;
          ctx.strokeText(text, tx, ty);
          ctx.fillStyle = colInk;
          ctx.fillText(text, tx, ty);
          ctx.restore();
          continue;
        }

        // --- FORM D: Distant / Other Nodes (Quiet Celestial Background) ---
        ctx.save();
        ctx.globalAlpha = dimmed ? 0.08 : 0.22;

        let fill = colT4;
        if (node.relativeDepth === 0) fill = colT2;
        else if (node.relativeDepth === 1) fill = colT3;

        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.lineWidth = 1 * dpr;
        ctx.strokeStyle = colSheet;
        ctx.stroke();

        const showLabel =
          isHovered ||
          isSelected ||
          (state.normalizedQuery.length > 0 && matched);

        if (showLabel) {
          ctx.globalAlpha = 0.9;
          const fontSize = Math.round(10.5 * dpr);
          ctx.font = `500 ${fontSize}px "Public Sans", system-ui, sans-serif`;
          const text = node.title;
          const tx = sx + r + 5 * dpr;
          const ty = sy + 3 * dpr;
          ctx.lineWidth = 3 * dpr;
          ctx.strokeStyle = colSheet;
          ctx.strokeText(text, tx, ty);
          ctx.fillStyle = colInk;
          ctx.fillText(text, tx, ty);
        }

        ctx.restore();
      }

      rafId = window.requestAnimationFrame(render);
    };

    rafId = window.requestAnimationFrame(render);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

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
            onClick={resetView}
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
          aria-label="Interactive 3D node map of scientific fields. Drag to orbit, Shift+drag or right-click to pan, scroll to zoom."
          onContextMenu={(e) => {
            e.preventDefault();
          }}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

            const isPan = e.button === 1 || e.button === 2 || (e.button === 0 && e.shiftKey);
            viewRef.current.dragging = true;
            viewRef.current.dragMoved = false;
            viewRef.current.dragMode = isPan ? "pan" : "orbit";
            viewRef.current.lastX = e.clientX;
            viewRef.current.lastY = e.clientY;
            viewRef.current.velYaw = 0;
            viewRef.current.velPitch = 0;

            if (activePointersRef.current.size === 2) {
              const pts = Array.from(activePointersRef.current.values());
              pinchDistRef.current = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
            }
          }}
          onPointerMove={(e) => {
            activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

            // Multi-touch pinch-to-zoom on touchscreens / tablets
            if (activePointersRef.current.size >= 2) {
              const pts = Array.from(activePointersRef.current.values());
              const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
              if (pinchDistRef.current && pinchDistRef.current > 0) {
                const factor = dist / pinchDistRef.current;
                viewRef.current.targetZoom = Math.max(0.4, Math.min(3.2, viewRef.current.targetZoom * factor));
                viewRef.current.dragMoved = true;
              }
              pinchDistRef.current = dist;
              return;
            }

            if (viewRef.current.dragging) {
              const dx = e.clientX - viewRef.current.lastX;
              const dy = e.clientY - viewRef.current.lastY;
              if (Math.abs(dx) + Math.abs(dy) > 3) viewRef.current.dragMoved = true;

              if (viewRef.current.dragMode === "pan") {
                const v = viewRef.current;
                const cosY = Math.cos(v.yaw);
                const sinY = Math.sin(v.yaw);
                const cosP = Math.cos(v.pitch);
                const sinP = Math.sin(v.pitch);
                const invScale = 0.85 / (v.zoom || 1);

                const dWorldX = -dx * cosY * invScale + dy * sinY * sinP * invScale;
                const dWorldY = -dy * cosP * invScale;
                const dWorldZ = dx * sinY * invScale + dy * cosY * sinP * invScale;

                v.targetCamX += dWorldX;
                v.targetCamY += dWorldY;
                v.targetCamZ += dWorldZ;
              } else {
                const vx = dx * 0.0065;
                const vy = dy * 0.0065;
                viewRef.current.yaw += vx;
                viewRef.current.pitch = Math.max(-1.25, Math.min(1.25, viewRef.current.pitch + vy));
                viewRef.current.velYaw = vx;
                viewRef.current.velPitch = vy;
              }

              viewRef.current.lastX = e.clientX;
              viewRef.current.lastY = e.clientY;
              return;
            }

            const hit = findHitNode(e.clientX, e.clientY);
            const newHoveredId = hit?.id ?? null;
            if (newHoveredId !== hoveredId) {
              setHoveredId(newHoveredId);
            }
          }}
          onPointerUp={(e) => {
            activePointersRef.current.delete(e.pointerId);
            if (activePointersRef.current.size < 2) {
              pinchDistRef.current = null;
            }
            if (activePointersRef.current.size === 0) {
              const wasDrag = viewRef.current.dragMoved;
              viewRef.current.dragging = false;
              if (!wasDrag) {
                const hit = findHitNode(e.clientX, e.clientY);
                if (hit) {
                  const targetNode = nodes.find((n) => n.id === hit.id);
                  if (hit.id === selectedId && targetNode && targetNode.childCount > 0) {
                    toggleCollapse(hit.id);
                  } else {
                    setSelectedId(hit.id);
                  }
                }
              }
            }
          }}
          onPointerCancel={(e) => {
            activePointersRef.current.delete(e.pointerId);
            if (activePointersRef.current.size === 0) {
              viewRef.current.dragging = false;
              pinchDistRef.current = null;
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
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              viewRef.current.yaw -= 0.08;
              viewRef.current.velYaw = 0;
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              viewRef.current.yaw += 0.08;
              viewRef.current.velYaw = 0;
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              viewRef.current.pitch = Math.max(-1.25, viewRef.current.pitch - 0.08);
              viewRef.current.velPitch = 0;
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              viewRef.current.pitch = Math.min(1.25, viewRef.current.pitch + 0.08);
              viewRef.current.velPitch = 0;
            } else if (e.key === "+" || e.key === "=") {
              e.preventDefault();
              viewRef.current.targetZoom = Math.min(3.2, viewRef.current.targetZoom * 1.15);
            } else if (e.key === "-" || e.key === "_") {
              e.preventDefault();
              viewRef.current.targetZoom = Math.max(0.4, viewRef.current.targetZoom * 0.85);
            } else if (e.key === "0") {
              e.preventDefault();
              resetView();
            }
          }}
        />
        <p className="graph3d-hint muted small">
          Drag to orbit · Shift+drag or right-click to pan · Scroll to zoom · Click to inspect (click again to unfold <code>[+N]</code> children) · Double-click to focus subtree
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
