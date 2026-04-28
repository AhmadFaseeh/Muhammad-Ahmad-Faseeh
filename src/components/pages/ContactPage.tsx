"use client";

import dynamic from "next/dynamic";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useGsapPage } from "@/hooks/useGsapPage";
import { useState } from "react";
import { site } from "@/data/siteContent";
import { SplitHeading } from "@/components/portfolio/SplitHeading";
const ContactBackground = dynamic(
  () => import("@/components/canvas/ContactBackground").then((m) => m.ContactBackground),
  { ssr: false, loading: () => null },
);

export function ContactPage() {
  const pathname = usePathname();
  const [sending, setSending] = useState<"idle" | "loading" | "done">("idle");

  useGsapPage(() => {
    document.querySelectorAll("[data-stagger]").forEach((title) => {
      const chars = title.querySelectorAll(".char");
      if (!chars.length) return;
      gsap.from(chars, {
        scrollTrigger: { trigger: title, start: "top 85%" },
        y: 50,
        opacity: 0,
        stagger: 0.03,
        duration: 0.55,
        ease: "power3.out",
      });
    });
  }, [pathname]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending === "loading") return;
    setSending("loading");
    window.setTimeout(() => setSending("done"), 1400);
  };

  const links = [
    { href: site.github, label: "GitHub" },
    { href: site.linkedin, label: "LinkedIn" },
    { href: `mailto:${site.email}`, label: "Email" },
    { href: `tel:${site.phoneTel}`, label: "Phone" },
  ];

  return (
    <div data-page-inner className="relative">
      <ContactBackground />
      <div className="relative z-10 mx-auto grid min-h-[80dvh] max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:px-10 md:py-32">
        <div>
          <SplitHeading className="text-3xl font-bold leading-tight text-white md:text-5xl" staggerGroup="con" as="h1">
            {"LET'S BUILD SOMETHING"}
          </SplitHeading>
          <p
            className="mt-6 text-sm text-[var(--muted)]"
            data-cursor="text"
            style={{ fontFamily: "var(--font-jetbrains), monospace" }}
          >
            Tell me about your product, your stack, and the outcomes you are chasing. I will respond as soon as possible.
          </p>
          <ul className="mt-10 space-y-3">
            {links.map((l) => (
              <li key={l.label} className="group flex items-center gap-3" data-cursor="interactive">
                <a
                  href={l.href}
                  className="flex min-h-[2.5rem] items-center gap-3 text-[var(--accent)] transition"
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <span
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[var(--card)] transition group-hover:scale-110"
                    style={{ minWidth: "2.5rem" }}
                    aria-hidden
                  >
                    ●
                  </span>
                  <span
                    className="text-sm"
                    style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                  >
                    {l.label}
                  </span>
                  <span
                    className="inline-block max-w-0 -translate-x-1 overflow-hidden opacity-0 transition-all duration-200 group-hover:max-w-[200px] group-hover:translate-x-0 group-hover:opacity-100"
                    style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                  >
                    {l.href}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-2xl border border-white/10 bg-[color-mix(in_srgb,var(--card)_88%,transparent)] p-8"
        >
          <label className="block text-xs uppercase tracking-wider text-[var(--muted)]" htmlFor="f-name">
            Name
          </label>
          <input
            id="f-name"
            required
            className="w-full rounded-lg border border-white/10 bg-[var(--bg)] px-3 py-3 text-sm text-[var(--text)] outline-none min-h-12"
            style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            data-cursor="text"
          />
          <label className="block text-xs uppercase tracking-wider text-[var(--muted)]" htmlFor="f-email">
            Email
          </label>
          <input
            id="f-email"
            type="email"
            required
            className="w-full rounded-lg border border-white/10 bg-[var(--bg)] px-3 py-3 text-sm text-[var(--text)] outline-none min-h-12"
            style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            data-cursor="text"
          />
          <label className="block text-xs uppercase tracking-wider text-[var(--muted)]" htmlFor="f-msg">
            Message
          </label>
          <textarea
            id="f-msg"
            required
            rows={5}
            className="w-full resize-y rounded-lg border border-white/10 bg-[var(--bg)] px-3 py-3 text-sm text-[var(--text)] outline-none"
            style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            data-cursor="text"
          />
          <button
            type="submit"
            disabled={sending !== "idle"}
            data-cursor="interactive"
            className="relative w-full min-h-12 overflow-hidden rounded-full border border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] px-6 text-sm font-semibold uppercase tracking-wider text-[var(--accent)] transition disabled:opacity-50"
            style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
          >
            {sending === "idle" && "Send"}
            {sending === "loading" && (
              <span className="inline-flex items-center justify-center gap-2">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
                Sending
              </span>
            )}
            {sending === "done" && "Sent ✓"}
          </button>
        </form>
      </div>
    </div>
  );
}
