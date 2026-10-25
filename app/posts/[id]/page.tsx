import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GtmPageView } from "@/components/gtm/gtm-page-view";
import { AdjacentPosts } from "@/components/post/adjacent-posts";
import { PostCardSection } from "@/components/post/post-card-section";
import { PostContent } from "@/components/post/post-content";
import { PostHeader } from "@/components/post/post-header";
import TableOfContents from "@/components/post/table-of-contents";
import { StructuredData } from "@/components/seo/structured-data";
import {
  createAlternateLinks,
  createBlogPostStructuredData,
  defaultOpenGraph,
} from "@/components/seo/utils";
import { PATH } from "@/constants/path";
import {
  getAdjacentPosts,
  getFrontMatterList,
  getPostFrontMattersById,
  getRecentPosts,
  getRelatedPosts,
} from "@/lib/posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const frontMatter = getPostFrontMattersById(id);

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
      ...defaultOpenGraph,
      title: frontMatter.title,
      description: frontMatter.excerpt,
      // metadataBase가 layout에 있어서 상대 경로가 절대 URL로 해석된다.
      url: `${PATH.POSTS}/${id}`,
      type: "article",
      publishedTime: frontMatter.date,
      // 이미지를 빼면 공유 미리보기가 비므로 사이트 기본 OG 이미지로 채운다.
      images: [frontMatter.header?.teaser ?? "/opengraph-image.png"],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const frontMatterData = getPostFrontMattersById(id);
  if (!frontMatterData) notFound();

  const structuredData = createBlogPostStructuredData({
    id,
    title: frontMatterData.title,
    excerpt: frontMatterData.excerpt,
    date: frontMatterData.date,
    thumbnailImageUrl: frontMatterData.header?.teaser,
  });

  // 관련 포스트와 최신 글이 같은 글을 중복해서 보여주지 않도록 관련 포스트를 먼저 구해 뺀다.
  const related = getRelatedPosts(frontMatterData);
  const recent = getRecentPosts([id, ...related.map((post) => post.id)]);

  return (
    <section className="mx-auto w-full max-w-350 px-4">
      <GtmPageView slug={id} />
      <StructuredData jsonLd={structuredData} />
      <PostHeader frontMatter={frontMatterData} />
      {/* 목차는 버튼으로 열고 닫는 오버레이라 본문 폭을 차지하지 않는다. */}
      <section className="min-w-0 max-w-full">
        <PostContent postId={id} />
      </section>
      <TableOfContents />
      <AdjacentPosts adjacent={getAdjacentPosts(id)} />
      <PostCardSection title="관련 포스트" posts={related} />
      <PostCardSection title="최신 글" posts={recent} />
    </section>
  );
}

export function generateStaticParams() {
  // 숨긴 글은 페이지 자체를 만들지 않는다. 목록에서만 빼면 주소로는 계속 열린다.
  return getFrontMatterList().map(({ id }) => ({ id }));
}

export const dynamicParams = false;
