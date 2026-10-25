import { range } from "es-toolkit";
import MiniSearch from "minisearch";
import type { FrontMatter } from "@/types/post";

/** 조사가 붙은 한글 토큰("리액트를")을 "리액트"로도 찾도록 앞 조각을 함께 넣는다. */
function tokenize(text: string): string[] {
  const words = text.split(/[\s,./·—–\-()[\]{}"'`:;!?]+/u).filter(Boolean);
  const tokens: string[] = [];

  for (const word of words) {
    tokens.push(word);
    if (/^[가-힣]{2,}$/u.test(word)) {
      tokens.push(...range(2, word.length).map((end) => word.slice(0, end)));
    }
  }
  return tokens;
}

export function createSearchIndex(
  posts: FrontMatter[],
): MiniSearch<FrontMatter> {
  const index = new MiniSearch<FrontMatter>({
    idField: "id",
    fields: ["title", "excerpt", "categories"],
    // 필드를 골라 담으면 카드가 새 필드(cover 등)를 쓸 때마다 빠뜨리므로 글 객체를 통째로 담는다.
    storeFields: ["title", "post"],
    extractField: (post, field) =>
      field === "post" ? post : post[field as keyof FrontMatter],
    tokenize,
    processTerm: (term) => term.toLowerCase(),
    searchOptions: {
      boost: { title: 3, categories: 2, excerpt: 1 },
      prefix: true,
      // 길이 비율이라 짧은 검색어는 오타 보정이 거의 걸리지 않는다.
      fuzzy: 0.2,
      combineWith: "AND",
    },
  });

  index.addAll(posts);
  return index;
}

/** 제목만 본다. 요약까지 맞추면 뜬 제목과 입력이 겹치지 않아 왜 나왔는지 알 수 없다. */
export function suggestPosts(
  index: MiniSearch<FrontMatter>,
  query: string,
  limit = 6,
): { id: string; title: string }[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  return index
    .search(trimmed, {
      fields: ["title"],
      fuzzy: false,
    })
    .slice(0, limit)
    .map((result) => ({ id: result.id, title: result.title }));
}

export function searchPosts(
  index: MiniSearch<FrontMatter>,
  query: string,
): FrontMatter[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  return index.search(trimmed).map((result) => result.post);
}
