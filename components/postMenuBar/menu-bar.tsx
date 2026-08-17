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

function TocHeader({
  title,
  onClose,
  closeLabel,
}: {
  title: string;
  onClose: () => void;
  closeLabel: string;
}) {
  return (
    <div className="flex items-center justify-between border-border/50 border-b px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="h-3.5 w-1 rounded-full bg-primary" />
        <h2 className="font-semibold text-foreground text-sm">{title}</h2>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

/**
 * 본문 목차. 버튼을 눌러서 열고 닫는다.
 *
 * 상시 노출로 두면 본문 폭을 잡아먹고, 화면 밖에 숨겨두면 긴 글에서
 * 위치를 잡기 어려웠다. 그래서 평소에는 버튼만 두고, 열었을 때만 자리를 쓴다.
 * 넓은 화면은 오른쪽에서 패널이, 좁은 화면은 위에서 오버레이가 내려온다.
 * 열려 있는 동안 뒤쪽 배경은 흐려져서 목차에 시선이 모인다.
 */
export default function MenuBar() {
  const t = useTranslations("common");
  const panelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const headings = useFindAllHeadings();
  const { activeId } = useHighlightTOC();

  const close = useCallback(() => setIsOpen(false), []);

  const moveToHeading = useCallback(
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
      close();
    },
    [close],
  );

  useOutsideClick(panelRef, close);

  // 열려 있을 때 Esc로 닫을 수 있어야 한다.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  if (!headings.length) return null;

  return (
    <>
      {/* 여는 버튼 — 화면 오른쪽에 고정 */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={t("aria.tableOfContents.open")}
        aria-expanded={isOpen}
        aria-controls="table-of-contents"
        className={cn(
          "fixed top-1/2 right-4 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border bg-card/95 text-muted-foreground shadow-lg backdrop-blur-sm transition-opacity hover:bg-primary/10 hover:text-primary print:hidden",
          isOpen && "pointer-events-none opacity-0",
        )}
      >
        <List className="h-5 w-5" />
      </button>

      {/* 배경 — 열려 있는 동안 뒤쪽을 흐리게 */}
      <div
        aria-hidden
        onClick={close}
        className={cn(
          "fixed inset-0 z-30 bg-background/40 backdrop-blur-sm transition-opacity duration-200 print:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* 목차 — 넓은 화면은 오른쪽에서, 좁은 화면은 위에서 */}
      <div
        ref={panelRef}
        id="table-of-contents"
        className={cn(
          "fixed z-40 overflow-hidden border bg-card shadow-2xl transition-all duration-200 print:hidden",
          // 좁은 화면: 위에서 내려온다
          "inset-x-0 top-0 rounded-b-2xl",
          // 넓은 화면: 오른쪽에서 들어온다
          "sm:inset-x-auto sm:top-20 sm:right-4 sm:w-80 sm:rounded-2xl",
          isOpen
            ? "translate-y-0 opacity-100 sm:translate-x-0"
            : "pointer-events-none -translate-y-full opacity-0 sm:translate-x-4 sm:translate-y-0",
        )}
      >
        <TocHeader
          title={t("tableOfContents")}
          onClose={close}
          closeLabel={t("aria.tableOfContents.close")}
        />
        <nav
          className="max-h-[60vh] overflow-auto px-3 py-3 sm:max-h-[calc(100vh-12rem)]"
          aria-label={t("aria.tableOfContents.navigation")}
        >
          {headings.map((heading) => (
            <button
              type="button"
              key={heading.id}
              onClick={() => moveToHeading(heading.id)}
              className={menuBarVariant({ isActive: activeId === heading.id })}
              aria-current={activeId === heading.id ? "page" : undefined}
            >
              {heading.text}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
