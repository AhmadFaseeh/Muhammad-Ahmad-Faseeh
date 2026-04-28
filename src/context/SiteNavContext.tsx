"use client";

import { createContext, useContext } from "react";

type SiteNav = {
  navigate: (href: string) => Promise<void>;
  pathname: string;
};

const Ctx = createContext<SiteNav | null>(null);

export function useSiteNav() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSiteNav must be used within SiteShell");
  return v;
}

export const SiteNavProvider = Ctx.Provider;
