import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createAlternateLinks } from "@/components/seo/utils";
import { SeriesList } from "@/components/series/series-list";
import { PATH } from "@/constants/path";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import { getFrontMatterListForAllLocales } from "@/lib/posts";
import { buildSeriesSummaries, type SeriesSummary } from "@/util/post";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("series");

  return {
    title: t("title"),
    description: t("description"),
    alternates: createAlternateLinks(PATH.SERIES),
  };
}

export default function Page() {
  const frontMatterListByLocale = getFrontMatterListForAllLocales();

  const seriesByLocale = {} as Record<Locale, SeriesSummary[]>;
  for (const locale of locales) {
    seriesByLocale[locale] = buildSeriesSummaries(
      frontMatterListByLocale[locale],
    );
  }

  return <SeriesList seriesByLocale={seriesByLocale} />;
}
