"use client";

import dynamic from "next/dynamic";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useGsapPage } from "@/hooks/useGsapPage";
import { site } from "@/data/siteContent";
import { SplitHeading } from "@/components/portfolio/SplitHeading";

const ProjectsBackground = dynamic(
  () => import("@/components/canvas/ProjectsBackground").then((m) => m.ProjectsBackground),
  { ssr: false, loading: () => null },
);

export function ProjectsPage() {
  const pathname = usePathname();
  const [openId, setOpenId] = useState<string | null>(null);
  const bodyRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
    document.querySelectorAll("[data-project-card]").forEach((card) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 88%" },
        scale: 0.92,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.2)",
      });
    });
  }, [pathname]);

  const toggle = (id: string) => {
    const next = openId === id ? null : id;
    if (openId && openId !== id) {
      const prev = bodyRefs.current[openId];
      if (prev) gsap.to(prev, { height: 0, duration: 0.3, ease: "power2.inOut" });
    }
    setOpenId(next);
    if (next) {
      const el = bodyRefs.current[next];
      requestAnimationFrame(() => {
        if (!el) return;
        gsap.set(el, { height: "auto" });
        const h = el.offsetHeight;
        gsap.fromTo(
          el,
          { height: 0 },
          {
            height: h,
            duration: 0.45,
            ease: "power2.inOut",
            onComplete: () => gsap.set(el, { height: "auto" }),
          },
        );
      });
    } else {
      const el = bodyRefs.current[id];
      if (el) gsap.to(el, { height: 0, duration: 0.35, ease: "power2.inOut" });
    }
  };

  return (
    <div data-page-inner className="relative">
      <ProjectsBackground />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <SplitHeading className="mb-4 text-3xl font-bold text-white md:text-4xl" staggerGroup="proj" as="h1">
          Projects
        </SplitHeading>
        <p className="mb-12 max-w-2xl text-sm text-[var(--muted)]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
          Production SaaS foundations, AI pipelines, and high-traffic text tooling.
        </p>
        <div className="grid gap-10 md:grid-cols-2">
          {site.projects.map((p) => {
            const isOpen = openId === p.name;
            return (
              <article
                key={p.name}
                data-project-card
                data-card-hover
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--card)] p-6 transition duration-200 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,245,255,0.12)]"
              >
                <h2
                  className="text-lg font-bold text-white md:text-xl"
                  style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
                >
                  {p.name}
                </h2>
                <p className="mt-1 text-xs text-[var(--accent2)]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                  {p.period}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full px-2.5 py-0.5 text-xs"
                      style={{
                        fontFamily: "var(--font-jetbrains), monospace",
                        color: "var(--accent)",
                        background: "color-mix(in srgb, var(--accent) 10%, var(--card))",
                        border: "1px solid color-mix(in srgb, var(--accent) 35%, transparent)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <p
                  className="mt-4 text-sm leading-relaxed text-[var(--muted)]"
                  style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                >
                  {p.description}
                </p>
                <div
                  ref={(n) => {
                    bodyRefs.current[p.name] = n;
                  }}
                  className="overflow-hidden"
                  style={{ height: 0 }}
                >
                  <p
                    className="pt-3 text-sm leading-relaxed text-[var(--text)]"
                    style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                  >
                    {p.longDescription}
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    data-cursor="interactive"
                    onClick={() => toggle(p.name)}
                    className="rounded-full border border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)] transition duration-200 hover:bg-[color-mix(in_srgb,var(--accent)_18%,transparent)]"
                    style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
                  >
                    {isOpen ? "Hide details" : "View details"}
                  </button>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--text)] transition duration-200 hover:border-[var(--accent2)]"
                    style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
                    data-cursor="interactive"
                  >
                    GitHub
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
