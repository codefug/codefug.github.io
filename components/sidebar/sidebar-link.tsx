"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

/** 모바일 사이드바는 본문을 덮으므로 이동할 때 닫는다. 사이드바 링크는 모두 이 컴포넌트를 쓴다. */
export function SidebarLink({
  className,
  onClick,
  target,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps) {
  const { isMobile, setOpenMobile } = useSidebar();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (isMobile && target !== "_blank") setOpenMobile(false);
  };

  return (
    <Link
      className={cn(
        "rounded-md px-3 py-1.5 text-sidebar-foreground/70 text-sm transition-colors",
        "hover:bg-primary/10 hover:text-primary",
        "dark:hover:bg-primary/20 dark:hover:text-sidebar-foreground",
        className,
      )}
      onClick={handleClick}
      target={target}
      {...props}
    />
  );
}
