import { isSeriesTag } from "@/constants/categories";
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

/**
 * 시리즈는 1편부터 읽는 순서가 중요한데, 같은 날 올린 글이 여러 편이면
 * (2024-09-14-1 ~ -4) date만으로는 순서가 정해지지 않는다.
 * 폴더명(id)에 편 번호가 들어 있으므로 id를 tie-breaker로 쓴다.
 */
function compareByReadingOrder(a: FrontMatter, b: FrontMatter): number {
  return a.date.localeCompare(b.date) || a.id.localeCompare(b.id);
}

export type SeriesSummary = {
  slug: string;
  posts: FrontMatter[];
  /** 시리즈가 시작된 날짜와 마지막 글 날짜 */
  startDate: string;
  endDate: string;
};

/**
 * 시리즈 태그별로 글을 묶는다. 각 시리즈는 1편부터 읽도록 오래된 순으로 정렬한다.
 */
export function buildSeriesSummaries(postList: FrontMatter[]): SeriesSummary[] {
  const bySeries = new Map<string, FrontMatter[]>();

  for (const post of postList) {
    for (const tag of post.categories) {
      if (!isSeriesTag(tag)) continue;
      const bucket = bySeries.get(tag);
      if (bucket) bucket.push(post);
      else bySeries.set(tag, [post]);
    }
  }

  return Array.from(bySeries, ([slug, posts]) => {
    const ordered = posts.toSorted(compareByReadingOrder);
    return {
      slug,
      posts: ordered,
      startDate: ordered[0].date,
      endDate: ordered[ordered.length - 1].date,
    };
    // 최근에 진행한 시리즈가 위로 오게 한다.
  }).sort((a, b) => b.endDate.localeCompare(a.endDate));
}

export function getSeriesPosts(
  postList: FrontMatter[],
  slug: string,
): FrontMatter[] {
  return postList
    .filter((post) => post.categories.includes(slug))
    .toSorted(compareByReadingOrder);
}

/**
 * 태그 하나에 속한 글. 여러 편으로 이어지는 태그(시리즈·프로젝트)는
 * 1편부터 읽도록 오래된 순, 그 외에는 최신 순으로 돌려준다.
 */
export function getPostsByTag(
  postList: FrontMatter[],
  tag: string,
): FrontMatter[] {
  const matched = postList.filter((post) => post.categories.includes(tag));
  if (isSeriesTag(tag)) return matched.toSorted(compareByReadingOrder);
  return matched.toSorted((a, b) => compareByReadingOrder(b, a));
}
