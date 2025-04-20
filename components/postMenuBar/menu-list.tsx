"use client";

import useIntersectionObserver from "@/hooks/use-interception";
import useOutsideClick from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import { ChevronLeft, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";

function getHeadingStyles(level: number, isActive: boolean) {
  // 기본 스타일 - 모든 레벨에 적용
  const base = cn(
    "block py-1.5 text-sm transition-all duration-200 ease-in-out",
    "border-l-2 hover:border-primary/70",
    isActive
      ? "border-primary font-medium text-primary"
      : "border-transparent text-muted-foreground hover:text-foreground/90",
  );

  // 레벨별 들여쓰기 및 스타일 조정
  switch (level) {
    case 1:
      return cn(base, "pl-2 text-base font-medium");
    case 2:
      return cn(base, "pl-4");
    case 3:
      return cn(base, "pl-6");
    case 4:
      return cn(base, "pl-8 text-xs");
    case 5:
      return cn(base, "pl-10 text-xs");
    case 6:
      return cn(base, "pl-12 text-xs");
    default:
      return cn(base, "pl-2");
  }
}

export default function MenuList({
  headings,
}: {
  headings: {
    text: string;
    level: number;
    id: string;
  }[];
}) {
  const menuListRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const pathname = usePathname();

  useIntersectionObserver(setActiveId, activeId, headings);

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
        className="fixed right-0 top-1/2 block lg:hidden"
        onClick={handleShowMenuList}
      >
        <ChevronLeft className="h-6 w-6 text-muted-foreground" />
      </button>
      <div
        ref={menuListRef}
        className={cn(
          "fixed right-0 top-24 hidden lg:block",
          isShow && "block",
        )}
      >
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <button className="lg:hidden" onClick={handleHideMenuList}>
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
                className={getHeadingStyles(
                  heading.level,
                  activeId === heading.id,
                )}
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
