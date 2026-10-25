import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/site";

// 정적 robots.txt는 도메인이 박혀 있어, sitemap.ts와 같은 SITE_URL로 생성한다.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
