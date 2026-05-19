import { useMemo } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { TAG_GROUP_TO_ARRAY_MAP, type TAG_LIST } from "@/constants/categories";
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
  const postsByCategory = useMemo(
    () => groupPostsByFirstCategory(frontMatterList),
    [frontMatterList],
  );

  return (
    <SidebarGroup className="py-2">
      {Object.entries(TAG_GROUP_TO_ARRAY_MAP).map(([key, value]) => {
        const matchedCategories = Object.keys(postsByCategory).filter(
          (category) =>
            value.includes(
              category as (typeof TAG_LIST)[keyof typeof TAG_LIST],
            ),
        );

        if (matchedCategories.length === 0) return null;

        return (
          <section key={key}>
            <SidebarGroupLabel className="px-3 py-1 font-semibold text-[10px] text-sidebar-foreground/30 uppercase tracking-widest">
              {key}
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
