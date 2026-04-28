"use client";

import { useEffect, useRef, useState } from "react";
import { constellation } from "@/data/siteContent";

type NodeData = (typeof constellation.nodes)[number];

function readVar(name: string, fallback: string) {
  if (typeof document === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function clusterHex(cluster: NodeData["cluster"]): string {
  const map: Record<NodeData["cluster"], string> = {
    backend: readVar("--cluster-backend", "#00f5ff"),
    frontend: readVar("--cluster-frontend", "#ffb627"),
    data: readVar("--cluster-data", "#2ee6a5"),
    ai: readVar("--cluster-ai", "#b388ff"),
  };
  return map[cluster];
}

export function TechConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<{ x: number; y: number; text: string } | null>(null);
  const nodesRef = useRef<
    (NodeData & { x: number; y: number; bx: number; by: number; r: number })[]
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initNodes = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.36;
      nodesRef.current = constellation.nodes.map((n, i) => {
        const ang = (i / constellation.nodes.length) * Math.PI * 2 + i * 0.25;
        const bx = cx + Math.cos(ang) * radius * (0.55 + (i % 4) * 0.08);
        const by = cy + Math.sin(ang) * radius * (0.45 + (i % 3) * 0.07);
        return { ...n, x: bx, y: by, bx, by, r: 22 };
      });
    };

    let raf = 0;
    let hover: number | null = null;
    const t0 = performance.now();

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      const elapsed = (t - t0) / 1000;
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const breathe = Math.sin(elapsed * 0.7) * 4;
      nodesRef.current.forEach((n, i) => {
        n.x = n.bx + Math.sin(elapsed * 0.35 + i) * (6 + breathe * 0.15);
        n.y = n.by + Math.cos(elapsed * 0.31 + i * 0.4) * (5 + breathe * 0.12);
      });

      constellation.edges.forEach(([a, b]) => {
        const A = nodesRef.current.find((n) => n.id === a);
        const B = nodesRef.current.find((n) => n.id === b);
        if (!A || !B) return;
        const ia = nodesRef.current.indexOf(A);
        const ib = nodesRef.current.indexOf(B);
        const hot = hover === ia || hover === ib;
        ctx.strokeStyle = hot ? "rgba(0, 245, 255, 0.55)" : "rgba(0, 245, 255, 0.2)";
        ctx.lineWidth = hot ? 1.4 : 0.85;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.stroke();
      });

      nodesRef.current.forEach((n, i) => {
        const col = clusterHex(n.cluster);
        const hot = hover === i;
        ctx.beginPath();
        ctx.fillStyle = col;
        ctx.globalAlpha = 0.12 + (hot ? 0.3 : 0.1);
        ctx.arc(n.x, n.y, n.r + 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.fillStyle = "rgba(8,8,12,0.9)";
        ctx.strokeStyle = col;
        ctx.lineWidth = 1.5;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = readVar("--text", "#e8e8e8");
        ctx.font = "12px var(--font-jetbrains), ui-monospace, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n.label, n.x, n.y);
      });
    };

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = Math.max(1, Math.floor(r.width * dpr));
      canvas.height = Math.max(1, Math.floor(r.height * dpr));
      canvas.style.width = `${r.width}px`;
      canvas.style.height = `${r.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNodes();
    };
    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mxc = e.clientX - rect.left;
      const myc = e.clientY - rect.top;
      let hit: number | null = null;
      nodesRef.current.forEach((n, i) => {
        if (Math.hypot(mxc - n.x, myc - n.y) < n.r + 4) hit = i;
      });
      hover = hit;
      if (hit != null) {
        const n = nodesRef.current[hit];
        setTip({
          x: mxc,
          y: myc - 32,
          text: `${n.label} · ${n.cluster.toUpperCase()} · ${Math.round(n.confidence * 100)}%`,
        });
      } else setTip(null);
    };
    const onLeave = () => {
      hover = null;
      setTip(null);
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative h-[min(52vh,420px)] w-full overflow-hidden rounded-2xl border border-white/10 bg-[color-mix(in_srgb,var(--card)_70%,transparent)]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" data-cursor="interactive" />
      {tip && (
        <div
          className="pointer-events-none absolute z-10 rounded-md border border-white/15 bg-[var(--card)] px-2 py-1 text-xs text-[var(--text)] shadow-lg"
          style={{ left: tip.x, top: tip.y, fontFamily: "var(--font-jetbrains), monospace" }}
        >
          {tip.text}
        </div>
      )}
    </div>
  );
}
