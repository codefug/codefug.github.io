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
import { useRef } from "react";
import { FrontMatter } from "@/constants/mdx";
import { SidebarAnchorButton } from "./SidebarAnchorButton";
import { PostGroupContent } from "./PostGroupContent";

export default function AppSidebar({
  totalFrontMatterList,
}: {
  totalFrontMatterList: FrontMatter[];
}) {
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
          <SidebarGroupLabel className="mb-2 mt-4 flex justify-center px-4 text-sm font-bold text-gray-400 group-hover:text-white">
            Codefug
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex min-h-full flex-col items-center px-2">
            <Avatar className="h-40 w-40">
              <AvatarImage src="/images/me.jpg" alt="이승현 프로필 사진" />
              <AvatarFallback className="group-hover:text-black group-hover:dark:text-white">
                이승현
              </AvatarFallback>
            </Avatar>
            <h1 className="mt-4 text-center text-lg font-bold text-gray-400 group-hover:text-black dark:text-gray-500 group-hover:dark:text-white">
              이승현
            </h1>
            <p className="text-sm text-gray-400 group-hover:text-black dark:text-gray-500 group-hover:dark:text-white">
              Web Frontend Developer
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
                    {item.label === "Portfolio" ? (
                      <SidebarAnchorButton
                        navType="a"
                        href="https://www.figma.com/proto/KSWARGDkXi9Wt8ARq2uGCa/leeseounghyun-resume?node-id=401-2&node-type=canvas&t=z2H9bL74afXrrgPS-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1"
                        target="_blank"
                        key={item.label}
                      >
                        {item.label}
                      </SidebarAnchorButton>
                    ) : (
                      <SidebarAnchorButton
                        navType="link"
                        href={item.href}
                        passHref
                        onClick={toggleSidebar}
                      >
                        {item.label}
                      </SidebarAnchorButton>
                    )}
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
