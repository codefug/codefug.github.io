import PostCategoryGallery from "@/components/postGallery/postCategoryGallery";
import PostSwiper from "@/components/postSwiper";
import PostCategorySwiper from "@/components/postSwiper/postCategorySwiper";
import { StructuredData } from "@/components/seo/StructuredData";
import { createWebSiteStructuredData } from "@/components/seo/utils";
import BlockHeader from "@/components/ui/block-header";
import { FrontMatter } from "@/constants/mdx";
import getFrontMatterList from "@/lib/posts";
import getCategorySetListWithPostList from "@/util/post";
import { Flame, Notebook } from "lucide-react";
import { useMemo } from "react";

export default function Home() {
  const totalFrontMatterList = getFrontMatterList();

  return (
    <div>
      <StructuredData jsonLd={createWebSiteStructuredData()} />
      <section className="mb-2">
        <BlockHeader
          title={
            <span className="flex gap-1">
              최신 게시물
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
              모든 게시물 <Notebook className="text-green-400" />
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
      <p className="text-sm font-light text-gray-600">최근 연구했던 카테고리</p>
      <PostCategorySwiper categoryList={categoryList} />
    </div>
  );
}
