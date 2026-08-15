"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import {
  CATEGORY_GROUP_ORDER,
  type CategoryGroupId,
  getGroupIdByTag,
} from "@/constants/categories";
import type { FrontMatter } from "@/constants/mdx";
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

        return (
          <section key={id}>
            {/* 카테고리 이름만으로는 무슨 글인지 알기 어려워 설명을 함께 보여준다. */}
            <div className="px-3 pb-1.5">
              <div className="flex items-baseline gap-1.5">
                <h2 className="font-semibold text-[11px] text-sidebar-foreground/70 uppercase tracking-widest">
                  {t(`${id}.label`)}
                </h2>
                <span className="text-[10px] text-sidebar-foreground/30 tabular-nums">
                  {total}
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-sidebar-foreground/40 leading-snug">
                {t(`${id}.description`)}
              </p>
            </div>
            <SidebarGroupContent>
              {matchedCategories.map((category) => (
                <CollapsiblePostList
                  key={category}
                  category={category}
                  frontMatterList={postsByCategory[category]}
                />
              ))}
            </SidebarGroupContent>
          </section>
        );
      })}
    </SidebarGroup>
  );
}
