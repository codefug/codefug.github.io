import { useMemo } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { TAG_GROUP_TO_ARRAY_MAP, type TAG_LIST } from "@/constants/categories";
import type { FrontMatter } from "@/constants/mdx";
import { CollapsiblePostList } from "./CollapsiblePostList";

export function PostGroupContent({
  frontMatterList,
}: {
  frontMatterList: FrontMatter[];
}) {
  const frontMatterListArrangedByCategories = useMemo(() => {
    const categoryCombination = new Set();
    const resultList: { [key: string]: FrontMatter[] } = {};
    frontMatterList.forEach((post) => {
      const firstCategory = post.categories[0];
      if (!categoryCombination.has(firstCategory)) {
        categoryCombination.add(firstCategory);
        resultList[firstCategory] = [];
      }
      resultList[firstCategory].push(post);
    });

    return resultList;
  }, [frontMatterList]);

  return (
    <SidebarGroup className="py-2">
      {Object.entries(TAG_GROUP_TO_ARRAY_MAP).map(([key, value]) => {
        const matchedCategories = Object.keys(
          frontMatterListArrangedByCategories,
        ).filter((category) =>
          value.includes(category as (typeof TAG_LIST)[keyof typeof TAG_LIST]),
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
                  frontMatterList={
                    frontMatterListArrangedByCategories[category]
                  }
                />
              ))}
            </SidebarGroupContent>
          </section>
        );
      })}
    </SidebarGroup>
  );
}
