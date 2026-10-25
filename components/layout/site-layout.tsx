"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { isChromeLessPath } from "@/constants/path";
import { cn } from "@/lib/utils";
import { useSidebar } from "../ui/sidebar";
import Footer from "./footer";
import Header from "./header";
import { ScrollUpButton } from "./scroll-up-button";

export default function SiteLayout({
  usedTags,
  children,
}: {
  usedTags: string[];
  children: ReactNode;
}) {
  const { state } = useSidebar();
  const pathname = usePathname();

  const isChromeLess = isChromeLessPath(pathname);

  return (
    <main
      id="main-content"
      className={cn(
        "flex min-h-screen w-full flex-col transition-[width] duration-200 ease-linear",
        // lg 여부를 JS로 판단하면 서버는 뷰포트를 몰라 하이드레이션 후 폭이 튄다. 그래서 CSS로만 정한다.
        state === "expanded" &&
          "motion-reduce:transition-none lg:w-[calc(100%-var(--sidebar-width))]",
      )}
    >
      {!isChromeLess && <Header usedTags={usedTags} />}
      <div className="flex-1">{children}</div>
      {!isChromeLess && (
        <>
          <ScrollUpButton />
          <Footer />
        </>
      )}
    </main>
  );
}
