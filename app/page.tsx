import PostGallery from "@/components/postGallery";
import PostSwiper from "@/components/postSwiper";
import { Badge } from "@/components/ui/badge";
import Banner from "@/components/ui/banner";
import BlockHeader from "@/components/ui/block-header";
import getFrontMatterList from "@/lib/posts";
import { useMemo } from "react";

export default function Home() {
  const totalFrontMatterList = getFrontMatterList();

  return (
    <div>
      <Banner />
      <section className="mb-2">
        <NewPostSwiperDescription
          cardNumber={10}
          totalFrontMatterList={totalFrontMatterList}
        />
      </section>
      <div className="mb-14 rounded-lg py-3">
        <PostSwiper cardNumber={10} postInfoList={totalFrontMatterList} />
      </div>
      <div>
        <BlockHeader title="모든 게시물">
          <PostGallery postInfoList={totalFrontMatterList} />
        </BlockHeader>
      </div>
    </div>
  );
}

function NewPostSwiperDescription({
  totalFrontMatterList,
  cardNumber,
}: {
  totalFrontMatterList: {
    title: string;
    excerpt: string;
    categories: string[];
    date: string;
    header: {
      teaser: string;
    };
    id: string;
  }[];
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
    <div>
      <h2 className="mb-2 text-lg font-bold md:text-xl">최신 게시물</h2>
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
