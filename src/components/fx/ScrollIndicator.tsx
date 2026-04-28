"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ScrollIndicator() {
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !dot.current) return;
    const tw = gsap.to(dot.current, { y: 8, duration: 1.2, ease: "sine.inOut", repeat: -1, yoyo: true });
    return () => {
      tw.kill();
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const onScroll = () => {
      if (window.scrollY > 24) setVisible(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  if (!visible || reduced) return null;

  return (
    <div
      ref={root}
      className="pointer-events-none absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[var(--accent)]"
      aria-hidden
    >
      <p
        className="origin-center rotate-90 text-[0.7rem] uppercase tracking-[0.4em] text-[var(--accent)]"
        style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
      >
        Scroll
      </p>
      <div className="flex h-14 w-4 flex-col items-center justify-end rounded-full border border-[color-mix(in_srgb,var(--accent)_35%,transparent)] pb-1">
        <div ref={dot} className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
        <div className="h-6 w-px origin-bottom bg-gradient-to-b from-[var(--accent)] to-transparent" />
      </div>
    </div>
  );
}
