"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navItems } from "@/data/siteContent";
import { AppLink } from "./AppLink";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function GlitchHover({ children, className }: { children: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const onEnter = () => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const letters = el.querySelectorAll<HTMLElement>("[data-g]");
    letters.forEach((L, i) => {
      gsap.fromTo(
        L,
        { x: 0 },
        {
          x: (i % 3) - 1,
          duration: 0.04,
          yoyo: true,
          repeat: 2,
          ease: "power2.inOut",
          delay: i * 0.01,
        },
      );
    });
  };

  return (
    <span ref={ref} className={className} onMouseEnter={onEnter}>
      {children.split("").map((c, i) => (
        <span key={i} data-g className="inline-block">
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </span>
  );
}

export function MainNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open || reduced) return;
    const links = drawerRef.current?.querySelectorAll<HTMLElement>("[data-drawer-link]");
    if (!links?.length) return;
    gsap.fromTo(links, { x: 32, opacity: 0 }, { x: 0, opacity: 1, duration: 0.28, stagger: 0.08, ease: "power2.out" });
  }, [open, reduced]);

  return (
    <>
      <nav
        className="fixed right-5 top-5 z-[200] hidden items-center gap-0.5 rounded-full border border-white/10 bg-[color-mix(in_srgb,var(--card)_78%,transparent)] px-1.5 py-1.5 shadow-lg backdrop-blur-md md:flex"
        aria-label="Primary"
        style={{ fontFamily: "var(--font-jetbrains), monospace" }}
      >
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <div key={item.href} className="relative px-1.5">
              <AppLink
                href={item.href}
                className={`group relative block rounded-full px-3.5 py-2 text-xs font-medium uppercase tracking-wider transition-[background] duration-200 ${
                  active ? "text-[var(--text)]" : "text-[var(--muted)]"
                } hover:bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]`}
                style={{ minWidth: 0 }}
              >
                <GlitchHover className="select-none">{item.label}</GlitchHover>
                {active && (
                  <span
                    className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent)]"
                    aria-hidden
                  />
                )}
                <span
                  className="pointer-events-none absolute bottom-0 left-2 right-2 h-px scale-x-0 origin-center bg-[var(--accent)] opacity-0 transition group-hover:scale-x-100 group-hover:opacity-40"
                  style={{ maxWidth: "100%" }}
                  aria-hidden
                />
              </AppLink>
            </div>
          );
        })}
      </nav>

      <button
        type="button"
        className="fixed right-4 top-4 z-[210] flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-[color-mix(in_srgb,var(--card)_90%,transparent)] text-[var(--accent)] shadow-lg backdrop-blur-sm md:hidden"
        aria-expanded={open}
        aria-controls="nav-drawer"
        data-cursor="interactive"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="sr-only">Menu</span>
        <span className="flex w-5 flex-col gap-1.5">
          <span
            className={`block h-0.5 w-5 origin-center bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`block h-0.5 w-5 bg-current transition-opacity ${open ? "opacity-0" : "opacity-100"}`} />
          <span
            className={`block h-0.5 w-5 origin-center bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </span>
      </button>

      <div
        id="nav-drawer"
        ref={drawerRef}
        className={`fixed inset-0 z-[205] flex flex-col justify-end bg-[color-mix(in_srgb,var(--bg)_96%,black)]/98 backdrop-blur-sm transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        <div className="ml-auto flex h-full w-[min(100%,380px)] flex-col gap-1 border-l border-white/10 px-8 py-20">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <AppLink
                key={item.href}
                href={item.href}
                data-drawer-link
                onClick={() => setOpen(false)}
                className={`text-lg font-semibold tracking-wide ${
                  active ? "text-[var(--accent)]" : "text-[var(--text)]"
                } py-2`}
                style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
              >
                {item.label}
              </AppLink>
            );
          })}
        </div>
      </div>
    </>
  );
}
