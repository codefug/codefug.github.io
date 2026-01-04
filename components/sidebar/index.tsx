"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRef } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Sidebar ref={ref}>
      <SidebarContent
        className="group relative gap-0"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="absolute h-[150px] w-full bg-primary" />
        <SidebarGroup>
          <SidebarGroupLabel className="mt-4 mb-2 flex justify-center px-4 font-bold text-gray-400 text-sm group-hover:text-white">
            Codefug
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex min-h-full flex-col items-center px-2">
            <Avatar className="h-40 w-40">
              <AvatarImage src="/images/me.jpg" alt={t("sidebar.profileAlt")} />
              <AvatarFallback className="group-hover:text-black group-hover:dark:text-white">
                {t("sidebar.name")}
              </AvatarFallback>
            </Avatar>
            <h1 className="mt-4 text-center font-bold text-gray-400 text-lg group-hover:text-black dark:text-gray-500 group-hover:dark:text-white">
              {t("sidebar.name")}
            </h1>
            <p className="text-gray-400 text-sm group-hover:text-black dark:text-gray-500 group-hover:dark:text-white">
              {t("sidebar.jobTitle")}
            </p>
          </SidebarGroupContent>
        </SidebarGroup>
        <PostGroupContent frontMatterList={totalFrontMatterList} />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAVIGATION_ITEMS.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <SidebarAnchorButton
                      href={item.href}
                      key={item.label}
                      target={item.target}
                      onClick={
                        item.target === "_blank" ? undefined : toggleSidebar
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
