"use client";

import { cva } from "class-variance-authority";
import { List, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import useHighlightTOC from "@/hooks/use-highlight-toc";
import useOutsideClick from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import { usePostContentStore } from "@/store/use-post-content-store";

type HeadingData = { text: string; level: 1 | 2 | 3 | 4 | 5 | 6; id: string };

/**
 * 계층에 따라 들여쓰기하지 않고 쭉 나열한다.
 * 목차는 훑어보는 용도라 depth를 표현하는 것보다 한눈에 들어오는 게 낫다.
 */
const menuBarVariant = cva(
  "block w-full py-1.5 pl-3 pr-2 text-left text-sm transition-all duration-150 ease-in-out border-l-2 no-underline rounded-r-md hover:cursor-pointer",
  {
    variants: {
      isActive: {
        true: "border-primary font-medium text-primary bg-primary/5",
        false:
          "border-transparent text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-muted/60",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
);

/** 고정 헤더에 가려지지 않도록 목표 위치보다 이만큼 위에서 멈춘다. */
const SCROLL_OFFSET = 96;

function queryProseHeadings(): Element[] {
  return Array.from(
    document
      .querySelector(".prose")
      ?.querySelectorAll("h1, h2, h3, h4, h5, h6") || [],
  );
}

function parseHeadingsFromProse(): HeadingData[] {
  const [, ...contentHeadings] = queryProseHeadings(); // skip first h1 (post title)
  return contentHeadings
    .filter((el) => el.id)
    .map((el) => ({
      text: el.textContent || "",
      level: parseInt(el.tagName[1], 10) as HeadingData["level"],
      id: el.id,
    }));
}

function useFindAllHeadings(): HeadingData[] {
  const [headings, setHeadings] = useState<HeadingData[]>([]);
  const isMounted = usePostContentStore((state) => state.isMounted);

  useEffect(() => {
    if (!isMounted) return;
    setHeadings(parseHeadingsFromProse());
  }, [isMounted]);

  return headings;
}

export default function MenuBar() {
  const menuListRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);
  const t = useTranslations("common");

  const headings = useFindAllHeadings();
  const { activeId } = useHighlightTOC();

  const handleShowMenuList = useCallback(() => setIsShow(true), []);
  const handleHideMenuList = useCallback(() => setIsShow(false), []);

  /**
   * 앵커 링크 대신 직접 스크롤한다.
   * 링크로 이동하면 헤더에 제목이 가리고 URL에 해시가 남는다.
   */
  const handleMoveToHeading = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    const top =
      target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;

    window.scrollTo({
      top,
      // 접근성 설정에서 애니메이션을 줄이도록 했다면 존중한다.
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, []);

  useOutsideClick(menuListRef, handleHideMenuList);

  if (!headings.length) return null;

  return (
    <>
      {/* 토글 버튼 */}
      <button
        className={cn(
          "fixed top-1/2 right-0 z-10 flex h-16 w-9 -translate-y-1/2 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-l-xl border border-r-0 border-l-2 border-l-primary/60 bg-card/95 text-muted-foreground shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-primary/10 hover:text-primary print:hidden",
          isShow && "pointer-events-none opacity-0",
        )}
        onClick={handleShowMenuList}
        aria-label={t("aria.tableOfContents.open")}
        aria-expanded={isShow}
        aria-controls="table-of-contents"
      >
        <List className="h-4 w-4" />
      </button>

      {/* TOC 패널 */}
      <div
        ref={menuListRef}
        className={cn(
          "fixed top-[68px] right-0 z-10 w-[300px] transition-all duration-200 print:hidden",
          isShow
            ? "translate-x-0 opacity-100"
            : "pointer-events-none translate-x-full opacity-0",
        )}
      >
        <div className="rounded-l-2xl border border-r-0 bg-card/95 shadow-xl backdrop-blur-sm">
          {/* 헤더 */}
          <div className="flex items-center justify-between border-border/50 border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3.5 w-1 rounded-full bg-primary" />
              <h4 className="font-semibold text-foreground text-sm">
                {t("tableOfContents")}
              </h4>
            </div>
            <button
              type="button"
              onClick={handleHideMenuList}
              aria-label={t("aria.tableOfContents.close")}
              className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* 목록 */}
          <nav
            className="h-[calc(100vh-164px)] overflow-auto px-3 py-3"
            aria-label={t("aria.tableOfContents.navigation")}
            id="table-of-contents"
          >
            {headings.map((heading) => (
              <button
                type="button"
                key={heading.id}
                onClick={() => handleMoveToHeading(heading.id)}
                className={menuBarVariant({
                  isActive: activeId === heading.id,
                })}
                aria-current={activeId === heading.id ? "page" : undefined}
              >
                {heading.text}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
