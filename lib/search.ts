import MiniSearch from "minisearch";
import type { FrontMatter } from "@/constants/mdx";

/**
 * 검색 대상 필드와 가중치.
 * 제목이 맞으면 거의 찾던 글이므로 가장 높게 둔다.
 */
const FIELDS = ["title", "excerpt", "categories"] as const;
const BOOST = { title: 3, categories: 2, excerpt: 1 };

/**
 * 한국어는 공백으로 끊어도 조사가 붙어 남는다("리액트를", "훅으로").
 * 그래서 공백·기호로 자른 뒤, 2글자 이상 한글 토큰은 앞에서부터 자른
 * 조각도 함께 넣어 "리액트"로 "리액트를"을 찾을 수 있게 한다.
 */
function tokenize(text: string): string[] {
  const words = text.split(/[\s,./·—–\-()[\]{}"'`:;!?]+/u).filter(Boolean);
  const tokens: string[] = [];

  for (const word of words) {
    tokens.push(word);
    if (/^[가-힣]{2,}$/u.test(word)) {
      // "리액트를" → "리액", "리액트", "리액트를"
      for (let end = 2; end < word.length; end += 1) {
        tokens.push(word.slice(0, end));
      }
    }
  }
  return tokens;
}

export type SearchDoc = FrontMatter & { id: string };

export function createSearchIndex(posts: FrontMatter[]): MiniSearch<SearchDoc> {
  const index = new MiniSearch<SearchDoc>({
    idField: "id",
    fields: [...FIELDS],
    // 결과에서 글 정보를 그대로 쓰기 위해 원본을 들고 있는다.
    storeFields: [
      "id",
      "title",
      "excerpt",
      "categories",
      "date",
      "readingTime",
      "header",
    ],
    tokenize,
    processTerm: (term) => term.toLowerCase(),
    searchOptions: {
      boost: BOOST,
      prefix: true,
      // 오타를 어느 정도 허용한다. 짧은 검색어까지 흐려지지 않게 비율로 준다.
      fuzzy: 0.2,
      combineWith: "AND",
    },
  });

  index.addAll(posts as SearchDoc[]);
  return index;
}

export type Suggestion = { id: string; title: string };

/**
 * 입력 중에 보여줄 자동완성 목록.
 *
 * 확정 검색과 달리 **제목만** 본다. 요약이나 카테고리까지 맞춰버리면
 * 목록에 뜬 제목과 입력한 말이 겹치지 않아 왜 나왔는지 알 수 없다.
 * 오타 보정(fuzzy)도 끄고, 앞글자 일치만 남긴다.
 */
export function suggestPosts(
  index: MiniSearch<SearchDoc>,
  query: string,
  limit = 6,
): Suggestion[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  return index
    .search(trimmed, {
      fields: ["title"],
      prefix: true,
      fuzzy: false,
      combineWith: "AND",
    })
    .slice(0, limit)
    .map((result) => ({ id: result.id as string, title: result.title }));
}

/** 검색 결과를 글 목록으로 되돌린다. (점수 순서를 유지한다) */
export function searchPosts(
  index: MiniSearch<SearchDoc>,
  query: string,
): FrontMatter[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  return index.search(trimmed).map((result) => ({
    id: result.id as string,
    title: result.title,
    excerpt: result.excerpt,
    categories: result.categories,
    date: result.date,
    readingTime: result.readingTime,
    header: result.header,
  }));
}
