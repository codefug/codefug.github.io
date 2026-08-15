"use client";

import { useLocale } from "next-intl";
import { useMemo } from "react";
import SeriesSection from "@/components/series/series-section";
import { SERIES_GROUP_ID } from "@/constants/categories";
import type { FrontMatter } from "@/constants/mdx";
import type { Locale } from "@/i18n/config";
import { buildCategorySections, buildSeriesSummaries } from "@/util/post";
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

  const seriesList = useMemo(
    () => buildSeriesSummaries(totalFrontMatterList),
    [totalFrontMatterList],
  );

  return (
    <div>
      {sections.map(({ groupId, posts, tags }) =>
        // 시리즈는 글 단위가 아니라 시리즈 카드 단위로 보여준다.
        groupId === SERIES_GROUP_ID ? (
          <SeriesSection key={groupId} seriesList={seriesList} />
        ) : (
          <CategorySection
            key={groupId}
            groupId={groupId}
            posts={posts}
            tags={tags}
          />
        ),
      )}
    </div>
  );
}
