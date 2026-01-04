import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Gothic_A1 } from "next/font/google";
import type { ReactNode } from "react";
import Layout from "@/components/layout";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { createAlternateLinks } from "@/components/seo/utils";
import Sidebar from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { defaultLocale } from "@/i18n/config";
import { getFrontMatterListForAllLocales } from "@/lib/posts";
import koMessages from "@/messages/ko.json";
import ThemeProvider from "@/provider/theme-provider";
import "./globals.css";

const metaMessages = koMessages.meta;

const gothicA1 = Gothic_A1({
  variable: "--gothic-a1",
  weight: "500",
  subsets: ["latin"],
  display: "block",
});

export const metadata: Metadata = {
  title: metaMessages.title,
  description: metaMessages.description,
  keywords: metaMessages.keywords.split(", "),
  authors: [{ name: "Codefug" }],
  creator: "Codefug",
  publisher: "Codefug",
  metadataBase: new URL("https://codefug.github.io"),
  alternates: createAlternateLinks("/"),
  openGraph: {
    title: metaMessages.openGraph.title,
    description: metaMessages.openGraph.description,
    url: "https://codefug.github.io",
    type: "website",
    images: [
      {
        url: "/images/main-logo.png",
        alt: "Codefug Blog",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const frontMatterListByLocale = getFrontMatterListForAllLocales();

  return (
    <html lang={defaultLocale} suppressHydrationWarning>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />
      <body className={`${gothicA1.className} antialiased`}>
        <LocaleProvider initialMessages={koMessages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider defaultOpen={false}>
              <Sidebar frontMatterListByLocale={frontMatterListByLocale} />
              <Layout>{children}</Layout>
            </SidebarProvider>
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
