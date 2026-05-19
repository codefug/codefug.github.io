import { useEffect, useState } from "react";
import { usePostContentStore } from "@/store/use-post-content-store";

const ACTIVATION_OFFSET = 100;

function findActiveHeadingId(headings: HTMLElement[]): string | null {
  let activeId: string | null = null;
  for (const heading of headings) {
    const { top } = heading.getBoundingClientRect();
    if (top - ACTIVATION_OFFSET <= 0) {
      activeId = heading.id;
    } else {
      break;
    }
  }
  return activeId ?? headings[0]?.id ?? null;
}

const useHighlightTOC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const isMounted = usePostContentStore((state) => state.isMounted);

  useEffect(() => {
    if (!isMounted) return;

    const prose = document.querySelector(".prose");
    if (!prose) return;

    const headings = Array.from(
      prose.querySelectorAll<HTMLElement>("h1, h2, h3, h4, h5, h6"),
    ).slice(1); // skip post title

    if (headings.length === 0) return;

    let ticking = false;
    let lastId: string | null = null;
    let raf: number | null = null;

    const update = () => {
      const nextId = findActiveHeadingId(headings);
      if (nextId !== lastId) {
        lastId = nextId;
        setActiveId(nextId);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [isMounted]);

  return { activeId };
};

export default useHighlightTOC;
