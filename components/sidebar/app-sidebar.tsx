"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { isSidebarOffPath } from "@/constants/path";
import { AUTHOR_NAME } from "@/constants/site";
import type { FrontMatter } from "@/types/post";
import { CategoryTree } from "./category-tree";
import { SidebarLink } from "./sidebar-link";
import { useNavigateAfterSidebarClose } from "./use-navigate-after-sidebar-close";

type SidebarNavEntry = {
  key: string;
  href: string;
  target: string;
  label: string;
};

/** 카테고리 링크(Me)는 위 카테고리 트리에 이미 있으므로 뺀다. 드롭다운으로 묶인 링크는 펼칠 메뉴가 없는 사이드바에서 풀어 나란히 둔다. */
function buildSidebarNavEntries(): SidebarNavEntry[] {
  return NAVIGATION_ITEMS.flatMap<SidebarNavEntry>((item) => {
    if (item.tag) return [];
    if (item.href)
      return [
        {
          key: item.label,
          href: item.href,
          target: item.target,
          label: item.label,
        },
      ];
    if (item.links)
      return item.links.map((link) => ({
        key: link.key,
        href: link.href,
        target: item.target,
        label: link.label,
      }));
    return [];
  });
}

export default function AppSidebar({
  frontMatterList,
}: {
  frontMatterList: FrontMatter[];
}) {
  const navigateAfterSidebarClose = useNavigateAfterSidebarClose();

  // 데스크톱은 이동 후에도 열어 둔다. 모바일에서 닫는 일은 SidebarLink가 한다.
  const getNavigationClickHandler = (item: SidebarNavEntry) => {
    if (!isSidebarOffPath(item.href)) return undefined;
    return navigateAfterSidebarClose(item.href);
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-0">
        <div className="relative flex flex-col items-center gap-3 overflow-hidden border-sidebar-border border-b px-4 pt-8 pb-6">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, color-mix(in srgb, currentColor 8%, transparent) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute top-0 left-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-2xl"
            aria-hidden="true"
          />
          <div className="relative">
            <img
              src="/images/me.jpg"
              alt={"이승현 프로필 사진"}
              width={64}
              height={64}
              fetchPriority="high"
              decoding="sync"
              className="h-16 w-16 shrink-0 rounded-full bg-primary/10 object-cover ring-2 ring-primary/40 ring-offset-2 ring-offset-sidebar"
            />
          </div>
          <div className="relative text-center">
            <h1 className="font-semibold text-sidebar-foreground text-sm">
              {AUTHOR_NAME}
            </h1>
            <p className="mt-0.5 font-mono text-muted-foreground text-xs">
              Web Frontend Developer
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-0" style={{ scrollbarWidth: "none" }}>
        <CategoryTree frontMatterList={frontMatterList} />

        <SidebarGroup className="mt-auto border-sidebar-border border-t pt-2">
          <SidebarGroupContent>
            <SidebarMenu>
              {buildSidebarNavEntries().map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton asChild>
                    <SidebarLink
                      href={item.href}
                      target={item.target}
                      onClick={getNavigationClickHandler(item)}
                    >
                      {item.label}
                    </SidebarLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
