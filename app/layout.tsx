import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Gothic_A1 } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { ReactNode } from "react";
import Layout from "@/components/layout";
import Sidebar from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import getFrontMatterList from "@/lib/posts";
import ThemeProvider from "@/provider/theme-provider";
import "./globals.css";

const gothicA1 = Gothic_A1({
  variable: "--gothic-a1",
  weight: "500",
  subsets: ["latin"],
  display: "block",
});

export const metadata: Metadata = {
  title: "Codefug Blog",
  description: "프로젝트 경험과 개발 노트를 공유하는 블로그",
  keywords: [
    "개발",
    "프로그래밍",
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "블로그",
  ],
  authors: [{ name: "Codefug" }],
  creator: "Codefug",
  publisher: "Codefug",
  metadataBase: new URL("https://codefug.github.io"),
  openGraph: {
    title: "Codefug Blog",
    description: "project experiences and development notes",
    url: "https://codefug-blog.vercel.app",
    type: "website",
    images: [
      {
        url: "/images/main-logo.png",
        alt: "Codefug Blog",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const messages = await getMessages();
  const totalFrontMatterList = getFrontMatterList();

  return (
    <html lang="ko" suppressHydrationWarning>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />
      <body className={`${gothicA1.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider defaultOpen={false}>
              <Sidebar totalFrontMatterList={totalFrontMatterList} />
              <Layout>{children}</Layout>
            </SidebarProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
