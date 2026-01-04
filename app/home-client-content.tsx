"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import PostCategorySwiper from "@/components/postSwiper/postCategorySwiper";
import type { FrontMatter } from "@/constants/mdx";
import getCategorySetListWithPostList from "@/util/post";

export function HomeClientContent({
  totalFrontMatterList,
  cardNumber,
}: {
  totalFrontMatterList: FrontMatter[];
  cardNumber: number;
}) {
  const t = useTranslations("home");
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
