"use client";

import { useTranslations } from "@/lib/messages";
import type { SeriesSummary } from "@/util/post";
import SeriesCard from "./series-card";

export function SeriesList({ seriesList }: { seriesList: SeriesSummary[] }) {
  const t = useTranslations("series");

  const totalPosts = seriesList.reduce(
    (sum, series) => sum + series.posts.length,
    0,
  );

  return (
    <div className="mx-auto w-full max-w-350 px-4 py-8">
      <header className="mb-8">
        <h1 className="mb-2 font-bold text-2xl md:text-3xl">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
        <p className="mt-2 text-muted-foreground/60 text-sm">
          {seriesList.length} · {t("postCount", { count: totalPosts })}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {seriesList.map((series) => (
          <SeriesCard key={series.slug} {...series} />
        ))}
      </div>
    </div>
  );
}
