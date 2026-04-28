"use client";

import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useGsapPage } from "@/hooks/useGsapPage";
import { useLayoutEffect, useRef } from "react";
import { site } from "@/data/siteContent";
import { SplitHeading } from "@/components/portfolio/SplitHeading";
import { TechConstellation } from "@/components/skills/TechConstellation";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SkillsBackground = dynamic(
  () => import("@/components/canvas/SkillsBackground").then((m) => m.SkillsBackground),
  { ssr: false, loading: () => null },
);

export function SkillsPage() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const learnRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGsapPage(() => {
    document.querySelectorAll("[data-stagger]").forEach((title) => {
      const chars = title.querySelectorAll(".char");
      if (!chars.length) return;
      gsap.from(chars, {
        scrollTrigger: { trigger: title, start: "top 85%" },
        y: 60, opacity: 0, rotateX: -80,
        transformOrigin: "50% 100%", stagger: 0.03, duration: 0.6, ease: "power3.out",
      });
    });

    site.proficiency.forEach((row, i) => {
      const bar = document.querySelector<HTMLElement>(`[data-p-bar="${i}"]`);
      const pct = document.querySelector<HTMLElement>(`[data-p-pct="${i}"]`);
      if (!bar || !pct) return;
      const o = { v: 0 };
      ScrollTrigger.create({
        trigger: bar.closest("[data-p-row]"),
        start: "top 85%", once: true,
        onEnter: () => {
          gsap.to(bar, { width: `${row.value}%`, duration: 1.2, delay: i * 0.12, ease: "power2.out" });
          gsap.to(o, {
            v: row.value, duration: 1.2, delay: i * 0.12, ease: "power2.out",
            onUpdate: () => { pct.textContent = `${Math.round(o.v)}%`; pct.style.color = "var(--accent)"; },
            onComplete: () => { pct.style.color = "var(--text)"; },
          });
        },
      });
    });

    document.querySelectorAll("[data-cert-card]").forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 88%" },
        scale: 0.92, opacity: 0, duration: 0.45, delay: i * 0.07, ease: "back.out(1.2)",
      });
    });
  }, [pathname]);

  useLayoutEffect(() => {
    if (reduced) return;
    const tweens = learnRefs.current.filter(Boolean).map((el) =>
      gsap.to(el, {
        boxShadow: "0 0 0 1px color-mix(in srgb, var(--accent) 55%, transparent), 0 0 24px color-mix(in srgb, var(--accent) 20%, transparent)",
        duration: 1.1, ease: "sine.inOut", repeat: -1, yoyo: true,
      }),
    );
    return () => tweens.forEach((t) => t.kill());
  }, [reduced, pathname]);

  useLayoutEffect(() => {
    if (!reduced) return;
    site.proficiency.forEach((row, i) => {
      const bar = document.querySelector<HTMLElement>(`[data-p-bar="${i}"]`);
      const pct = document.querySelector<HTMLElement>(`[data-p-pct="${i}"]`);
      if (bar) bar.style.width = `${row.value}%`;
      if (pct) pct.textContent = `${row.value}%`;
    });
  }, [reduced]);

  return (
    <div data-page-inner className="relative">
      <SkillsBackground />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">

        {/* Constellation */}
        <section className="mb-20">
          <SplitHeading className="mb-3 text-3xl font-bold text-white md:text-4xl" staggerGroup="skills" as="h1">
            My Arsenal
          </SplitHeading>
          <p className="mb-8 text-sm text-[var(--muted)]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            Hover any node to see cluster details and signal strength.
          </p>
          <TechConstellation />
        </section>

        {/* Proficiency bars */}
        <section className="mb-20">
          <SplitHeading className="mb-8 text-2xl font-bold text-white" staggerGroup="skills">
            Proficiency
          </SplitHeading>
          <div className="space-y-6">
            {site.proficiency.map((row, i) => (
              <div key={row.name} data-p-row>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span style={{ fontFamily: "var(--font-orbitron), sans-serif" }}>{row.name}</span>
                  <span className="tabular-nums" data-p-pct={i} style={{ fontFamily: "var(--font-jetbrains), monospace" }}>0%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--bg-card)_100%,transparent)] ring-1 ring-white/5">
                  <div
                    data-p-bar={i}
                    className="h-full w-0 rounded-full will-change-[width]"
                    style={{ background: "linear-gradient(90deg, var(--accent), var(--accent2))" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Currently Exploring */}
        <section className="mb-20">
          <SplitHeading className="mb-6 text-2xl font-bold text-white" staggerGroup="skills">
            Currently Exploring
          </SplitHeading>
          <div className="grid gap-6 md:grid-cols-3">
            {site.learning.map((it, i) => (
              <div
                key={it.title}
                ref={(n) => { learnRefs.current[i] = n; }}
                className="rounded-2xl border border-white/10 bg-[var(--bg-card)] p-5 text-sm text-[var(--text)]"
                style={{ fontFamily: "var(--font-jetbrains), monospace" }}
              >
                <span className="block mb-2 text-[var(--accent)] text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-orbitron), sans-serif" }}>
                  Exploring
                </span>
                {it.title}
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <SplitHeading className="mb-6 text-2xl font-bold text-white" staggerGroup="skills">
            Certifications
          </SplitHeading>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {site.certifications.map((cert, i) => (
              <div
                key={cert.name}
                data-cert-card
                data-card-hover
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--bg-card)] p-5 transition duration-200 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--accent2)_40%,transparent)] hover:shadow-[0_12px_40px_rgba(255,182,39,0.10)]"
              >
                <span
                  className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-[var(--accent2)]"
                  style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
                >
                  {cert.year}
                </span>
                <p className="font-semibold text-white text-sm leading-snug" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                  {cert.name}
                </p>
                <p className="mt-1.5 text-xs text-[var(--muted)]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                  {cert.issuer}
                </p>
                {cert.id && (
                  <p className="mt-2 text-[0.65rem] text-[var(--accent)]/60 font-mono">ID: {cert.id}</p>
                )}
                <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[var(--accent2)] to-transparent transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
