/**
 * 포트폴리오의 핵심: 내가 설계한 구조들.
 *
 * 각 사례는 "무엇을 했다"가 아니라 "어떤 문제를, 왜 그렇게 풀었고,
 * 무엇을 하지 않기로 했는가"를 담는다. 기각한 대안(alternatives)이
 * 있는 이유는 그것이 설계 판단의 근거이기 때문이다.
 *
 * 다이어그램은 실제 코드 구조를 따르되, 사내 식별자는 공개하지 않는다.
 * (엔드포인트 경로·쿠키명·도메인 라우터명·제휴사명 등은 일반화한다)
 *
 * 본문(문제/결정/결과)은 i18n(portfolio.architecture.<id>)에 둔다.
 */

export type ArchitectureCase = {
  id: string;
  period: string;
  /** 이 설계를 요약하는 태그 */
  stack: string[];
  /** 구조를 보여주는 머메이드 다이어그램 */
  diagram: string;
  /** 기각한 대안의 개수만큼 i18n에 alternatives.<n> 키가 있다 */
  alternativeCount: number;
};

export const ARCHITECTURE_CASES: ArchitectureCase[] = [
  {
    id: "reactive-session",
    period: "2026.06 ~ 2026.08",
    stack: ["tRPC Link", "iron-session", "Single-flight"],
    alternativeCount: 2,
    diagram: `sequenceDiagram
  participant C as 컴포넌트
  participant L as 재발급 링크
  participant S as 세션 갱신
  participant BE as 백엔드

  C->>BE: 요청 (만료된 토큰)
  BE-->>L: 401

  Note over L,S: 동시에 N개가 401을 받아도<br/>재발급 요청은 1개만 나간다

  L->>S: 갱신 요청
  S->>BE: 재발급 (별도 클라이언트)

  alt 재발급 성공
    BE-->>S: 새 토큰
    S-->>L: reissued
    L->>BE: 원요청 재시도 (재발급 불가 표시)
    BE-->>C: 정상 응답 — 사용자는 모름
  else 만료 확정
    BE-->>S: 401
    S-->>L: rejected
    L-->>C: 로그아웃 + 돌아올 주소 보존
  else 일시 장애 (5xx · 네트워크)
    BE-->>S: 5xx
    S-->>L: transient
    L-->>C: 에러만 전달 — 로그아웃하지 않음
  end`,
  },
  {
    id: "trpc-migration",
    period: "2026.05 ~ 2026.06",
    stack: ["tRPC", "Zod", "TanStack Query", "MSW"],
    alternativeCount: 2,
    diagram: `flowchart TB
  subgraph before["Before"]
    direction TB
    H1["React Query 훅"] --> SA["서버 액션"]
    SA --> B1["백엔드"]
    M1["MSW"] -. "가로챌 수 없음" .-> SA
    SB1["Storybook"] -. "모듈 모킹" .-> SA
    E1["E2E"] -. "또 다른 방식" .-> SA
  end

  subgraph after["After"]
    direction TB
    H2["훅 + queryOptions<br/>타입 추론"] --> RH["단일 진입점"]
    RH --> MW["미들웨어<br/>logging → error → auth"]
    MW --> P["procedure<br/>index · schema · fixture"]
    P --> B2["백엔드"]
    M2["MSW"] --> RH
    SB2["Storybook"] --> M2
    E2["E2E"] --> M2
  end

  before ==> after`,
  },
  {
    id: "overlay-coordinator",
    period: "2026.06 ~ 2026.07",
    stack: ["Zustand vanilla", "Radix UI"],
    alternativeCount: 2,
    diagram: `flowchart TD
  subgraph callers["오버레이를 띄우려는 곳"]
    A["모달"]
    B["사이드바"]
    C["온보딩"]
  end

  A -- "{ id, when, render }" --> S
  B -- "{ id, when }" --> S
  C -- "{ id, when }" --> S

  subgraph coordinator["코디네이터"]
    S[("등록된 슬롯")]
    S --> SEL["우선순위 배열을 순회하며<br/>열린 것 중 첫 번째 하나만 선택"]
  end

  SEL --> R["활성 오버레이 — 0개 또는 1개"]
  R --> D["render를 넘긴 쪽:<br/>코디네이터가 그림"]
  R --> N["안 넘긴 쪽:<br/>활성 여부만 받아 직접 그림"]`,
  },
  {
    id: "vrt-infra",
    period: "2025.11 ~ 2026.08",
    stack: ["Playwright", "GitHub Actions"],
    alternativeCount: 2,
    diagram: `flowchart TD
  T["실행할 테스트 수를 센다"] --> M["shard 수 = 올림(테스트 수 / 15)<br/>매트릭스 생성"]
  BUILD["빌드 1회 → artifact"] --> S1
  M --> S1["shard 1"]
  M --> S2["shard 2"]
  M --> S3["shard N"]
  BUILD --> S2
  BUILD --> S3

  S1 --> RES{"전부 통과?"}
  S2 --> RES
  S3 --> RES

  RES -- "예" --> SKIP["리포트 병합 생략"]
  RES -- "아니오" --> MERGE["리포트 병합 후 확인"]`,
  },
];
