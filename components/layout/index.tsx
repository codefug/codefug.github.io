"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, useMemo } from "react";
import { PATH } from "@/constants/path";
import { cn } from "@/lib/utils";
import Footer from "../ui/footer";
import Header from "../ui/header/header";
import { ScrollUpButton } from "../ui/scroll-up-button";
import { useSidebar } from "../ui/sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { isMobile, state } = useSidebar();
  const isNeedShorten = useMemo(
    () => state === "expanded" && !isMobile,
    [state, isMobile],
  );

  // portfolio 페이지에서는 children만 렌더링
  if (pathname.startsWith(PATH.PORTFOLIO))
    return (
      <main
        id="main-content"
        className={cn(
          "flex min-h-screen w-full flex-col transition-[width] duration-200 ease-linear",
        )}
      >
        {children}
      </main>
    );

  return (
    <main
      id="main-content"
      className={cn(
        "flex min-h-screen flex-col transition-[width] duration-200 ease-linear",
        isNeedShorten ? "w-[calc(100%-var(--sidebar-width))]" : "w-full",
      )}
    >
      <Header />
      <div className="mx-auto w-full max-w-[1400px] flex-1 px-4">
        {children}
      </div>
      <ScrollUpButton />
      <Footer />
    </main>
  );
}
