export type FrontMatter = {
  title: string;
  excerpt: string;
  categories: string[];
  date: string;
  header?: {
    teaser?: string;
  };
  id: string;
  cover?: string;
  /** 포스터나 아이콘처럼 잘리면 안 되는 그림. 지정하지 않은 사진은 자리를 꽉 채운다. */
  coverFit?: "contain";
  /** 본문 기준 예상 읽는 시간(분) */
  readingTime?: number;
  /** true면 페이지를 만들지 않고, 목록과 검색, RSS, 사이트맵에서도 뺀다. */
  hidden?: boolean;
  /**
   * 시리즈에 속한 글이면 몇 번째 편인지. 숨긴 글까지 포함해 세므로
   * 중간 편을 숨겨도 남은 글의 편 번호가 밀리지 않는다.
   */
  seriesOrder?: {
    slug: string;
    index: number;
    total: number;
  };
};

export type ParsedFrontMatter = FrontMatter;
