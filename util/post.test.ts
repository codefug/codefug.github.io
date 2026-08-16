import { describe, expect, it } from "vitest";
import type { FrontMatter } from "@/constants/mdx";
import buildCategoryStats, {
  buildSeriesSummaries,
  getSeriesPosts,
} from "@/util/post";

function post(overrides: Partial<FrontMatter> & { id: string }): FrontMatter {
  return {
    title: overrides.id,
    excerpt: "",
    categories: [],
    date: "2024-01-01",
    header: { teaser: "" },
    ...overrides,
  };
}

describe("buildCategoryStats", () => {
  it("태그별 글 수를 센다", () => {
    const stats = buildCategoryStats({
      postList: [
        post({ id: "a", categories: ["react", "javascript"] }),
        post({ id: "b", categories: ["react"] }),
      ],
    });
    expect(stats).toContainEqual(
      expect.objectContaining({ category: "react", total: 2 }),
    );
    expect(stats).toContainEqual(
      expect.objectContaining({ category: "javascript", total: 1 }),
    );
  });
});

describe("buildSeriesSummaries", () => {
  // 시리즈 태그는 constants/categories.ts의 실제 그룹 정의를 따른다.
  const SERIES_TAG = "kkom-kkom";

  it("같은 날짜의 글은 id로 순서를 정한다", () => {
    const summaries = buildSeriesSummaries([
      post({
        id: "2024-09-14-2",
        date: "2024-09-14",
        categories: [SERIES_TAG],
      }),
      post({
        id: "2024-09-14-1",
        date: "2024-09-14",
        categories: [SERIES_TAG],
      }),
    ]);
    expect(summaries).toHaveLength(1);
    expect(summaries[0].posts.map((p) => p.id)).toEqual([
      "2024-09-14-1",
      "2024-09-14-2",
    ]);
    expect(summaries[0].startDate).toBe("2024-09-14");
  });

  it("시리즈 태그가 아닌 글은 묶지 않는다", () => {
    const summaries = buildSeriesSummaries([
      post({ id: "a", categories: ["react"] }),
    ]);
    expect(summaries).toHaveLength(0);
  });
});

describe("getSeriesPosts", () => {
  it("해당 슬러그의 글만 오래된 순으로 돌려준다", () => {
    const posts = getSeriesPosts(
      [
        post({ id: "late", date: "2024-02-01", categories: ["s"] }),
        post({ id: "early", date: "2024-01-01", categories: ["s"] }),
        post({ id: "other", date: "2024-01-15", categories: ["t"] }),
      ],
      "s",
    );
    expect(posts.map((p) => p.id)).toEqual(["early", "late"]);
  });
});
