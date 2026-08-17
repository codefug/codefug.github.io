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
        /*
          트리의 말단이다. 부모 그룹(11px)보다 크면 계층이 역전돼 보이므로
          한 단계 작게 두고, 긴 이름은 자르지 않고 줄바꿈한다.
        */
        "block w-full rounded-md px-3 py-1 text-left leading-snug transition-colors",
        asGroupLabel ? "font-medium text-[11px]" : "text-[10.5px]",
        isCurrent
          ? "bg-sidebar-accent font-medium text-sidebar-foreground"
          : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground",
      )}
    >
      {resolveTagLabel(category)}
    </SidebarAnchorButton>
  );
}
