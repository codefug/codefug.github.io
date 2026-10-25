import { sumBy } from "es-toolkit";
import type { SeriesSummary } from "@/lib/post-grouping";
import SeriesCard from "./series-card";

export function SeriesList({ seriesList }: { seriesList: SeriesSummary[] }) {
  const totalPosts = sumBy(seriesList, (series) => series.posts.length);

  return (
    <div className="mx-auto w-full max-w-350 px-4 py-8">
      <header className="mb-8">
        <h1 className="mb-2 font-bold text-2xl md:text-3xl">시리즈</h1>
        <p className="text-muted-foreground">
          하나의 주제를 여러 편에 걸쳐 기록했습니다. 순서대로 읽으면 흐름이
          이어집니다.
        </p>
        <p className="mt-2 text-muted-foreground/60 text-sm">
          {seriesList.length} · {totalPosts}편
        </p>
      </header>

      <div className="flex flex-col gap-3">
        {seriesList.map((series) => (
          <SeriesCard key={series.slug} {...series} />
        ))}
      </div>
    </div>
  );
}
