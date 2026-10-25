import type { Metadata } from "next";
import { createAlternateLinks } from "@/components/seo/utils";
import { SeriesList } from "@/components/series/series-list";
import { PATH } from "@/constants/path";
import { buildSeriesSummaries } from "@/lib/post-grouping";
import { getFrontMatterList } from "@/lib/posts";

export function generateMetadata(): Metadata {
  return {
    title: "시리즈",
    description:
      "하나의 주제를 여러 편에 걸쳐 기록했습니다. 순서대로 읽으면 흐름이 이어집니다.",
    alternates: createAlternateLinks(PATH.SERIES),
  };
}

export default function Page() {
  const seriesList = buildSeriesSummaries(getFrontMatterList());

  return <SeriesList seriesList={seriesList} />;
}
