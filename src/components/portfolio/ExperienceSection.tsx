import { SplitHeading } from "./SplitHeading";

const roles = [
  {
    title: "Full-Stack / Backend Developer",
    company: "IT KUMAIL",
    period: "July 2025 – Present",
    points: [
      "TypeScript + Node.js backend services (clean architecture)",
      "RESTful & GraphQL APIs for SaaS applications",
      "PostgreSQL schema design + query optimization",
      "Stripe & PayPal payment integration",
      "AI pipelines: RAG + Embeddings using OpenAI",
      "Background jobs, concurrency, real-time monitoring",
    ],
  },
  {
    title: "WordPress & Systems Developer",
    company: "IT KUMAIL",
    period: "July 2025 – Present",
    points: [
      "Core Web Vitals optimization (high Lighthouse scores)",
      "PHP backend + third-party API integrations (CRM sync)",
      "React.js + GSAP UI components",
      "Advanced caching + render-blocking resolution",
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SplitHeading className="mb-16 text-3xl font-bold uppercase tracking-wider text-white md:text-4xl">
          Experience
        </SplitHeading>

        <div className="relative md:grid md:grid-cols-2 md:gap-12">
          <div
            className="pointer-events-none absolute left-[7px] top-0 hidden w-px md:block"
            style={{ height: "100%" }}
            aria-hidden
          >
            <div
              data-timeline-line
              className="h-full w-full origin-top scale-y-0 bg-gradient-to-b from-[var(--accent)] via-[var(--accent)] to-[color-mix(in_srgb,var(--accent)_25%,transparent)] will-change-transform"
            />
          </div>

          <div className="space-y-12 md:col-span-2 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
            {roles.map((r) => (
              <article
                key={r.title}
                data-scroll-flip
                className="relative rounded-2xl border border-white/10 bg-[var(--card)] p-8 pl-10 md:pl-8"
              >
                <span
                  className="absolute left-0 top-10 hidden h-2.5 w-2.5 -translate-x-[calc(50%+7px)] rounded-full border-2 border-[var(--accent)] bg-[var(--bg)] shadow-[0_0_12px_var(--accent)] md:block"
                  aria-hidden
                />
                <p
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]"
                  style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
                >
                  {r.period}
                </p>
                <h3
                  className="mt-2 text-xl font-bold text-white md:text-2xl"
                  style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
                >
                  {r.title}
                </h3>
                <p className="mt-1 text-sm text-[var(--accent2)]">{r.company}</p>
                <ul
                  className="mt-6 space-y-3 text-sm leading-relaxed text-[var(--muted)]"
                  style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                >
                  {r.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
