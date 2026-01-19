"use client";

import { X } from "lucide-react";
import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";
import useOutsideClick from "@/hooks/use-outside-click";

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

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        ref={ref}
        onClick={handleClick}
        className={`my-6 flex w-full cursor-pointer justify-center overflow-x-auto rounded-lg bg-gray-50 p-4 transition-all hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 ${className || ""}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleClick();
          }
        }}
        aria-label="Click to view larger diagram"
      />
      {isModalOpen && (
        <Modal svgContent={svgContent} handleCloseModal={handleCloseModal} />
      )}
    </>
  );
}

const Modal = ({
  svgContent,
  handleCloseModal,
}: {
  svgContent: string;
  handleCloseModal: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, handleCloseModal);
  useEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCloseModal();
    }
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div
        className="relative max-h-[90vh] max-w-[90vw] overflow-auto rounded-lg bg-white p-6 dark:bg-gray-800"
        ref={ref}
      >
        <button className="absolute top-2 right-2" onClick={handleCloseModal}>
          <X className="size-8 text-gray-500 opacity-50 hover:text-black hover:opacity-100 dark:hover:text-white" />
        </button>
        <div
          className="flex h-[80vh] justify-center"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: content is safe
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </div>
    </div>
  );
};
