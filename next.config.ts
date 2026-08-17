import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Allow trailing slashes in URLs
  trailingSlash: true,
  images: {
    // 정적 익스포트라 이미지 최적화 서버가 없다. 원본을 그대로 내보낸다.
    // (unoptimized면 커스텀 loader는 호출되지 않으므로 두지 않는다.)
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
  assetPrefix:
    process.env.NODE_ENV === "production" ? "https://codefug.github.io" : "",
  output: "export",
};

// Turbopack 호환: 플러그인은 문자열(모듈 이름)로 지정해야 직렬화 가능
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug", "rehype-highlight"],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
