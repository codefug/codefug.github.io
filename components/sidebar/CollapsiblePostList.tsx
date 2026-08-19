"use client";

import { usePathname } from "next/navigation";
import { PATH } from "@/constants/path";
import { cn } from "@/lib/utils";
import { resolveTagLabel } from "@/util/tag-label";
import { SidebarAnchorButton } from "./SidebarAnchorButton";

/**
 * 사이드바의 태그 한 줄.
 *
 * 예전에는 눌러서 글 목록을 펼치고 거기서 글로 바로 갔는데,
 * 사이드바가 깊어지고 목록이 길어졌다. 지금은 태그를 누르면
 * 그 카테고리의 목록 페이지로 보낸다.
 */
export function CollapsiblePostList({
  category,
  asGroupLabel = false,
}: {
  category: string;
  /** 그룹 자리를 대신할 때(Web처럼 태그가 그룹과 같은 이름) 형제 그룹과 같은 크기로 둔다. */
  asGroupLabel?: boolean;
}) {
  const pathname = usePathname();
  const href = `${PATH.CATEGORIES}/${category}`;
  const isCurrent = pathname.startsWith(href);

  return (
    <SidebarAnchorButton
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
      {resolveTagLabel(category)}
    </SidebarAnchorButton>
  );
}
