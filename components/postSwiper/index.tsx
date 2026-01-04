"use client";

import Autoplay from "embla-carousel-autoplay";
import { useLocale } from "next-intl";
import { useMemo } from "react";
import type { FrontMatter } from "@/constants/mdx";
import type { Locale } from "@/i18n/config";
import PostCard from "../postCard";
import {
  AppCarouselNext,
  AppCarouselPrevious,
} from "../ui/app-carousel-button";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

export default function PostSwiper({
  frontMatterListByLocale,
  cardNumber,
}: {
  frontMatterListByLocale: Record<Locale, FrontMatter[]>;
  cardNumber: number;
}) {
  const locale = useLocale() as Locale;
  const postInfoList =
    frontMatterListByLocale[locale] || frontMatterListByLocale.ko;

  const filteredPostInfoList = useMemo(
    () => postInfoList.slice(0, cardNumber),
    [postInfoList, cardNumber],
  );

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
      }}
      className="mx-auto rounded-xl border bg-primary/5 p-4 md:p-6 lg:p-8"
    >
      <CarouselContent>
        {filteredPostInfoList.map(
          ({ categories, date, excerpt, header, id, title }) => (
            <CarouselItem
              key={id}
              className="pl-4 md:basis-1/2 md:pl-6 lg:basis-1/3 lg:pl-8"
            >
              <PostCard
                categories={categories}
                date={date}
                excerpt={excerpt}
                header={header}
                id={id}
                title={title}
              />
            </CarouselItem>
          ),
        )}
      </CarouselContent>
      <AppCarouselPrevious />
      <AppCarouselNext />
    </Carousel>
  );
}
