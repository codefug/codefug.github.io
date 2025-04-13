"use client";

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
import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function AppSidebar() {
  const { toggleSidebar } = useSidebar();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Sidebar ref={ref}>
      <SidebarContent className="dark:border-r dark:border-r-gray-500">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-4 flex items-center justify-between pl-4 pr-0">
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
          </SidebarGroupLabel>
          <SidebarContent className="group min-h-full px-2">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {NAVIGATION_ITEMS.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.href}
                          passHref
                          className={cn(
                            `rounded-md px-2 text-gray-400 transition duration-500 ease-in-out hover:bg-accent hover:text-black hover:underline hover:drop-shadow-lg group-hover:text-black hover:dark:text-white group-hover:dark:text-white`,
                          )}
                          onClick={toggleSidebar}
                        >
                          {item.label}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
