"use client";

import { PATH } from "@/constants/path";
import { useTranslations } from "@/lib/messages";
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
        <div className="flex-1">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-bold text-gray-900 text-lg md:text-xl dark:text-gray-100">
              {t("title")}
              <span className="ml-2 font-normal text-muted-foreground text-sm">
                {seriesList.length}
              </span>
            </h2>
            <a
              href={PATH.SERIES}
              className="shrink-0 text-muted-foreground text-sm transition-colors hover:text-primary"
            >
              {t("viewAll")}
            </a>
          </div>
          <p className="mt-0.5 text-muted-foreground text-sm">
            {t("description")}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {seriesList.map((series) => (
          <SeriesCard key={series.slug} {...series} />
        ))}
      </div>
    </section>
  );
}
