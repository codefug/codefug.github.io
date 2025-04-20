"use client";

import useIntersectionObserver from "@/hooks/use-interception";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

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
  const [activeId, setActiveId] = useState<string | null>(null);

  useIntersectionObserver(setActiveId, activeId, headings);

  if (!headings.length) return null;

  return (
    <div className="fixed right-0 top-24 hidden lg:block">
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <h4 className="mb-3 text-sm font-medium text-foreground">목차</h4>
        <nav className="max-h-[80vh] space-y-0.5 overflow-auto pr-2">
          {headings.map((heading) => (
            <Link
              href={`#${heading.id}`}
              key={heading.id}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(`#${heading.id}`)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
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
  );
}
