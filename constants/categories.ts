export const TAG_LIST = {
  JAVASCRIPT: "javascript",
  TYPESCRIPT: "typescript",
  KKOM_KKOM: "kkom-kkom",
  GHEUPPAY: "gheuppay",
  REACTDEEPDIVE: "reactdeepdive",
  REACT: "react",
  WEB: "web",
  NEXTJS: "nextjs",
  FANDOMK: "fandomk",
  ELECTRON: "electron",
  RETROSPECTIVE: "retrospective",
} as const;

export type Tag = (typeof TAG_LIST)[keyof typeof TAG_LIST];

/**
 * 홈에서 세로로 쌓이는 섹션의 단위이자, 내비게이션이 설명하는 대상.
 * `order`가 홈 화면에서의 노출 순서를 결정한다.
 */
export type CategoryGroupId =
  | "retrospective"
  | "series"
  | "framework"
  | "language"
  | "dev"
  | "etc";

export type CategoryGroup = {
  id: CategoryGroupId;
  /** 이 그룹에 속하는 태그 목록 */
  tags: Tag[];
  order: number;
};

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: "retrospective",
    tags: [TAG_LIST.RETROSPECTIVE],
    order: 0,
  },
  {
    id: "series",
    tags: [TAG_LIST.FANDOMK, TAG_LIST.GHEUPPAY, TAG_LIST.KKOM_KKOM],
    order: 1,
  },
  {
    id: "framework",
    tags: [
      TAG_LIST.REACT,
      TAG_LIST.NEXTJS,
      TAG_LIST.ELECTRON,
      TAG_LIST.REACTDEEPDIVE,
    ],
    order: 2,
  },
  {
    id: "language",
    tags: [TAG_LIST.TYPESCRIPT, TAG_LIST.JAVASCRIPT],
    order: 3,
  },
  {
    id: "dev",
    tags: [TAG_LIST.WEB],
    order: 4,
  },
];

/** 어느 그룹에도 속하지 않는 태그가 모이는 fallback 그룹 */
export const FALLBACK_GROUP_ID: CategoryGroupId = "etc";

/**
 * 시리즈 그룹에 속한 태그는 "하나의 프로젝트를 여러 편으로 나눠 쓴 글"이므로,
 * 목록에서 오래된 순(1편 → 마지막 편)으로 읽는 편이 자연스럽다.
 */
export const SERIES_GROUP_ID: CategoryGroupId = "series";

export const SERIES_TAGS: readonly Tag[] =
  CATEGORY_GROUPS.find((group) => group.id === SERIES_GROUP_ID)?.tags ?? [];

export function isSeriesTag(tag: string): boolean {
  return SERIES_TAGS.includes(tag as Tag);
}

/**
 * 시리즈 태그는 그대로 노출하기엔 식별이 어려워(kkom-kkom 등),
 * 표시용 이름과 설명을 i18n 키로 연결한다. (messages의 series.<slug>)
 */
export const SERIES_SLUGS = SERIES_TAGS;

export function isValidSeriesSlug(slug: string): slug is Tag {
  return isSeriesTag(slug);
}

const TAG_TO_GROUP_ID = new Map<string, CategoryGroupId>(
  CATEGORY_GROUPS.flatMap((group) =>
    group.tags.map((tag) => [tag as string, group.id] as const),
  ),
);

export function getGroupIdByTag(tag: string): CategoryGroupId {
  return TAG_TO_GROUP_ID.get(tag) ?? FALLBACK_GROUP_ID;
}

/** 홈 섹션 노출 순서 (fallback 그룹은 항상 마지막) */
export const CATEGORY_GROUP_ORDER: CategoryGroupId[] = [
  ...CATEGORY_GROUPS.toSorted((a, b) => a.order - b.order).map(
    (group) => group.id,
  ),
  FALLBACK_GROUP_ID,
];

/** 사이드바가 사용하는 기존 형태 (그룹명 → 태그 배열) */
export const TAG_GROUP_TO_ARRAY_MAP: Record<string, Tag[]> = Object.fromEntries(
  CATEGORY_GROUPS.map((group) => [group.id, group.tags]),
);
