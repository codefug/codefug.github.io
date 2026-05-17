"use client";

import { ChevronDown } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import type { FrontMatter } from "@/constants/mdx";
import { PATH } from "@/constants/path";
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
      <SidebarGroup className="py-0">
        <SidebarGroupLabel
          className="flex cursor-pointer select-none items-center justify-between rounded-md px-3 py-2 font-medium text-[11px] text-sidebar-foreground/50 uppercase tracking-wider transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
          asChild
        >
          <CollapsibleTrigger>
            {category}
            <ChevronDown className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent className="mt-0.5 flex flex-col gap-0.5 pb-2">
            {frontMatterList.map((frontMatter) => (
              <SidebarAnchorButton
                href={`${PATH.POSTS}/${frontMatter.id}`}
                key={frontMatter.id}
                className="block w-full truncate pl-3 text-left text-xs"
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
