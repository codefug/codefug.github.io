"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PATH } from "@/constants/path";
import { AUTHOR_NAME_EN } from "@/constants/site";
import { cn } from "@/lib/utils";
import { SidebarToggleButton } from "../sidebar/sidebar-toggle-button";
import { HeaderNavigation } from "./header-navigation";
import { ThemeToggle } from "./theme-toggle";

export default function Header({ usedTags }: { usedTags: string[] }) {
  const isShow = useShowFloatingHeader();
  const pathName = usePathname();
  // 글 목록(/posts/)이 아닌 글 본문(/posts/<id>/)에서만 띄운다.
  const showReadingProgress =
    pathName.startsWith(`${PATH.POSTS}/`) && pathName !== `${PATH.POSTS}/`;

  return (
    <>
      {/* 스크롤로 헤더가 숨어도 진행률 바는 보여야 해서 헤더 밖에 둔다. */}
      {showReadingProgress && <ReadingProgressBar />}
      <header
        className={cn(
          "sticky top-0 right-0 left-0 z-30 transform border-border/50 border-b bg-background/80 backdrop-blur-md transition-transform duration-300",
          isShow ? "translate-y-0" : "-translate-y-15",
          "print:hidden",
        )}
      >
        <div className="flex items-center justify-between gap-6 p-4">
          <section className="flex items-center gap-4">
            <SidebarToggleButton />
            <Link
              href={PATH.HOME}
              className="flex shrink-0 items-center transition-opacity hover:opacity-75"
            >
              <span className="font-bold text-foreground text-lg tracking-tight">
                {AUTHOR_NAME_EN}
              </span>
            </Link>
          </section>
          <section className="flex items-center gap-4 font-semibold text-sm md:text-base">
            <HeaderNavigation usedTags={usedTags} />
            <ThemeToggle />
          </section>
        </div>
      </header>
    </>
  );
}

function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-50 h-2 origin-left bg-primary print:hidden"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

/** 아래로 스크롤하면 숨고, 위로 스크롤하거나 맨 위 근처에 오면 다시 보인다. */
function useShowFloatingHeader(): boolean {
  const [showFloatingHeader, setShowFloatingHeader] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (current < previous || current < 70) setShowFloatingHeader(true);
    else if (current > previous) setShowFloatingHeader(false);
  });

  return showFloatingHeader;
}
