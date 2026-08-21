"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

/**
 * 사이드바 안의 링크 한 줄.
 *
 * 모바일에서는 사이드바가 본문을 덮는 오버레이라, 열어둔 채 이동하면
 * 도착한 페이지가 가려진다. 사이드바의 모든 링크가 이 컴포넌트를 지나가므로
 * 여기서 닫으면 새 링크를 추가해도 저절로 따라온다.
 */
export function SidebarAnchorButton({
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
