"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";
import { NAVIGATION_ITEMS } from "@/constants/navigation";
import useOutsideClick from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import SidebarButton from "../sidebar/sidebar-button";

export function AppSidebar() {
  const { toggleSidebar, state } = useSidebar();
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    if (state === "expanded") toggleSidebar();
  });

  return (
    <Sidebar ref={ref}>
      <SidebarContent className="dark:border-r dark:border-r-gray-500">
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between pl-4 pr-0">
            <Link
              href="/"
              passHref
              className="flex items-center gap-2 hover:opacity-95 hover:drop-shadow-lg"
            >
              <Image
                src="/images/main-logo.png"
                alt="logo"
                height={0}
                width={0}
                className="h-7 w-full"
                sizes="28px"
              />
              <div className="whitespace-nowrap text-lg font-bold text-black dark:text-white">
                Codefug
              </div>
            </Link>
            <SidebarButton />
          </SidebarGroupLabel>
          <SidebarContent>
            <SidebarMenu>
              <Link
                href={NAVIGATION_ITEMS.portfolio.href}
                passHref
                className={cn(
                  `text-gray-400 hover:text-black hover:underline hover:drop-shadow-lg hover:dark:text-white`,
                )}
                onClick={toggleSidebar}
              >
                {NAVIGATION_ITEMS.portfolio.label}
              </Link>
            </SidebarMenu>
            <SidebarMenu>
              <Link
                href={NAVIGATION_ITEMS.categories.href}
                passHref
                className={cn(
                  `text-gray-400 hover:text-black hover:underline hover:drop-shadow-lg hover:dark:text-white`,
                )}
                onClick={toggleSidebar}
              >
                {NAVIGATION_ITEMS.categories.label}
              </Link>
            </SidebarMenu>
            <SidebarMenu>
              <Link
                href={NAVIGATION_ITEMS.about.href}
                passHref
                className={cn(
                  `text-gray-400 hover:text-black hover:underline hover:drop-shadow-lg hover:dark:text-white`,
                )}
                onClick={toggleSidebar}
              >
                {NAVIGATION_ITEMS.about.label}
              </Link>
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
