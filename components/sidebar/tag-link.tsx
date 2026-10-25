"use client";

import { usePathname } from "next/navigation";
import { resolveTagLabel } from "@/constants/categories";
import { PATH } from "@/constants/path";
import { cn } from "@/lib/utils";
import { SidebarLink } from "./sidebar-link";

/** 태그의 글 목록 페이지(/categories/<tag>)로 보내는 사이드바 링크. */
export function TagLink({
  tag,
  asGroupLabel = false,
}: {
  tag: string;
  asGroupLabel?: boolean;
}) {
  const pathname = usePathname();
  const href = `${PATH.CATEGORIES}/${tag}`;
  const isCurrent = pathname.startsWith(href);

  return (
    <SidebarLink
      href={href}
      aria-current={isCurrent ? "page" : undefined}
      className={cn(
        "block w-full rounded-md py-1 pr-3 text-left text-[11px] leading-snug transition-colors",
        asGroupLabel ? "pl-7.5 font-medium" : "pl-3",
        isCurrent
          ? "bg-sidebar-accent font-medium text-sidebar-foreground"
          : asGroupLabel
            ? "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            : "text-sidebar-foreground/45 hover:bg-sidebar-accent hover:text-sidebar-foreground",
      )}
    >
      {resolveTagLabel(tag)}
    </SidebarLink>
  );
}
