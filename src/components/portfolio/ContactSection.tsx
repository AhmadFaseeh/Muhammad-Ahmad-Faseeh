"use client";

import { useState } from "react";
import { SplitHeading } from "./SplitHeading";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 1400);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 pb-32 pt-24 md:pb-40 md:pt-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SplitHeading className="mb-12 text-3xl font-bold uppercase tracking-wider text-white md:text-4xl">
          Contact
        </SplitHeading>

        <div className="grid gap-12 lg:grid-cols-2">
          <div
            data-scroll-flip
            className="rounded-2xl border border-white/10 bg-[var(--card)] p-8"
            style={{ fontFamily: "var(--font-jetbrains), monospace" }}
          >
            <p className="text-sm text-[var(--muted)]">Email</p>
            <a href="mailto:muhammadahmadfaseeh5@gmail.com" className="mt-1 block text-[var(--accent)] hover:underline">
              muhammadahmadfaseeh5@gmail.com
            </a>
            <p className="mt-6 text-sm text-[var(--muted)]">Phone</p>
            <a href="tel:+923206493816" className="mt-1 block text-[var(--text)] hover:text-[var(--accent)]">
              03206493816
            </a>
            <p className="mt-6 text-sm text-[var(--muted)]">Location</p>
            <p className="mt-1 text-[var(--text)]">Lahore, Punjab, Pakistan</p>
            <p className="mt-6 text-sm text-[var(--muted)]">GitHub</p>
            <a
              href="https://github.com/AhmadFaseeh"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-[var(--accent)] hover:underline"
            >
              github.com/AhmadFaseeh
            </a>
            <p className="mt-6 text-sm text-[var(--muted)]">LinkedIn</p>
            <a
              href="https://www.linkedin.com/in/muhammadahmadfaseeh"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-[var(--accent)] hover:underline"
            >
              linkedin.com/in/muhammadahmadfaseeh
            </a>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-white/10 bg-[color-mix(in_srgb,var(--card)_88%,transparent)] p-8 backdrop-blur-sm"
          >
            <label className="block text-xs uppercase tracking-wider text-[var(--muted)]" htmlFor="c-name">
              Name
            </label>
            <input
              id="c-name"
              name="name"
              required
              className="mt-2 w-full rounded-lg border border-white/10 bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] outline-none ring-0 transition focus:border-[var(--accent)]"
              style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            />
            <label className="mt-6 block text-xs uppercase tracking-wider text-[var(--muted)]" htmlFor="c-email">
              Email
            </label>
            <input
              id="c-email"
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-lg border border-white/10 bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)]"
              style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            />
            <label className="mt-6 block text-xs uppercase tracking-wider text-[var(--muted)]" htmlFor="c-msg">
              Message
            </label>
            <textarea
              id="c-msg"
              name="message"
              required
              rows={5}
              className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)]"
              style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            />
            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              data-cursor="interactive"
              className="mt-8 inline-flex min-w-[160px] items-center justify-center rounded-full border border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] px-8 py-3 text-sm font-semibold uppercase tracking-wider text-[var(--accent)] transition hover:bg-[color-mix(in_srgb,var(--accent)_24%,transparent)] disabled:opacity-60"
              style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
            >
              {status === "idle" && "Send"}
              {status === "sending" && (
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent)]" />
                  Sending
                </span>
              )}
              {status === "sent" && "Transmitted"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
