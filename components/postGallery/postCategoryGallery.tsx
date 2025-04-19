"use client";

import { FrontMatter } from "@/constants/mdx";
import { useMemo, useState } from "react";
import getCategorySetListWithPostList from "@/util/post";
import PostGallery from ".";
import { Badge } from "../ui/badge";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import {
  AppCarouselNext,
  AppCarouselPrevious,
} from "../ui/app-carousel-button";

export default function PostCategoryGallery({
  totalFrontMatterList,
}: {
  totalFrontMatterList: FrontMatter[];
}) {
  const [value, setValue] = useState("");
  const filteredFrontMatterList = useMemo(() => {
    if (value === "") return totalFrontMatterList;

    return totalFrontMatterList.filter((v) =>
      v.categories.some((v) => v === value),
    );
  }, [value, totalFrontMatterList]);
  const categoryList = useMemo(
    () => getCategorySetListWithPostList({ postList: totalFrontMatterList }),
    [totalFrontMatterList],
  );

  return (
    <div>
      {/* TODO: 색깔 바꾸고 swiper로 변경 이거만 끝내면 홈라우트 끝, 포스트 쪽만 살펴보자 */}
      <h2 className="mb-2 text-sm font-light text-gray-400">태그 목록</h2>
      <Carousel className="mb-4 px-10">
        <CarouselContent>
          {categoryList.map(({ category, id }) => (
            <CarouselItem key={id + category} className="basis-auto">
              <button
                onClick={() => {
                  setValue(category);
                }}
              >
                <Badge
                  className="h-8 text-sm"
                  variant={category === value ? "default" : "outline"}
                >
                  {category}
                </Badge>
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <AppCarouselPrevious />
        <AppCarouselNext />
      </Carousel>
      <PostGallery postInfoList={filteredFrontMatterList} />
    </div>
  );
}
