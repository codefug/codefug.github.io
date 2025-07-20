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
import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, useMemo, useRef } from "react";
import { FrontMatter } from "@/constants/mdx";
import { ChevronDown } from "lucide-react";
import { POST_PATH } from "@/constants/path";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

export default function AppSidebar({
  totalFrontMatterList,
}: {
  totalFrontMatterList: FrontMatter[];
}) {
  const { toggleSidebar } = useSidebar();
  const ref = useRef<HTMLDivElement>(null);
  const frontMatterListArrangedByCategories = useMemo(() => {
    // 카테고리 조합
    const categoryCombination = new Set();
    // 결과 리스트
    const resultList: { [key: string]: FrontMatter[] } = {};
    totalFrontMatterList.forEach((post) => {
      post.categories.forEach((category) => {
        if (!categoryCombination.has(category)) {
          categoryCombination.add(category);
          resultList[category] = [];
        }
        resultList[category].push(post);
      });
    });

    return resultList;
  }, [totalFrontMatterList]);

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
        {Object.keys(frontMatterListArrangedByCategories).map((category) => (
          <CollapsiblePostList
            key={category.toString()}
            category={category}
            frontMatterList={frontMatterListArrangedByCategories[category]}
          />
        ))}
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

function CollapsiblePostList({
  frontMatterList,
  category,
}: {
  frontMatterList: FrontMatter[];
  category: string;
}) {
  return (
    <Collapsible className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel
          className="flex justify-center text-sm font-bold text-gray-400 hover:bg-accent hover:text-black hover:underline hover:drop-shadow-lg group-hover:text-black hover:dark:text-white group-hover:dark:text-white"
          asChild
        >
          <CollapsibleTrigger>
            {category}
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent className="mt-1 flex flex-col gap-1">
            {frontMatterList.map((frontMatter) => (
              <SidebarAnchorButton
                navType="a"
                href={POST_PATH + frontMatter.id}
                key={frontMatter.id}
                className="w-full text-center"
              >
                {frontMatter.title}
              </SidebarAnchorButton>
            ))}
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}

function SidebarAnchorButton({
  navType,
  className,
  ...props
}:
  | ({ navType: "a" } & Omit<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      "href"
    > & { href: string })
  | ({ navType: "link" } & AnchorHTMLAttributes<HTMLAnchorElement> &
      Omit<LinkProps, "href"> & { href: string })) {
  if (navType === "link")
    return (
      <Link
        className={cn(
          `rounded-md px-2 text-gray-400 hover:bg-accent hover:text-black hover:underline hover:drop-shadow-lg group-hover:text-black hover:dark:text-white group-hover:dark:text-white`,
          className,
        )}
        {...props}
      />
    );
  if (navType === "a")
    return (
      <a
        className={cn(
          `rounded-md px-2 text-gray-400 hover:bg-accent hover:text-black hover:underline hover:drop-shadow-lg group-hover:text-black hover:dark:text-white group-hover:dark:text-white`,
          className,
        )}
        {...props}
      >
        {props.children}
      </a>
    );

  return null;
}
