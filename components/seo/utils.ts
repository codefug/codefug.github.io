import type { Metadata } from "next";
import type { Graph } from "schema-dts";
import { type Locale, locales } from "@/i18n/config";
import enMessages from "@/messages/en.json";
import koMessages from "@/messages/ko.json";

const BASE_URL = "https://codefug.github.io";

const messages = {
  ko: koMessages,
  en: enMessages,
};

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
  category?: string;
  keywords?: string[];
  modifiedDate?: string;
  wordCount?: number;
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
        image: {
          "@type": "ImageObject",
          url: imageUrl,
          width: "1200",
          height: "630",
        },
        author: {
          "@type": "Person",
          name: messages[locale].seo.author,
          url: BASE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "Codefug Blog",
          url: BASE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${BASE_URL}/images/main-logo.png`,
            width: "512",
            height: "512",
          },
        },
        datePublished: new Date(data.date).toISOString(),
        dateModified: data.modifiedDate
          ? new Date(data.modifiedDate).toISOString()
          : new Date(data.date).toISOString(),
        inLanguage: getHreflangCode(locale),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": blogUrl,
        },
        ...(data.category && { articleSection: data.category }),
        ...(data.keywords &&
          data.keywords.length > 0 && { keywords: data.keywords }),
        ...(data.wordCount && { wordCount: data.wordCount }),
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
              name: messages[locale].seo.home,
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@id": `${BASE_URL}/posts`,
              name: messages[locale].seo.blog,
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
    description: messages[locale].meta.description,
    url: BASE_URL,
    inLanguage: getHreflangCode(locale),
    publisher: {
      "@type": "Person" as const,
      name: messages[locale].seo.author,
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

export function createProfilePageStructuredData(locale: Locale = "ko") {
  return {
    "@context": "https://schema.org" as const,
    "@type": "ProfilePage" as const,
    mainEntity: {
      "@type": "Person" as const,
      name: messages[locale].seo.author,
      alternateName: "codefug",
      description: messages[locale].portfolio.intro,
      url: BASE_URL,
      image: `${BASE_URL}/images/main-logo.png`,
      jobTitle: "Web Frontend Developer",
      worksFor: {
        "@type": "Organization" as const,
        name: "Allra Fintech",
        url: "https://www.allra.kr",
      },
      alumniOf: [
        {
          "@type": "EducationalOrganization" as const,
          name: locale === "ko" ? "인천대학교" : "Incheon National University",
        },
        {
          "@type": "EducationalOrganization" as const,
          name:
            locale === "ko"
              ? "코드잇 스프린트 FE 부트캠프"
              : "Codeit Sprint FE Bootcamp",
        },
      ],
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Frontend Development",
        "Web Development",
        "Zustand",
        "Tanstack Query",
        "Playwright",
        "Testing",
        "CI/CD",
      ],
      sameAs: [
        "https://github.com/codefug",
        "https://www.linkedin.com/in/lee-seung-hyun-568565269/",
        "https://www.instagram.com/happy_fug/",
      ],
    },
  };
}
