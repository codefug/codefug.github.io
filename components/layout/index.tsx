"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, useMemo } from "react";
import { isChromeLessPath } from "@/constants/path";
import { cn } from "@/lib/utils";
import Footer from "../ui/footer";
import Header from "../ui/header/header";
import { ScrollUpButton } from "../ui/scroll-up-button";
import { useSidebar } from "../ui/sidebar";

export default function Layout({
  children,
  usedTags,
}: {
  children: ReactNode;
  /** 글이 있는 태그. 내비게이션이 빈 카테고리를 링크하지 않게 하는 데 쓴다. */
  usedTags: string[];
}) {
  const { isMobile, state } = useSidebar();
  const pathname = usePathname();
  const isNeedShorten = useMemo(
    () => state === "expanded" && !isMobile,
    [state, isMobile],
  );

  // 이력서처럼 그 자체가 하나의 문서인 페이지는 헤더·푸터 없이 본문만 보여준다.
  const isChromeLess = useMemo(() => isChromeLessPath(pathname), [pathname]);

  return (
    <main
      id="main-content"
      className={cn(
        "flex min-h-screen flex-col transition-[width] duration-200 ease-linear",
        isNeedShorten ? "w-[calc(100%-var(--sidebar-width))]" : "w-full",
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
