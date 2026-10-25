import PostCard from "@/components/post-card/post-card";
import type { FrontMatter } from "@/types/post";

/** 글 하단의 "관련 포스트", "최신 글"처럼 제목과 카드 격자로 된 섹션. 글이 없으면 그리지 않는다. */
export function PostCardSection({
  title,
  posts,
}: {
  title: string;
  posts: FrontMatter[];
}) {
  if (posts.length === 0) return null;

  return (
    <section className="not-prose mt-12">
      <h2 className="mb-6 font-bold text-xl">{title}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
