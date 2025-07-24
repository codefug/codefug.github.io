import createMDX from "@next/mdx";
import { NextConfig } from "next";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webpack(config: any) {
    // Grab the existing rule that handles SVG imports
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fileLoaderRule = config.module?.rules?.find((rule: any) =>
      rule?.test?.test?.(".svg"),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

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
