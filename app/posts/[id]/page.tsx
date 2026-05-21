import type { Metadata } from "next";
import Giscus from "@/components/giscus";
import { GtmPageView } from "@/components/gtm/gtmPageView";
import { PostContent } from "@/components/post/PostContent";
import { PostHeaderClient } from "@/components/post/PostHeaderClient";
import PostNotFound from "@/components/post/PostNotFound";
import { RelatedPosts } from "@/components/post/RelatedPosts";
import MenuBar from "@/components/postMenuBar/menu-bar";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  createAlternateLinks,
  createBlogPostStructuredData,
} from "@/components/seo/utils";
import { PATH } from "@/constants/path";
import { defaultLocale } from "@/i18n/config";
import {
  getFrontMatterListForAllLocales,
  getPostFrontMattersByIdForAllLocales,
} from "@/lib/posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    alternates: createAlternateLinks(`${PATH.POSTS}/${id}`),
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
      <Giscus />
      <RelatedPosts currentId={id} categories={frontMatterData.categories} />
    </section>
  );
}

export function generateStaticParams() {
  const allPosts = getFrontMatterListForAllLocales();
  return allPosts[defaultLocale].map(({ id }) => ({ id }));
}

export const dynamicParams = false;
