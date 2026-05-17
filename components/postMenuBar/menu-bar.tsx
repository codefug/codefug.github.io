"use client";

import { cva } from "class-variance-authority";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import useHighlightTOC from "@/hooks/use-highlight-toc";
import useOutsideClick from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import { usePostContentStore } from "@/store/use-post-content-store";

const menuBarVariant = cva(
  "block py-1.5 text-sm transition-all duration-200 ease-in-out border-l-2 hover:border-primary/70 no-underline",
  {
    variants: {
      isActive: {
        true: "border-primary font-medium text-primary opacity-100",
        false:
          "border-transparent text-muted-foreground hover:text-foreground/90",
      },
      level: {
        1: "pl-4",
        2: "pl-8",
        3: "pl-12",
        4: "pl-16",
        5: "pl-20",
        6: "pl-24",
      },
    },
    defaultVariants: {
      isActive: false,
      level: 1,
    },
  },
);

export default function MenuBar() {
  const menuListRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("common");

  const headings = useFindAllHeadings();
  const { activeId } = useHighlightTOC();

  const handleShowMenuList = useCallback(() => {
    setIsShow(true);
  }, []);

  const handleHideMenuList = useCallback(() => {
    setIsShow(false);
  }, []);

  useOutsideClick(menuListRef, handleHideMenuList);

  if (!headings.length) return null;

  return (
    <>
      <button
        className={cn(
          "fixed top-1/2 right-0 flex h-12 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-l-lg border border-r-0 bg-card text-muted-foreground shadow-md transition-all duration-200 hover:bg-primary/10 hover:text-primary print:hidden",
          isShow && "pointer-events-none opacity-0",
        )}
        onClick={handleShowMenuList}
        aria-label={t("aria.tableOfContents.open")}
        aria-expanded={isShow}
        aria-controls="table-of-contents"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div
        ref={menuListRef}
        className={cn(
          "fixed top-[68px] right-0 w-[280px] transition-all duration-200 print:hidden",
          isShow
            ? "translate-x-0 opacity-100"
            : "pointer-events-none translate-x-full opacity-0",
        )}
      >
        <div className="rounded-l-xl border border-r-0 bg-card p-4 shadow-lg">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="font-medium text-foreground text-sm">
              {t("tableOfContents")}
            </h4>
            <button
              type="button"
              onClick={handleHideMenuList}
              aria-label={t("aria.tableOfContents.close")}
              className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <nav
            className="h-[calc(100vh-164px)] space-y-0.5 overflow-auto pr-2"
            aria-label={t("aria.tableOfContents.navigation")}
            id="table-of-contents"
          >
            {headings.map((heading) => (
              <Link
                href={`${pathname}#${heading.id}`}
                key={heading.id}
                className={menuBarVariant({
                  level: heading.level,
                  isActive: activeId === heading.id,
                })}
                aria-current={activeId === heading.id ? "page" : undefined}
              >
                {heading.text}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}

function useFindAllHeadings() {
  const [headings, setHeadings] = useState<
    { text: string; level: 1 | 2 | 3 | 4 | 5 | 6; id: string }[]
  >([]);
  const isMounted = usePostContentStore((state) => state.isMounted);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const headings =
      document
        .querySelector(".prose")
        ?.querySelectorAll("h1, h2, h3, h4, h5, h6") || [];
    const headingArray = Array.from(headings)
      .splice(1)
      .map((heading) => {
        const level = parseInt(heading.tagName[1], 10) as 1 | 2 | 3 | 4 | 5 | 6;
        const text = heading.textContent || "";
        const id = heading.id || "-1";
        return { text, level, id };
      });
    setHeadings(headingArray);
  }, [isMounted]);

  return headings;
}
