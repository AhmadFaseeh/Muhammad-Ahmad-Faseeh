"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

type Mode = "default" | "click" | "text" | "card";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const showId = requestAnimationFrame(() => setShow(true));

    const resolveMode = (el: HTMLElement | null): Mode => {
      if (!el) return "default";
      if (el.closest("[data-cursor='text'], p, [data-cursor-text], textarea, input")) return "text";
      if (el.closest("[data-card-hover]")) return "card";
      if (el.closest("a, button, [role='button'], [data-cursor='interactive']")) return "click";
      return "default";
    };

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setMode(resolveMode(e.target as HTMLElement));
    };

    const down = (e: MouseEvent) => {
      const burst = document.createElement("div");
      burst.className =
        "pointer-events-none fixed z-[298] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent)]";
      burst.style.left = `${e.clientX}px`;
      burst.style.top = `${e.clientY}px`;
      burst.style.width = "40px";
      burst.style.height = "40px";
      document.body.appendChild(burst);
      gsap.fromTo(
        burst,
        { scale: 0.5, opacity: 0.45 },
        { scale: 1.6, opacity: 0, duration: 0.5, ease: "power2.out", onComplete: () => burst.remove() },
      );
    };

    const loop = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (label.current) {
        label.current.style.transform = `translate3d(${ringPos.current.x + 36}px, ${ringPos.current.y - 2}px, 0)`;
      }
      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    raf.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(showId);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!show) return null;

  const dim = { w: 36, h: 36, br: 9999 as number | string };
  if (mode === "text") {
    dim.w = 32;
    dim.h = 3;
    dim.br = 0;
  } else if (mode === "card") {
    dim.w = 48;
    dim.h = 48;
    dim.br = 10;
  } else if (mode === "click") {
    dim.w = 60;
    dim.h = 60;
    dim.br = 9999;
  }

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[300] rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent)] will-change-transform"
        style={{ width: 4, height: 4 }}
        aria-hidden
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[299] will-change-transform border border-[color-mix(in_srgb,var(--accent)_50%,transparent)]"
        style={{
          width: dim.w,
          height: dim.h,
          borderRadius: dim.br,
          background:
            mode === "click" ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "transparent",
        }}
        aria-hidden
      />
      {mode === "click" && (
        <div
          ref={label}
          className="pointer-events-none fixed left-0 top-0 z-[301] text-[0.65rem] font-bold uppercase tracking-widest text-[var(--accent)]"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
          aria-hidden
        >
          CLICK
        </div>
      )}
    </>
  );
}
