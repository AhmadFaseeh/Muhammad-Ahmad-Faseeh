"use client";

import dynamic from "next/dynamic";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useGsapPage } from "@/hooks/useGsapPage";
import { site } from "@/data/siteContent";
import { SplitHeading } from "@/components/portfolio/SplitHeading";

const ExperienceBackground = dynamic(
  () => import("@/components/canvas/ExperienceBackground").then((m) => m.ExperienceBackground),
  { ssr: false, loading: () => null },
);

const TYPE_COLORS: Record<string, string> = {
  "On-site": "var(--accent)",
  "Remote": "var(--accent2)",
  "Remote / Freelance": "var(--accent2)",
  "Internship": "var(--cluster-ai)",
};

export function ExperiencePage() {
  const pathname = usePathname();

  useGsapPage(() => {
    document.querySelectorAll("[data-stagger]").forEach((title) => {
      const chars = title.querySelectorAll(".char");
      if (!chars.length) return;
      gsap.from(chars, {
        scrollTrigger: { trigger: title, start: "top 85%" },
        y: 60,
        opacity: 0,
        rotateX: -80,
        transformOrigin: "50% 100%",
        stagger: 0.03,
        duration: 0.6,
        ease: "power3.out",
      });
    });

    const line = document.querySelector<HTMLElement>("[data-exp-line]");
    const track = document.querySelector<HTMLElement>("#experience-track");
    if (line && track) {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: track, start: "top 60%", end: "bottom 40%", scrub: 0.4 },
        },
      );
    }

    document.querySelectorAll("[data-job-card]").forEach((card, idx) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 88%" },
        scale: 0.92,
        opacity: 0,
        duration: 0.5,
        delay: idx * 0.05,
        ease: "back.out(1.2)",
      });
      const bullets = card.querySelectorAll("[data-bullet]");
      gsap.from(bullets, {
        scrollTrigger: { trigger: card, start: "top 80%" },
        x: -12,
        opacity: 0,
        duration: 0.35,
        stagger: 0.06,
        ease: "power2.out",
      });
    });
  }, [pathname]);

  return (
    <div data-page-inner className="relative">
      <ExperienceBackground />
      <div id="experience-track" className="relative z-10 mx-auto max-w-4xl px-6 py-24 md:px-8 md:py-32">
        <SplitHeading className="mb-4 text-3xl font-bold text-white md:text-4xl" staggerGroup="exp" as="h1">
          Work Experience
        </SplitHeading>
        <p
          className="mb-16 text-sm text-[var(--muted)] max-w-xl"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          Full-stack backend engineering, AI pipelines, and WordPress performance — building scalable production systems since 2024.
        </p>

        <div className="relative pl-4">
          {/* Timeline line */}
          <div
            className="pointer-events-none absolute left-3 top-0 w-px overflow-hidden"
            style={{ height: "100%" }}
            aria-hidden
          >
            <div
              data-exp-line
              className="h-full w-full origin-top scale-y-0 bg-gradient-to-b from-[var(--accent)] via-[var(--accent)] to-[color-mix(in_srgb,var(--accent)_20%,transparent)] will-change-transform"
            />
          </div>

          <div className="space-y-12">
            {site.experience.map((job) => {
              const typeColor = TYPE_COLORS[job.type] ?? "var(--muted)";
              return (
                <article
                  key={job.id}
                  data-job-card
                  data-card-hover
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--card)] p-7 pl-9 transition-all duration-300 hover:-translate-y-1.5 hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] hover:shadow-[0_20px_60px_rgba(0,245,255,0.12)]"
                  style={{ background: "var(--bg-card)" }}
                >
                  {/* Live badge */}
                  {job.live && (
                    <span
                      className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-[color-mix(in_srgb,var(--success)_50%,transparent)] bg-[color-mix(in_srgb,var(--success)_12%,transparent)] px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider"
                      style={{ color: "var(--success)", fontFamily: "var(--font-jetbrains), monospace" }}
                    >
                      <span
                        className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
                        style={{ background: "var(--success)" }}
                      />
                      LIVE
                    </span>
                  )}

                  {/* Timeline dot */}
                  <span
                    className="absolute left-0 top-9 h-2.5 w-2.5 -translate-x-[5px] rounded-full border-2 border-[var(--accent)] bg-[var(--bg)]"
                    aria-hidden
                  />

                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                    <p
                      className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent2)]"
                      style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
                    >
                      {job.period}
                    </p>
                    <span className="text-[var(--muted)] text-xs">·</span>
                    <span
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: typeColor, fontFamily: "var(--font-jetbrains), monospace" }}
                    >
                      {job.type}
                    </span>
                    <span className="text-[var(--muted)] text-xs hidden sm:inline">·</span>
                    <span
                      className="text-xs text-[var(--muted)] hidden sm:inline"
                      style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                    >
                      {job.location}
                    </span>
                  </div>

                  <h2
                    className="text-xl font-bold text-white md:text-2xl"
                    style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
                  >
                    {job.title}
                  </h2>
                  <p className="mt-0.5 text-sm text-[var(--accent)]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                    {job.company}
                  </p>

                  <ul
                    className="mt-5 space-y-2.5 text-sm text-[var(--muted)]"
                    style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                  >
                    {job.points.map((point) => (
                      <li key={point.slice(0, 40)} data-bullet className="flex gap-2 leading-relaxed">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)] opacity-80" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {job.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-[var(--accent)]/30 px-2.5 py-0.5 text-xs text-[var(--accent)]"
                        style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
