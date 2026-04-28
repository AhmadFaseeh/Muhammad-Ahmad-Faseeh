import gsap from "gsap";

export type TransitionKind =
  | "horizontal-wipe"
  | "vertical-split"
  | "scale-bloom"
  | "grid-shatter"
  | "diagonal-slash"
  | "home-flash";

function norm(p: string) {
  const x = p || "/";
  if (x.length > 1 && x.endsWith("/")) return x.slice(0, -1);
  return x;
}

/**
 * Singleton for route-pair transition styles. SiteShell runs exit → router.push → enter.
 */
export class TransitionManager {
  private static inst: TransitionManager;
  lastKind: TransitionKind = "horizontal-wipe";

  private constructor() {}
  static getInstance() {
    if (!TransitionManager.inst) TransitionManager.inst = new TransitionManager();
    return TransitionManager.inst;
  }

  resolveKind(fromPath: string, toPath: string): TransitionKind {
    const from = norm(fromPath);
    const to = norm(toPath);
    let k: TransitionKind = "horizontal-wipe";
    if (to === "/") k = "home-flash";
    else if (from === "/" && to === "/about") k = "horizontal-wipe";
    else if (from === "/about" && to === "/experience") k = "vertical-split";
    else if (from === "/experience" && to === "/projects") k = "scale-bloom";
    else if (from === "/projects" && to === "/skills") k = "grid-shatter";
    else if (from === "/skills" && to === "/contact") k = "diagonal-slash";
    this.lastKind = k;
    return k;
  }

  /** Step 1+2: main exits, overlay covers. Resolves when safe to router.push. */
  async exitToCovered(kind: TransitionKind, main: HTMLElement, root: HTMLElement): Promise<void> {
    const ease = "power3.inOut";
    const easeIn = "power2.in";
    const wipe = root.querySelector<HTMLElement>("[data-t-wipe]");
    const splitT = root.querySelector<HTMLElement>("[data-t-split-t]");
    const splitB = root.querySelector<HTMLElement>("[data-t-split-b]");
    const bloom = root.querySelector<HTMLElement>("[data-t-bloom]");
    const slash = root.querySelector<HTMLElement>("[data-t-slash]");
    const shatter = root.querySelector<HTMLElement>("[data-t-shatter-wrap]");
    const tiles = root.querySelectorAll<HTMLElement>("[data-t-tile]");

    await new Promise<void>((done) => {
      const tl = gsap.timeline({ onComplete: done });

      tl.to(main, { opacity: 0, y: -20, duration: 0.2, ease: easeIn });

      if (kind === "horizontal-wipe" || kind === "home-flash") {
        if (wipe) {
          gsap.set(wipe, { transformOrigin: "left center", scaleX: 0 });
          tl.to(wipe, { scaleX: 1, duration: 0.3, ease });
        }
      } else if (kind === "vertical-split") {
        if (splitT) gsap.set(splitT, { yPercent: -100 });
        if (splitB) gsap.set(splitB, { yPercent: 100 });
        if (splitT) tl.to(splitT, { yPercent: 0, duration: 0.3, ease }, ">-0.05");
        if (splitB) tl.to(splitB, { yPercent: 0, duration: 0.3, ease }, "<");
      } else if (kind === "scale-bloom") {
        tl.to(main, { scale: 0.9, duration: 0.2, ease: easeIn }, "<0.05");
        if (bloom) {
          gsap.set(bloom, { scale: 0.75, opacity: 0 });
          tl.to(bloom, { opacity: 1, scale: 1, duration: 0.3, ease }, ">-0.02");
        }
      } else if (kind === "grid-shatter") {
        if (shatter) gsap.set(shatter, { opacity: 1, pointerEvents: "none" });
        if (tiles.length) {
          tl.to(
            tiles,
            {
              x: (i) => (i % 2 ? 1 : -1) * (40 + (i % 5) * 15),
              y: (i) => (i % 3 ? 1 : -1) * (50 + (i % 4) * 20),
              opacity: 0,
              rotation: (i) => (i % 2 ? 8 : -8),
              duration: 0.28,
              ease: "power2.in",
              stagger: 0.01,
            },
            ">-0.05",
          );
        }
      } else if (kind === "diagonal-slash") {
        if (slash) {
          gsap.set(slash, { clipPath: "polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)" });
          tl.to(slash, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.3, ease });
        }
      }
    });
  }

  /** After new page mounted: reveal overlay + animate main in. */
  async enterFromCovered(kind: TransitionKind, main: HTMLElement, root: HTMLElement): Promise<void> {
    const ease = "power3.inOut";
    const wipe = root.querySelector<HTMLElement>("[data-t-wipe]");
    const splitT = root.querySelector<HTMLElement>("[data-t-split-t]");
    const splitB = root.querySelector<HTMLElement>("[data-t-split-b]");
    const bloom = root.querySelector<HTMLElement>("[data-t-bloom]");
    const slash = root.querySelector<HTMLElement>("[data-t-slash]");
    const shatter = root.querySelector<HTMLElement>("[data-t-shatter-wrap]");
    const tiles = root.querySelectorAll<HTMLElement>("[data-t-tile]");

    gsap.set(main, { scale: 1, y: 0, clearProps: "transform" });
    const inner = main.querySelector<HTMLElement>("[data-page-inner]") ?? main;
    const ch = Array.from(inner.children);
    gsap.set(ch, { opacity: 0, y: 24 });

    await new Promise<void>((done) => {
      const tl = gsap.timeline({ onComplete: done });

      if (kind === "horizontal-wipe" || kind === "home-flash") {
        if (wipe) {
          gsap.set(wipe, { transformOrigin: "right center" });
          tl.to(wipe, { scaleX: 0, duration: 0.3, ease });
        }
      } else if (kind === "vertical-split") {
        if (splitT) tl.to(splitT, { yPercent: -100, duration: 0.3, ease });
        if (splitB) tl.to(splitB, { yPercent: 100, duration: 0.3, ease }, "<");
      } else if (kind === "scale-bloom") {
        if (bloom) tl.to(bloom, { opacity: 0, scale: 1.1, duration: 0.3, ease: "power2.inOut" });
      } else if (kind === "grid-shatter") {
        if (shatter) gsap.set(shatter, { opacity: 1 });
        if (tiles.length) {
          gsap.set(tiles, { x: 0, y: 0, opacity: 1, rotation: 0, clearProps: "transform" });
          tl.fromTo(
            tiles,
            { opacity: 0, scale: 0.45, y: 24 },
            { opacity: 1, scale: 1, y: 0, duration: 0.3, stagger: 0.012, ease: "back.out(1.1)" },
          );
        }
        if (shatter) tl.set(shatter, { opacity: 0 }, "+=0.04");
      } else if (kind === "diagonal-slash") {
        if (slash) {
          tl.to(slash, { clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)", duration: 0.3, ease });
        }
      }
    });

    gsap.set(main, { opacity: 1, clearProps: "opacity" });
    if (ch.length) {
      await new Promise<void>((d) => {
        gsap.to(ch, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.05,
          ease: "back.out(1.15)",
          onComplete: d,
        });
      });
    }
  }

  resetForNextRoute(root: HTMLElement) {
    const wipe = root.querySelector<HTMLElement>("[data-t-wipe]");
    const splitT = root.querySelector<HTMLElement>("[data-t-split-t]");
    const splitB = root.querySelector<HTMLElement>("[data-t-split-b]");
    const bloom = root.querySelector<HTMLElement>("[data-t-bloom]");
    const slash = root.querySelector<HTMLElement>("[data-t-slash]");
    const shatter = root.querySelector<HTMLElement>("[data-t-shatter-wrap]");
    const tiles = root.querySelectorAll<HTMLElement>("[data-t-tile]");
    if (wipe) gsap.set(wipe, { scaleX: 0, transformOrigin: "left center" });
    if (splitT) gsap.set(splitT, { yPercent: -100 });
    if (splitB) gsap.set(splitB, { yPercent: 100 });
    if (bloom) gsap.set(bloom, { opacity: 0, scale: 0.75 });
    if (slash) gsap.set(slash, { clipPath: "polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)" });
    if (shatter) gsap.set(shatter, { opacity: 0 });
    if (tiles.length) gsap.set(tiles, { x: 0, y: 0, opacity: 1, rotation: 0, clearProps: "all" });
  }
}

