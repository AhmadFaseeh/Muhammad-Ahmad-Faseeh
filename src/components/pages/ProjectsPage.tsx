"use client";

import dynamic from "next/dynamic";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useRef, useState, useCallback } from "react";
import { useGsapPage } from "@/hooks/useGsapPage";
import { site } from "@/data/siteContent";
import { SplitHeading } from "@/components/portfolio/SplitHeading";

const ProjectsBackground = dynamic(
  () => import("@/components/canvas/ProjectsBackground").then((m) => m.ProjectsBackground),
  { ssr: false, loading: () => null },
);

function ProjectCard({
  project,
  index,
}: {
  project: (typeof site.projects)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isActive = project.status === "active";

  const toggle = useCallback(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (!open) {
      gsap.set(el, { height: "auto", opacity: 1 });
      const h = el.offsetHeight;
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.45, ease: "power2.inOut" });
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.35, ease: "power2.inOut" });
    }
    setOpen((o) => !o);
  }, [open]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -6;
    const ry = ((e.clientX - cx) / (rect.width / 2)) * 6;
    gsap.to(el, { rotateX: rx, rotateY: ry, duration: 0.3, ease: "power2.out", transformPerspective: 800 });
  }, []);

  const onMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power3.out" });
  }, []);

  return (
    <article
      data-project-card
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--bg-card)] p-6 transition-[border-color,box-shadow] duration-300 hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] hover:shadow-[0_20px_60px_rgba(0,245,255,0.12)]"
      style={{ transformStyle: "preserve-3d", willChange: "transform", animationDelay: `${index * 0.1}s` }}
    >
      {/* Status badge */}
      <div className="absolute right-4 top-4 flex items-center gap-2">
        {isActive ? (
          <span
            className="flex items-center gap-1.5 rounded-full border border-[color-mix(in_srgb,var(--success)_50%,transparent)] bg-[color-mix(in_srgb,var(--success)_12%,transparent)] px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider"
            style={{ color: "var(--success)", fontFamily: "var(--font-jetbrains), monospace" }}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--success)]" />
            LIVE
          </span>
        ) : (
          <span
            className="rounded-full border border-white/20 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]"
            style={{ fontFamily: "var(--font-jetbrains), monospace" }}
          >
            Completed
          </span>
        )}
      </div>

      {/* Period */}
      <p
        className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent2)]"
        style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
      >
        {project.period}
      </p>

      {/* Title */}
      <h2
        className="text-xl font-bold leading-snug text-white md:text-2xl"
        style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
      >
        {project.name}
      </h2>

      {/* Stack pills */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span
            key={s}
            className="rounded-full px-2.5 py-0.5 text-xs"
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              color: "var(--accent)",
              background: "color-mix(in srgb, var(--accent) 10%, var(--bg-card))",
              border: "1px solid color-mix(in srgb, var(--accent) 35%, transparent)",
            }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Description */}
      <p
        className="mt-4 text-sm leading-relaxed text-[var(--muted)]"
        style={{ fontFamily: "var(--font-jetbrains), monospace" }}
      >
        {project.description}
      </p>

      {/* Expandable bullets */}
      <div ref={bodyRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <ul
          className="mt-4 space-y-2.5 border-t border-white/8 pt-4 text-sm text-[var(--text)]"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          {project.bullets.map((b) => (
            <li key={b.slice(0, 40)} className="flex gap-2 leading-relaxed">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          data-cursor="interactive"
          onClick={toggle}
          className="rounded-full border border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)] transition duration-200 hover:bg-[color-mix(in_srgb,var(--accent)_18%,transparent)]"
          style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
        >
          {open ? "Hide Details" : "View Details"}
        </button>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--text)] transition duration-200 hover:border-[var(--accent2)] hover:text-[var(--accent2)]"
          style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
          data-cursor="interactive"
        >
          GitHub
        </a>
      </div>
    </article>
  );
}

export function ProjectsPage() {
  const pathname = usePathname();

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
    document.querySelectorAll("[data-project-card]").forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 88%" },
        scale: 0.92, opacity: 0, y: 20,
        duration: 0.5, delay: i * 0.1, ease: "back.out(1.2)",
      });
    });
  }, [pathname]);

  return (
    <div data-page-inner className="relative">
      <ProjectsBackground />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <SplitHeading className="mb-4 text-3xl font-bold text-white md:text-4xl" staggerGroup="proj" as="h1">
          Projects
        </SplitHeading>
        <p
          className="mb-12 max-w-2xl text-sm text-[var(--muted)]"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          Production SaaS foundations, AI pipelines, and client-facing web platforms — click any card for full project details.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {site.projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
