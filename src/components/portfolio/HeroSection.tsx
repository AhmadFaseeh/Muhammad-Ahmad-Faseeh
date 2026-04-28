"use client";

import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { useIsMobileHero } from "@/hooks/useIsMobileHero";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { AppLink } from "@/components/navigation/AppLink";

const HeroScene = dynamic(() => import("./HeroScene").then((m) => m.HeroScene), {
  ssr: false,
  loading: () => null,
});

function GlitchName() {
  const text = "AHMAD FASEEH";
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setDone(true), 900);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <span className="glitch-wrap" aria-label={text}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className={`glitch-char ${done ? "" : "animate"}`}
          style={{ animationDelay: `${i * 45}ms` }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

function TypewriterLine({ reduced }: { reduced: boolean }) {
  const full = "Full-Stack Backend Developer & WordPress Expert · TypeScript · Node.js · AI Builder";
  const [text, setText] = useState(reduced ? full : "");

  useEffect(() => {
    if (reduced) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setText(full.slice(0, i));
      if (i >= full.length) window.clearInterval(id);
    }, 42);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <p
      className={`mt-4 max-w-xl text-sm text-[var(--muted)] md:text-base ${reduced ? "" : "typewriter-caret"}`}
      style={{ fontFamily: "var(--font-jetbrains), monospace" }}
    >
      {text}
    </p>
  );
}

export function HeroSection({
  reveal,
  footerSlot,
  showMeshGradient,
}: {
  reveal: boolean;
  footerSlot?: ReactNode;
  showMeshGradient?: boolean;
}) {
  const mobile = useIsMobileHero();
  const reduced = useReducedMotion();
  const meshRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (reduced || !showMeshGradient || !meshRef.current) return;
    const el = meshRef.current;
    const tw = gsap.to(el, {
      backgroundPosition: "70% 40%",
      duration: 28,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    return () => {
      tw.kill();
    };
  }, [reduced, showMeshGradient]);

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden pb-16 pt-28 md:justify-center md:pb-24 md:pt-20"
    >
      {showMeshGradient && (
        <div
          ref={meshRef}
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.22]"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 30% 20%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 60%), radial-gradient(ellipse 45% 35% at 75% 70%, color-mix(in srgb, var(--accent2) 8%, transparent), transparent 55%), var(--bg)",
            backgroundSize: "140% 140%",
            backgroundPosition: "30% 30%",
          }}
          aria-hidden
        />
      )}
      {!mobile && <HeroScene />}
      {mobile && <div className="hero-gradient-fallback absolute inset-0 z-0" aria-hidden />}

      <div className="scanlines" aria-hidden />

      <div
        className={`relative z-10 mx-auto w-full max-w-6xl px-6 transition-all duration-1000 ease-out md:px-10 ${
          reveal ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <p
          className="mb-2 text-xs uppercase tracking-[0.4em] text-[var(--accent2)]"
          style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
        >
          Muhammad
        </p>
        <h1
          className="text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
        >
          <span className="block text-[var(--accent)] drop-shadow-[0_0_24px_color-mix(in_srgb,var(--accent)_35%,transparent)]">
            <GlitchName />
          </span>
        </h1>
        <TypewriterLine reduced={reduced} />

        <div className="mt-10 flex flex-wrap gap-4">
          <AppLink
            href="/projects"
            className="group inline-flex items-center justify-center rounded-full border border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[var(--accent)] transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--accent)_24%,transparent)]"
            style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
          >
            View My Work
          </AppLink>
          <a
            href="/cv.pdf"
            download
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[var(--text)] transition duration-200 hover:border-[var(--accent2)] hover:text-[var(--accent2)]"
            style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
            data-cursor="interactive"
          >
            Download CV
          </a>
        </div>

        <div className="mt-10 flex gap-5 text-[var(--muted)]">
          <a
            href="https://github.com/AhmadFaseeh"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--accent)]"
            aria-label="GitHub"
            data-cursor="interactive"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/muhammadahmadfaseeh"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--accent)]"
            aria-label="LinkedIn"
            data-cursor="interactive"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="mailto:muhammadahmadfaseeh5@gmail.com"
            className="transition-colors hover:text-[var(--accent)]"
            aria-label="Email"
            data-cursor="interactive"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
              <path d="M4 4h16v16H4z" opacity={0} />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </div>
      {footerSlot}
    </section>
  );
}
