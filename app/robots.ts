import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/site";

// 정적 robots.txt에는 도메인이 박혀 있어 커스텀 도메인으로 옮기면 사이트맵 주소만
// 옛 도메인을 가리킨 채 남는다. sitemap.ts와 같은 상수를 쓰도록 파일로 생성한다.
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
