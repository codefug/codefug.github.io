import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import Layout from "@/components/layout";
import { SidebarShell } from "@/components/layout/sidebar-shell";
import { createAlternateLinks } from "@/components/seo/utils";
import Sidebar from "@/components/sidebar";
import { SITE_URL } from "@/constants/site";
import { getFrontMatterList } from "@/lib/posts";
import koMessages from "@/messages/ko.json";
import ThemeProvider from "@/provider/theme-provider";
import "./globals.css";

const metaMessages = koMessages.meta;

// 전체 글리프를 담은 가변 폰트 단일 파일을 self-host한다.
// Google Fonts의 한글 폰트는 unicode-range 조각 ~120개로 쪼개져 있어,
// 로딩 중 같은 문장 안에서 글자별로 볼드가 갈려 보이는 문제가 있었다.
// weight 범위를 명시하지 않으면 WebKit에서 굵기가 잘못 렌더링될 수 있다.
const pretendard = localFont({
  src: "../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  weight: "45 920",
  variable: "--font-pretendard",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: metaMessages.title,
  description: metaMessages.description,
  keywords: metaMessages.keywords.split(", "),
  authors: [{ name: "Codefug" }],
  creator: "Codefug",
  publisher: "Codefug",
  metadataBase: new URL(SITE_URL),
  alternates: createAlternateLinks("/"),
  openGraph: {
    title: metaMessages.openGraph.title,
    description: metaMessages.openGraph.description,
    url: SITE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: metaMessages.openGraph.title,
    description: metaMessages.openGraph.description,
  },
};

function SidebarWrapper() {
  const frontMatterList = getFrontMatterList();
  return <Sidebar frontMatterList={frontMatterList} />;
}

/** 글이 있는 태그만 내비게이션 메뉴에 세운다. (빈 카테고리는 페이지가 없다) */
function usedTags(): string[] {
  return [...new Set(getFrontMatterList().flatMap((post) => post.categories))];
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/me.jpg"
          fetchPriority="high"
        />
      </head>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarShell>
            <SidebarWrapper />
            <Layout usedTags={usedTags()}>{children}</Layout>
          </SidebarShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
