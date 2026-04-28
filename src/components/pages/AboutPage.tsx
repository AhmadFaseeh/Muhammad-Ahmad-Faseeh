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
        y: 60,
        opacity: 0,
        rotateX: -90,
        transformOrigin: "50% 100%",
        stagger: 0.03,
        duration: 0.65,
        ease: "power3.out",
      });
    });
    site.stats.forEach((s, i) => {
      const el = document.querySelector(`[data-stat-n="${i}"]`);
      if (!el) return;
      const target = s.target;
      const suffix = s.suffix;
      const p = { v: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(p, {
            v: target,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => {
              const n = el as HTMLElement;
              n.style.color = "var(--accent)";
              n.textContent = `${Math.round(p.v)}${suffix}`;
            },
            onComplete: () => {
              (el as HTMLElement).style.color = "var(--text)";
            },
          });
        },
      });
    });
    document.querySelectorAll("[data-prose-line]").forEach((line) => {
      gsap.from(line, {
        scrollTrigger: { trigger: line, start: "top 90%" },
        opacity: 0,
        y: 12,
        filter: "blur(8px)",
        duration: 0.5,
        ease: "power2.out",
      });
    });
  }, [pathname]);

  useLayoutEffect(() => {
    if (reduced) {
      site.stats.forEach((s, i) => {
        const el = document.querySelector(`[data-stat-n="${i}"]`) as HTMLElement | null;
        if (el) {
          el.textContent = `${s.target}${s.suffix}`;
        }
      });
    }
  }, [reduced]);

  return (
    <div data-page-inner className="relative">
      <AboutBackground />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-14 md:grid-cols-2 md:items-start">
          <div className="flex justify-center md:justify-start">
            <div
              className="group relative flex h-72 w-72 items-center justify-center"
              data-card-hover
            >
              <div className="absolute inset-0 rounded-full border border-[color-mix(in_srgb,var(--accent)_25%,transparent)]" />
              <div className="absolute inset-4 rounded-full border border-[color-mix(in_srgb,var(--accent2)_20%,transparent)]" />
              <div className="absolute inset-10 rounded-full border border-white/10" />
              <div
                className="absolute inset-16 rounded-full bg-[color-mix(in_srgb,var(--card)_80%,black)]"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, color-mix(in srgb, var(--accent) 20%, transparent), transparent 50%), var(--card)",
                }}
              />
              <p
                className="relative z-10 text-center text-sm uppercase tracking-[0.3em] text-[var(--muted)]"
                style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
              >
                A · F
              </p>
            </div>
          </div>
          <div>
            <SplitHeading
              className="mb-6 text-3xl font-bold text-white md:text-5xl"
              as="h1"
              staggerGroup="about"
            >
              {site.bio.headline}
            </SplitHeading>
            {site.bio.paragraphs.map((p) => (
              <p
                key={p.slice(0, 20)}
                data-prose-line
                className="text-base leading-relaxed text-[var(--muted)]"
                style={{ fontFamily: "var(--font-jetbrains), monospace" }}
              >
                {p}
              </p>
            ))}
            <p
              className="mt-6 text-sm text-[var(--text)]"
              style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            >
              {site.aboutOneLiner}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {site.stats.map((s, i) => (
                <div
                  key={s.text}
                  data-card-hover
                  className="relative rounded-2xl border border-white/10 bg-[var(--card)] p-4 shadow-[0_0_0_1px_rgba(0,245,255,0.05)] transition duration-200 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,245,255,0.15)]"
                >
                  <p
                    className="text-3xl font-bold tabular-nums"
                    data-stat-n={i}
                    style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
                  >
                    0{s.suffix}
                  </p>
                  <p className="mt-1 text-sm leading-snug text-[var(--muted)]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                    <span className="font-semibold text-[var(--text)]">
                      {s.target}
                      {s.suffix}
                    </span>
                    {s.text}
                  </p>
                </div>
              ))}
            </div>

            <SplitHeading
              className="mt-14 text-xl font-bold uppercase text-[var(--accent2)]"
              staggerGroup="about"
            >
              Education
            </SplitHeading>
            <ul className="mt-4 space-y-3" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
              {site.education.map((e) => (
                <li key={e.place} className="border-l-2 border-[var(--accent)]/40 pl-4 text-sm text-[var(--text)]">
                  <span className="block font-semibold text-white">{e.place}</span>
                  <span className="text-[var(--muted)]">{e.detail}</span>
                </li>
              ))}
            </ul>

            <SplitHeading
              className="mt-12 text-xl font-bold uppercase text-[var(--accent2)]"
              staggerGroup="about"
            >
              Fun facts
            </SplitHeading>
            <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
              {site.funFacts.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-[var(--accent)]">▹</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
