"use client";

import { ReactNode, useMemo } from "react";
import { cn } from "@/lib/utils";
import Footer from "../ui/footer";
import Header from "../ui/header/header";
import { useSidebar } from "../ui/sidebar";
import { ScrollUpButton } from "../ui/scroll-up-button";

export default function Layout({ children }: { children: ReactNode }) {
  const { isMobile, state } = useSidebar();
  const isNeedShorten = useMemo(
    () => state === "expanded" && !isMobile,
    [state, isMobile],
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
