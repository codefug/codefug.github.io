import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import { SITE_URL } from "./constants/site";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  trailingSlash: true,
  images: {
    // 정적 익스포트라 최적화 서버가 없다. unoptimized면 커스텀 loader도 호출되지 않는다.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "readme-typing-svg.demolab.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "github-profile-trophy.vercel.app",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.shields.io",
        pathname: "/**",
      },
    ],
  },
  assetPrefix: process.env.NODE_ENV === "production" ? SITE_URL : "",
  output: "export",
};

// Turbopack 호환: 플러그인은 문자열(모듈 이름)로 지정해야 직렬화 가능
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug", "rehype-highlight"],
  },
});

export default withMDX(nextConfig);
