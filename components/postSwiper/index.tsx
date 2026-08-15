"use client";

import Autoplay from "embla-carousel-autoplay";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { FrontMatter } from "@/constants/mdx";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import {
  AppCarouselNext,
  AppCarouselPrevious,
} from "../ui/app-carousel-button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import PostBannerCard from "./post-banner-card";

export default function PostSwiper({
  frontMatterListByLocale,
  cardNumber,
}: {
  frontMatterListByLocale: Record<Locale, FrontMatter[]>;
  cardNumber: number;
}) {
  const t = useTranslations("common.aria");
  const locale = useLocale() as Locale;
  const postInfoList =
    frontMatterListByLocale[locale] || frontMatterListByLocale.ko;

  const filteredPostInfoList = useMemo(
    () => postInfoList.slice(0, cardNumber),
    [postInfoList, cardNumber],
  );

  const { api, setApi, selectedIndex, scrollTo } = useCarouselIndicator();

  return (
    <Carousel
      setApi={setApi}
      plugins={[Autoplay({ delay: 6000, stopOnInteraction: true })]}
      opts={{ align: "start", loop: true }}
      className="relative"
    >
      <CarouselContent className="ml-0">
        {filteredPostInfoList.map((postInfo) => (
          // 배너는 한 번에 한 장만 보이므로 basis를 나누지 않는다.
          <CarouselItem key={postInfo.id} className="pl-0">
            <PostBannerCard {...postInfo} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <AppCarouselPrevious />
      <AppCarouselNext />
      {api && (
        <div className="mt-3 flex justify-center gap-1.5">
          {filteredPostInfoList.map((postInfo, index) => (
            <button
              key={postInfo.id}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={t("goToSlide", { index: index + 1 })}
              aria-current={index === selectedIndex}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 hover:cursor-pointer",
                index === selectedIndex
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50",
              )}
            />
          ))}
        </div>
      )}
    </Carousel>
  );
}

function useCarouselIndicator() {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);

  return { api, setApi, selectedIndex, scrollTo };
}
