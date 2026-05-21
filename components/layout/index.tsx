"use client";

import { type ReactNode, useMemo } from "react";
import { cn } from "@/lib/utils";
import Footer from "../ui/footer";
import Header from "../ui/header/header";
import { ScrollUpButton } from "../ui/scroll-up-button";
import { useSidebar } from "../ui/sidebar";

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
      <div className="flex-1">{children}</div>
      <ScrollUpButton />
      <Footer />
    </main>
  );
}
