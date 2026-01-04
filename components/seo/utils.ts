import type { Metadata } from "next";
import type { Graph } from "schema-dts";
import { type Locale, locales } from "@/i18n/config";

const BASE_URL = "https://codefug.github.io";

/**
 * 언어 코드를 hreflang 형식으로 변환
 */
function getHreflangCode(locale: Locale): string {
  const localeMap: Record<Locale, string> = {
    ko: "ko-KR",
    en: "en-US",
  };
  return localeMap[locale];
}

/**
 * 페이지의 alternate links를 생성하는 함수
 * SSG 모드에서는 같은 URL에 대해 언어별 alternate를 생성
 */
export function createAlternateLinks(
  path: string,
  includeXDefault = true,
): Metadata["alternates"] {
  const url = `${BASE_URL}${path}`;
  const languages: Record<string, string> = {};

  locales.forEach((locale) => {
    languages[getHreflangCode(locale)] = url;
  });

  return {
    canonical: url,
    languages: includeXDefault
      ? {
          ...languages,
          "x-default": url, // 기본 언어(한국어)를 x-default로 지정
        }
      : languages,
  };
}

export interface BlogPostData {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  thumbnailImageUrl?: string;
}

export function createBlogPostStructuredData(
  data: BlogPostData,
  locale: Locale = "ko",
): Graph {
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
        inLanguage: getHreflangCode(locale),
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

export function createWebSiteStructuredData(locale: Locale = "ko") {
  return {
    "@context": "https://schema.org" as const,
    "@type": "WebSite" as const,
    name: "Codefug Blog",
    description:
      locale === "ko"
        ? "프로젝트 경험과 개발 노트를 공유하는 블로그"
        : "A blog sharing project experiences and development notes",
    url: BASE_URL,
    inLanguage: getHreflangCode(locale),
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
