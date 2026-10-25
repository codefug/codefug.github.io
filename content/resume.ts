export type DetailItem = { text: string; subItems?: string[] };
export type Category = { title?: string; details: DetailItem[] };
export type ResumeProject = {
  title: string;
  description: string;
  stack: string[];
  tasks?: string[];
  categories?: Category[];
};
export type SideProjectItem = {
  title: string;
  url?: string;
  github?: string;
  stack: string[];
  description: string;
  details: string[];
};
export type Contribution = { title: string; url: string; description?: string };
export type TitledItem = { title: string; duration: string; detail: string };

export const RESUME = {
  meta: {
    title: "이승현 이력서",
    description: "Web Frontend Developer 이승현의 이력서입니다.",
  },
  name: "이승현",
  role: "Web Frontend Developer",
  contact: {
    email: "Email",
    github: "GitHub",
    linkedin: "LinkedIn",
    linkedinValue: "in/lee-seung-hyun",
    linkedinHref: "https://www.linkedin.com/in/lee-seung-hyun-568565269/",
    blog: "Blog",
  },
  aboutMe: {
    title: "About Me",
    paragraphs: [
      "React와 TypeScript 기반의 2년차 프론트엔드 엔지니어입니다. \n좋은 구조는 사업 확장을 유연하게 하고, 작은 사용자 경험 개선도 잠재 사용자를 끌어낸다고 믿습니다. \n비즈니스의 성격을 고려하여 정해진 리소스 내에서 최선의 결과물을 만들기 위해 노력합니다.\n최근에는 AI를 활용하여 리소스의 한계를 극복하는 방안에 대해 깊게 고민하고 있습니다.",
    ],
  },
  workExperience: {
    title: "Work Experience",
    items: {
      allra: {
        company: "Allra Fintech",
        duration: "2025.10 - NOW",
        summary:
          "[B]누적 지급액 7조 원[/B], [B]이용 사업자 4.5만 명[/B] 규모로 온라인 사업자의 자금을 유동화하는 서비스를 개발하는 핀테크 기업",
        team: {
          name: "올라개발팀",
          duration: "2025.10 - NOW",
          summary:
            "선정산 웹 서비스인 [B]올라[/B]와 내부 어드민 서비스인 [B]올라 어드민[/B]의 프론트엔드 개발을 담당하고 있습니다.",
        },
      },
      pwc: {
        company: "Samil PwC Acceleration Center",
        duration: "2025.01 - 2025.10",
        summary:
          "회계, 세무, 컨설팅 등 삼일회계법인의 핵심 업무를 디지털 기술과 결합하여 운영 및 지원하는 기업",
        team: {
          name: "Digital팀",
          duration: "2025.01 - 2025.10",
          summary:
            "폐쇄망과 엄격한 보안 정책 아래에서 사내 서비스 통합 포털인 [B]Digital Finance[/B], AI 문서 분석 솔루션인 [B]Document AI[/B], 사내 디자인 시스템인 [B]SamilDevKit[/B]의 프론트엔드 개발을 담당했습니다.",
        },
      },
    },
  },
  sideProjects: {
    title: "Side Projects",
    items: [
      {
        title: "순록의 편지",
        url: "/posts/2024-12-25-project",
        github: "https://github.com/reindeer-letter/client",
        stack: ["Next.js", "TypeScript", "Zustand", "react-window"],
        description:
          "연말에 예약 편지를 보내는 서비스를 직접 기획해 제안하고 6인 팀으로 출시해, 연말 시즌 동안 실사용자 대상으로 운영했습니다.",
        details: [
          "SNS 인앱 브라우저에서 녹음과 파일 첨부가 깨지던 문제를 진입 시점에 외부 브라우저로 전환해 풀고, 편지 목록은 가상화로 렌더링 시간을 [B]47%[/B] 줄였습니다.",
        ],
      },
    ],
  },
  knowledgeSharing: {
    title: "Knowledge Sharing",
    posts: [
      {
        title: "Server Action의 큐는 어디까지 묶일까",
        url: "/posts/2026-01-29",
      },
      {
        title: "useSearchParams는 왜 Suspense가 필요할까",
        url: "/posts/2026-05-27",
      },
      {
        title: "구조화된 데이터는 왜 필요할까",
        url: "/posts/2026-08-15",
      },
    ],
  },
  openSource: {
    title: "Open Source Contributions",
    items: [
      {
        title: "OpenReplay",
        url: "https://github.com/openreplay/openreplay/issues/4476",
      },
      {
        title: "Next.js",
        url: "https://github.com/vercel/next.js/issues/92601",
      },
    ],
  },
  education: {
    title: "Education",
    items: [
      {
        title: "인천대학교 졸업 (영어영문학과, 컴퓨터공학과 복수전공)",
        duration: "2017.03 - 2024.08",
        detail: "학점: 3.7 / 4.5 (전공: 4.02 / 4.5)",
      },
      {
        title: "코드잇 스프린트 FE 부트캠프 수료",
        duration: "2024.03 - 2024.09",
        detail: "",
      },
    ],
  },
  certification: {
    title: "Certification",
    items: [
      {
        title: "AWS Certified Cloud Practitioner (CLF)",
        duration: "2026.08 취득",
        detail: "",
      },
      {
        title: "OPIc IH (Intermediate High)",
        duration: "2023.07 취득",
        detail: "",
      },
    ],
  },
  summary:
    "React와 TypeScript 기반의 2년차 프론트엔드 엔지니어입니다. 좋은 구조는 사업 확장을 유연하게 하고, 작은 사용자 경험 개선도 잠재 사용자를 끌어낸다고 믿습니다. 비즈니스의 성격을 고려하여 정해진 리소스 내에서 최선의 결과물을 만들기 위해 노력합니다.",
  projects: {
    allraAiAnalysis: {
      title: "allra-ai-analysis",
      description:
        "백엔드1팀이 초기 구성했던 [B]AI 분석 도구[/B]로, 올라의 레포를 한곳에 모은 팀 공용 작업 공간입니다([L:https://allrafintech.co.kr/blog/140]백엔드1팀 소개 글[/L]). 프론트개발팀의 합류 작업을 주도했습니다.",
      stack: ["OpenReplay", "GitHub Actions"],
      categories: [
        {
          title: "프론트팀 합류와 통합 개발 컨벤션 수립",
          details: [
            {
              text: "프론트개발팀과 백엔드1팀이 올라개발팀으로 통합됐지만, 이 도구는 분석 경로가 서버 코드와 서버 로그에 고정돼 프론트 작업에 쓰이지 않았습니다.",
            },
            {
              text: "[B]프론트 단 하네스를 재정비[/B]하면서 OpenReplay 세션 리플레이를 분석 흐름에 붙였고, 이슈, PR, 커밋 규칙 같은 팀 컨벤션은 백엔드 팀원들과 함께 만들어 [B]문서와 CI 검증으로 남겼습니다[/B].",
            },
            {
              text: "합류가 끝난 뒤에는 프론트 작업도 백엔드와 같은 흐름으로 분석되고 올라 위키에 기록으로 남아, 올라개발팀이 [B]프론트와 백엔드 구분 없이 한 기준으로 일하는[/B] 더 탄탄한 협업 구조를 갖추게 됐습니다.",
            },
          ],
        },
      ],
    },
    allra: {
      title: "Allra",
      description:
        "사업자가 정산일 전에 매출을 미리 받는 [B]선정산 업계 1위[/B] 서비스입니다. 레거시 코드의 Next.js 마이그레이션 직후 합류해, 프론트엔드 3명 중 한 명으로 성능과 안정성 개선을 주도했습니다.",
      stack: [
        "Next.js",
        "TypeScript",
        "tRPC",
        "TanStack Query",
        "Zustand",
        "MSW",
        "Playwright",
        "Storybook",
      ],
      categories: [
        {
          title: "API 계층 tRPC 전환 제안과 점진 이관",
          details: [
            {
              text: "Server Action 기반 API 계층에서는 [L:https://codefug.github.io/posts/2026-01-29]요청이 순차 처리돼 워터폴이 불가피[/L]했고, [B]배포마다 Version Skew로 요청이 실패[/B]했으며, MSW와도 호환되지 않았습니다.",
            },
            {
              text: "기존 개발 구조와 다르지 않으면서 부가 기능을 갖춘 기술을 찾아 [B]tRPC 전환을 제안[/B]해 팀에 채택됐고, [B]도메인 단위로 운영 중단 없이 이관[/B]했습니다.",
            },
            {
              text: "그 결과 [B]첫 화면의 전체 데이터 요청 시간이 49%[/B] 줄었고 배포 직후 요청이 실패하던 일이 사라졌으며, [B]tRPC-MSW 핸들러 하나로 E2E와 스토리북의 모킹을 통합하고 MSW 환경을 구축[/B]했습니다.",
            },
          ],
        },
        {
          title: "인증 상태 관리 구조 재설계",
          details: [
            {
              text: "클라이언트가 [B]자체 계산한 시각으로 세션 만료를 판단[/B]해 서버 기준과 어긋났고, 이를 막는 대응 코드가 계속 늘고 있었습니다.",
            },
            {
              text: "[B]만료 판단을 서버 응답 기준으로[/B] 바꾸고 인증이 필요한 쿼리는 인증 확정 뒤에만 활성화해 [B]비로그인에서는 요청 자체가 나가지 않게[/B] 했으며, 기존 응답과 신규 응답을 함께 처리해 [B]운영 중단 없이 교체[/B]했습니다.",
            },
            {
              text: "그 결과 임시 대응 코드와 비로그인 인증 호출이 사라졌고, [B]세션 만료 정책이 코드 한 곳에 명시[/B]돼 [L:https://allra.co.kr/blogs/265]업계 최초 ISMS 인증[/L] 획득에 기여했습니다.",
            },
          ],
        },
        {
          title: "주요 페이지 SSR 구조 설계",
          details: [
            {
              text: "로그인 여부와 뷰포트를 클라이언트에서만 판정해, 상품마진과 정산달력 같은 핵심 페이지의 서버 HTML에는 스켈레톤과 GNB, 푸터만 담기고 [B]크롤러가 본문을 읽지 못했습니다[/B].",
            },
            {
              text: "요청 쿠키와 UA로 [B]인증과 뷰포트를 서버에서 결정[/B]해 내려주도록 했고, 표준 방식인 HydrationBoundary가 상위에서 먼저 구독하는 인증 쿼리 때문에 동작하지 않아, 사용하는 코드를 고치지 않고 initialData로 넣는 방식을 택했습니다.",
            },
            {
              text: "그 결과 상품마진 페이지 기준 비로그인 LCP가 [B]80%[/B] 단축됐고, [L:https://codefug.github.io/posts/2026-09-22]스켈레톤뿐이던 페이지 소스에 본문이 실리면서[/L] [B]검색 엔진이 읽을 콘텐츠가 생겨 SEO가 개선[/B]됐습니다.",
            },
          ],
        },
        {
          title: "오버레이 우선순위 시스템 도입",
          details: [
            {
              text: "조건에 따라 자동으로 뜨는 오버레이가 늘면서 동시에 겹쳐 뜨거나 [B]필수 안내가 다른 오버레이에 묻혔고[/B], z-index를 오버레이마다 개별 대응하고 있었습니다.",
            },
            {
              text: "이런 오버레이가 계속 늘어난다는 방향을 기획, 디자인팀과 먼저 확인한 뒤, 흩어져 있던 모달 방식을 범용 훅 하나로 모으고 [B]우선순위를 배열 하나로 선언[/B]했습니다.",
            },
            {
              text: "겹침과 묻힘이 더 생기지 않았고, 이후 진행된 VIP 제도의 오버레이 두 가지는 [B]배열에 추가하는 것만으로 빠르게 구현[/B]할 수 있었습니다.",
            },
          ],
        },
      ],
      tasks: [
        "초기셀러 지원제도 도입 (선정산 메인 로직 재설계, 문서화 및 단위 테스트)",
        "VIP 혜택 제도 도입 (VIP 전용 안내 페이지, 오버레이 우선순위 시스템 도입)",
        "[L:https://allra.co.kr/blogs/265]ISMS 인증[/L] 프론트엔드 단 인증 대응 (세션 만료 정책 명시, 유휴 자동 로그아웃)",
        "API 계층 tRPC 전환",
        "전역적인 구조 개선 및 렌더링 방식 변경으로 성능 최적화",
        "[L:https://allrafintech.co.kr/blog/137]E2E 테스트 아키텍처 설계 및 CI 최적화[/L]",
      ],
    },
    allraAdmin: {
      title: "Allra Admin",
      description:
        "PHP 기반 레거시 어드민을 Next.js 모노레포로 옮기는 마이그레이션 프로젝트로, 운영팀이 쓰는 관리 화면을 이관하고 신규 화면을 추가했습니다.",
      stack: [
        "Next.js",
        "TypeScript",
        "Turborepo",
        "TanStack Query",
        "TanStack Table",
        "MSW",
        "Storybook",
      ],
      tasks: [
        "초기성장지원제도 지급 관리 (지급 내역, 지급 대기 자금 요청, 엑셀 다운로드)",
        "회수 관리 화면 신규 구축 (장기미회수내역, 통장거래내역, 정산 캘린더)",
        "[L:https://allra.co.kr/blogs/265]ISMS 인증[/L] 프론트엔드 단 인증 대응",
        "MSW 기반 API 모킹 환경 구축 및 스토리북 PR 프리뷰 배포 파이프라인 신설",
      ],
    },
    digitalFinance: {
      title: "Digital Finance",
      description:
        "삼일 내외부 서비스와 고객사를 한곳에서 관리하는 통합 포털입니다. 진행 중이던 프로젝트를 인수해 백엔드 2명과 함께 프론트엔드를 단독으로 맡아 프로덕션 배포까지 수행했습니다.",
      stack: ["React", "Vite", "TypeScript", "TanStack Query", "Docker"],
      categories: [
        {
          title: "사내 CSP 정책 대응 에디터 교체와 이미지 리사이즈 모듈 개발",
          details: [
            {
              text: "기존 에디터가 [B]사내 CSP 정책에 걸려 사용할 수 없었고[/B], 회계 도메인 특성상 보안 정책 통과가 배포의 전제 조건이었습니다.",
            },
            {
              text: "CSP를 통과하는 에디터로 교체하고 [B]이미지 리사이즈 모듈을 직접 개발[/B]해 붙여, 보안 정책을 지키면서 이미지 업로드 안정성을 확보했습니다.",
            },
          ],
        },
        {
          title: "TanStack Query 도입으로 서버 상태와 UI 상태 분리",
          details: [
            {
              text: "서버 응답과 UI 상태가 zustand 스토어 하나에 섞여 있어, [B]캐싱과 동기화를 수동으로 관리하는 코드[/B]가 흩어져 있었습니다.",
            },
            {
              text: "서버 상태를 TanStack Query로 옮겨 UI 상태와 분리하고 수동 캐싱, 동기화 코드를 걷어내 [B]상태의 책임과 예측 가능성[/B]을 확보했습니다.",
            },
          ],
        },
      ],
      tasks: [
        "진행 중이던 프로젝트 인수 및 프로덕션 배포",
        "CRA에서 Vite로 빌드 환경 마이그레이션 (번들 크기 58% 감소)",
        "TanStack Query 도입으로 서버 상태와 UI 상태 분리",
        "사내 CSP 정책 대응 에디터 교체 및 이미지 리사이즈 모듈 개발",
      ],
    },
    documentAi: {
      title: "Document AI",
      description:
        "AI가 보고서를 분석하는 문서 분석 솔루션으로, 설계부터 배포까지 프론트엔드를 단독으로 담당했습니다.",
      stack: ["Next.js", "TypeScript", "PDF.js", "Docker"],
      categories: [
        {
          title: "PDF.js 기반 PDF Viewer 구축",
          details: [
            {
              text: "PDF를 세밀하게 제어해야 하는 요구를 기존 래퍼가 지원하지 않아, [B]PDF.js로 Viewer를 직접 구현[/B]했습니다.",
            },
            {
              text: "또한 [B]무거운 파싱을 Web Worker로 옮기고[/B] react-window로 보이는 범위만 렌더하도록 직접 구현했습니다.",
            },
          ],
        },
      ],
      tasks: [
        "프론트엔드 설계부터 고객사 온프레미스 배포까지 단독 수행",
        "PDF.js 기반 커스텀 PDF 뷰어 구현",
        "코드 스플리팅으로 초기 번들 74% 감소",
        "Docker 이미지 경량화 (2.22GB → 195MB)",
      ],
    },
  } satisfies Record<string, ResumeProject>,
};

export type ResumeProjectKey = keyof typeof RESUME.projects;
export type CompanyKey = keyof typeof RESUME.workExperience.items;
