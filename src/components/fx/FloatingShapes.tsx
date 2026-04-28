"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SHAPES = [
  { t: "rounded-sm", s: "h-2.5 w-2.5" },
  { t: "rotate-45 rounded-sm", s: "h-2 w-2" },
  { t: "rounded-full", s: "h-2 w-2" },
  { t: "rounded-sm", s: "h-3 w-1.5" },
  { t: "rotate-12 rounded-sm", s: "h-2.5 w-2.5" },
  { t: "rounded-full", s: "h-1.5 w-1.5" },
  { t: "rotate-45", s: "h-2.5 w-2.5" },
  { t: "rounded-sm", s: "h-2 w-3" },
] as const;

export function FloatingShapes() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const loops = useRef<gsap.core.Tween[]>([]);
  const pathRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (reduced || !root.current) return;
    loops.current.forEach((l) => l.kill());
    loops.current = [];
    const els = root.current.querySelectorAll<HTMLElement>("[data-float]");
    els.forEach((el, i) => {
      const tw = gsap.to(el, {
        x: (i % 2 ? 1 : -1) * (18 + (i % 4) * 6),
        y: (i % 3 ? 1 : -1) * (14 + (i % 3) * 5),
        duration: 22 + i * 2.3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      loops.current.push(tw);
    });
    return () => {
      loops.current.forEach((l) => l.kill());
    };
  }, [reduced]);

  useLayoutEffect(() => {
    if (reduced || !root.current) return;
    if (pathRef.current === null) {
      pathRef.current = pathname;
      return;
    }
    if (pathRef.current === pathname) return;
    const els = root.current.querySelectorAll<HTMLElement>("[data-float]");
    gsap.to(els, {
      x: (i) => (i % 2 ? 1 : -1) * 120,
      y: (i) => (i % 2 ? -1 : 1) * 90,
      opacity: 0.2,
      duration: 0.35,
      ease: "power2.in",
      stagger: 0.02,
      onComplete: () => {
        pathRef.current = pathname;
        gsap.set(els, { clearProps: "x,y,opacity" });
        gsap.fromTo(
          els,
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 0.75, duration: 0.5, stagger: 0.04, ease: "back.out(1.2)" },
        );
      },
    });
  }, [pathname, reduced]);

  if (reduced) return null;

  return (
    <div
      ref={root}
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {SHAPES.map((sh, i) => (
        <div
          key={i}
          data-float
          className={`absolute border border-[color-mix(in_srgb,var(--accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--accent)_6%,transparent)] ${sh.s} ${sh.t}`}
          style={{
            left: `${(i * 11) % 88}%`,
            top: `${(i * 19) % 80}%`,
          }}
        />
      ))}
    </div>
  );
}
