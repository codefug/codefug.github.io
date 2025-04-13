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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ScrollArea } from "./scroll-area";

export default function AppSidebar() {
  const { toggleSidebar } = useSidebar();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Sidebar ref={ref}>
      <ScrollArea className="h-full w-full overflow-y-auto">
        <SidebarContent className="group relative">
          <Image
            src="/images/sidebar-profile-background.jpg"
            alt="Profile Background"
            width={300}
            height={150}
            className="absolute h-[150px] w-full object-cover"
          />
          <SidebarGroup>
            <SidebarGroupLabel className="flex justify-center px-4 text-sm font-bold text-white">
              About Me
            </SidebarGroupLabel>
            <SidebarGroupContent className="flex min-h-full flex-col items-center px-2">
              <Avatar className="h-52 w-52">
                <AvatarImage src="/images/me.jpg" />
                <AvatarFallback className="group-hover:text-black group-hover:dark:text-white">
                  Codefug
                </AvatarFallback>
              </Avatar>
              <h1 className="mt-4 text-center text-lg font-bold text-gray-400 group-hover:text-black dark:text-gray-500 group-hover:dark:text-white">
                Codefug
              </h1>
              <p className="text-sm text-gray-400 group-hover:text-black dark:text-gray-500 group-hover:dark:text-white">
                Web Frontend Developer
              </p>
            </SidebarGroupContent>
          </SidebarGroup>
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
        <SidebarFooter />
      </ScrollArea>
    </Sidebar>
  );
}
