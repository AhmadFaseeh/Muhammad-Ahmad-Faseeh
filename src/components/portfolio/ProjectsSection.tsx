"use client";

import { useRef } from "react";
import { SplitHeading } from "./SplitHeading";

const projects = [
  {
    name: "AI-Driven SaaS Ecosystem",
    stack: "TypeScript · Node.js · PostgreSQL · OpenAI · n8n",
    period: "Oct 2025 – Present",
    description:
      "Comprehensive SaaS backend automating workflows with n8n and AI. Vector-based chatbot for festival clients. Shopify CRM integration via REST APIs.",
  },
  {
    name: "AI Content Humanizer Tool",
    stack: "Next.js · Node.js · PostgreSQL · AI Detection APIs",
    period: "April 2026 – Present",
    description:
      "Tool for detecting and humanizing AI-generated text. High-volume text processing with rate limiting and PostgreSQL analytics backend.",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SplitHeading className="mb-14 text-3xl font-bold uppercase tracking-wider text-white md:text-4xl">
          Projects
        </SplitHeading>

        <div className="grid gap-10 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.name} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  name,
  stack,
  period,
  description,
}: {
  name: string;
  stack: string;
  period: string;
  description: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((y - r.height / 2) / r.height) * -10;
    const ry = ((x - r.width / 2) / r.width) * 10;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  };

  return (
    <div className="card-3d" style={{ perspective: "1000px" }}>
      <div
        ref={ref}
        data-project-reveal
        data-cursor="interactive"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="project-card-inner rounded-2xl border border-white/10 bg-[var(--card)] p-8 transition-[box-shadow] duration-300 hover:border-[color-mix(in_srgb,var(--accent)_45%,transparent)] hover:shadow-[0_0_40px_color-mix(in_srgb,var(--accent)_18%,transparent)]"
        style={{ transform: "perspective(900px) rotateX(0deg) rotateY(0deg)" }}
      >
        <p
          className="text-xs uppercase tracking-widest text-[var(--accent2)]"
          style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
        >
          {period}
        </p>
        <h3
          className="mt-3 text-xl font-bold text-white md:text-2xl"
          style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
        >
          {name}
        </h3>
        <p className="mt-2 text-xs text-[var(--accent)]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
          {stack}
        </p>
        <p
          className="mt-5 text-sm leading-relaxed text-[var(--muted)]"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
