"use client";

import { useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed right-6 top-6 z-[150] hidden items-center gap-1 rounded-full border border-white/10 bg-[color-mix(in_srgb,var(--card)_82%,transparent)] px-2 py-1.5 shadow-lg backdrop-blur-md md:flex"
        aria-label="Primary"
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            style={{ fontFamily: "var(--font-jetbrains), monospace" }}
          >
            {l.label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="fixed right-5 top-5 z-[160] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[color-mix(in_srgb,var(--card)_88%,transparent)] text-[var(--accent)] backdrop-blur-md md:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        data-cursor="interactive"
      >
        <span className="sr-only">Menu</span>
        <span className="flex flex-col gap-1.5">
          <span
            className={`block h-0.5 w-5 origin-center bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`block h-0.5 w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`block h-0.5 w-5 origin-center bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </span>
      </button>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[155] flex flex-col items-center justify-center gap-6 bg-[var(--bg)]/96 backdrop-blur-xl transition-opacity duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-lg tracking-[0.2em] text-[var(--text)] transition-colors hover:text-[var(--accent)]"
            style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
            onClick={() => setOpen(false)}
            data-cursor="interactive"
          >
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
