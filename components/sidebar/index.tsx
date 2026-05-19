"use client";

import { useLocale, useTranslations } from "next-intl";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import type { Locale } from "@/i18n/config";
import { PostGroupContent } from "./PostGroupContent";
import { SidebarAnchorButton } from "./SidebarAnchorButton";

export default function AppSidebar({
  frontMatterListByLocale,
}: {
  frontMatterListByLocale: Record<Locale, FrontMatter[]>;
}) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const totalFrontMatterList =
    frontMatterListByLocale[locale] || frontMatterListByLocale.ko;
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
            <Avatar className="h-16 w-16 ring-2 ring-primary/40 ring-offset-2 ring-offset-sidebar">
              <AvatarImage src="/images/me.jpg" alt={t("sidebar.profileAlt")} />
              <AvatarFallback className="bg-primary/10 font-mono text-primary text-sm">
                {t("sidebar.name")}
              </AvatarFallback>
            </Avatar>
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
        <PostGroupContent frontMatterList={totalFrontMatterList} />

        <SidebarGroup className="mt-auto border-sidebar-border border-t pt-2">
          <SidebarGroupContent>
            <SidebarMenu>
              {NAVIGATION_ITEMS.map((item) => (
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
