import { describe, expect, it } from "vitest";
import { todayInSeoul, validateAllPosts } from "@/scripts/validatePosts.mjs";

describe("todayInSeoul", () => {
  it("YYYY-MM-DD 형식이라 date 문자열과 사전순 비교가 가능하다", () => {
    const today = todayInSeoul();
    expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect("2099-01-01" > today).toBe(true);
    expect("2000-01-01" < today).toBe(true);
  });
});

describe("미래 날짜 검증", () => {
  it("저장소의 어떤 글도 미래 날짜가 아니다", () => {
    const { errors } = validateAllPosts();
    expect(errors.filter((e: string) => e.includes("미래"))).toEqual([]);
  });
});
