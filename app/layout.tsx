import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { JetBrains_Mono, Noto_Sans_KR } from "next/font/google";
import type { ReactNode } from "react";
import Layout from "@/components/layout";
import { createAlternateLinks } from "@/components/seo/utils";
import Sidebar from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SITE_URL } from "@/constants/site";
import { getFrontMatterList } from "@/lib/posts";
import koMessages from "@/messages/ko.json";
import ThemeProvider from "@/provider/theme-provider";
import "./globals.css";

const metaMessages = koMessages.meta;

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
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
      className={`${notoSansKr.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={false}>
            <SidebarWrapper />
            <Layout usedTags={usedTags()}>{children}</Layout>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
