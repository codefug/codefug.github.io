"use client";

import useIntersectionObserver from "@/hooks/use-interception";
import useOutsideClick from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ChevronLeft, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const menuBarVariant = cva(
  "block py-1.5 text-sm transition-all opacity-50 hover:opacity-100 duration-200 ease-in-out border-l-2 hover:border-primary/70",
  {
    variants: {
      isActive: {
        true: "border-primary font-medium text-primary opacity-100",
        false:
          "border-transparent text-muted-foreground hover:text-foreground/90",
      },
      level: {
        1: "",
        2: "pl-4",
        3: "pl-8",
        4: "pl-12",
        5: "pl-16",
        6: "pl-20",
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

  const headings = useFindAllHeadings();
  const { activeId } = useIntersectionObserver();

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
      <button className="fixed right-0 top-1/2" onClick={handleShowMenuList}>
        <ChevronLeft className="h-6 w-6 text-muted-foreground lg:size-8" />
      </button>
      <div
        ref={menuListRef}
        className={cn(
          "fixed right-0 top-24 hidden w-[300px]",
          isShow && "block",
        )}
      >
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <button onClick={handleHideMenuList}>
            <X className="absolute right-4 top-4 h-5 w-5 cursor-pointer text-muted-foreground" />
          </button>
          <h4 className="mb-3 mt-0 text-sm font-medium text-foreground">
            목차
          </h4>
          <nav className="max-h-[60vh] space-y-0.5 overflow-auto pr-2">
            {headings.map((heading) => (
              <Link
                href={`${pathname}#${heading.id}`}
                key={heading.id}
                className={menuBarVariant({
                  level: heading.level,
                  isActive: activeId === heading.id,
                })}
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

  useEffect(() => {
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
  }, []);
  return headings;
}
