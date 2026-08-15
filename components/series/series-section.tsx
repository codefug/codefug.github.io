"use client";

import { useTranslations } from "next-intl";
import type { SeriesSummary } from "@/util/post";
import SeriesCard from "./series-card";

/**
 * 홈의 시리즈 섹션. 글 하나하나가 아니라 시리즈 단위로 보여준다.
 */
export default function SeriesSection({
  seriesList,
}: {
  seriesList: SeriesSummary[];
}) {
  const t = useTranslations("series");

  if (seriesList.length === 0) return null;

  return (
    <section className="mb-14">
      <div className="mb-4 flex items-start gap-2.5">
        <span
          className="mt-1 h-5 w-1 shrink-0 rounded-full bg-primary"
          aria-hidden="true"
        />
        <div>
          <h2 className="font-bold text-gray-900 text-lg md:text-xl dark:text-gray-100">
            {t("title")}
            <span className="ml-2 font-normal text-muted-foreground text-sm">
              {seriesList.length}
            </span>
          </h2>
          <p className="mt-0.5 text-muted-foreground text-sm">
            {t("description")}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {seriesList.map((series) => (
          <SeriesCard key={series.slug} {...series} />
        ))}
      </div>
    </section>
  );
}
