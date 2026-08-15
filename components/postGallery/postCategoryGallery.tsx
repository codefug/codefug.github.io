"use client";

import { useLocale } from "next-intl";
import { useMemo } from "react";
import type { FrontMatter } from "@/constants/mdx";
import type { Locale } from "@/i18n/config";
import { buildCategorySections } from "@/util/post";
import CategorySection from "./category-section";

export default function PostCategoryGallery({
  frontMatterListByLocale,
}: {
  frontMatterListByLocale: Record<Locale, FrontMatter[]>;
}) {
  const locale = useLocale() as Locale;
  const totalFrontMatterList =
    frontMatterListByLocale[locale] || frontMatterListByLocale.ko;

  const sections = useMemo(
    () => buildCategorySections(totalFrontMatterList),
    [totalFrontMatterList],
  );

  return (
    <div>
      {sections.map(({ groupId, posts, tags }) => (
        <CategorySection
          key={groupId}
          groupId={groupId}
          posts={posts}
          tags={tags}
        />
      ))}
    </div>
  );
}
