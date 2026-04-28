import { SplitHeading } from "./SplitHeading";

const stats = [
  { target: 1, suffix: "+", rest: " Year of Professional Experience" },
  { target: 10, suffix: "+", rest: " Projects Delivered" },
  { target: 5, suffix: "+", rest: " Technologies Mastered" },
];

export function AboutSection() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SplitHeading className="mb-4 text-3xl font-bold uppercase tracking-wider text-white md:text-4xl">
          About
        </SplitHeading>
        <p
          className="max-w-2xl text-base leading-relaxed text-[var(--muted)]"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          I build scalable backend systems and AI-powered products. Based in Lahore, currently studying Software
          Engineering at PMAS Arid University.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {stats.map((s) => (
            <article
              key={s.rest}
              data-stat-card
              data-scroll-flip
              className="card-3d rounded-2xl border border-white/10 bg-[var(--card)] p-6 shadow-[0_0_0_1px_rgba(0,245,255,0.06)]"
            >
              <p className="text-sm leading-relaxed text-[var(--muted)]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                <span
                  className="text-4xl font-bold tabular-nums text-[var(--accent)]"
                  style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
                  data-stat-value
                  data-target={s.target}
                  data-suffix={s.suffix}
                >
                  0{s.suffix}
                </span>
                {s.rest}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
