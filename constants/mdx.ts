export type FrontMatter = {
  title: string;
  excerpt: string;
  categories: string[];
  date: string;
  header: {
    teaser: string;
  };
  id: string;
  /** 본문 기준 예상 읽는 시간(분) */
  readingTime?: number;
  /**
   * true인 글은 목록·검색·RSS·사이트맵 어디에도 노출되지 않는다.
   * 다만 직접 URL로는 접근 가능하며(기존 링크 보존), 검색엔진에는 noindex로 표시된다.
   */
  hidden?: boolean;
};

export type ParsedFrontMatter = FrontMatter;
