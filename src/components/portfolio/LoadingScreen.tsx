"use client";

import { useEffect, useState } from "react";

type Props = {
  onDone: () => void;
  reducedMotion: boolean;
};

export function LoadingScreen({ onDone, reducedMotion }: Props) {
  const [pct, setPct] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reducedMotion) {
      const raf = requestAnimationFrame(() => setPct(100));
      const t = window.setTimeout(() => {
        setVisible(false);
        onDone();
      }, 400);
      return () => {
        cancelAnimationFrame(raf);
        window.clearTimeout(t);
      };
    }

    let raf = 0;
    const start = performance.now();
    const duration = 2200;

    const tick = (now: number) => {
      const p = Math.min(100, Math.round(((now - start) / duration) * 100));
      setPct(p);
      if (p < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => {
          setVisible(false);
          onDone();
        }, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone, reducedMotion]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 bg-[var(--bg)] transition-opacity duration-700"
      style={{ opacity: pct >= 100 ? 0 : 1, pointerEvents: pct >= 100 ? "none" : "auto" }}
      aria-live="polite"
      aria-busy={pct < 100}
    >
      <p
        className="font-[family-name:var(--font-orbitron)] text-sm tracking-[0.35em] text-[var(--accent)]"
        style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
      >
        INITIALIZING
        <span className="typewriter-caret" aria-hidden />
      </p>
      <div className="w-[min(320px,80vw)]">
        <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--card)]">
          <div
            className="h-full rounded-full bg-[var(--accent)] transition-[width] duration-100 ease-linear will-change-[width]"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <span
        className="font-mono text-2xl tabular-nums text-[var(--text)]"
        style={{ fontFamily: "var(--font-jetbrains), monospace" }}
      >
        {pct}%
      </span>
    </div>
  );
}
