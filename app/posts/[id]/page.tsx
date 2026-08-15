import type { Metadata } from "next";
import Giscus from "@/components/giscus";
import { GtmPageView } from "@/components/gtm/gtmPageView";
import { AdjacentPosts } from "@/components/post/AdjacentPosts";
import { PostContent } from "@/components/post/PostContent";
import { PostHeaderClient } from "@/components/post/PostHeaderClient";
import PostNotFound from "@/components/post/PostNotFound";
import { RelatedPosts } from "@/components/post/RelatedPosts";
import MenuBar from "@/components/postMenuBar/menu-bar";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  createAlternateLinks,
  createBlogPostStructuredData,
  defaultOpenGraph,
} from "@/components/seo/utils";
import { PATH } from "@/constants/path";
import { defaultLocale } from "@/i18n/config";
import {
  getAdjacentPostsForAllLocales,
  getAllFrontMatterListIncludingHidden,
  getPostFrontMattersByIdForAllLocales,
  isHiddenPost,
} from "@/lib/posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const hidden = isHiddenPost(id);
  const frontMatter = (await getPostFrontMattersByIdForAllLocales(id))[
    defaultLocale
  ];

  // 글을 못 찾으면 상위 레이아웃 값을 그대로 쓴다.
  if (!frontMatter) {
    return {
      alternates: createAlternateLinks(`${PATH.POSTS}/${id}`),
      robots: { index: false, follow: false },
    };
  }

  return {
    title: frontMatter.title,
    description: frontMatter.excerpt,
    alternates: createAlternateLinks(`${PATH.POSTS}/${id}`),
    openGraph: {
      // openGraph는 병합이 아니라 교체라서 공통값을 매번 펼쳐 넣어야 한다.
      ...defaultOpenGraph,
      title: frontMatter.title,
      description: frontMatter.excerpt,
      // metadataBase가 layout에 있어서 상대 경로가 절대 URL로 해석된다.
      url: `${PATH.POSTS}/${id}`,
      type: "article",
      publishedTime: frontMatter.date,
      ...(frontMatter.header?.teaser && {
        images: [frontMatter.header.teaser],
      }),
    },
    // 숨김 글은 URL로는 열리지만 검색엔진 색인에서는 제외한다.
    ...(hidden && { robots: { index: false, follow: false } }),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const frontMatters = await getPostFrontMattersByIdForAllLocales(id);

  if (!frontMatters[defaultLocale]) {
    return <PostNotFound />;
  }

  const frontMatterData = frontMatters[defaultLocale];
  const structuredData = createBlogPostStructuredData({
    id,
    title: frontMatterData.title,
    excerpt: frontMatterData.excerpt,
    date: frontMatterData.date,
    thumbnailImageUrl: frontMatterData.header?.teaser,
  });

  return (
    <section className="mx-auto w-full max-w-350 px-4">
      <GtmPageView slug={id} />
      <StructuredData jsonLd={structuredData} />
      <PostHeaderClient frontMatters={frontMatters} />
      <section className="lg:flex lg:items-baseline">
        <MenuBar />
        <section className="max-w-full">
          <PostContent postId={id} />
        </section>
      </section>
      <AdjacentPosts adjacentByLocale={getAdjacentPostsForAllLocales(id)} />
      <Giscus />
      <RelatedPosts currentId={id} categories={frontMatterData.categories} />
    </section>
  );
}

export function generateStaticParams() {
  // 숨김 글도 직접 URL로는 접근 가능해야 하므로 정적 경로는 전부 생성한다.
  const allPosts = getAllFrontMatterListIncludingHidden();
  return allPosts[defaultLocale].map(({ id }) => ({ id }));
}

export const dynamicParams = false;
