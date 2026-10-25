import type { Metadata } from "next";
import { createAlternateLinks } from "@/components/seo/utils";
import { SeriesDetail } from "@/components/series/series-detail";
import { requireSeriesInfo, SERIES_SLUGS } from "@/constants/categories";
import { PATH } from "@/constants/path";
import { getPostsByTag } from "@/lib/post-grouping";
import { getFrontMatterList } from "@/lib/posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const info = requireSeriesInfo(slug);

  return {
    title: info.name,
    description: info.description,
    alternates: createAlternateLinks(`${PATH.SERIES}/${slug}`),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = getPostsByTag(getFrontMatterList(), slug);

  return <SeriesDetail slug={slug} posts={posts} />;
}

export function generateStaticParams() {
  const posts = getFrontMatterList();
  return SERIES_SLUGS.filter((slug) =>
    posts.some((post) => post.categories.includes(slug)),
  ).map((slug) => ({ slug }));
}

export const dynamicParams = false;
