import type { Graph } from "schema-dts";

const BASE_URL = "https://codefug.github.io";

export interface BlogPostData {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  thumbnailImageUrl?: string;
}

export function createBlogPostStructuredData(data: BlogPostData): Graph {
  const blogUrl = `${BASE_URL}/posts/${data.id}`;
  const imageUrl = data.thumbnailImageUrl
    ? `${BASE_URL}${data.thumbnailImageUrl}`
    : `${BASE_URL}/images/main-logo.png`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${blogUrl}#blogposting`,
        url: blogUrl,
        headline: data.title,
        description: data.excerpt,
        image: [imageUrl],
        author: {
          "@type": "Person",
          name: "이승현",
          url: BASE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "Codefug Blog",
          url: BASE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${BASE_URL}/images/main-logo.png`,
          },
        },
        datePublished: new Date(data.date).toISOString(),
        dateModified: new Date(data.date).toISOString(),
        inLanguage: "ko-KR",
        mainEntityOfPage: blogUrl,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${blogUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": BASE_URL,
              name: "홈",
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@id": `${BASE_URL}/posts`,
              name: "블로그",
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@id": blogUrl,
              name: data.title,
            },
          },
        ],
      },
    ],
  };
}

export function createWebSiteStructuredData() {
  return {
    "@context": "https://schema.org" as const,
    "@type": "WebSite" as const,
    name: "Codefug Blog",
    description: "프로젝트 경험과 개발 노트를 공유하는 블로그",
    url: BASE_URL,
    inLanguage: "ko-KR",
    publisher: {
      "@type": "Person" as const,
      name: "이승현",
      url: BASE_URL,
    },
    potentialAction: {
      "@type": "SearchAction" as const,
      target: {
        "@type": "EntryPoint" as const,
        urlTemplate: `${BASE_URL}/search?query={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function createProfilePageStructuredData() {
  return {
    "@context": "https://schema.org" as const,
    "@type": "ProfilePage" as const,
    mainEntity: {
      "@type": "Person" as const,
      name: "이승현",
      alternateName: "codefug",
      description: "Web Frontend Developer",
      url: BASE_URL,
      image: `${BASE_URL}/images/main-logo.png`,
      jobTitle: "Frontend Developer",
      worksFor: {
        "@type": "Organization" as const,
        name: "올라",
      },
      alumniOf: [
        {
          "@type": "EducationalOrganization" as const,
          name: "중앙대학교",
        },
      ],
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Frontend Development",
        "Web Development",
      ],
      sameAs: ["https://github.com/codefug"],
    },
  };
}
