import { GoogleTagManager } from "@next/third-parties/google";
import { uniq } from "es-toolkit";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { SidebarShell } from "@/components/layout/sidebar-shell";
import SiteLayout from "@/components/layout/site-layout";
import { createAlternateLinks } from "@/components/seo/utils";
import AppSidebar from "@/components/sidebar/app-sidebar";
import {
  AUTHOR_NAME,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_TITLE,
  SITE_URL,
} from "@/constants/site";
import { getFrontMatterList } from "@/lib/posts";
import ThemeProvider from "@/provider/theme-provider";
import "./globals.css";

// Google Fonts 한글은 unicode-range 조각으로 쪼개져 로딩 중 글자별로 굵기가 갈려 보여, 단일 가변 폰트를 self-host한다.
// weight 범위를 명시하지 않으면 WebKit에서 굵기가 잘못 렌더링된다.
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
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: AUTHOR_NAME }],
  creator: AUTHOR_NAME,
  publisher: AUTHOR_NAME,
  metadataBase: new URL(SITE_URL),
  alternates: createAlternateLinks("/"),
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

/** 글이 있는 태그만 내비게이션 메뉴에 세운다. (빈 카테고리는 페이지가 없다) */
function usedTags(): string[] {
  return uniq(getFrontMatterList().flatMap((post) => post.categories));
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
            <AppSidebar frontMatterList={getFrontMatterList()} />
            <SiteLayout usedTags={usedTags()}>{children}</SiteLayout>
          </SidebarShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
