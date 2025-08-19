export const SKILLS = {
  strong: [
    {
      subtitle: "Framework / Library",
      list: [
        {
          alt: "React",
          src: "https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB",
        },
        {
          alt: "Next.js",
          src: "https://img.shields.io/badge/next.js-%23000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white",
        },
      ],
    },
    {
      subtitle: "Language",
      list: [
        {
          alt: "TypeScript",
          src: "https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white",
        },
        {
          alt: "JavaScript",
          src: "https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black",
        },
      ],
    },
    {
      subtitle: "State Management",
      list: [
        {
          alt: "Zustand",
          src: "https://img.shields.io/badge/zustand-%23000000.svg?style=for-the-badge&logo=react&logoColor=white",
        },
        {
          alt: "Tanstack Query",
          src: "https://img.shields.io/badge/-TanStack%20Query-%23FF4154?style=for-the-badge&logo=react-query&logoColor=white",
        },
      ],
    },
    {
      subtitle: "Testing",
      list: [
        {
          alt: "MSW",
          src: "https://img.shields.io/badge/mock%20service%20worker-%23E33332.svg?style=for-the-badge&logo=msw&logoColor=white",
        },
        {
          alt: "React Testing Library",
          src: "https://img.shields.io/badge/-Testing%20Library-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white",
        },
        {
          alt: "Jest",
          src: "https://img.shields.io/badge/jest-%23C21325.svg?style=for-the-badge&logo=jest&logoColor=white",
        },
      ],
    },
    {
      subtitle: "Styling",
      list: [
        {
          alt: "Tailwind CSS",
          src: "https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white",
        },
        {
          alt: "CSS Modules",
          src: "https://img.shields.io/badge/css%20modules-%23E8E8E8.svg?style=for-the-badge&logo=css-modules&logoColor=black",
        },
      ],
    },
    {
      subtitle: "CI / CD",
      list: [
        {
          alt: "GitHub Actions",
          src: "https://img.shields.io/badge/githubactions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white",
        },
        {
          alt: "Docker",
          src: "https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white",
        },
        {
          alt: "Docker Compose",
          src: "https://img.shields.io/badge/docker%20compose-%232496ED.svg?style=for-the-badge&logo=docker&logoColor=white",
        },
        {
          alt: "Vercel",
          src: "https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white",
        },
        {
          alt: "Netlify",
          src: "https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=white",
        },
      ],
    },
  ],
  knowledgeable: [
    {
      subtitle: "CSS",
      list: [
        {
          alt: "Styled Components",
          src: "https://img.shields.io/badge/styled--components-%23db7093.svg?style=for-the-badge&logo=styled-components&logoColor=white",
        },
        {
          alt: "Sass",
          src: "https://img.shields.io/badge/sass-%23CC6699.svg?style=for-the-badge&logo=sass&logoColor=white",
        },
      ],
    },
    {
      subtitle: "Component Doc",
      list: [
        {
          alt: "Storybook",
          src: "https://img.shields.io/badge/storybook-%23FF4785.svg?style=for-the-badge&logo=storybook&logoColor=white",
        },
      ],
    },
    {
      subtitle: "Framework",
      list: [
        {
          alt: "Express",
          src: "https://img.shields.io/badge/express-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB",
        },
      ],
    },
    {
      subtitle: "Database",
      list: [
        {
          alt: "MongoDB",
          src: "https://img.shields.io/badge/mongodb-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white",
        },
      ],
    },
    {
      subtitle: "GTM / GA",
      list: [
        {
          alt: "Google Tag Manager",
          src: "https://img.shields.io/badge/google%20tag%20manager-4285F4?style=for-the-badge&logo=google-tag-manager&logoColor=white",
        },
        {
          alt: "Google Analytics",
          src: "https://img.shields.io/badge/google%20analytics-E37400?style=for-the-badge&logo=google-analytics&logoColor=white",
        },
      ],
    },
  ],
};

export const PROJECTS = [
  {
    title: "Digital Finance",
    role: "Web Frontend Developer",
    image: "/images/logos/pwc-logo.svg",
    description: "서비스 통합 관리 포털 서비스",
    stack: [
      "React (Vite)",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "React Router",
      "Axios",
      "Tanstack Query",
      "GitHub Actions",
      "Docker",
    ],
    features: [
      "CRA 기반 프로젝트를 Vite로 마이그레이션하여 보안 리스크 제거 및 빌드 속도 향상",
      "Rollup 최적화를 통해 최대 번들 크기 1200kB → 500kB로 58.3% 감소",
      "서버 상태와 UI 상태를 분리하여 구조 안정성 및 예측 가능성 향상",
      "기능 기반 폴더 구조로 전환하고 문서화를 통해 유지보수 효율성 향상",
      "사내 CSP 정책 대응을 위해 react-quill-new와 커스텀 모듈 react-quill-resize로 에디터 교체 및 이미지 업로드 안정성 확보",
    ],
  },
  {
    title: "Document AI",
    role: "Web Frontend Developer",
    image: "/images/logos/pwc-logo.svg",
    description: "AI 기반 보고서 분석 솔루션",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Tanstack Query",
      "GitHub Actions",
      "Docker",
      "Docker Compose",
      "Jest",
      "React Testing Library",
    ],
    features: [
      "Canvas API를 활용한 커스텀 PDF Viewer 구현 및 최적화",
      "Web Worker, react-window, 코드 스플리팅으로 초기 렌더링 시간 67% 개선 (5401ms → 1780ms)",
      "CRA 기반 프로젝트를 Vite로 마이그레이션하여 CSP 및 성능 이슈 해결",
      "Rollup 최적화로 최대 번들 크기 1200kB → 500kB로 58.3% 감소",
      "멀티 스테이지 빌드와 Standalone 모드 적용으로 Docker 이미지 용량 2.22GB → 195MB로 91.36% 감소",
      "불필요한 모듈 제거 및 dynamic import로 번들 크기 302kB → 143kB로 73.5% 감소",
    ],
  },
  {
    title: "SamilDevKit Design System",
    role: "Web Frontend Developer",
    image: "/images/logos/pwc-logo.svg",
    description:
      "사내 디자인 통일성과 개발 생산성 강화를 위한 디자인 시스템 구축",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Storybook"],
    features: [
      "clsx, cva 도입을 주도하며 조건부 스타일링 및 클래스 네이밍 일관성 확보",
      "반복되는 컴포넌트 패턴을 모듈화하여 재사용성 강화",
      "ESLint, TypeScript 설정 정비 및 문서화로 개발 품질 향상 및 팀 내 코드 일관성 확보",
      "의존성 업데이트 및 보안 취약점 대응을 통해 프로젝트 안정성 강화",
    ],
  },
  {
    title: "순록의 편지",
    duration: "2024.12.02 ~ 2025.01.20",
    role: "Web Frontend Developer",
    image: "/images/logos/reindeer-logo.png",
    description:
      "연말에 본인과 타인에게 음성 및 글 형태로 예약 편지를 작성·전달할 수 있는 서비스",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Axios",
      "Github-Action",
      "MSW",
      "GTM/GA",
      "pnpm",
    ],
    features: [
      "AbortController를 적용해 요청 중단과 에러 관리를 체계화, 네트워크 안정성과 사용자 경험을 개선",
      "서버 상태를 관리하는 훅으로 연결하여 개발자 경험 향상",
      "크롬 브라우저로 전환하는 기능을 구현하여 인앱 브라우저 제약 해결",
      "react-window를 활용해 List Virtualization 적용, 성능 최적화 및 렌더링 시간 약 80% 감소",
    ],
  },
  {
    title: "꼼꼼",
    duration: "2024-07-26 ~ 2024-09-20",
    role: "Web Frontend Developer",
    image: "/images/logos/kkom-kkom-logo.png",
    description:
      "팀을 구성하고 일정을 관리하여 꼼꼼이가 되는 서비스, 부트 캠프 최종 프로젝트",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Tanstack Query",
      "Github-Action",
      "Storybook",
      "GTM/GA",
      "pnpm",
    ],
    features: [
      "zustand 기반 useOverlay 커스텀 훅을 통한 오버레이 시스템 개발",
      "서버 액션을 활용하여 refresh token rotation을 위한 fetch 함수 구현",
      "streaming 방식과 낙관적 업데이트, 무한 스크롤이 결합된 쿼리 관리",
      "startTransition에 대한 이해, progress bar 구현을 통한 부드러운 상태 전환 UX 구현",
    ],
  },
  {
    title: "급페이",
    duration: "2024.06.20 ~ 2024.07.07",
    image: "/images/logos/ghepay-logo.png",
    role: "Web Frontend Developer",
    description:
      "급하게 일손이 필요한 자리에 더 많은 시급을 제공해서 아르바이트생을 구할 수 있는 서비스",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Axios",
      "Github Actions",
      "MSW",
      "yarn",
    ],
    features: [
      "전역 상태를 걷어내고 서버 쿠키를 활용하여 최근 본 공고 구현",
      "알림창 무한 스크롤 mock fetching를 위한 MSW 연동",
      "vercel CLI와 github action을 이용한 vercel organization 무료 자동 배포",
      "미들웨어와 쿠키를 활용한 계정 분기 처리",
    ],
  },
  {
    title: "Fandom-k",
    duration: "2024.04.30 ~ 2024.05.17",
    image: "/images/logos/fandom-k-logo.jpg",
    role: "Web Frontend Developer",
    description:
      "좋아하는 아이돌을 투표하고 후원할 수 있는 서비스, 첫번째 리액트 프로젝트",
    stack: [
      "React",
      "TypeScript",
      "Tanstack Query",
      "Recoil",
      "Tailwind CSS",
      "Vercel",
      "GitHub Actions",
    ],
    features: [
      "Interception observer API를 활용하여 무한 스크롤 구현",
      "router 이동시 스크롤을 상단 고정하는 공통 컴포넌트 구현",
      "Github Action을 이용한 Netlify 자동 배포",
    ],
  },
];

export const EDUCATION = [
  {
    title: "인천대학교 졸업",
    duration: "2017.03 ~ 2024.08",
    image: "/images/logos/inu-logo.png",
    description: `인천대학교에서 영어영문학과와 컴퓨터공학과를 복수전공하며 학습하였습니다.
      총 학점: 3.7 
      컴퓨터공학 전공 학점: 4.02
    `,
  },
  {
    title: "코드잇 스프린트 FE 부트캠프",
    duration: "2024.03 ~ 2024.09",
    image: "/images/logos/codeit-logo.png",
    description: `코드잇 스프린트 FE 부트캠프에서 6개월간 집중적으로 프론트엔드 개발을 학습하였습니다.
      다양한 도구와 기술을 활용하여 실제 프로젝트를 통해 협업 경험과 문제 해결 능력을 키웠습니다.
    `,
  },
];

export const STUDY_GROUPS = [
  {
    title: "타입스크립트 우아하게 쓰기",
    duration: "2024.07 ~ (진행중)",
  },
  {
    title: "리액트 디자인 패턴과 테스팅",
    duration: "2025.04 ~ 2025.07",
  },
  {
    title: "코딩테스트",
    duration: "2024.09 ~ (진행중)",
  },
  {
    title: "CS 스터디",
    duration: "2024.07 ~ 2024.08",
    url: "https://github.com/FE-tech-talk/TechTalk-CS",
  },
  {
    title: "모던 리액트 딥다이브",
    duration: "2024.05 ~ 2024.07",
    url: "https://github.com/FE-tech-talk/TechTalk-React",
  },
  {
    title: "코어 자바스크립트",
    duration: "2024.04 ~ 2024.05",
    url: "https://github.com/FE-tech-talk/codeit14_techtalk",
  },
];

export const CONTACTS = [
  {
    title: "인스타",
    url: "https://www.instagram.com/happy_fug/",
    description: "codefug의 일상 구경하기",
  },
  {
    title: "GitHub",
    url: "https://github.com/codefug",
    description: "codefug의 세련된 깃허브 구경하기",
  },
  {
    title: "블로그",
    url: "/",
    description: "codefug가 연구중인 자료 탐구하기",
  },
];

export const GROWTH_JOURNEY = `
  - 고등학교 시절, 하고 싶은 일을 찾기 위해 학습에 처음으로 진지하게 임하게 되었고, 그 과정에서 꾸준함과 자기 주도성의 중요함을 체득했습니다.
  \n- 대학교에서는 여러 사람들 앞에서 발표하는 활동을 통해 소통의 즐거움을 배웠고, 지식 공유에 흥미를 느끼게 되었습니다. 이는 개발자로서 동료와 사용자 모두와 소통하는 데 큰 자산이 되었습니다.
  \n- VR 테마파크에서 일하면서, 기획과 프로그램 변경이 사용자 경험에 어떤 영향을 미치는지를 현장에서 체감했습니다. 이때 '사용자에 맞닿은 개발'의 중요성을 느꼈고, 프론트엔드 개발에 관심을 갖게 되었습니다.
  \n- 이후 부트캠프에서 본격적으로 프론트엔드 기술을 익히며, 일상 속 문제를 코드로 해결하고 싶은 열망이 생겼습니다. 기술과 사람을 연결하는 개발자가 되고 싶어 더욱 몰입하게 되었고, 지금은 그 여정을 이어가고 있습니다.
`;
