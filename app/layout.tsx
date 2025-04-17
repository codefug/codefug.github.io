import AppSidebar from "@/components/ui/app-sidebar";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import ThemeProvider from "@/provider/theme-provider";
import type { Metadata } from "next";
import { Gothic_A1 } from "next/font/google";
import "./globals.css";

const gothicA1 = Gothic_A1({
  variable: "--gothic-a1",
  weight: "500",
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
      <body className={`${gothicA1.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <main className="flex min-h-screen w-full flex-col">
              <Header />
              <div className="mx-auto w-full max-w-[1400px] flex-1 px-4">
                {children}
              </div>
              <Footer />
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
