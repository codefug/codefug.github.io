"use client";

import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import type { FrontMatter } from "@/constants/mdx";
import type { Locale } from "@/i18n/config";
import getCategorySetListWithPostList from "@/util/post";
import { Badge } from "../ui/badge";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import PostGallery from ".";

export default function PostCategoryGallery({
  frontMatterListByLocale,
}: {
  frontMatterListByLocale: Record<Locale, FrontMatter[]>;
}) {
  const t = useTranslations("common");
  const locale = useLocale() as Locale;
  const totalFrontMatterList =
    frontMatterListByLocale[locale] || frontMatterListByLocale.ko;
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
      <h2 className="mb-2 font-light text-gray-600 text-sm">
        {t("category.list")}
      </h2>
      <Carousel className="mb-4 opacity-50 transition-all hover:opacity-100">
        <CarouselContent>
          <CarouselItem className="basis-auto">
            <button
              onClick={() => {
                setValue("");
              }}
              aria-label={t("aria.allCategorySelect")}
              aria-pressed={value === ""}
            >
              <Badge
                className="h-8 text-sm dark:text-white"
                variant={value === "" ? "default" : "outline"}
              >
                {t("category.all")}({totalFrontMatterList.length})
              </Badge>
            </button>
          </CarouselItem>
          {categoryList.map(({ category, id, total }) => (
            <CarouselItem key={id + category} className="basis-auto">
              <button
                onClick={() => {
                  setValue(category);
                }}
                aria-label={t("aria.categorySelect", {
                  category,
                  count: total,
                })}
                aria-pressed={value === category}
              >
                <Badge
                  className="h-8 text-sm dark:text-white"
                  variant={category === value ? "default" : "outline"}
                >
                  {category}({total})
                </Badge>
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <PostGallery postInfoList={filteredFrontMatterList} />
    </div>
  );
}
