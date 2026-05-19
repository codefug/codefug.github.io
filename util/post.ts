import type { FrontMatter } from "@/constants/mdx";

export default function buildCategoryStats({
  postList,
}: {
  postList: FrontMatter[];
}): { id: string; category: string; total: number }[] {
  const categoryMap = new Map<
    string,
    { id: string; category: string; total: number }
  >();

  postList.forEach((post) => {
    post.categories.forEach((category) => {
      const existing = categoryMap.get(category);
      if (!existing) {
        categoryMap.set(category, { id: post.id, category, total: 1 });
      } else {
        existing.total += 1;
      }
    });
  });

  return Array.from(categoryMap.values());
}
