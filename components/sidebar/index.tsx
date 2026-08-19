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
  useSidebar,
} from "@/components/ui/sidebar";
import type { FrontMatter } from "@/constants/mdx";
import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { useTranslations } from "@/lib/messages";
import { PostGroupContent } from "./PostGroupContent";
import { SidebarAnchorButton } from "./SidebarAnchorButton";

export default function AppSidebar({
  frontMatterList,
}: {
  frontMatterList: FrontMatter[];
}) {
  const t = useTranslations();
  const { toggleSidebar } = useSidebar();

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
              alt={t("sidebar.profileAlt")}
              width={64}
              height={64}
              fetchPriority="high"
              decoding="sync"
              className="h-16 w-16 shrink-0 rounded-full bg-primary/10 object-cover ring-2 ring-primary/40 ring-offset-2 ring-offset-sidebar"
            />
          </div>
          <div className="relative text-center">
            <h1 className="font-semibold text-sidebar-foreground text-sm">
              {t("sidebar.name")}
            </h1>
            <p className="mt-0.5 font-mono text-muted-foreground text-xs">
              {t("sidebar.jobTitle")}
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-0" style={{ scrollbarWidth: "none" }}>
        <PostGroupContent frontMatterList={frontMatterList} />

        <SidebarGroup className="mt-auto border-sidebar-border border-t pt-2">
          <SidebarGroupContent>
            <SidebarMenu>
              {/*
                하위 카테고리로만 들어가는 항목(Notes)은 위 카테고리 트리에
                이미 같은 내용이 펼쳐져 있으므로 여기서는 빼둔다.
              */}
              {NAVIGATION_ITEMS.flatMap((item) =>
                item.href ? [{ ...item, href: item.href }] : [],
              ).map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <SidebarAnchorButton
                      href={item.href}
                      target={item.target}
                      onClick={
                        (item.target as string) === "_blank"
                          ? undefined
                          : toggleSidebar
                      }
                    >
                      {t(`navigation.${item.label.toLowerCase()}`)}
                    </SidebarAnchorButton>
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
