import { describe, expect, it } from "vitest";
import type { FrontMatter } from "@/constants/mdx";
import buildCategoryStats, {
  buildSeriesSummaries,
  getSeriesPosts,
  withSeriesOrder,
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
  // 시리즈 목록에 세우는 태그는 categories.ts의 series 그룹만이다.
  // 프로젝트 태그(kkom-kkom 등)는 여러 편이어도 시리즈로 묶지 않는다.
  const SERIES_TAG = "async-js";

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

  it("프로젝트 태그는 여러 편이어도 시리즈로 묶지 않는다", () => {
    const summaries = buildSeriesSummaries([
      post({ id: "2024-09-14-1", categories: ["kkom-kkom"] }),
      post({ id: "2024-09-14-2", categories: ["kkom-kkom"] }),
    ]);
    expect(summaries).toHaveLength(0);
  });
});

describe("withSeriesOrder", () => {
  const seriesPosts = () => [
    post({ id: "2024-11-10", date: "2024-11-10", categories: ["async-js"] }),
    post({ id: "2024-11-10-2", date: "2024-11-10", categories: ["async-js"] }),
    post({ id: "2024-11-10-3", date: "2024-11-10", categories: ["async-js"] }),
  ];

  it("읽는 순서대로 1부터 편 번호를 심는다", () => {
    const result = withSeriesOrder(seriesPosts());
    expect(result.map((p) => p.seriesOrder?.index)).toEqual([1, 2, 3]);
    expect(result[0].seriesOrder).toEqual({
      slug: "async-js",
      index: 1,
      total: 3,
    });
  });

  it("목록 순서가 최신순이어도 편 번호는 오래된 순으로 센다", () => {
    const result = withSeriesOrder(seriesPosts().toReversed());
    expect(result.map((p) => [p.id, p.seriesOrder?.index])).toEqual([
      ["2024-11-10-3", 3],
      ["2024-11-10-2", 2],
      ["2024-11-10", 1],
    ]);
  });

  it("시리즈에 속하지 않은 글은 그대로 둔다", () => {
    const [only] = withSeriesOrder([post({ id: "a", categories: ["react"] })]);
    expect(only.seriesOrder).toBeUndefined();
  });

  it("숨긴 글도 편 수에 넣어 남은 글의 번호가 밀리지 않는다", () => {
    const result = withSeriesOrder([
      ...seriesPosts(),
      post({
        id: "2024-11-10-4",
        date: "2024-11-10",
        categories: ["async-js"],
        hidden: true,
      }),
    ]);
    // 숨긴 4편을 빼도 앞 세 편의 번호와 전체 편수는 그대로다.
    const visible = result.filter((p) => !p.hidden);
    expect(visible.map((p) => p.seriesOrder?.index)).toEqual([1, 2, 3]);
    expect(visible.every((p) => p.seriesOrder?.total === 4)).toBe(true);
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
