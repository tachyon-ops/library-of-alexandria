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
  claimCount: number;
  parentId: string | null;
  path: string[];
  childCount: number;
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

/**
 * Deterministic 3D spherical layout with force relaxation so every branch of the
 * knowledge tree sits on an orbital shell around its parent discipline.
 */
function buildGraph3D(roots: TreeBranch[]): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  const indexById = new Map<string, number>();

  function walk(
    branch: TreeBranch,
    path: string[],
    parentIdx: number | null,
    siblingIdx: number,
    siblingCount: number,
    parentPos: [number, number, number],
    parentDir: [number, number, number],
  ) {
    const idx = nodes.length;
    indexById.set(branch.id, idx);

    let x = 0;
    let y = 0;
    let z = 0;
    let dir: [number, number, number] = [0, 1, 0];

    if (parentIdx === null) {
      const offset = siblingCount > 1 ? (siblingIdx - (siblingCount - 1) / 2) * 180 : 0;
      x = offset;
      y = 0;
      z = 0;
    } else {
      // Fibonacci sphere / golden-angle cone distribution around parent direction
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      const theta = goldenAngle * (siblingIdx + 1) + idx * 0.41;
      const radius = branch.depth === 1 ? 155 : branch.depth === 2 ? 115 : 85;
      const spread = branch.depth === 1 ? 1.0 : 0.68;

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
      claimCount: branch.claimCount,
      parentId: branch.parentId,
      path,
      childCount: branch.children.length,
      x,
      y,
      z,
    });

    branch.children.forEach((child, i) => {
      walk(child, [...path, branch.title], idx, i, branch.children.length, [x, y, z], dir);
    });
  }

  roots.forEach((r, i) => walk(r, [], null, i, roots.length, [0, 0, 0], [0, 1, 0]));

  // 3D repulsion + parent spring relaxation for clean separation
  for (let iter = 0; iter < 48; iter++) {
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i]!;
      if (a.depth === 0) continue;
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j]!;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        const distSq = dx * dx + dy * dy + dz * dz + 1;
        const minDist = a.depth === 1 && b.depth === 1 ? 130 : 72;
        if (distSq < minDist * minDist) {
          const dist = Math.sqrt(distSq);
          const push = ((minDist - dist) / dist) * 0.28;
          a.x += dx * push;
          a.y += dy * push;
          a.z += dz * push;
          if (b.depth > 0) {
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
      const targetLen = c.depth === 1 ? 150 : c.depth === 2 ? 105 : 78;
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

  return { nodes, edges };
}

export function TopicGraph3D({ roots }: { roots: TreeBranch[] }) {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { nodes, edges } = useMemo(() => buildGraph3D(roots), [roots]);

  const [query, setQuery] = useState("");
  const [maxDepth, setMaxDepth] = useState<number>(6);
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(nodes[0]?.id ?? null);
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
      if (n.depth > maxDepth) continue;
      if (
        !normalizedQuery ||
        n.title.toLowerCase().includes(normalizedQuery) ||
        (n.brief?.toLowerCase().includes(normalizedQuery) ?? false) ||
        n.path.some((p) => p.toLowerCase().includes(normalizedQuery))
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
        v.yaw += 0.0022;
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
        const baseR = n.depth === 0 ? 11.5 : n.depth === 1 ? 8.2 : n.depth === 2 ? 6.0 : 4.6;
        const claimBoost = Math.min(5, Math.sqrt(n.claimCount) * 1.15);
        const r = Math.max(3 * dpr, (baseR + claimBoost) * scale);
        const visible = n.depth <= maxDepth;
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

      // Draw nodes back-to-front (largest zCam is farthest away)
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
        else if (node.status === "researching" || node.status === "queued") fill = colT2;
        else if (node.depth === 0) fill = colT1;
        else if (node.depth === 1) fill = colT2;
        else if (node.depth === 2) fill = colT3;
        else fill = colT4;

        ctx.save();
        ctx.globalAlpha = dimmed ? 0.2 : 1;

        if (isSelected || isHovered || node.claimCount > 0) {
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

        // Show labels for root, depth 1, hovered/selected, or search matches
        const showLabel =
          node.depth <= 1 ||
          isSelected ||
          isHovered ||
          (normalizedQuery.length > 0 && matched) ||
          (isRelated && node.depth <= 2);

        if (showLabel) {
          const fontSize = Math.round((node.depth === 0 ? 13 : node.depth === 1 ? 11.5 : 10.5) * dpr);
          ctx.font = `${isSelected || isHovered || node.depth === 0 ? 600 : 500} ${fontSize}px "Public Sans", system-ui, sans-serif`;
          const label = node.title.length > 38 && !isSelected && !isHovered ? `${node.title.slice(0, 36)}…` : node.title;
          const badge = node.claimCount > 0 ? ` (${node.claimCount})` : "";
          const text = `${label}${badge}`;
          const tx = sx + r + 6 * dpr;
          const ty = sy + 3.5 * dpr;

          ctx.lineWidth = 3.2 * dpr;
          ctx.strokeStyle = colSheet;
          ctx.strokeText(text, tx, ty);
          ctx.fillStyle = isSelected || isHovered || node.depth === 0 ? colInk : colMuted;
          ctx.fillText(text, tx, ty);
        }

        ctx.restore();
      }

      rafId = window.requestAnimationFrame(render);
    };

    rafId = window.requestAnimationFrame(render);
    return () => window.cancelAnimationFrame(rafId);
  }, [nodes, edges, autoRotate, hoveredId, selectedId, maxDepth, normalizedQuery, visibleNodeIds]);

  function findHitNode(clientX: number, clientY: number) {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const dprX = canvas.width / (rect.width || 1);
    const dprY = canvas.height / (rect.height || 1);
    const x = (clientX - rect.left) * dprX;
    const y = (clientY - rect.top) * dprY;

    // Pick closest front-most node within hit radius
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
            placeholder="Filter scientific fields (e.g. Andrology, Pre-eclampsia, mTOR)…"
          />
        </label>
        <div className="graph3d-controls">
          <label className="graph3d-depth">
            <span>Depth</span>
            <select value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))}>
              <option value={1}>Disciplines (≤ 1)</option>
              <option value={2}>Sub-fields (≤ 2)</option>
              <option value={6}>All branches ({nodes.length})</option>
            </select>
          </label>
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
              viewRef.current.yaw = 0.42;
              viewRef.current.pitch = 0.24;
              viewRef.current.zoom = 1.0;
            }}
          >
            Reset view
          </button>
        </div>
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
              if (hit) setSelectedId(hit.id);
            }
          }}
          onDoubleClick={(e) => {
            const hit = findHitNode(e.clientX, e.clientY);
            if (hit) router.push(`/topic/${hit.slug}`);
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
          Drag to orbit in 3D · Scroll to zoom · Click a node to inspect · Double-click to open branch
        </p>
      </div>

      {activeNode && (
        <div className="graph3d-inspector" role="status" aria-live="polite">
          <div className="graph3d-inspector-head">
            <div>
              {activeNode.path.length > 0 && (
                <p className="graph3d-path muted small">{activeNode.path.join(" › ")}</p>
              )}
              <h3 className="graph3d-title">{activeNode.title}</h3>
            </div>
            <Link href={`/topic/${activeNode.slug}`} className="donate-button">
              Open branch →
            </Link>
          </div>
          {activeNode.brief && <p className="graph3d-brief">{activeNode.brief}</p>}
          <p className="muted small">
            {STATUS_LABEL[activeNode.status] ?? activeNode.status} · {activeNode.claimCount}{" "}
            {activeNode.claimCount === 1 ? "graded finding" : "graded findings"} · {activeNode.childCount}{" "}
            {activeNode.childCount === 1 ? "sub-branch" : "sub-branches"}
          </p>
        </div>
      )}
    </div>
  );
}
