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

    document.querySelectorAll("[data-job-card]").forEach((card) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 88%" },
        scale: 0.92,
        opacity: 0,
        duration: 0.5,
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
        <SplitHeading className="mb-6 text-3xl font-bold text-white md:text-4xl" staggerGroup="exp" as="h1">
          Work Experience
        </SplitHeading>
        <p
          className="mb-16 text-sm text-[var(--muted)]"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          Building production APIs, WordPress performance, and AI systems at IT KUMAIL.
        </p>
        <div className="relative pl-2">
          <div
            className="pointer-events-none absolute left-3 top-0 w-px overflow-hidden"
            style={{ height: "100%" }}
            aria-hidden
          >
            <div
              data-exp-line
              className="h-full w-full origin-top scale-y-0 bg-gradient-to-b from-[var(--accent)] via-[var(--accent)] to-[color-mix(in_srgb,var(--accent)_30%,transparent)] will-change-transform"
            />
          </div>
          <div className="space-y-14">
            {site.experience.map((job) => (
              <article
                key={job.id}
                data-job-card
                data-card-hover
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--card)] p-8 pl-9 transition duration-200 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,245,255,0.12)]"
              >
                {job.live && (
                  <span
                    className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-[color-mix(in_srgb,#2ee6a5_50%,transparent)] bg-[color-mix(in_srgb,#2ee6a5_12%,transparent)] px-2.5 py-0.5 text-xs font-bold uppercase text-[#2ee6a5] shadow-[0_0_12px_rgba(46,230,165,0.35)]"
                    style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
                      style={{ background: "var(--live-green)" }}
                    />
                    Live
                  </span>
                )}
                <span
                  className="absolute left-0 top-10 h-2.5 w-2.5 -translate-x-[5px] rounded-full border-2 border-[var(--accent)] bg-[var(--bg)]"
                  aria-hidden
                />
                <p
                  className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent2)]"
                  style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
                >
                  {job.period}
                </p>
                <h2
                  className="mt-2 text-xl font-bold text-white md:text-2xl"
                  style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
                >
                  {job.title}
                </h2>
                <p className="mt-0.5 text-sm text-[var(--accent)]">{job.company}</p>
                <ul
                  className="mt-5 space-y-2.5 text-sm text-[var(--muted)]"
                  style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                >
                  {job.points.map((p) => (
                    <li key={p} data-bullet className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {job.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-[var(--accent)]/40 px-2.5 py-0.5 text-xs text-[var(--accent)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
