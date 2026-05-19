"use client";

import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import OverlayModal from "./overlay-modal";

type MermaidProps = {
  children: string;
  className?: string;
};

export default function Mermaid({ children, className }: MermaidProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isRendered, setIsRendered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    if (!ref.current || isRendered) return;

    const id = `mermaid-${Math.random().toString(36).substring(7)}`;
    const element = ref.current;
    const code = children.trim();

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
          setSvgContent(svg);
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
    <>
      <button
        ref={ref}
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={`my-6 flex w-full cursor-pointer justify-center overflow-x-auto rounded-lg bg-gray-50 p-4 transition-all hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 ${className || ""}`}
        aria-label="Click to view larger diagram"
      />
      {isModalOpen &&
        createPortal(
          <OverlayModal
            onClose={() => setIsModalOpen(false)}
            className="bg-white p-6 dark:bg-gray-800"
          >
            <div
              className="flex h-[80vh] justify-center"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          </OverlayModal>,
          document.body,
        )}
    </>
  );
}
