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
  /** 분 단위 */
  readingTime?: number;
  /** true면 홈의 대표 글에 세운다. */
  featured?: boolean;
  /** true면 페이지를 만들지 않고, 목록과 검색, RSS, 사이트맵에서도 뺀다. */
  hidden?: boolean;
  /** 숨긴 글까지 세므로 중간 편을 숨겨도 남은 글의 편 번호가 밀리지 않는다. */
  seriesOrder?: {
    index: number;
    total: number;
  };
};
