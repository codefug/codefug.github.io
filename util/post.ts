import {
  CATEGORY_GROUP_ORDER,
  type CategoryGroupId,
  getGroupIdByTag,
  isSeriesTag,
  SERIES_GROUP_ID,
} from "@/constants/categories";
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

export type CategorySection = {
  groupId: CategoryGroupId;
  posts: FrontMatter[];
  /** 이 그룹 안에 실제로 존재하는 태그 (섹션 내 필터 칩으로 쓴다) */
  tags: { tag: string; total: number }[];
};

/**
 * 홈에서 세로로 쌓을 카테고리 섹션 목록.
 * 글이 하나도 없는 그룹은 섹션 자체를 만들지 않는다.
 */
export function buildCategorySections(
  postList: FrontMatter[],
): CategorySection[] {
  const byGroup = new Map<CategoryGroupId, FrontMatter[]>();

  for (const post of postList) {
    // 한 글이 여러 그룹에 걸칠 수 있으므로 그룹 기준으로 중복 없이 담는다.
    const groupIds = new Set(post.categories.map(getGroupIdByTag));
    for (const groupId of groupIds) {
      const bucket = byGroup.get(groupId);
      if (bucket) bucket.push(post);
      else byGroup.set(groupId, [post]);
    }
  }

  return CATEGORY_GROUP_ORDER.flatMap((groupId) => {
    const posts = byGroup.get(groupId);
    if (!posts?.length) return [];

    return [
      {
        groupId,
        posts: sortPostsForGroup(posts, groupId),
        tags: countTagsInGroup(posts, groupId),
      },
    ];
  });
}

/**
 * 시리즈는 1편부터 읽는 게 자연스러우므로 오래된 순, 그 외에는 최신 순.
 */
function sortPostsForGroup(
  posts: FrontMatter[],
  groupId: CategoryGroupId,
): FrontMatter[] {
  if (groupId !== SERIES_GROUP_ID) return posts;
  return posts.toSorted(compareByReadingOrder);
}

function countTagsInGroup(
  posts: FrontMatter[],
  groupId: CategoryGroupId,
): { tag: string; total: number }[] {
  const counts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.categories) {
      if (getGroupIdByTag(tag) !== groupId) continue;
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(counts, ([tag, total]) => ({ tag, total })).sort(
    (a, b) => b.total - a.total,
  );
}

export { isSeriesTag };
