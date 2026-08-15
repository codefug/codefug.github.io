/**
 * 운영에서 만난 문제와 해결.
 *
 * 다이어그램은 "무엇을 왜 그렇게 판단했는가"를 보여주는 데까지만 쓴다.
 * 인증·세션처럼 구현 흐름 자체가 공격 표면이 되는 영역은 다이어그램을 두지 않는다.
 * (문장으로 설명되는 판단의 가치는 그대로 남고, 노출되는 것은 구현 세부뿐이기 때문)
 *
 * 본문은 i18n(portfolio.architecture.<id>)에 둔다.
 */

export type ArchitectureCase = {
  id: string;
  period: string;
  /** 이 작업을 요약하는 태그 */
  stack: string[];
  /** 구조를 보여주는 머메이드 다이어그램. 없으면 본문만 렌더한다. */
  diagram?: string;
  /** 기각한 대안의 개수만큼 i18n에 rejected.<n> 키가 있다 */
  alternativeCount: number;
};

export const ARCHITECTURE_CASES: ArchitectureCase[] = [
  {
    id: "reactive-session",
    period: "2026.06 ~ 2026.08",
    stack: ["인증", "세션"],
    alternativeCount: 2,
    // 인증 흐름은 다이어그램으로 그리지 않는다. (위 주석 참고)
  },
  {
    id: "trpc-migration",
    period: "2026.05 ~ 2026.06",
    stack: ["tRPC", "Zod", "MSW"],
    alternativeCount: 2,
    diagram: `flowchart TB
  subgraph before["Before"]
    direction TB
    H1["데이터 요청 훅"] --> SA["서버 액션"]
    M1["목 데이터"] -. "가로챌 수 없음" .-> SA
    SB1["Storybook"] -. "방식 A" .-> SA
    E1["E2E"] -. "방식 B" .-> SA
  end

  subgraph after["After"]
    direction TB
    H2["데이터 요청 훅<br/>타입 추론"] --> RH["단일 진입점"]
    RH --> P["엔드포인트마다<br/>요청 · 스키마 · 목 데이터"]
    M2["목 데이터"] --> RH
    SB2["Storybook"] --> M2
    E2["E2E"] --> M2
  end

  before ==> after`,
  },
  {
    id: "overlay-coordinator",
    period: "2026.06 ~ 2026.07",
    stack: ["상태 설계", "UI"],
    alternativeCount: 2,
    diagram: `flowchart TD
  subgraph callers["오버레이를 띄우려는 곳"]
    A["모달"]
    B["사이드바"]
    C["온보딩"]
  end

  A -- "노출 의사만 선언" --> S
  B -- "노출 의사만 선언" --> S
  C -- "노출 의사만 선언" --> S

  subgraph coordinator["코디네이터"]
    S[("등록된 후보")]
    S --> SEL["우선순위 순서대로 훑어<br/>열린 것 중 첫 번째 하나만 선택"]
  end

  SEL --> R["활성 오버레이 — 0개 또는 1개"]`,
  },
  {
    id: "vrt-infra",
    period: "2025.11 ~ 2026.08",
    stack: ["테스트", "CI"],
    alternativeCount: 2,
    diagram: `flowchart TD
  T["실행할 테스트 수를 센다"] --> M["필요한 만큼만<br/>병렬 작업을 만든다"]
  BUILD["빌드 1회"] --> S1
  M --> S1["작업 1"]
  M --> S2["작업 2"]
  M --> S3["작업 N"]
  BUILD --> S2
  BUILD --> S3

  S1 --> RES{"전부 통과?"}
  S2 --> RES
  S3 --> RES

  RES -- "예" --> SKIP["리포트 병합 생략"]
  RES -- "아니오" --> MERGE["리포트 병합 후 확인"]`,
  },
];
