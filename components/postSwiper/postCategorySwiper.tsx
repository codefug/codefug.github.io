"use client";

import {
  AppCarouselNext,
  AppCarouselPrevious,
} from "../ui/app-carousel-button";
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
    <Carousel className="mb-4 px-10 opacity-50 transition-all hover:opacity-100">
      <CarouselContent>
        {categoryList.map(({ category, id }) => (
          <CarouselItem key={id + category} className="basis-auto">
            <button onClick={() => setValue && setValue(category)}>
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
  );
}
