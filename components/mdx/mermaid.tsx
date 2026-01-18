"use client";

import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";

type MermaidProps = {
  children: string;
  className?: string;
};

export default function Mermaid({ children, className }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (!ref.current || isRendered) return;

    const id = `mermaid-${Math.random().toString(36).substring(7)}`;
    const element = ref.current;
    const code = children.trim();

    // Initialize mermaid
    mermaid.initialize({
      startOnLoad: false,
      theme: "default",
      securityLevel: "loose",
      fontFamily: "inherit",
    });

    mermaid
      .render(id, code)
      .then(({ svg }) => {
        if (element && !isRendered) {
          element.innerHTML = svg;
          setIsRendered(true);
        }
      })
      .catch((error) => {
        console.error("Mermaid rendering error:", error);
        if (element) {
          element.innerHTML = `<pre class="text-red-500">Mermaid 렌더링 오류: ${error.message}</pre>`;
        }
      });
  }, [children, isRendered]);

  return (
    <div
      ref={ref}
      className={`my-6 flex justify-center overflow-x-auto rounded-lg bg-gray-50 p-4 dark:bg-gray-900 ${className || ""}`}
    />
  );
}
