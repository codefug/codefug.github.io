"use client";

import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import type { FrontMatter } from "@/constants/mdx";
import { PATH } from "@/constants/path";
import { cn } from "@/lib/utils";
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
  const pathname = usePathname();
  // 현재 보고 있는 글이 속한 카테고리는 펼친 상태로 시작한다.
  const hasCurrentPost = frontMatterList.some((post) =>
    pathname.includes(`${PATH.POSTS}/${post.id}`),
  );

  return (
    <Collapsible defaultOpen={hasCurrentPost} className="group/collapsible">
      <SidebarGroup className="py-0">
        <SidebarGroupLabel
          className="flex cursor-pointer select-none items-center gap-1.5 rounded-md px-3 py-2 font-medium text-[11px] text-sidebar-foreground/60 uppercase tracking-wider transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
          asChild
        >
          <CollapsibleTrigger>
            <ChevronRight
              className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
              aria-hidden="true"
            />
            <span className="flex-1 text-left">{category}</span>
            <span className="text-[10px] text-sidebar-foreground/30 tabular-nums">
              {frontMatterList.length}
            </span>
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent className="mt-0.5 flex flex-col gap-0.5 pb-2">
            {frontMatterList.map((frontMatter) => {
              const isCurrent = pathname.includes(
                `${PATH.POSTS}/${frontMatter.id}`,
              );

              return (
                <SidebarAnchorButton
                  href={`${PATH.POSTS}/${frontMatter.id}`}
                  key={frontMatter.id}
                  aria-current={isCurrent ? "page" : undefined}
                  className={cn(
                    "block w-full truncate border-sidebar-border border-l-2 py-1 pl-4 text-left text-xs transition-colors",
                    isCurrent
                      ? "border-primary font-medium text-primary"
                      : "hover:border-sidebar-foreground/30",
                  )}
                >
                  {frontMatter.title}
                </SidebarAnchorButton>
              );
            })}
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
