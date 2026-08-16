import { describe, expect, it } from "vitest";
import { findPostFolders, validateAllPosts } from "@/scripts/validatePosts.mjs";

describe("validateAllPosts", () => {
  it("저장소의 모든 글이 검증을 통과한다", () => {
    const { errors, folders } = validateAllPosts();
    expect(errors).toEqual([]);
    expect(folders.length).toBeGreaterThan(0);
  });

  it("글 폴더를 찾는다", () => {
    expect(findPostFolders().length).toBeGreaterThan(0);
  });
});
