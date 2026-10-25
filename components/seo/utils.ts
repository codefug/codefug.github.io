import type { Metadata } from "next";
import type { Graph } from "schema-dts";
import {
  AUTHOR_NAME,
  SITE_URL as BASE_URL,
  GITHUB_URL,
  SITE_DESCRIPTION,
  SITE_TITLE,
} from "@/constants/site";
import { RESUME } from "@/content/resume";
import type { FrontMatter } from "@/types/post";

// 하위 세그먼트의 openGraph는 상위와 병합되지 않고 통째로 교체되므로 공통값을 매번 펼쳐 넣는다.
export const defaultOpenGraph = {
  siteName: SITE_TITLE,
  locale: "ko_KR",
} satisfies Metadata["openGraph"];

export function createAlternateLinks(path: string): Metadata["alternates"] {
  const url = `${BASE_URL}${path}`;

  return {
    canonical: url,
  };
}

interface BlogPostData {
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
          name: AUTHOR_NAME,
          url: BASE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_TITLE,
          url: BASE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${BASE_URL}/images/me.jpg`,
            width: "512",
            height: "512",
          },
        },
        datePublished: new Date(data.date).toISOString(),
        dateModified: new Date(data.date).toISOString(),
        inLanguage: "ko-KR",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": blogUrl,
        },
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
              name: "홈",
            },
          },
          {
            "@type": "ListItem",
            position: 2 as const,
            item: {
              "@id": `${BASE_URL}/posts`,
              name: "블로그",
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

export function createProfilePageStructuredData(path: string) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "ProfilePage" as const,
    "@id": `${BASE_URL}${path}#profilepage`,
    url: `${BASE_URL}${path}`,
    name: AUTHOR_NAME,
    inLanguage: "ko-KR",
    mainEntity: {
      "@type": "Person" as const,
      "@id": `${BASE_URL}#author`,
      name: AUTHOR_NAME,
      alternateName: "codefug",
      description: RESUME.summary,
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
        GITHUB_URL,
        "https://www.linkedin.com/in/lee-seung-hyun-568565269/",
        "https://www.instagram.com/happy_fug/",
      ],
    },
  };
}

export function createBlogItemListStructuredData(posts: FrontMatter[]): Graph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${BASE_URL}#website`,
        name: SITE_TITLE,
        alternateName: "codefug",
        description: SITE_DESCRIPTION,
        url: BASE_URL,
        inLanguage: "ko-KR",
        author: {
          "@type": "Person",
          "@id": `${BASE_URL}#author`,
          name: AUTHOR_NAME,
        },
        publisher: {
          "@type": "Person",
          "@id": `${BASE_URL}#author`,
          name: AUTHOR_NAME,
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
                name: AUTHOR_NAME,
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
