"use client";

import { SplitHeading } from "./SplitHeading";

const groups = [
  {
    name: "Languages",
    items: ["TypeScript", "JavaScript (ES6+)", "SQL", "PHP", "Python", "HTML/CSS"],
    width: 92,
  },
  {
    name: "Backend",
    items: ["Node.js", "Express", "NestJS", "Next.js"],
    width: 90,
  },
  {
    name: "Frontend",
    items: ["React", "Tailwind CSS"],
    width: 88,
  },
  { name: "APIs", items: ["REST", "GraphQL"], width: 90 },
  {
    name: "Databases",
    items: ["PostgreSQL", "MongoDB", "Vector DBs"],
    width: 91,
  },
  {
    name: "Cloud / DevOps",
    items: ["Docker", "Redis", "Git/GitHub"],
    width: 85,
  },
  {
    name: "AI / Automation",
    items: ["OpenAI API", "RAG Pipelines", "Embeddings", "n8n"],
    width: 88,
  },
  {
    name: "Payments",
    items: ["Stripe", "PayPal", "Webhooks"],
    width: 86,
  },
  {
    name: "Performance",
    items: ["Core Web Vitals", "Lighthouse", "SEO", "Caching"],
    width: 93,
  },
];

const allTags = groups.flatMap((g) => g.items);

export function SkillsSection() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SplitHeading className="mb-14 text-3xl font-bold uppercase tracking-wider text-white md:text-4xl">
          Skills
        </SplitHeading>

        <div className="space-y-8">
          {groups.map((g) => (
            <div key={g.name} data-skill-row>
              <div className="mb-2 flex items-end justify-between gap-4">
                <span
                  className="text-sm font-semibold uppercase tracking-wider text-[var(--text)]"
                  style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
                >
                  {g.name}
                </span>
                <span
                  className="font-mono text-sm tabular-nums text-[var(--accent)]"
                  data-skill-pct
                  data-target={g.width}
                  style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                >
                  0%
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--card)_100%,transparent)] ring-1 ring-white/5">
                <div
                  data-skill-bar
                  data-width={g.width}
                  className="h-full w-0 rounded-full bg-gradient-to-r from-[var(--accent)] to-[color-mix(in_srgb,var(--accent2)_70%,var(--accent))] will-change-[width]"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap gap-3" data-skill-tags>
          {allTags.map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              data-skill-pill
              className="skill-pill rounded-full border border-white/10 bg-[var(--card)] px-4 py-2 text-xs text-[var(--muted)] transition duration-300 hover:scale-105 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_0_20px_color-mix(in_srgb,var(--accent)_25%,transparent)]"
              style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
