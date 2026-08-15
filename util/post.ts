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
  return posts.toSorted((a, b) => a.date.localeCompare(b.date));
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
