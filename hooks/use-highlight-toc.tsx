import { useEffect, useState } from "react";

const useHighlightTOC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>("h1, h2, h3, h4, h5, h6"),
    );

    const handleScroll = () => {
      const scrollY = Math.ceil(window.scrollY);

      for (let i = headings.length - 1; i >= 0; i -= 1) {
        const heading = headings[i];
        const top = heading.offsetTop;
        if (scrollY >= top) {
          setActiveId(heading.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // 초기 실행
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { activeId };
};

export default useHighlightTOC;
