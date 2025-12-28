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
    // 카테고리 조합
    const categoryCombination = new Set();
    // 결과 리스트
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
    <SidebarGroup>
      {Object.entries(TAG_GROUP_TO_ARRAY_MAP).map(([key, value]) => {
        return (
          <section key={key}>
            <SidebarGroupLabel>{key}</SidebarGroupLabel>
            <SidebarGroupContent>
              {Object.keys(frontMatterListArrangedByCategories)
                .filter((category) =>
                  value.includes(
                    category as (typeof TAG_LIST)[keyof typeof TAG_LIST],
                  ),
                )
                .map((category) => (
                  <CollapsiblePostList
                    key={category.toString()}
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
