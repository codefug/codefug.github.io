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
  getFrontMatterList,
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
      // teaser가 없는 글은 목록에서 기본 썸네일로 채우지만, 공유 카드에는
      // 그 그래픽을 쓸 수 없다. 이미지를 아예 빼면 미리보기가 비므로
      // 사이트 기본 OG 이미지로 대체한다.
      images: [frontMatter.header?.teaser ?? "/opengraph-image.png"],
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
      {/* 목차는 버튼으로 열고 닫는 오버레이라 본문 폭을 차지하지 않는다. */}
      <section className="min-w-0 max-w-full">
        <PostContent postId={id} />
      </section>
      <MenuBar />
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
  /*
    숨긴 글은 페이지 자체를 만들지 않는다.
    목록에서만 빼면 주소를 아는 사람은 계속 읽을 수 있어서,
    "내리기로 한 글"이 사실상 발행 상태로 남는다.
  */
  return getFrontMatterList().map(({ id }) => ({ id }));
}

export const dynamicParams = false;
