"use client";

import { forwardRef } from "react";

/**
 * Stacked transition layers — colors from CSS variables only.
 */
export const TransitionOverlay = forwardRef<HTMLDivElement>(function TransitionOverlay(_props, ref) {
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[190]"
      data-transition-root
      aria-hidden
    >
      <div
        data-t-wipe
        className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 will-change-transform"
        style={{ background: "var(--bg)" }}
      />
      <div
        data-t-split-t
        className="absolute left-0 right-0 top-0 h-1/2 will-change-transform"
        style={{ background: "var(--bg)" }}
      />
      <div
        data-t-split-b
        className="absolute bottom-0 left-0 right-0 h-1/2 will-change-transform"
        style={{ background: "var(--bg)" }}
      />
      <div
        data-t-bloom
        className="absolute inset-0 origin-center scale-75 opacity-0 will-change-transform"
        style={{ background: "color-mix(in srgb, var(--bg) 94%, black)" }}
      />
      <div
        data-t-slash
        className="absolute inset-0 will-change-[clip-path]"
        style={{
          background: "var(--bg)",
          clipPath: "polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)",
        }}
      />
      <div
        className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-0 will-change-[opacity]"
        data-t-shatter-wrap
        style={{ pointerEvents: "none" }}
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            data-t-tile
            className="h-full w-full will-change-transform"
            style={{ background: "var(--bg)" }}
          />
        ))}
      </div>
    </div>
  );
});
