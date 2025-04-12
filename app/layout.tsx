import AppSidebar from "@/components/ui/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import ThemeProvider from "@/provider/theme-provider";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "block",
});

export const metadata: Metadata = {
  title: "Codefug Blog",
  description: "project experiences and development notes",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <main className="min-h-screen w-full">
              <div className="mx-auto max-w-[1400px] px-4">{children}</div>
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
