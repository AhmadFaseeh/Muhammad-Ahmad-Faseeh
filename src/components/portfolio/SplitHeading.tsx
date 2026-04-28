"use client";

export function SplitHeading({
  children,
  className = "",
  as: Tag = "h2",
  staggerGroup = "title",
}: {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  /** Used by GSAP selectors, e.g. `document.querySelectorAll(\`[data-stagger='${staggerGroup}'] .char\`)` */
  staggerGroup?: string;
}) {
  const H = Tag;
  return (
    <H
      data-stagger={staggerGroup}
      className={className}
      style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
    >
      {children.split("").map((c, i) => (
        <span key={i} className="char inline-block will-change-transform">
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </H>
  );
}
