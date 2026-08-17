import type { Metadata } from "next";
import { GtmPageView } from "@/components/gtm/gtmPageView";
import { AdjacentPosts } from "@/components/post/AdjacentPosts";
import { PostContent } from "@/components/post/PostContent";
import { PostHeaderContent } from "@/components/post/PostHeaderContent";
import PostNotFound from "@/components/post/PostNotFound";
import { RecentPostsSection } from "@/components/post/RecentPostsSection";
import { RelatedPosts } from "@/components/post/RelatedPosts";
import MenuBar from "@/components/postMenuBar/menu-bar";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  createAlternateLinks,
  createBlogPostStructuredData,
  defaultOpenGraph,
} from "@/components/seo/utils";
import { PATH } from "@/constants/path";
import {
  getAdjacentPosts,
  getAllFrontMatterListIncludingHidden,
  getPostFrontMattersById,
  getRelatedPosts,
  isHiddenPost,
} from "@/lib/posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const hidden = isHiddenPost(id);
  const frontMatter = await getPostFrontMattersById(id).catch(() => null);

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
  const frontMatterData = await getPostFrontMattersById(id).catch(() => null);

  if (!frontMatterData) {
    return <PostNotFound />;
  }

  const structuredData = createBlogPostStructuredData({
    id,
    title: frontMatterData.title,
    excerpt: frontMatterData.excerpt,
    date: frontMatterData.date,
    thumbnailImageUrl: frontMatterData.header?.teaser,
  });

  // 아래 두 섹션이 같은 글을 중복해서 보여주지 않도록 한 번만 구한다.
  const related = getRelatedPosts(id, frontMatterData.categories);

  return (
    <section className="mx-auto w-full max-w-350 px-4">
      <GtmPageView slug={id} />
      <StructuredData jsonLd={structuredData} />
      <PostHeaderContent frontMatter={frontMatterData} />
      {/*
        목차는 넓은 화면에서만 본문 옆에 붙는다. (MenuBar 주석 참고)
        본문이 목차 때문에 좁아지지 않도록, 목차 자리는 화면이 충분히 넓어질 때만
        내주고 본문은 읽기 좋은 폭(65ch 안팎)을 유지한다.
      */}
      <section className="xl:flex xl:items-start xl:justify-center xl:gap-12">
        <section className="min-w-0 max-w-full flex-1 xl:max-w-4xl">
          <PostContent postId={id} />
        </section>
        <MenuBar />
      </section>
      <AdjacentPosts adjacent={getAdjacentPosts(id)} />
      <RelatedPosts related={related} />
      <RecentPostsSection
        currentId={id}
        excludeIds={related.map((post) => post.id)}
      />
    </section>
  );
}

export function generateStaticParams() {
  // 숨김 글도 직접 URL로는 접근 가능해야 하므로 정적 경로는 전부 생성한다.
  const allPosts = getAllFrontMatterListIncludingHidden();
  return allPosts.map(({ id }) => ({ id }));
}

export const dynamicParams = false;
