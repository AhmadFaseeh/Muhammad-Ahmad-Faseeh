"use client";

import { useLayoutEffect, useState } from "react";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { ScrollIndicator } from "@/components/fx/ScrollIndicator";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HomePage() {
  const reduced = useReducedMotion();
  const [reveal, setReveal] = useState(!!reduced);

  useLayoutEffect(() => {
    if (reduced) return;
    const id = requestAnimationFrame(() => setReveal(true));
    return () => cancelAnimationFrame(id);
  }, [reduced]);

  return (
    <div data-page-inner className="relative">
      <HeroSection reveal={reveal} footerSlot={<ScrollIndicator />} showMeshGradient />
    </div>
  );
}
