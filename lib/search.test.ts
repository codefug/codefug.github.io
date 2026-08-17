import { describe, expect, it } from "vitest";
import type { FrontMatter } from "@/constants/mdx";
import { createSearchIndex, searchPosts, suggestPosts } from "@/lib/search";

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

const POSTS: FrontMatter[] = [
  post({
    id: "a",
    title: "useSearchParams는 왜 Suspense가 필요할까",
    excerpt: "프리렌더 중 BailoutToCSRError가 흐르는 경로를 따라갑니다.",
    categories: ["nextjs"],
  }),
  post({
    id: "b",
    title: "자바스크립트에서 비동기 통신은 뭘까",
    excerpt: "이벤트 루프와 마이크로태스크를 정리했습니다.",
    categories: ["async-js", "javascript"],
  }),
  post({
    id: "c",
    title: "구조화된 데이터는 왜 필요할까",
    excerpt: "검색엔진이 페이지를 이해하도록 돕는 방법입니다.",
    categories: ["web"],
  }),
];

const index = createSearchIndex(POSTS);

describe("searchPosts", () => {
  it("빈 검색어에는 결과를 주지 않는다", () => {
    expect(searchPosts(index, "")).toEqual([]);
    expect(searchPosts(index, "   ")).toEqual([]);
  });

  it("제목으로 찾는다", () => {
    const ids = searchPosts(index, "Suspense").map((p) => p.id);
    expect(ids).toContain("a");
  });

  it("요약에 있는 말로도 찾는다", () => {
    const ids = searchPosts(index, "이벤트 루프").map((p) => p.id);
    expect(ids).toContain("b");
  });

  it("카테고리로도 찾는다", () => {
    const ids = searchPosts(index, "nextjs").map((p) => p.id);
    expect(ids).toContain("a");
  });

  it("조사가 붙은 한국어도 앞부분으로 찾는다", () => {
    // "비동기 통신은" 에서 "비동기"만 입력해도 걸려야 한다
    const ids = searchPosts(index, "비동기").map((p) => p.id);
    expect(ids).toContain("b");
  });

  it("대소문자를 가리지 않는다", () => {
    expect(searchPosts(index, "suspense").map((p) => p.id)).toContain("a");
  });

  it("정규식 특수문자가 들어와도 터지지 않는다", () => {
    // 예전 구현은 사용자 입력을 정규식으로 컴파일해서 깨질 수 있었다
    expect(() => searchPosts(index, "([")).not.toThrow();
    expect(() => searchPosts(index, "*")).not.toThrow();
  });

  it("제목이 맞은 글이 요약만 맞은 글보다 먼저 온다", () => {
    const results = searchPosts(index, "구조화된");
    expect(results[0]?.id).toBe("c");
  });

  it("결과에 카드 렌더링에 필요한 필드가 담겨 있다", () => {
    const [first] = searchPosts(index, "Suspense");
    expect(first.title).toBeTruthy();
    expect(first.date).toBeTruthy();
    expect(Array.isArray(first.categories)).toBe(true);
  });
});

describe("suggestPosts", () => {
  it("빈 검색어에는 제안하지 않는다", () => {
    expect(suggestPosts(index, "")).toEqual([]);
  });

  it("제목만 담아서 돌려준다", () => {
    const [first] = suggestPosts(index, "Suspense");
    expect(first).toEqual({
      id: "a",
      title: "useSearchParams는 왜 Suspense가 필요할까",
    });
  });

  it("limit보다 많이 주지 않는다", () => {
    expect(suggestPosts(index, "왜", 2).length).toBeLessThanOrEqual(2);
  });

  it("제안 제목으로 다시 검색하면 그 글이 나온다", () => {
    // 자동완성에서 고른 항목을 그대로 확정 검색에 넘기는 흐름
    const [first] = suggestPosts(index, "비동기");
    expect(searchPosts(index, first.title).map((p) => p.id)).toContain(
      first.id,
    );
  });
});
