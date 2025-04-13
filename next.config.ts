import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
  images: {
    unoptimized: true,
    loader: "imgix",
    path: "https://codefug.github.io",
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

const withMDX = createMDX({
  // add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
