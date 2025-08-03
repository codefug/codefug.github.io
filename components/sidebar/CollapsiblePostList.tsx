"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

import { FrontMatter } from "@/constants/mdx";
import { PATH } from "@/constants/path";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { SidebarAnchorButton } from "./SidebarAnchorButton";

export function CollapsiblePostList({
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
                href={PATH.POSTS + frontMatter.id}
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
