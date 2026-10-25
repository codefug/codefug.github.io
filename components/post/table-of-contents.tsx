"use client";

import { List, X } from "lucide-react";
import { type ReactNode, useCallback, useState } from "react";
import { useEventListener } from "usehooks-ts";
import useTableOfContents, {
  type TocHeading,
} from "@/hooks/use-table-of-contents";
import { cn } from "@/lib/utils";

const PANEL_ID = "table-of-contents";

/** 고정 헤더에 가려지지 않도록 목표 위치보다 이만큼 위에서 멈춘다. */
const SCROLL_OFFSET = 96;

// 목차는 훑어보는 용도라 heading 계층별로 들여쓰지 않는다.
const TOC_ITEM_CLASS =
  "block w-full rounded-r-md border-l-2 py-1.5 pr-2 pl-3 text-left text-sm no-underline transition-all duration-150 ease-in-out hover:cursor-pointer";

function scrollToHeading(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  window.scrollTo({
    top: target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
}

// 상시 노출하면 본문 폭을 잡아먹으므로 버튼으로 열 때만 자리를 쓴다.
export default function TableOfContents() {
  const { headings, activeId } = useTableOfContents();
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);

  if (!headings.length) return null;

  return (
    <>
      <TocTrigger isOpen={isOpen} onOpen={() => setIsOpen(true)} />
      <TocPanel isOpen={isOpen} onClose={close}>
        <TocList
          headings={headings}
          activeId={activeId}
          onSelect={(id) => {
            scrollToHeading(id);
            close();
          }}
        />
      </TocPanel>
    </>
  );
}

function TocTrigger({
  isOpen,
  onOpen,
}: {
  isOpen: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="목차 열기"
      aria-expanded={isOpen}
      aria-controls={PANEL_ID}
      className={cn(
        "fixed top-1/2 right-4 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border bg-card/95 text-muted-foreground shadow-lg backdrop-blur-sm transition-opacity hover:bg-primary/10 hover:text-primary print:hidden",
        isOpen && "pointer-events-none opacity-0",
      )}
    >
      <List className="h-5 w-5" />
    </button>
  );
}

// 패널 바깥은 전부 backdrop이 덮으므로 바깥 클릭은 backdrop 클릭으로 닫힌다.
function TocPanel({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  useEventListener("keydown", (event) => {
    if (isOpen && event.key === "Escape") onClose();
  });

  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-30 bg-background/40 backdrop-blur-sm transition-opacity duration-200 print:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <div
        id={PANEL_ID}
        className={cn(
          "fixed z-40 overflow-hidden border bg-card shadow-2xl transition-all duration-200 print:hidden",
          "inset-x-0 top-0 rounded-b-2xl",
          "sm:inset-x-auto sm:top-20 sm:right-4 sm:w-80 sm:rounded-2xl",
          isOpen
            ? "translate-y-0 opacity-100 sm:translate-x-0"
            : "pointer-events-none -translate-y-full opacity-0 sm:translate-x-4 sm:translate-y-0",
        )}
      >
        <div className="flex items-center justify-between border-border/50 border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3.5 w-1 rounded-full bg-primary" />
            <h2 className="font-semibold text-foreground text-sm">목차</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="목차 닫기"
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </>
  );
}

function TocList({
  headings,
  activeId,
  onSelect,
}: {
  headings: TocHeading[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <nav
      className="max-h-[60vh] overflow-auto px-3 py-3 sm:max-h-[calc(100vh-12rem)]"
      aria-label="목차 네비게이션"
    >
      {headings.map((heading) => {
        const isActive = activeId === heading.id;
        return (
          <button
            type="button"
            key={heading.id}
            onClick={() => onSelect(heading.id)}
            className={cn(
              TOC_ITEM_CLASS,
              isActive
                ? "border-primary bg-primary/5 font-medium text-primary"
                : "border-transparent text-muted-foreground hover:border-primary/40 hover:bg-muted/60 hover:text-foreground",
            )}
            aria-current={isActive ? "location" : undefined}
          >
            {heading.text}
          </button>
        );
      })}
    </nav>
  );
}
