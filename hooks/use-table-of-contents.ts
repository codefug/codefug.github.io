import { useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";

export type TocHeading = { id: string; text: string };

const ACTIVATION_OFFSET = 100;

function collectHeadings(): HTMLElement[] {
  const prose = document.querySelector(".prose");
  if (!prose) return [];

  return Array.from(
    prose.querySelectorAll<HTMLElement>("h1, h2, h3, h4, h5, h6"),
  )
    .slice(1) // skip post title
    .filter((heading) => heading.id); // 본문 아래 카드 제목은 id가 없다
}

/** 화면 위쪽 기준선을 지난 heading 중 마지막 것. 아직 아무것도 안 지났으면 첫 heading이다. */
function findActiveHeadingId(headings: HTMLElement[]): string | null {
  const passed = headings.findLast(
    (heading) => heading.getBoundingClientRect().top <= ACTIVATION_OFFSET,
  );
  return (passed ?? headings[0])?.id ?? null;
}

/** 본문 heading 목록과 지금 읽고 있는 heading의 id를 함께 준다. */
const useTableOfContents = () => {
  const [elements, setElements] = useState<HTMLElement[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const found = collectHeadings();
    setElements(found);
    setActiveId(findActiveHeadingId(found));
  }, []);

  useMotionValueEvent(scrollY, "change", () => {
    setActiveId(findActiveHeadingId(elements));
  });

  const headings: TocHeading[] = elements.map((el) => ({
    id: el.id,
    text: el.textContent ?? "",
  }));
  return { headings, activeId };
};

export default useTableOfContents;
