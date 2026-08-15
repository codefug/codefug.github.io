import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createAlternateLinks } from "@/components/seo/utils";
import { SeriesDetail } from "@/components/series/series-detail";
import { SERIES_SLUGS } from "@/constants/categories";
import { PATH } from "@/constants/path";
import { defaultLocale, type Locale, locales } from "@/i18n/config";
import { getFrontMatterListForAllLocales } from "@/lib/posts";
import { getSeriesPosts } from "@/util/post";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTranslations("series");

  return {
    title: t(`${slug}.name`),
    description: t(`${slug}.description`),
    alternates: createAlternateLinks(`${PATH.SERIES}/${slug}`),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const frontMatterListByLocale = getFrontMatterListForAllLocales();

  const postsByLocale = {} as Record<Locale, ReturnType<typeof getSeriesPosts>>;
  for (const locale of locales) {
    postsByLocale[locale] = getSeriesPosts(
      frontMatterListByLocale[locale],
      slug,
    );
  }

  return <SeriesDetail slug={slug} postsByLocale={postsByLocale} />;
}

export function generateStaticParams() {
  const posts = getFrontMatterListForAllLocales()[defaultLocale];
  // 글이 한 편도 없는 시리즈는 페이지를 만들지 않는다.
  return SERIES_SLUGS.filter((slug) =>
    posts.some((post) => post.categories.includes(slug)),
  ).map((slug) => ({ slug }));
}

export const dynamicParams = false;
