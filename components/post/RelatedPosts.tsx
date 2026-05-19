import PostCard from "@/components/postCard";
import { getRelatedPosts } from "@/lib/posts";

type Props = {
  currentId: string;
  categories: string[];
};

export function RelatedPosts({ currentId, categories }: Props) {
  const related = getRelatedPosts(currentId, categories);
  if (related.length === 0) return null;

  return (
    <section className="not-prose mt-12">
      <h2 className="mb-6 font-bold text-xl">관련 포스트</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
}
