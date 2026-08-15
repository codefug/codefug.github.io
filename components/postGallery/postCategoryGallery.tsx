"use client";

import { useLocale } from "next-intl";
import { useMemo } from "react";
import SeriesSection from "@/components/series/series-section";
import type { FrontMatter } from "@/constants/mdx";
import type { Locale } from "@/i18n/config";
import { buildSeriesSummaries } from "@/util/post";
import { RecentPosts } from "./recent-posts";

/**
 * 홈 본문.
 *
 * 예전에는 카테고리 그룹마다 섹션을 세로로 쌓았지만, 글이 25편 규모에서는
 * 섹션 하나가 1~2편짜리 토막이 되어 오히려 비어 보였다. 카테고리 탐색은
 * /posts와 사이드바가 담당하므로, 홈은 "무엇을 만들었고 최근에 무엇을 썼는지"만 보여준다.
 */
export default function PostCategoryGallery({
  frontMatterListByLocale,
}: {
  frontMatterListByLocale: Record<Locale, FrontMatter[]>;
}) {
  const locale = useLocale() as Locale;
  const totalFrontMatterList =
    frontMatterListByLocale[locale] || frontMatterListByLocale.ko;

  const seriesList = useMemo(
    () => buildSeriesSummaries(totalFrontMatterList),
    [totalFrontMatterList],
  );

  return (
    <div>
      <SeriesSection seriesList={seriesList} />
      <RecentPosts frontMatterListByLocale={frontMatterListByLocale} />
    </div>
  );
}
