import type { Metadata } from "next";
import { createAlternateLinks } from "@/components/seo/utils";
import { SeriesList } from "@/components/series/series-list";
import { PATH } from "@/constants/path";
import { getTranslations } from "@/lib/messages";
import { getFrontMatterList } from "@/lib/posts";
import { buildSeriesSummaries } from "@/util/post";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("series");

  return {
    title: t("title"),
    description: t("description"),
    alternates: createAlternateLinks(PATH.SERIES),
  };
}

export default function Page() {
  const seriesList = buildSeriesSummaries(getFrontMatterList());

  return <SeriesList seriesList={seriesList} />;
}
