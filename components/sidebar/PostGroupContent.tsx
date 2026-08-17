"use client";

import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import {
  CATEGORY_GROUP_ORDER,
  type CategoryGroupId,
  getGroupIdByTag,
} from "@/constants/categories";
import type { FrontMatter } from "@/constants/mdx";
import { PATH } from "@/constants/path";
import { useTranslations } from "@/lib/messages";
import { CollapsiblePostList } from "./CollapsiblePostList";

function groupPostsByFirstCategory(
  posts: FrontMatter[],
): Record<string, FrontMatter[]> {
  return posts.reduce<Record<string, FrontMatter[]>>((acc, post) => {
    const category = post.categories[0];
    if (!acc[category]) acc[category] = [];
    acc[category].push(post);
    return acc;
  }, {});
}

export function PostGroupContent({
  frontMatterList,
}: {
  frontMatterList: FrontMatter[];
}) {
  const t = useTranslations("categories");
  const pathname = usePathname();
  const postsByCategory = useMemo(
    () => groupPostsByFirstCategory(frontMatterList),
    [frontMatterList],
  );

  return (
    <SidebarGroup className="gap-4 py-2">
      {CATEGORY_GROUP_ORDER.map((id: CategoryGroupId) => {
        // 어느 그룹에도 속하지 않는 태그는 fallback 그룹으로 모여 누락되지 않는다.
        const matchedCategories = Object.keys(postsByCategory).filter(
          (category) => getGroupIdByTag(category) === id,
        );

        if (matchedCategories.length === 0) return null;

        const total = matchedCategories.reduce(
          (sum, category) => sum + postsByCategory[category].length,
          0,
        );

        // 그룹이 많아 전부 펼치면 목록이 길어진다. 접어두되,
        // 지금 보고 있는 글이 속한 그룹만 펼친 채로 시작한다.
        const hasCurrentPost = matchedCategories.some((category) =>
          postsByCategory[category].some((post) =>
            pathname.includes(`${PATH.POSTS}/${post.id}`),
          ),
        );

        return (
          <Collapsible
            key={id}
            defaultOpen={hasCurrentPost}
            className="group/group"
            asChild
          >
            <section>
              {/* 카테고리 이름만으로는 무슨 글인지 알기 어려워 설명을 함께 보여준다. */}
              <CollapsibleTrigger className="w-full cursor-pointer select-none rounded-md px-3 py-1.5 text-left transition-colors hover:bg-sidebar-accent">
                <div className="flex items-baseline gap-1.5">
                  <ChevronRight
                    className="h-3.5 w-3.5 shrink-0 self-center text-sidebar-foreground/50 transition-transform duration-200 group-data-[state=open]/group:rotate-90"
                    aria-hidden="true"
                  />
                  <h2 className="font-semibold text-[11px] text-sidebar-foreground/70 uppercase tracking-widest">
                    {t(`${id}.label`)}
                  </h2>
                  <span className="text-[10px] text-sidebar-foreground/30 tabular-nums">
                    {total}
                  </span>
                </div>
                <p className="mt-0.5 pl-5 text-[11px] text-sidebar-foreground/40 leading-snug">
                  {t(`${id}.description`)}
                </p>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  {matchedCategories.map((category) => (
                    <CollapsiblePostList
                      key={category}
                      category={category}
                      frontMatterList={postsByCategory[category]}
                    />
                  ))}
                </SidebarGroupContent>
              </CollapsibleContent>
            </section>
          </Collapsible>
        );
      })}
    </SidebarGroup>
  );
}
