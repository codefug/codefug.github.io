import { useEffect, useRef } from "react";

const useIntersectionObserver = (
  setActiveId: (id: string | null) => void,
  activeId: string | null,
  lists: {
    text: string;
    id: string;
    level: number;
  }[],
) => {
  const headingElementsRef = useRef<{
    [key: string]: IntersectionObserverEntry;
  }>({});

  const headingElements: HTMLElement[] = [];

  useEffect(() => {
    const callback = (headings: IntersectionObserverEntry[]) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        const newMap = { ...map };
        newMap[headingElement.target.id] = headingElement;
        return newMap;
      }, headingElementsRef.current);

      const visibleHeadings: IntersectionObserverEntry[] = [];

      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id: string) =>
        headingElements.findIndex((heading) => heading.id === id);

      if (visibleHeadings.length === 0) {
        const activeElement = headingElements.find((el) => el.id === activeId);
        const activeIndex = headingElements.findIndex(
          (el) => el.id === activeId,
        );

        const activeIdYcoord = activeElement?.getBoundingClientRect().y;
        if (activeIdYcoord && activeIdYcoord > 150)
          if (activeIndex !== 0)
            setActiveId(headingElements[activeIndex - 1].id);
          else setActiveId(null);
      } else if (visibleHeadings.length === 1)
        setActiveId(visibleHeadings[0].target.id);
      else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id),
        );
        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "0px 0px -40% 0px",
    });

    lists.forEach((obj) => {
      const element = document.getElementById(obj.id);
      if (element) {
        headingElements.push(element);
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [setActiveId, activeId]);
};

export default useIntersectionObserver;
