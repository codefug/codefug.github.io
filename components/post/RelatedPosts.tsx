import PostGallery from "@/components/postGallery";
import type { FrontMatter } from "@/constants/mdx";

type Props = {
  /** 최신 글 섹션과 중복을 피하려고 목록은 호출부에서 넘겨받는다. */
  related: FrontMatter[];
};

export function RelatedPosts({ related }: Props) {
  if (related.length === 0) return null;

  return (
    <section className="not-prose mt-12">
      <h2 className="mb-6 font-bold text-xl">관련 포스트</h2>
      <PostGallery postInfoList={related} />
    </section>
  );
}
