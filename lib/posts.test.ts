import { describe, expect, it } from "vitest";
import {
  getAdjacentPosts,
  getAllFrontMatterListIncludingHidden,
  getFrontMatterList,
  isHiddenPost,
} from "@/lib/posts";

// 실제 markdown/ 폴더를 읽는다. React cache() 메모이제이션이
// 테스트 파일 안에서 유지되므로 목록은 한 번만 읽힌다.
describe("getFrontMatterList", () => {
  it("hidden 글을 목록에서 제외한다", () => {
    const visible = getFrontMatterList();
    const all = getAllFrontMatterListIncludingHidden();
    expect(all.length).toBeGreaterThanOrEqual(visible.length);
    expect(visible.every((p) => !p.hidden)).toBe(true);
  });

  it("모든 글에 필수 메타데이터가 있다", () => {
    for (const p of getFrontMatterList()) {
      expect(p.id).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Array.isArray(p.categories)).toBe(true);
    }
  });
});

describe("isHiddenPost", () => {
  it("hidden 플래그와 일치한다", () => {
    const all = getAllFrontMatterListIncludingHidden();
    for (const p of all) {
      expect(isHiddenPost(p.id)).toBe(Boolean(p.hidden));
    }
  });
});

describe("getAdjacentPosts", () => {
  it("최신 글의 next는 없고, 이웃은 hidden이 아니다", () => {
    const list = getFrontMatterList();
    const newest = [...list].sort((a, b) => b.date.localeCompare(a.date))[0];
    const { previous, next } = getAdjacentPosts(newest.id);
    expect(next).toBeNull();
    if (previous) expect(previous.hidden).toBeFalsy();
  });
});
