import { useEffect, useState } from "react";

const useIntersectionObserver = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = document.querySelectorAll("h1, h2, h3");

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeadings = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) =>
            a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1,
          );

        if (visibleHeadings.length > 0) {
          const nearestHeading = visibleHeadings[0];
          if (nearestHeading.target.id !== activeId)
            setActiveId(nearestHeading.target.id);
        }
      },
      {
        rootMargin: "0px 0px -70% 0px", // 현재 viewport의 상단 30% 부근에 걸리면 인식
        threshold: 0,
      },
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, [activeId]);

  return { activeId };
};

export default useIntersectionObserver;
