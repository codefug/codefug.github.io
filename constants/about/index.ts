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
          alt: "Playwright",
          src: "https://img.shields.io/badge/playwright-%232EAD33.svg?style=for-the-badge&logo=playwright&logoColor=white",
        },
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
      subtitle: "Analytics / Monitoring",
      list: [
        {
          alt: "Mixpanel",
          src: "https://img.shields.io/badge/mixpanel-%237856FF.svg?style=for-the-badge&logo=mixpanel&logoColor=white",
        },
        {
          alt: "Datadog",
          src: "https://img.shields.io/badge/datadog-%23632CA6.svg?style=for-the-badge&logo=datadog&logoColor=white",
        },
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
    {
      subtitle: "Cloud",
      list: [
        {
          alt: "AWS",
          src: "https://img.shields.io/badge/aws-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white",
        },
      ],
    },
  ],
};

export const PROJECTS = [
  {
    key: "allra" as const,
    title: "Allra",
    role: "Web Frontend Developer",
    image: "/images/logos/allra-logo.webp",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Tanstack Query",
      "Axios",
      "Playwright",
      "Storybook",
      "React Testing Library",
      "Jest",
      "GitHub Actions",
      "Mixpanel",
      "Datadog",
    ],
  },
  {
    key: "digitalFinance" as const,
    title: "Digital Finance",
    role: "Web Frontend Developer",
    image: "/images/logos/pwc-logo.svg",
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
  },
  {
    key: "documentAi" as const,
    title: "Document AI",
    role: "Web Frontend Developer",
    image: "/images/logos/pwc-logo.svg",
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
  },
  {
    key: "designSystem" as const,
    title: "SamilDevKit Design System",
    role: "Web Frontend Developer",
    image: "/images/logos/pwc-logo.svg",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Storybook"],
  },
];

export const SIDE_PROJECTS = [
  {
    key: "reindeer" as const,
    title: "순록의 편지",
    duration: "2024.12.02 ~ 2025.01.20",
    role: "Web Frontend Developer",
    image: "/images/logos/reindeer-logo.png",
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
  },
  {
    key: "kkomKkom" as const,
    title: "꼼꼼",
    duration: "2024-07-26 ~ 2024-09-20",
    role: "Web Frontend Developer",
    image: "/images/logos/kkom-kkom-logo.png",
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
  },
  {
    key: "ghepay" as const,
    title: "급페이",
    duration: "2024.06.20 ~ 2024.07.07",
    image: "/images/logos/ghepay-logo.png",
    role: "Web Frontend Developer",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Axios",
      "Github Actions",
      "MSW",
      "yarn",
    ],
  },
  {
    key: "fandomK" as const,
    title: "Fandom-k",
    duration: "2024.04.30 ~ 2024.05.17",
    image: "/images/logos/fandom-k-logo.jpg",
    role: "Web Frontend Developer",
    stack: [
      "React",
      "TypeScript",
      "Tanstack Query",
      "Recoil",
      "Tailwind CSS",
      "Vercel",
      "GitHub Actions",
    ],
  },
];

export const EDUCATION = [
  {
    titleKey: "inu" as const,
    duration: "2017.03 ~ 2024.08",
    image: "/images/logos/inu-logo.png",
    descriptionKey: "inu" as const,
  },
  {
    titleKey: "codeit" as const,
    duration: "2024.03 ~ 2024.09",
    image: "/images/logos/codeit-logo.png",
    descriptionKey: "codeit" as const,
  },
];

export const STUDY_GROUPS = [
  {
    title: "프론트엔드 최적화",
    duration: "2025.12 ~ (진행중)",
  },
  {
    title: "AWS",
    duration: "2025.10 ~ 2025.12",
  },
  {
    title: "타입스크립트 우아하게 쓰기",
    duration: "2025.07 ~ 2025.10",
  },
  {
    title: "리액트 디자인 패턴과 테스팅",
    duration: "2025.04 ~ 2025.07",
  },
  {
    title: "코딩테스트",
    duration: "2024.09 ~ 2025.07",
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
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/lee-seung-hyun-568565269/",
    descriptionKey: "linkedin" as const,
  },
  {
    title: "인스타",
    url: "https://www.instagram.com/happy_fug/",
    descriptionKey: "instagram" as const,
  },
  {
    title: "GitHub",
    url: "https://github.com/codefug",
    descriptionKey: "github" as const,
  },
  {
    title: "블로그",
    url: "/",
    descriptionKey: "blog" as const,
  },
];

// GROWTH_JOURNEY는 이제 메시지 파일에서 관리됩니다
