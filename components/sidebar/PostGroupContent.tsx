import { useTranslations } from "next-intl";
import { useMemo } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
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
    <SidebarGroup className="py-2">
      {CATEGORY_GROUP_ORDER.map((id: CategoryGroupId) => {
        // 어느 그룹에도 속하지 않는 태그는 fallback 그룹으로 모여 누락되지 않는다.
        const matchedCategories = Object.keys(postsByCategory).filter(
          (category) => getGroupIdByTag(category) === id,
        );

        if (matchedCategories.length === 0) return null;

        return (
          <section key={id}>
            <SidebarGroupLabel className="px-3 py-1 font-semibold text-[10px] text-sidebar-foreground/30 uppercase tracking-widest">
              {t(`${id}.label`)}
            </SidebarGroupLabel>
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
