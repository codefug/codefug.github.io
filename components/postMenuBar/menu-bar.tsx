"use client";

import { cva } from "class-variance-authority";
import { List, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import useHighlightTOC from "@/hooks/use-highlight-toc";
import useOutsideClick from "@/hooks/use-outside-click";
import { useTranslations } from "@/lib/messages";
import { cn } from "@/lib/utils";

type HeadingData = { text: string; level: 1 | 2 | 3 | 4 | 5 | 6; id: string };

/**
 * 계층에 따라 들여쓰기하지 않고 쭉 나열한다.
 * 목차는 훑어보는 용도라 depth를 표현하는 것보다 한눈에 들어오는 게 낫다.
 */
const menuBarVariant = cva(
  "block w-full rounded-r-md border-l-2 py-1.5 pr-2 pl-3 text-left text-sm no-underline transition-all duration-150 ease-in-out hover:cursor-pointer",
  {
    variants: {
      isActive: {
        true: "border-primary bg-primary/5 font-medium text-primary",
        false:
          "border-transparent text-muted-foreground hover:border-primary/40 hover:bg-muted/60 hover:text-foreground",
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

  useEffect(() => {
    setHeadings(parseHeadingsFromProse());
  }, []);

  return headings;
}

/** 스크롤을 따라오되 헤더에 가리지 않도록 목표 위치 위에서 멈춘다. */
function useScrollToHeading(onDone?: () => void) {
  return useCallback(
    (id: string) => {
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
      onDone?.();
    },
    [onDone],
  );
}

function HeadingList({
  headings,
  activeId,
  onSelect,
}: {
  headings: HeadingData[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <>
      {headings.map((heading) => (
        <button
          type="button"
          key={heading.id}
          onClick={() => onSelect(heading.id)}
          className={menuBarVariant({ isActive: activeId === heading.id })}
          aria-current={activeId === heading.id ? "page" : undefined}
        >
          {heading.text}
        </button>
      ))}
    </>
  );
}

/**
 * 본문 옆을 따라오는 목차.
 *
 * 넓은 화면에서는 자리가 남으므로 sticky로 계속 붙여두고,
 * 좁은 화면에서는 본문을 가리지 않도록 평소에는 작은 버튼만 두었다가
 * 누르면 아래에서 시트가 올라오는 방식으로 나눈다.
 */
export default function MenuBar() {
  const t = useTranslations("common");
  const sheetRef = useRef<HTMLDivElement>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const headings = useFindAllHeadings();
  const { activeId } = useHighlightTOC();

  const closeSheet = useCallback(() => setIsSheetOpen(false), []);
  const moveToHeading = useScrollToHeading(closeSheet);

  useOutsideClick(sheetRef, closeSheet);

  if (!headings.length) return null;

  return (
    <>
      {/* 넓은 화면: 본문 오른쪽에 붙어 따라온다 */}
      <aside className="hidden shrink-0 xl:sticky xl:top-24 xl:block xl:w-56 xl:self-start print:hidden">
        <div className="mb-2 flex items-center gap-2 px-3">
          <span className="h-3.5 w-1 rounded-full bg-primary" />
          <h2 className="font-semibold text-foreground text-sm">
            {t("tableOfContents")}
          </h2>
        </div>
        <nav
          className="max-h-[calc(100vh-10rem)] overflow-auto"
          aria-label={t("aria.tableOfContents.navigation")}
        >
          <HeadingList
            headings={headings}
            activeId={activeId}
            onSelect={moveToHeading}
          />
        </nav>
      </aside>

      {/* 좁은 화면: 평소에는 버튼만, 누르면 시트가 올라온다 */}
      <button
        type="button"
        onClick={() => setIsSheetOpen(true)}
        aria-label={t("aria.tableOfContents.open")}
        aria-expanded={isSheetOpen}
        aria-controls="toc-sheet"
        className={cn(
          "fixed right-4 bottom-4 z-30 flex h-12 w-12 items-center justify-center rounded-full border bg-card/95 text-muted-foreground shadow-lg backdrop-blur-sm transition-opacity xl:hidden print:hidden",
          isSheetOpen && "pointer-events-none opacity-0",
        )}
      >
        <List className="h-5 w-5" />
      </button>

      {isSheetOpen && (
        <button
          type="button"
          aria-hidden
          tabIndex={-1}
          onClick={closeSheet}
          className="fixed inset-0 z-30 bg-black/40 xl:hidden print:hidden"
        />
      )}

      <div
        ref={sheetRef}
        id="toc-sheet"
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 rounded-t-2xl border-t bg-card shadow-2xl transition-transform duration-200 xl:hidden print:hidden",
          isSheetOpen
            ? "translate-y-0"
            : "pointer-events-none translate-y-full",
        )}
      >
        <div className="flex items-center justify-between border-border/50 border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3.5 w-1 rounded-full bg-primary" />
            <h2 className="font-semibold text-foreground text-sm">
              {t("tableOfContents")}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeSheet}
            aria-label={t("aria.tableOfContents.close")}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav
          className="max-h-[60vh] overflow-auto px-3 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
          aria-label={t("aria.tableOfContents.navigation")}
        >
          <HeadingList
            headings={headings}
            activeId={activeId}
            onSelect={moveToHeading}
          />
        </nav>
      </div>
    </>
  );
}
