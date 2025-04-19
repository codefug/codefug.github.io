import PostGallery from "@/components/postGallery";
import PostSwiper from "@/components/postSwiper";
import { Badge } from "@/components/ui/badge";
import Banner from "@/components/ui/banner";
import BlockHeader from "@/components/ui/block-header";
import { FrontMatter } from "@/constants/mdx";
import getFrontMatterList from "@/lib/posts";
import { Flame, Notebook } from "lucide-react";
import { useMemo } from "react";

export default function Home() {
  const totalFrontMatterList = getFrontMatterList();

  return (
    <div>
      <Banner firstPostName={totalFrontMatterList[0].id} />
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
          <PostGallery postInfoList={totalFrontMatterList} />
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
  const categoryList = useMemo(() => {
    // 카테고리 조합
    const categoryCombination = new Set();
    // 결과 리스트
    const result: { id: string; category: string }[] = [];
    // list를 돌리고
    // list안에 categoryList를 돌림
    // 조합에 있는지 확인하고 없으면 추가
    filteredPostInfoList.forEach((postInfo) =>
      postInfo.categories.forEach((category) => {
        if (!categoryCombination.has(category)) {
          categoryCombination.add(category);
          // 결과 리스트에 {id, category} 추가
          result.push({ id: postInfo.id, category });
        }
      }),
    );
    return result;
  }, [filteredPostInfoList]);

  return (
    <div className="">
      <p className="text-sm font-light text-gray-400">최근 연구했던 카테고리</p>
      <div>
        {categoryList.map(({ category, id }) => (
          <Badge variant="outline" key={id} className="mr-1">
            {category}
          </Badge>
        ))}
      </div>
    </div>
  );
}
