import Link from "next/link";
import { PATH } from "@/constants/path";
import type { SeriesSummary } from "@/lib/post-grouping";
import SeriesCard from "./series-card";

export default function SeriesSection({
  seriesList,
}: {
  seriesList: SeriesSummary[];
}) {
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
            <h2 className="font-bold text-foreground text-lg md:text-xl">
              시리즈
              <span className="ml-2 font-normal text-muted-foreground text-sm">
                {seriesList.length}
              </span>
            </h2>
            <Link
              href={PATH.SERIES}
              className="shrink-0 text-muted-foreground text-sm transition-colors hover:text-primary"
            >
              전체보기 →
            </Link>
          </div>
          <p className="mt-0.5 text-muted-foreground text-sm">
            하나의 주제를 여러 편에 걸쳐 기록했습니다. 순서대로 읽으면 흐름이
            이어집니다.
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
