"use client";

import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapPage } from "@/hooks/useGsapPage";
import { site } from "@/data/siteContent";
import { SplitHeading } from "@/components/portfolio/SplitHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

const AboutBackground = dynamic(
  () => import("@/components/canvas/AboutBackground").then((m) => m.AboutBackground),
  { ssr: false, loading: () => null },
);

export function AboutPage() {
  const reduced = useReducedMotion();
  const pathname = usePathname();

  useGsapPage(() => {
    document.querySelectorAll("[data-stagger]").forEach((title) => {
      const chars = title.querySelectorAll(".char");
      if (!chars.length) return;
      gsap.from(chars, {
        scrollTrigger: { trigger: title, start: "top 85%" },
        y: 60, opacity: 0, rotateX: -90,
        transformOrigin: "50% 100%", stagger: 0.03, duration: 0.65, ease: "power3.out",
      });
    });
    site.stats.forEach((s, i) => {
      const el = document.querySelector(`[data-stat-n="${i}"]`);
      if (!el) return;
      const p = { v: 0 };
      ScrollTrigger.create({
        trigger: el, start: "top 85%", once: true,
        onEnter: () => {
          gsap.to(p, {
            v: s.target, duration: 1.5, ease: "power2.out",
            onUpdate: () => {
              (el as HTMLElement).style.color = "var(--accent)";
              (el as HTMLElement).textContent = `${Math.round(p.v)}${s.suffix}`;
            },
            onComplete: () => { (el as HTMLElement).style.color = "var(--text)"; },
          });
        },
      });
    });
    document.querySelectorAll("[data-prose-line]").forEach((line) => {
      gsap.from(line, {
        scrollTrigger: { trigger: line, start: "top 90%" },
        opacity: 0, y: 12, filter: "blur(6px)", duration: 0.55, ease: "power2.out",
      });
    });
    document.querySelectorAll("[data-card-enter]").forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 88%" },
        scale: 0.92, opacity: 0, duration: 0.5, delay: i * 0.08, ease: "back.out(1.2)",
      });
    });
  }, [pathname]);

  useLayoutEffect(() => {
    if (reduced) {
      site.stats.forEach((s, i) => {
        const el = document.querySelector(`[data-stat-n="${i}"]`) as HTMLElement | null;
        if (el) el.textContent = `${s.target}${s.suffix}`;
      });
    }
  }, [reduced]);

  return (
    <div data-page-inner className="relative">
      <AboutBackground />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-14 md:grid-cols-2 md:items-start">
          {/* Geometric portrait */}
          <div className="flex justify-center md:justify-start">
            <div className="group relative flex h-72 w-72 items-center justify-center" data-card-hover>
              <div className="absolute inset-0 rounded-full border border-[color-mix(in_srgb,var(--accent)_25%,transparent)]" style={{ animation: "spin 24s linear infinite" }} />
              <div className="absolute inset-4 rounded-full border border-[color-mix(in_srgb,var(--accent2)_20%,transparent)]" style={{ animation: "spin 18s linear infinite reverse" }} />
              <div className="absolute inset-10 rounded-full border border-white/10" />
              <div
                className="absolute inset-16 rounded-full"
                style={{ background: "radial-gradient(circle at 35% 30%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 50%), var(--bg-card)" }}
              />
              <p className="relative z-10 text-center text-sm uppercase tracking-[0.3em] text-[var(--muted)]" style={{ fontFamily: "var(--font-orbitron), sans-serif" }}>
                A · F
              </p>
              {[0, 90, 180, 270].map((deg) => (
                <span key={deg} className="absolute h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
                  style={{ top: "50%", left: "50%", transform: `rotate(${deg}deg) translateX(128px) translateY(-50%)`, boxShadow: "0 0 8px var(--accent)", opacity: 0.7 }} />
              ))}
            </div>
          </div>

          {/* Bio */}
          <div>
            <SplitHeading className="mb-6 text-3xl font-bold text-white md:text-5xl" as="h1" staggerGroup="about">
              {site.bio.headline}
            </SplitHeading>
            {site.bio.paragraphs.map((p) => (
              <p key={p.slice(0, 20)} data-prose-line className="text-sm leading-relaxed text-[var(--muted)] md:text-base" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                {p}
              </p>
            ))}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[var(--bg-card)] px-4 py-1.5 text-xs text-[var(--muted)]" style={{ fontFamily: "var(--font-jetbrains), monospace" }} data-prose-line>
              <span style={{ color: "var(--accent2)" }}>📍</span>
              {site.address}
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {site.stats.map((s, i) => (
                <div key={s.text} data-card-enter data-card-hover className="relative rounded-2xl border border-white/10 bg-[var(--bg-card)] p-4 transition duration-200 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,245,255,0.15)]">
                  <p className="text-3xl font-bold tabular-nums" data-stat-n={i} style={{ fontFamily: "var(--font-orbitron), sans-serif" }}>0{s.suffix}</p>
                  <p className="mt-1 text-xs leading-snug text-[var(--muted)]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education */}
        <section className="mt-20">
          <SplitHeading className="mb-6 text-2xl font-bold text-white" staggerGroup="about">Education</SplitHeading>
          <div className="grid gap-4 sm:grid-cols-2">
            {site.education.map((e) => (
              <div key={e.place} data-card-enter className="rounded-2xl border border-white/10 bg-[var(--bg-card)] p-5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,245,255,0.10)]">
                <span className="block text-xs font-bold uppercase tracking-[0.15em] text-[var(--accent2)] mb-1" style={{ fontFamily: "var(--font-orbitron), sans-serif" }}>{e.period}</span>
                <span className="block font-semibold text-white text-sm" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{e.place}</span>
                <span className="block mt-1 text-sm text-[var(--muted)]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{e.degree}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Fun facts + Languages */}
        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <section>
            <SplitHeading className="mb-5 text-xl font-bold text-white" staggerGroup="about">Quick Facts</SplitHeading>
            <ul className="space-y-2.5 text-sm text-[var(--muted)]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
              {site.funFacts.map((f) => (
                <li key={f} data-prose-line className="flex gap-2.5 items-start">
                  <span className="text-[var(--accent)] mt-0.5">▹</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <SplitHeading className="mb-5 text-xl font-bold text-white" staggerGroup="about">Languages</SplitHeading>
            <ul className="space-y-3">
              {site.languages.map((l) => (
                <li key={l.lang} data-prose-line className="flex items-center justify-between rounded-xl border border-white/8 bg-[var(--bg-card)] px-4 py-2.5 text-sm">
                  <span className="font-semibold text-white" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{l.lang}</span>
                  <span className="text-xs text-[var(--accent2)] uppercase tracking-wider" style={{ fontFamily: "var(--font-orbitron), sans-serif" }}>{l.level}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
