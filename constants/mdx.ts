export type FrontMatter = {
  title: string;
  excerpt: string;
  categories: string[];
  date: string;
  /** 없으면(또는 teaser가 없으면) 카테고리 그룹 기준 기본 썸네일(DefaultThumbnail)을 대신 보여준다. */
  header?: {
    teaser?: string;
    /** 기본 썸네일에 쓸 문구. 없으면 카테고리 그룹의 기본 캐치프레이즈를 쓴다. */
    thumbnailCaption?: string;
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
