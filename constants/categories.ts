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
  THOUGHT: "thought",
} as const;

export type Tag = (typeof TAG_LIST)[keyof typeof TAG_LIST];

/**
 * slug를 그대로 보여주면 어색한 태그의 표기.
 * 사람 이름을 messages에 둘 이유가 없는(번역 대상이 아닌) 고유명사만 여기 둔다.
 */
export const TAG_LABEL: Partial<Record<Tag, string>> = {
  [TAG_LIST.JAVASCRIPT]: "JavaScript",
  [TAG_LIST.TYPESCRIPT]: "TypeScript",
  [TAG_LIST.REACT]: "React",
  [TAG_LIST.NEXTJS]: "Next.js",
  [TAG_LIST.ELECTRON]: "Electron",
  [TAG_LIST.WEB]: "Web",
};

/**
 * 태그를 담는 가장 작은 묶음. 사이드바에서 접히는 단위다.
 * `label`·`description`은 messages의 `categories.<id>`에서 가져온다.
 */
export type CategoryGroupId =
  | "sideProject"
  | "learningProject"
  | "workProject"
  | "series"
  | "framework"
  | "language"
  | "webDev"
  | "retrospective"
  | "review"
  | "thought"
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
  /**
   * 그룹에 속한 글을 모아 보는 전용 페이지를 만든다.
   * 태그 하나로는 좁고 대분류로는 넓은 묶음(사이드·학습 프로젝트)에 쓴다.
   */
  hasPage?: boolean;
};

export type CategorySection = {
  id: CategorySectionId;
  groups: CategoryGroup[];
  /** 홈·사이드바에서의 노출 순서 */
  order: number;
  /**
   * 사이드바에서 그룹 단계를 건너뛰고 태그를 바로 보여준다.
   * 그룹 하나가 태그 하나를 대표해서 이름이 겹쳐 보이는 대분류(기록)에 쓴다.
   */
  flattenGroups?: boolean;
  /**
   * 전체 글 필터에서 대분류 한 칸이 아니라 그룹별로 갈라 보여준다.
   * 한 칸에 두면 성격이 다른 글이 같은 무게로 읽히는 대분류(프로젝트)에 쓴다.
   */
  splitInFilter?: boolean;
};

/**
 * 대분류 → 그룹 → 태그의 3단 구조.
 * 태그를 옮기려면 이 트리만 고치면 사이드바·홈·전체 글 목록이 모두 따라온다.
 */
export const CATEGORY_SECTIONS: CategorySection[] = [
  {
    id: "project",
    order: 1,
    // 2026년 사이드 작업과 2024년 학습기를 한 칸에 두면 평균값으로 읽힌다.
    splitInFilter: true,
    groups: [
      /*
        직접 필요해서 만든 것과, 배우면서 팀으로 만든 것을 나눠 둔다.
        2024년 팀 프로젝트와 2026년 개인 작업을 한 칸에 두면
        목록에서 둘이 같은 무게로 읽힌다.
      */
      {
        id: "sideProject",
        tags: [TAG_LIST.CLAUDE_PET, TAG_LIST.REINDEER_LETTER],
        hasPage: true,
      },
      {
        id: "learningProject",
        tags: [TAG_LIST.KKOM_KKOM, TAG_LIST.GHEUPPAY, TAG_LIST.FANDOMK],
        hasPage: true,
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
    // 그룹 이름(생각·회고·후기)이 곧 태그 이름이라 한 단계로 보여준다.
    flattenGroups: true,
    groups: [
      { id: "thought", tags: [TAG_LIST.THOUGHT] },
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

function findSection(
  sectionId: CategorySectionId,
): CategorySection | undefined {
  return CATEGORY_SECTIONS.find((section) => section.id === sectionId);
}

/**
 * 여러 편으로 이어지는 글이 모이는 그룹들.
 * 이 태그의 글은 목록에서 오래된 순(1편 → 마지막 편)으로 읽는 편이 자연스럽다.
 */
const ORDERED_GROUP_IDS: CategoryGroupId[] = [
  "series",
  "sideProject",
  "learningProject",
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
  findSection("series")?.groups.flatMap((group) => group.tags) ?? [];

/** `/series`에 목록으로 세우는 연재물인지. 프로젝트 태그는 여기 들어오지 않는다. */
export function isSeriesSlug(tag: string): boolean {
  return SERIES_SLUGS.includes(tag as Tag);
}

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

/**
 * 대분류 안의 그룹과 그 대표 태그. 그룹 하나가 태그 하나를 대표하는 구조
 * (기록 아래 생각·회고·후기)에서 내비게이션 항목을 만들 때 쓴다.
 */
export function getSectionGroupTags(
  sectionId: CategorySectionId,
): { groupId: CategoryGroupId; tag: Tag }[] {
  return (
    findSection(sectionId)
      ?.groups.filter((group) => group.tags.length > 0)
      .map((group) => ({ groupId: group.id, tag: group.tags[0] })) ?? []
  );
}

/** 그룹 단계를 건너뛰고 태그를 바로 보여줄 대분류인지 */
export function shouldFlattenGroups(sectionId: CategorySectionId): boolean {
  return findSection(sectionId)?.flattenGroups === true;
}

/** 전용 목록 페이지를 가진 그룹 (`/groups/<slug>`) */
export const GROUPS_WITH_PAGE: readonly CategoryGroupId[] =
  CATEGORY_GROUPS.filter((group) => group.hasPage).map((group) => group.id);

export function hasGroupPage(groupId: string): boolean {
  return GROUPS_WITH_PAGE.includes(groupId as CategoryGroupId);
}

/**
 * 그룹 id는 camelCase지만 URL은 태그와 같은 kebab-case로 맞춘다.
 * (`/categories/claude-pet`과 `/groups/side-project`)
 */
export function toGroupSlug(groupId: CategoryGroupId): string {
  return groupId.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
}

export function fromGroupSlug(slug: string): CategoryGroupId | undefined {
  return GROUPS_WITH_PAGE.find((groupId) => toGroupSlug(groupId) === slug);
}

/** 대분류 안의 그룹 순서 */
export function getGroupIdsBySection(
  sectionId: CategorySectionId,
): CategoryGroupId[] {
  if (sectionId === FALLBACK_SECTION_ID) return [FALLBACK_GROUP_ID];
  return findSection(sectionId)?.groups.map((group) => group.id) ?? [];
}

/** 홈 섹션 노출 순서 — 그룹 단위가 필요한 곳에서 쓴다. */
export const CATEGORY_GROUP_ORDER: CategoryGroupId[] = [
  ...CATEGORY_SECTION_ORDER.flatMap(getGroupIdsBySection),
];

/**
 * 전체 글 필터의 칸 목록.
 *
 * 대분류 한 칸이 기본이고, splitInFilter가 켜진 대분류만 그룹별로 갈라진다.
 * 전부 그룹 단위로 펼치면 칸이 열 개를 넘어 훑기 어려워진다.
 */
export type FilterFacet =
  | { kind: "section"; id: CategorySectionId }
  | { kind: "group"; id: CategoryGroupId };

export const FILTER_FACETS: FilterFacet[] = CATEGORY_SECTION_ORDER.flatMap(
  (sectionId): FilterFacet[] => {
    const section = findSection(sectionId);
    if (!section?.splitInFilter) return [{ kind: "section", id: sectionId }];
    return section.groups.map((group) => ({ kind: "group", id: group.id }));
  },
);

/** 글 하나가 이 칸에 속하는지 */
export function matchesFacet(
  facet: FilterFacet,
  categories: string[],
): boolean {
  if (facet.kind === "section") {
    return categories.some((tag) => getSectionIdByTag(tag) === facet.id);
  }
  return categories.some((tag) => getGroupIdByTag(tag) === facet.id);
}

/** 칸 이름을 messages에서 찾을 키 (섹션은 sections.*, 그룹은 categories.*) */
export function facetLabelKey(facet: FilterFacet): string {
  return facet.kind === "section"
    ? `sections.${facet.id}.label`
    : `categories.${facet.id}.label`;
}
