"use client";

import { Badge } from "../ui/badge";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

export default function PostCategorySwiper({
  categoryList,
  setValue,
  value,
}: {
  value?: string;
  setValue?: (value: string) => void;
  categoryList: { category: string; id: string }[];
}) {
  return (
    <Carousel className="mb-4 opacity-50 transition-all hover:opacity-100">
      <CarouselContent>
        {categoryList.map(({ category, id }) => (
          <CarouselItem key={id + category} className="basis-auto">
            <button
              onClick={() => setValue && setValue(category)}
              aria-label={`${category} 카테고리 선택`}
              aria-pressed={category === value}
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
    </Carousel>
  );
}
