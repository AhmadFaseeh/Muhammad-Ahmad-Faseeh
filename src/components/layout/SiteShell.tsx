"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { SiteNavProvider } from "@/context/SiteNavContext";
import { TransitionManager } from "@/lib/TransitionManager";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { FloatingShapes } from "@/components/fx/FloatingShapes";
import { LoadingScreen } from "@/components/portfolio/LoadingScreen";
import { TransitionOverlay } from "@/components/transition/TransitionOverlay";
import { MainNav } from "@/components/navigation/MainNav";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const reduced = useReducedMotion();
  const [load, setLoad] = useState(true);
  const [ready, setReady] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const pending = useRef<string | null>(null);
  const tm = TransitionManager.getInstance();

  const navigate = useCallback(
    async (href: string) => {
      if (href === pathname) return;
      if (reduced) {
        router.push(href);
        return;
      }
      const main = mainRef.current;
      const root = overlayRef.current;
      if (!main || !root) {
        router.push(href);
        return;
      }
      pending.current = href;
      tm.resolveKind(pathname, href);
      await tm.exitToCovered(tm.lastKind, main, root);
      router.push(href);
    },
    [pathname, reduced, router, tm],
  );

  useLayoutEffect(() => {
    if (!ready) return;
    const main = mainRef.current;
    const root = overlayRef.current;
    if (!main || !root) return;

    if (first.current) {
      first.current = false;
      tm.resetForNextRoute(root);
      const inner = (main.querySelector<HTMLElement>("[data-page-inner]") ?? main) as HTMLElement;
      const ch = Array.from(inner.children);
      if (!reduced && ch.length) {
        gsap.fromTo(
          ch,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.38, stagger: 0.05, ease: "back.out(1.1)" },
        );
      } else {
        gsap.set(ch, { opacity: 1, y: 0 });
      }
      return;
    }

    if (pending.current && pending.current === pathname) {
      const kind = tm.lastKind;
      pending.current = null;
      void (async () => {
        await tm.enterFromCovered(kind, main, root);
        tm.resetForNextRoute(root);
        ScrollTrigger.refresh();
      })();
      return;
    }

    if (!pending.current) {
      const inner = (main.querySelector<HTMLElement>("[data-page-inner]") ?? main) as HTMLElement;
      const ch = Array.from(inner.children);
      if (!reduced && ch.length) {
        gsap.fromTo(
          ch,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.28, stagger: 0.04, ease: "power2.out" },
        );
      }
      ScrollTrigger.refresh();
    }
  }, [pathname, ready, reduced, tm]);

  useLayoutEffect(() => {
    if (reduced || !ready) return;
    const lenis = new Lenis({ smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const t = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(t);
    gsap.ticker.lagSmoothing(0);
    document.documentElement.classList.add("lenis");
    return () => {
      gsap.ticker.remove(t);
      lenis.destroy();
      document.documentElement.classList.remove("lenis");
    };
  }, [reduced, ready]);

  return (
    <SiteNavProvider value={{ navigate, pathname }}>
      <div
        className="relative min-h-[100dvh] scroll-smooth bg-[var(--bg)] text-[var(--text)]"
        style={{ perspective: "1400px" }}
      >
        {load && (
          <LoadingScreen
            reducedMotion={reduced}
            onDone={() => {
              setLoad(false);
              setReady(true);
            }}
          />
        )}
        <CustomCursor />
        <FloatingShapes />
        <TransitionOverlay ref={overlayRef} />
        <MainNav />
        <main ref={mainRef} className="relative z-10 min-h-[100dvh]">
          {children}
        </main>
        <footer
          className="relative z-10 border-t border-white/10 py-8 text-center text-xs text-[var(--muted)]"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          © {new Date().getFullYear()} Muhammad Ahmad Faseeh — Next.js · Three.js · GSAP
        </footer>
      </div>
    </SiteNavProvider>
  );
}
