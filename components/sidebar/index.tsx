"use client";

import { useLocale, useTranslations } from "next-intl";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
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
      <SidebarContent className="gap-0" style={{ scrollbarWidth: "none" }}>
        <div className="flex flex-col items-center gap-3 bg-primary px-4 pt-8 pb-6">
          <Avatar className="h-16 w-16 ring-2 ring-white/25 ring-offset-2 ring-offset-primary">
            <AvatarImage src="/images/me.jpg" alt={t("sidebar.profileAlt")} />
            <AvatarFallback className="bg-white/10 text-sm text-white">
              {t("sidebar.name")}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h1 className="font-semibold text-sm text-white">
              {t("sidebar.name")}
            </h1>
            <p className="mt-0.5 text-white/60 text-xs">
              {t("sidebar.jobTitle")}
            </p>
          </div>
        </div>

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
