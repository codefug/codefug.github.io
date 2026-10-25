import { kebabCase } from "es-toolkit";

export const TAG_LIST = {
  JAVASCRIPT: "javascript",
  TYPESCRIPT: "typescript",
  ASYNC_JS: "async-js",
  AUTH_SSR: "auth-ssr",
  KKOM_KKOM: "kkom-kkom",
  GHEUPPAY: "gheuppay",
  REACT: "react",
  WEB: "web",
  NEXTJS: "nextjs",
  FANDOMK: "fandomk",
  REINDEER_LETTER: "reindeer-letter",
  ME: "me",
} as const;

export type Tag = (typeof TAG_LIST)[keyof typeof TAG_LIST];

/** slug를 그대로 보여주면 어색한 태그의 표기. 시리즈 이름과 그룹 라벨이 먼저다(resolveTagLabel). */
const TAG_LABEL: Partial<Record<Tag, string>> = {
  [TAG_LIST.JAVASCRIPT]: "JavaScript",
  [TAG_LIST.TYPESCRIPT]: "TypeScript",
  [TAG_LIST.REACT]: "React",
  [TAG_LIST.NEXTJS]: "Next.js",
  [TAG_LIST.WEB]: "Web",
};

type SeriesInfo = { name: string; description: string };

/** 여러 편으로 이어지는 태그(연재물과 프로젝트)의 이름과 소개. */
const SERIES_INFO: Partial<Record<Tag, SeriesInfo>> = {
  [TAG_LIST.FANDOMK]: {
    name: "Fandom-k",
    description:
      "아이돌 후원 서비스를 만들며 팀 프로젝트 세팅부터 무한 스크롤, 스켈레톤 UI까지 처음 부딪힌 것들을 정리했습니다.",
  },
  [TAG_LIST.GHEUPPAY]: {
    name: "급페이",
    description:
      "카드 렌더링 최적화, MSW 기반 mock fetching, 개발 환경 분리까지 UX와 DX를 함께 끌어올린 기록입니다.",
  },
  [TAG_LIST.KKOM_KKOM]: {
    name: "꼼꼼",
    description:
      "부트캠프 최종 프로젝트. 공통 컴포넌트 설계, 커스텀 오버레이 훅, 서버/클라이언트 호환 fetch까지 구조를 직접 설계했습니다.",
  },
  [TAG_LIST.ASYNC_JS]: {
    name: "비동기 자바스크립트",
    description:
      "이벤트 루프부터 async/await까지, 자바스크립트 비동기를 개념 하나씩 짧게 정리한 시리즈입니다.",
  },
  [TAG_LIST.AUTH_SSR]: {
    name: "인증 분기 SSR 기록",
    description:
      "핵심 페이지들이 크롤러에게 GNB와 푸터만 보여주고 있었습니다. 인증 분기와 뷰포트 분기를 서버에서 확정하고, 그 과정에서 깨진 CI와 hydration 불일치까지 정리한 기록입니다.",
  },
  [TAG_LIST.REINDEER_LETTER]: {
    name: "순록의 편지",
    description:
      "연말에 나와 타인에게 예약 편지를 보내는 서비스를 만들며 남긴 기록입니다.",
  },
};

export function getSeriesInfo(tag: string): SeriesInfo | undefined {
  return SERIES_INFO[tag as Tag];
}

/** 시리즈 페이지처럼 정보가 반드시 있어야 하는 곳에서 쓴다. 없으면 SSG 빌드에서 던져 바로 드러낸다. */
export function requireSeriesInfo(tag: string): SeriesInfo {
  const info = getSeriesInfo(tag);
  if (!info) throw new Error(`시리즈 정보가 없습니다: ${tag}`);
  return info;
}

export type CategoryGroupId =
  | "toyProject"
  | "workProject"
  | "series"
  | "framework"
  | "language"
  | "webDev"
  | "me"
  | "etc";

export type CategorySectionId = "project" | "series" | "dev" | "me" | "etc";

type CategoryGroup = {
  id: CategoryGroupId;
  label: string;
  description: string;
  tags: Tag[];
  /** `/groups/<slug>` 전용 목록 페이지를 만든다. */
  hasPage?: boolean;
};

type CategorySection = {
  id: CategorySectionId;
  label: string;
  description: string;
  groups: CategoryGroup[];
  /** 전체 글 필터에서 대분류 한 칸 대신 그룹별 칸으로 나눈다. */
  splitInFilter?: boolean;
};

/** 대분류 → 그룹 → 태그. 사이드바, 홈, 전체 글 목록이 모두 이 트리를 따른다. */
const CATEGORY_SECTIONS: CategorySection[] = [
  {
    id: "project",
    label: "Projects",
    description: "직접 만든 것들 — 배경부터 마주친 문제와 회고까지",
    // 2026년 사이드 작업과 2024년 학습기를 한 칸에 두면 평균값으로 읽힌다.
    splitInFilter: true,
    groups: [
      {
        id: "toyProject",
        label: "Toy Project",
        description: "대외활동과 팀으로 만들어 실제 사용자에게 배포해 본 것들",
        tags: [TAG_LIST.REINDEER_LETTER],
        hasPage: true,
      },
      {
        id: "workProject",
        label: "Work Project",
        description: "회사에서 맡아 진행한 프로젝트 기록",
        tags: [],
      },
    ],
  },
  {
    id: "series",
    label: "Series",
    description: "하나의 주제를 여러 편에 걸쳐 기록한 글",
    groups: [
      {
        id: "series",
        label: "Series",
        description: "하나의 주제를 여러 편에 걸쳐 기록한 글",
        tags: [TAG_LIST.ASYNC_JS, TAG_LIST.AUTH_SSR],
      },
    ],
  },
  {
    id: "dev",
    label: "Dev",
    description: "프레임워크와 언어, 웹 전반에 대한 기록",
    groups: [
      {
        id: "framework",
        label: "Framework",
        description: "React, Next.js 등 프레임워크의 동작 원리를 파고든 기록",
        tags: [TAG_LIST.REACT, TAG_LIST.NEXTJS],
      },
      {
        id: "language",
        label: "Language",
        description: "JavaScript와 TypeScript 그 자체에 대한 탐구",
        tags: [TAG_LIST.TYPESCRIPT, TAG_LIST.JAVASCRIPT],
      },
      {
        id: "webDev",
        label: "Web",
        description:
          "브라우저와 웹 표준, SEO처럼 특정 프레임워크에 묶이지 않는 글",
        tags: [TAG_LIST.WEB],
      },
    ],
  },
  {
    id: "me",
    label: "Me",
    description: "기술 밖에서 생각하고 겪은 것들",
    // 개발 밖의 글은 성격(생각·후기·여행)으로 나눌 만큼 많지 않아 한 칸에 둔다.
    groups: [
      {
        id: "me",
        label: "Me",
        description: "기술 밖에서 생각하고 겪은 것들",
        tags: [TAG_LIST.ME],
      },
    ],
  },
];

/** 트리에 없는 태그의 글이 분류에서 조용히 사라지지 않게 받는 자리. */
const FALLBACK_GROUP_ID: CategoryGroupId = "etc";
const FALLBACK_SECTION_ID: CategorySectionId = "etc";

const FALLBACK_GROUP: CategoryGroup = {
  id: FALLBACK_GROUP_ID,
  label: "Etc",
  description: "어느 분류에도 딱 맞지 않는 글",
  tags: [],
};

// 트리에 넣지 않으므로 사이드바, 홈, 필터에 나타나지 않는다. 라벨 조회가 언제나 값을 돌려주도록만 둔다.
const FALLBACK_SECTION: CategorySection = {
  id: FALLBACK_SECTION_ID,
  label: FALLBACK_GROUP.label,
  description: FALLBACK_GROUP.description,
  groups: [FALLBACK_GROUP],
};

const CATEGORY_GROUPS: CategoryGroup[] = CATEGORY_SECTIONS.flatMap(
  (section) => section.groups,
);

export function getSection(sectionId: CategorySectionId): CategorySection {
  return (
    CATEGORY_SECTIONS.find((section) => section.id === sectionId) ??
    FALLBACK_SECTION
  );
}

export function getGroup(groupId: CategoryGroupId): CategoryGroup {
  return (
    CATEGORY_GROUPS.find((group) => group.id === groupId) ?? FALLBACK_GROUP
  );
}

/** 여러 편으로 이어지는 그룹. 이 태그의 글은 목록에서 오래된 순으로 보여준다. */
const ORDERED_GROUP_IDS: CategoryGroupId[] = [
  "series",
  "toyProject",
  "workProject",
];

const SERIES_TAGS: readonly Tag[] = CATEGORY_GROUPS.filter((group) =>
  ORDERED_GROUP_IDS.includes(group.id),
).flatMap((group) => group.tags);

export function isSeriesTag(tag: string): boolean {
  return SERIES_TAGS.includes(tag as Tag);
}

/** `/series`에 세울 연재물 태그. 프로젝트 태그는 SERIES_TAGS에만 들어간다. */
export const SERIES_SLUGS: readonly Tag[] = getSection("series").groups.flatMap(
  (group) => group.tags,
);

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

/** fallback은 넣지 않는다. 넣으면 글이 없어도 사이드바, 홈, 필터에 빈 칸이 생긴다. */
export const CATEGORY_SECTION_ORDER: CategorySectionId[] =
  CATEGORY_SECTIONS.map((section) => section.id);

export const GROUPS_WITH_PAGE: readonly CategoryGroupId[] =
  CATEGORY_GROUPS.filter((group) => group.hasPage).map((group) => group.id);

/** URL은 태그와 같은 kebab-case로 맞춘다. toyProject → toy-project */
export function toGroupSlug(groupId: CategoryGroupId): string {
  return kebabCase(groupId);
}

export function fromGroupSlug(slug: string): CategoryGroupId | undefined {
  return GROUPS_WITH_PAGE.find((groupId) => toGroupSlug(groupId) === slug);
}

/** 전부 그룹 단위로 펼치면 칸이 열 개를 넘어, splitInFilter인 대분류만 가른다. */
type FilterFacet =
  | { kind: "section"; id: CategorySectionId }
  | { kind: "group"; id: CategoryGroupId };

export const FILTER_FACETS: FilterFacet[] = CATEGORY_SECTION_ORDER.flatMap(
  (sectionId): FilterFacet[] => {
    const section = getSection(sectionId);
    if (!section.splitInFilter) return [{ kind: "section", id: sectionId }];
    return section.groups.map((group) => ({ kind: "group", id: group.id }));
  },
);

export function matchesFacet(
  facet: FilterFacet,
  categories: string[],
): boolean {
  if (facet.kind === "section") {
    return categories.some((tag) => getSectionIdByTag(tag) === facet.id);
  }
  return categories.some((tag) => getGroupIdByTag(tag) === facet.id);
}

export function facetLabel(facet: FilterFacet): string {
  return facet.kind === "section"
    ? getSection(facet.id).label
    : getGroup(facet.id).label;
}

/** 화면마다 같은 이름을 보이도록 태그 표시명은 모두 이 함수를 거친다. 시리즈 이름, 같은 이름의 그룹 라벨(me → Me), 표기 보정, slug 순으로 찾는다. */
export function resolveTagLabel(tag: string): string {
  const sameNameGroup = [...CATEGORY_GROUPS, FALLBACK_GROUP].find(
    (group) => group.id === tag,
  );
  return (
    getSeriesInfo(tag)?.name ??
    sameNameGroup?.label ??
    TAG_LABEL[tag as Tag] ??
    tag
  );
}
