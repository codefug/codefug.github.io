"use client";

import useIntersectionObserver from "@/hooks/use-interception";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

function styleBasedLevel(level: number) {
  switch (level) {
    case 1:
      return "pl-2 bg-[#ff5582]";
    case 2:
      return "pl-4 bg-[#ffb86c]";
    case 3:
      return "pl-6 bg-[#fff3a3]";
    case 4:
      return "pl-8 bg-[#bbfabb]";
    case 5:
      return "pl-10 bg-[#abf7f7]";
    case 6:
      return "pl-12 bg-[#adccff]";
    default:
      return "pl-0 bg-[#ff5582]";
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

  return (
    <section className="h-full">
      <nav className="right-0 top-20 h-fit lg:fixed">
        {headings.map((heading) => (
          <Link
            href={`#${heading.id}`}
            key={heading.id}
            className={cn(
              `block ${styleBasedLevel(heading.level)} ${activeId === heading.id ? "underline" : "no-underline opacity-70"} text-black hover:text-black hover:underline hover:drop-shadow-lg dark:text-white hover:dark:text-white`,
            )}
          >
            {heading.level === 1 ? heading.text : `-${heading.text}`}
          </Link>
        ))}
      </nav>
    </section>
  );
}
