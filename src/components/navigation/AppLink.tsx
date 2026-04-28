"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useRef, useEffect, type ReactNode, type MouseEvent, type ComponentProps } from "react";
import { useSiteNav } from "@/context/SiteNavContext";

type Props = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  children: ReactNode;
};

export function AppLink({ href, children, className, onMouseEnter, onMouseLeave, onClick, ...rest }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { navigate } = useSiteNav();
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelPreload = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
  };

  const onEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onMouseEnter?.(e);
    timeout.current = setTimeout(() => {
      router.prefetch(href);
    }, 100);
  };

  const onLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onMouseLeave?.(e);
    cancelPreload();
  };

  useEffect(() => () => cancelPreload(), []);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.(e);
    if (href === pathname) return;
    cancelPreload();
    void navigate(href);
  };

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      data-cursor="interactive"
      {...rest}
    >
      {children}
    </a>
  );
}
