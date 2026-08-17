import type { Metadata } from "next";
import type { Graph } from "schema-dts";
import type { ParsedFrontMatter } from "@/constants/mdx";
import { SITE_URL as BASE_URL } from "@/constants/site";
import koMessages from "@/messages/ko.json";

/**
 * 하위 세그먼트에서 openGraph를 다시 선언하면 상위 값이 병합되지 않고
 * 통째로 교체된다. 공통으로 유지할 값은 여기에 두고 매번 펼쳐 넣는다.
 */
export const defaultOpenGraph = {
  siteName: koMessages.meta.openGraph.title,
  locale: "ko_KR",
} satisfies Metadata["openGraph"];

/**
 * 페이지의 canonical link를 생성하는 함수
 */
export function createAlternateLinks(path: string): Metadata["alternates"] {
  const url = `${BASE_URL}${path}`;

  return {
    canonical: url,
  };
}

export interface BlogPostData {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  thumbnailImageUrl?: string;
  category?: string;
  tags?: string[];
  modifiedDate?: string;
  wordCount?: number;
}

export function createBlogPostStructuredData(data: BlogPostData): Graph {
  const blogUrl = `${BASE_URL}/posts/${data.id}`;
  const imageUrl = data.thumbnailImageUrl
    ? `${BASE_URL}${data.thumbnailImageUrl}`
    : `${BASE_URL}/images/me.jpg`;

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
          name: koMessages.seo.author,
          url: BASE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "Codefug Blog",
          url: BASE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${BASE_URL}/images/me.jpg`,
            width: "512",
            height: "512",
          },
        },
        datePublished: new Date(data.date).toISOString(),
        dateModified: data.modifiedDate
          ? new Date(data.modifiedDate).toISOString()
          : new Date(data.date).toISOString(),
        inLanguage: "ko-KR",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": blogUrl,
        },
        ...(data.category && { articleSection: data.category }),
        ...(data.tags &&
          data.tags.length > 0 && { keywords: data.tags.join(", ") }),
        ...(data.wordCount && { wordCount: data.wordCount }),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${blogUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1 as const,
            item: {
              "@id": BASE_URL,
              name: koMessages.seo.home,
            },
          },
          {
            "@type": "ListItem",
            position: 2 as const,
            item: {
              "@id": `${BASE_URL}/posts`,
              name: koMessages.seo.blog,
            },
          },
          {
            "@type": "ListItem",
            position: 3 as const,
            name: data.title,
          },
        ],
      },
    ],
  };
}

export function createProfilePageStructuredData(path = "/resume") {
  return {
    "@context": "https://schema.org" as const,
    "@type": "ProfilePage" as const,
    "@id": `${BASE_URL}${path}#profilepage`,
    url: `${BASE_URL}${path}`,
    name: koMessages.seo.author,
    inLanguage: "ko-KR",
    mainEntity: {
      "@type": "Person" as const,
      "@id": `${BASE_URL}#author`,
      name: koMessages.seo.author,
      alternateName: "codefug",
      description: koMessages.resume.summary,
      url: BASE_URL,
      image: {
        "@type": "ImageObject" as const,
        url: `${BASE_URL}/images/me.jpg`,
        width: "512",
        height: "512",
      },
      jobTitle: "Web Frontend Developer",
      worksFor: {
        "@type": "Organization" as const,
        name: "Allra Fintech",
        url: "https://www.allra.kr",
      },
      alumniOf: [
        {
          "@type": "EducationalOrganization" as const,
          name: "인천대학교",
        },
        {
          "@type": "EducationalOrganization" as const,
          name: "코드잇 스프린트 FE 부트캠프",
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

export function createBlogItemListStructuredData(
  posts: ParsedFrontMatter[],
): Graph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${BASE_URL}#website`,
        name: "Codefug Blog",
        alternateName: "코드퍼그 블로그",
        description: koMessages.meta.description,
        url: BASE_URL,
        inLanguage: "ko-KR",
        author: {
          "@type": "Person",
          "@id": `${BASE_URL}#author`,
          name: koMessages.seo.author,
        },
        publisher: {
          "@type": "Person",
          "@id": `${BASE_URL}#author`,
          name: koMessages.seo.author,
        },
        blogPost: posts.slice(0, 10).map((post) => ({
          "@type": "BlogPosting",
          "@id": `${BASE_URL}/posts/${post.id}`,
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${BASE_URL}#blogposts`,
        itemListElement: posts.slice(0, 10).map((post, index) => {
          const imageUrl = post.header?.teaser
            ? `${BASE_URL}${post.header.teaser}`
            : `${BASE_URL}/images/me.jpg`;

          return {
            "@type": "ListItem" as const,
            position: index + 1,
            item: {
              "@type": "BlogPosting" as const,
              "@id": `${BASE_URL}/posts/${post.id}`,
              url: `${BASE_URL}/posts/${post.id}`,
              headline: post.title,
              name: post.title,
              description: post.excerpt,
              image: {
                "@type": "ImageObject" as const,
                url: imageUrl,
                width: "1200",
                height: "630",
              },
              author: {
                "@type": "Person" as const,
                "@id": `${BASE_URL}#author`,
                name: koMessages.seo.author,
                url: BASE_URL,
              },
              datePublished: new Date(post.date).toISOString(),
              inLanguage: "ko-KR",
            },
          };
        }),
      },
    ],
  };
}
