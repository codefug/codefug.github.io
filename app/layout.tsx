import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Gothic_A1 } from "next/font/google";
import { type ReactNode, Suspense } from "react";
import Layout from "@/components/layout";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { createAlternateLinks } from "@/components/seo/utils";
import Sidebar from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
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

function SidebarWrapper() {
  const frontMatterListByLocale = getFrontMatterListForAllLocales();
  return <Sidebar frontMatterListByLocale={frontMatterListByLocale} />;
}

function SidebarSkeleton() {
  return (
    <div className="fixed inset-y-0 z-10 hidden h-svh w-64 bg-sidebar md:flex">
      <div className="flex h-full w-full flex-col p-4">
        <Skeleton className="mx-auto h-40 w-40 rounded-full" />
        <Skeleton className="mx-auto mt-4 h-6 w-32" />
        <Skeleton className="mx-auto mt-2 h-4 w-24" />
        <div className="mt-8 space-y-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
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
              <Suspense fallback={<SidebarSkeleton />}>
                <SidebarWrapper />
              </Suspense>
              <Layout>{children}</Layout>
            </SidebarProvider>
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
