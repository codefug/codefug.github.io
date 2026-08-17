"use client";

import { cva } from "class-variance-authority";
import { useCallback, useEffect, useState } from "react";
import useHighlightTOC from "@/hooks/use-highlight-toc";
import { useTranslations } from "@/lib/messages";

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

/**
 * 본문 옆에 붙는 목차.
 *
 * 예전에는 화면 오른쪽에 떠 있는 버튼을 눌러 오버레이로 열었는데,
 * 넓은 화면에서는 여백이 남는데도 클릭을 요구했고 좁은 화면에서는
 * 그 버튼이 본문을 가렸다. 그래서 자리가 있는 화면에서만 상시 노출한다.
 * (xl 미만에서는 렌더하지 않는다 — 좁은 화면은 스크롤로 읽는 편이 낫다)
 */
export default function MenuBar() {
  const t = useTranslations("common");

  const headings = useFindAllHeadings();
  const { activeId } = useHighlightTOC();

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

  if (!headings.length) return null;

  return (
    <aside className="hidden shrink-0 xl:sticky xl:top-24 xl:block xl:w-64 xl:self-start print:hidden">
      <div className="mb-2 flex items-center gap-2 px-3">
        <span className="h-3.5 w-1 rounded-full bg-primary" />
        <h2 className="font-semibold text-foreground text-sm">
          {t("tableOfContents")}
        </h2>
      </div>
      <nav
        className="max-h-[calc(100vh-10rem)] overflow-auto"
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
    </aside>
  );
}
