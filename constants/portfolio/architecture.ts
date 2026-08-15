/**
 * 포트폴리오의 핵심: 내가 설계한 구조들.
 *
 * 각 사례는 "무엇을 했다"가 아니라 "어떤 문제를, 왜 그렇게 풀었고,
 * 무엇을 하지 않기로 했는가"를 담는다. 기각한 대안(alternatives)이
 * 있는 이유는 그것이 설계 판단의 근거이기 때문이다.
 *
 * 본문(문제/결정/결과)은 i18n(portfolio.architecture.<id>)에 두고,
 * 여기에는 구조 자체(다이어그램)와 메타데이터만 둔다.
 */

export type ArchitectureCase = {
  id: string;
  /** 어느 서비스에서 한 일인지 */
  scope: "allra-front" | "allra-admin" | "personal";
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
    id: "trpc-migration",
    scope: "allra-front",
    period: "2026.05 ~ 2026.06",
    stack: ["tRPC", "Zod", "TanStack Query", "MSW"],
    alternativeCount: 2,
    diagram: `flowchart LR
  subgraph before["Before — Server Action"]
    direction TB
    C1["컴포넌트"] --> H1["React Query 훅"]
    H1 --> SA["'use server' 액션<br/>131개 파일"]
    SA --> BE1["백엔드"]
    MSW1["MSW"] -. "가로챌 수 없음" .-> SA
  end

  subgraph after["After — tRPC"]
    direction TB
    C2["컴포넌트"] --> H2["useQuery + queryOptions<br/>타입 추론"]
    H2 --> RH["/api/trpc<br/>단일 진입점"]
    RH --> MW["미들웨어 체인<br/>logging → error → auth"]
    MW --> P["procedure<br/>index · schema · fixture"]
    P --> BE2["백엔드"]
    MSW2["MSW"] --> RH
  end

  before ==> after`,
  },
  {
    id: "reactive-session",
    scope: "allra-front",
    period: "2026.06 ~ 2026.08",
    stack: ["iron-session", "tRPC Link", "Single-flight"],
    alternativeCount: 2,
    diagram: `sequenceDiagram
  participant C as 컴포넌트
  participant L as reissueLink
  participant BE as 백엔드

  C->>BE: 요청 (만료된 토큰)
  BE-->>L: 401 + 재발급 마커

  Note over L: 동시 401이 N개여도<br/>재발급은 1회 (single-flight)

  L->>BE: 재발급 시도
  alt 재발급 성공
    BE-->>L: 새 토큰
    L->>BE: 원요청 재시도 (canReissue=false)
    BE-->>C: 정상 응답 — 사용자는 모름
  else 만료 확정 (rejected)
    L-->>C: 로그아웃 + callbackUrl 보존
  else 일시 장애 (transient)
    L-->>C: 에러만 전파 — 로그아웃하지 않음
  end`,
  },
  {
    id: "overlay-coordinator",
    scope: "allra-front",
    period: "2026.06 ~ 2026.07",
    stack: ["Zustand vanilla", "Radix UI"],
    alternativeCount: 2,
    diagram: `flowchart TD
  subgraph callers["오버레이를 띄우려는 곳"]
    A["모달 큐"]
    B["모바일 사이드바"]
    C["온보딩"]
  end

  A -- "{ id, when, render }" --> S
  B -- "{ id, when }" --> S
  C -- "{ id, when }" --> S

  subgraph coordinator["OverlayCoordinator"]
    S[("등록된 후보")]
    S --> SEL["OVERLAY_ORDER 순서대로<br/>열린 것 중 첫 번째만 선택"]
  end

  SEL --> R["활성 오버레이 — 항상 0 또는 1개"]

  note["단수를 반환하므로<br/>동시 노출이 타입 차원에서 불가능"]
  R -.-> note`,
  },
  {
    id: "vrt-infra",
    scope: "allra-front",
    period: "2026.03 ~ 2026.08",
    stack: ["Playwright", "GitHub Actions", "GritQL"],
    alternativeCount: 2,
    diagram: `flowchart TD
  T["playwright --list<br/>전체 테스트 수 파악"] --> M["shard 수 = ceil(총 테스트 / 15)<br/>매트릭스 자동 생성"]
  M --> B["build 1회<br/>artifact 업로드"]

  B --> S1["shard 1/N"]
  B --> S2["shard 2/N"]
  B --> S3["shard …/N"]

  S1 --> RES{"전부 통과?"}
  S2 --> RES
  S3 --> RES

  RES -- "예" --> SKIP["리포트 병합 생략<br/>(청구 시간 절약)"]
  RES -- "아니오" --> MERGE["blob 리포트 병합"]

  VRT["@vrt 태그"] -. "CI에서 제외<br/>(--grep-invert)" .-> RES`,
  },
];
