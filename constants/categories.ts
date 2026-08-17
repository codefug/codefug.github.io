export const TAG_LIST = {
  JAVASCRIPT: "javascript",
  TYPESCRIPT: "typescript",
  ASYNC_JS: "async-js",
  KKOM_KKOM: "kkom-kkom",
  GHEUPPAY: "gheuppay",
  REACT: "react",
  WEB: "web",
  NEXTJS: "nextjs",
  FANDOMK: "fandomk",
  ELECTRON: "electron",
  CLAUDE_PET: "claude-pet",
  REINDEER_LETTER: "reindeer-letter",
  RETROSPECTIVE: "retrospective",
  REVIEW: "review",
  ESSAY: "essay",
} as const;

export type Tag = (typeof TAG_LIST)[keyof typeof TAG_LIST];

/**
 * 태그를 담는 가장 작은 묶음. 사이드바에서 접히는 단위다.
 * `label`·`description`은 messages의 `categories.<id>`에서 가져온다.
 */
export type CategoryGroupId =
  | "toyProject"
  | "workProject"
  | "series"
  | "framework"
  | "language"
  | "webDev"
  | "retrospective"
  | "review"
  | "essay"
  | "etc";

/**
 * 그룹을 다시 묶는 대분류. 사이드바·홈에서 최상위 섹션이 되고,
 * 그 안의 그룹이 하위 토글로 들어간다.
 */
export type CategorySectionId = "project" | "series" | "dev" | "notes" | "etc";

export type CategoryGroup = {
  id: CategoryGroupId;
  /** 이 그룹에 속하는 태그 목록 */
  tags: Tag[];
};

export type CategorySection = {
  id: CategorySectionId;
  groups: CategoryGroup[];
  /** 홈·사이드바에서의 노출 순서 */
  order: number;
};

/**
 * 대분류 → 그룹 → 태그의 3단 구조.
 * 태그를 옮기려면 이 트리만 고치면 사이드바·홈·전체 글 목록이 모두 따라온다.
 */
export const CATEGORY_SECTIONS: CategorySection[] = [
  {
    id: "project",
    order: 1,
    groups: [
      {
        id: "toyProject",
        tags: [
          TAG_LIST.CLAUDE_PET,
          TAG_LIST.REINDEER_LETTER,
          TAG_LIST.FANDOMK,
          TAG_LIST.GHEUPPAY,
          TAG_LIST.KKOM_KKOM,
        ],
      },
      { id: "workProject", tags: [] },
    ],
  },
  {
    id: "series",
    order: 2,
    groups: [{ id: "series", tags: [TAG_LIST.ASYNC_JS] }],
  },
  {
    id: "dev",
    order: 3,
    groups: [
      {
        id: "framework",
        tags: [TAG_LIST.REACT, TAG_LIST.NEXTJS, TAG_LIST.ELECTRON],
      },
      { id: "language", tags: [TAG_LIST.TYPESCRIPT, TAG_LIST.JAVASCRIPT] },
      { id: "webDev", tags: [TAG_LIST.WEB] },
    ],
  },
  {
    id: "notes",
    order: 4,
    groups: [
      { id: "essay", tags: [TAG_LIST.ESSAY] },
      { id: "retrospective", tags: [TAG_LIST.RETROSPECTIVE] },
      { id: "review", tags: [TAG_LIST.REVIEW] },
    ],
  },
];

/** 어느 그룹에도 속하지 않는 태그가 모이는 fallback */
export const FALLBACK_GROUP_ID: CategoryGroupId = "etc";
export const FALLBACK_SECTION_ID: CategorySectionId = "etc";

/** 평탄화한 그룹 목록. 트리를 순회할 필요가 없는 곳에서 쓴다. */
export const CATEGORY_GROUPS: CategoryGroup[] = CATEGORY_SECTIONS.flatMap(
  (section) => section.groups,
);

/**
 * 여러 편으로 이어지는 글이 모이는 그룹들.
 * 이 태그의 글은 목록에서 오래된 순(1편 → 마지막 편)으로 읽는 편이 자연스럽다.
 */
const ORDERED_GROUP_IDS: CategoryGroupId[] = [
  "series",
  "toyProject",
  "workProject",
];

export const SERIES_GROUP_ID: CategoryGroupId = "series";

export const SERIES_TAGS: readonly Tag[] = CATEGORY_GROUPS.filter((group) =>
  ORDERED_GROUP_IDS.includes(group.id),
).flatMap((group) => group.tags);

export function isSeriesTag(tag: string): boolean {
  return SERIES_TAGS.includes(tag as Tag);
}

/**
 * `/series` 목록에 세울 태그. 프로젝트는 문서 한 편으로 정리했으므로
 * 여러 편으로 이어지는 연재물만 남긴다.
 */
export const SERIES_SLUGS: readonly Tag[] =
  CATEGORY_SECTIONS.find((section) => section.id === "series")?.groups.flatMap(
    (group) => group.tags,
  ) ?? [];

const TAG_TO_GROUP_ID = new Map<string, CategoryGroupId>(
  CATEGORY_GROUPS.flatMap((group) =>
    group.tags.map((tag) => [tag as string, group.id] as const),
  ),
);

export function getGroupIdByTag(tag: string): CategoryGroupId {
  return TAG_TO_GROUP_ID.get(tag) ?? FALLBACK_GROUP_ID;
}

const GROUP_TO_SECTION_ID = new Map<CategoryGroupId, CategorySectionId>(
  CATEGORY_SECTIONS.flatMap((section) =>
    section.groups.map((group) => [group.id, section.id] as const),
  ),
);

export function getSectionIdByTag(tag: string): CategorySectionId {
  return GROUP_TO_SECTION_ID.get(getGroupIdByTag(tag)) ?? FALLBACK_SECTION_ID;
}

/** 대분류 노출 순서 (fallback은 항상 마지막) */
export const CATEGORY_SECTION_ORDER: CategorySectionId[] = [
  ...CATEGORY_SECTIONS.toSorted((a, b) => a.order - b.order).map(
    (section) => section.id,
  ),
  FALLBACK_SECTION_ID,
];

/** 대분류 안의 그룹 순서 */
export function getGroupIdsBySection(
  sectionId: CategorySectionId,
): CategoryGroupId[] {
  if (sectionId === FALLBACK_SECTION_ID) return [FALLBACK_GROUP_ID];
  return (
    CATEGORY_SECTIONS.find((section) => section.id === sectionId)?.groups.map(
      (group) => group.id,
    ) ?? []
  );
}

/** 홈 섹션 노출 순서 — 그룹 단위가 필요한 곳에서 쓴다. */
export const CATEGORY_GROUP_ORDER: CategoryGroupId[] = [
  ...CATEGORY_SECTION_ORDER.flatMap(getGroupIdsBySection),
];
