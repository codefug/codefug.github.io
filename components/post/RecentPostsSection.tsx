import PostGallery from "@/components/postGallery";
import getFrontMatterList from "@/lib/posts";

const RECENT_COUNT = 6;

/**
 * 글을 다 읽은 뒤 다음에 읽을 것을 고르는 자리.
 * 관련 포스트는 같은 카테고리가 없으면 비는데, 최신 글은 항상 채워진다.
 */
export function RecentPostsSection({
  currentId,
  excludeIds = [],
}: {
  currentId: string;
  /** 위쪽에서 이미 보여준 글은 빼서 같은 카드가 두 번 나오지 않게 한다. */
  excludeIds?: string[];
}) {
  const skip = new Set([currentId, ...excludeIds]);
  const recent = getFrontMatterList()
    .filter((post) => !skip.has(post.id))
    .toSorted((a, b) => b.date.localeCompare(a.date))
    .slice(0, RECENT_COUNT);

  if (recent.length === 0) return null;

  return (
    <section className="not-prose mt-12">
      <h2 className="mb-6 font-bold text-xl">최신 글</h2>
      <PostGallery postInfoList={recent} />
    </section>
  );
}
