import { orderBy } from "es-toolkit";
import {
  getGroupIdByTag,
  isSeriesSlug,
  isSeriesTag,
} from "@/constants/categories";
import type { FrontMatter } from "@/types/post";

/** 같은 날 올린 연재(2024-09-14-1 ~ -4)는 date가 같아 폴더명 id로 순서를 정한다. */
function sortByReadingOrder(
  posts: FrontMatter[],
  order: "asc" | "desc" = "asc",
): FrontMatter[] {
  return orderBy(posts, ["date", "id"], [order, order]);
}

export type SeriesSummary = {
  slug: string;
  posts: FrontMatter[];
  startDate: string;
  endDate: string;
};

const seriesSlugOf = (post: FrontMatter) => post.categories.find(isSeriesSlug);

/** 시리즈별로 읽는 순서대로 모은다. 목록 정렬과 같은 규칙이어야 편 번호가 어긋나지 않는다. */
function groupBySeries(postList: FrontMatter[]): Map<string, FrontMatter[]> {
  const bySlug = new Map<string, FrontMatter[]>();
  for (const [slug, posts] of Map.groupBy(postList, seriesSlugOf)) {
    if (slug) bySlug.set(slug, sortByReadingOrder(posts));
  }
  return bySlug;
}

export function buildSeriesSummaries(postList: FrontMatter[]): SeriesSummary[] {
  const summaries = Array.from(groupBySeries(postList), ([slug, posts]) => ({
    slug,
    posts,
    startDate: posts[0].date,
    endDate: posts[posts.length - 1].date,
  }));
  return orderBy(summaries, ["endDate"], ["desc"]);
}

/** 숨긴 글을 포함한 목록을 넘겨야 중간 편을 숨겨도 뒤 글의 번호가 밀리지 않는다. */
export function withSeriesOrder(postList: FrontMatter[]): FrontMatter[] {
  const bySlug = groupBySeries(postList);

  return postList.map((post) => {
    const slug = seriesSlugOf(post);
    const posts = slug && bySlug.get(slug);
    if (!posts) return post;

    return {
      ...post,
      seriesOrder: { index: posts.indexOf(post) + 1, total: posts.length },
    };
  });
}

/** isSeriesTag는 프로젝트 태그도 포함한다. 여러 편짜리는 오래된 순, 나머지는 최신 순. */
export function getPostsByTag(
  postList: FrontMatter[],
  tag: string,
): FrontMatter[] {
  const matched = postList.filter((post) => post.categories.includes(tag));
  return sortByReadingOrder(matched, isSeriesTag(tag) ? "asc" : "desc");
}

export function getPostsByGroup(
  postList: FrontMatter[],
  groupId: string,
): FrontMatter[] {
  const matched = postList.filter((post) =>
    post.categories.some((tag) => getGroupIdByTag(tag) === groupId),
  );
  return sortByReadingOrder(matched, "desc");
}
