"use client";

import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import PostCategorySwiper from "@/components/postSwiper/postCategorySwiper";
import type { FrontMatter } from "@/constants/mdx";
import type { Locale } from "@/i18n/config";
import getCategorySetListWithPostList from "@/util/post";

export function HomeClientContent({
  frontMatterListByLocale,
  cardNumber,
}: {
  frontMatterListByLocale: Record<Locale, FrontMatter[]>;
  cardNumber: number;
}) {
  const t = useTranslations("home");
  const locale = useLocale() as Locale;
  const totalFrontMatterList =
    frontMatterListByLocale[locale] || frontMatterListByLocale.ko;
  const filteredPostInfoList = useMemo(
    () => totalFrontMatterList.slice(0, cardNumber),
    [totalFrontMatterList, cardNumber],
  );
  const categoryList = useMemo(
    () => getCategorySetListWithPostList({ postList: filteredPostInfoList }),
    [filteredPostInfoList],
  );

  return (
    <div>
      <p className="font-light text-gray-600 text-sm">
        {t("recentCategories")}
      </p>
      <PostCategorySwiper categoryList={categoryList} />
    </div>
  );
}
