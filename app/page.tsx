"use client";

import { Flame, Notebook } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import PostCategoryGallery from "@/components/postGallery/postCategoryGallery";
import PostSwiper from "@/components/postSwiper";
import PostCategorySwiper from "@/components/postSwiper/postCategorySwiper";
import { StructuredData } from "@/components/seo/StructuredData";
import { createWebSiteStructuredData } from "@/components/seo/utils";
import BlockHeader from "@/components/ui/block-header";
import type { FrontMatter } from "@/constants/mdx";
import getFrontMatterList from "@/lib/posts";
import getCategorySetListWithPostList from "@/util/post";

export default function Home() {
  const t = useTranslations("home");
  const totalFrontMatterList = getFrontMatterList();

  return (
    <div>
      <StructuredData jsonLd={createWebSiteStructuredData()} />
      <section className="mb-2">
        <BlockHeader
          title={
            <span className="flex gap-1">
              {t("recentPosts")}
              <Flame className="text-red-500" />
            </span>
          }
        >
          <RecentCategoryList
            cardNumber={10}
            totalFrontMatterList={totalFrontMatterList}
          />
        </BlockHeader>
      </section>
      <div className="mb-14 rounded-lg py-3">
        <PostSwiper cardNumber={10} postInfoList={totalFrontMatterList} />
      </div>
      <div>
        <BlockHeader
          title={
            <span className="flex gap-1">
              {t("allPosts")} <Notebook className="text-green-400" />
            </span>
          }
        >
          <PostCategoryGallery totalFrontMatterList={totalFrontMatterList} />
        </BlockHeader>
      </div>
    </div>
  );
}

function RecentCategoryList({
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
