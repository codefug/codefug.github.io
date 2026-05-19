"use client";

import { Maximize2, X } from "lucide-react";
import { type ReactNode, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useEventListener } from "usehooks-ts";
import useOutsideClick from "@/hooks/use-outside-click";

type CodeOverlayProps = {
  children?: ReactNode;
  className?: string;
};

export default function CodeOverlay({ children, className }: CodeOverlayProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="group relative">
        <pre className={className}>{children}</pre>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="absolute top-2 right-2 rounded bg-black/30 p-1 opacity-0 transition-opacity hover:bg-black/60 group-hover:opacity-100 dark:bg-white/10 dark:hover:bg-white/30"
          aria-label="Click to view larger code block"
        >
          <Maximize2 className="size-4 text-white" />
        </button>
      </div>
      {isModalOpen &&
        createPortal(
          <Modal className={className} onClose={() => setIsModalOpen(false)}>
            {children}
          </Modal>,
          document.body,
        )}
    </>
  );
}

function Modal({
  children,
  className,
  onClose,
}: {
  children?: ReactNode;
  className?: string;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, onClose);
  useEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
      <div
        ref={ref}
        className="relative max-h-[90vh] w-full max-w-[90vw] overflow-auto rounded-lg"
      >
        <button
          type="button"
          className="absolute top-2 right-2 z-10"
          onClick={onClose}
          aria-label="Close code overlay"
        >
          <X className="size-8 text-gray-500 opacity-50 hover:text-black hover:opacity-100 dark:hover:text-white" />
        </button>
        <pre
          className={`${className ?? ""} !m-0 !rounded-lg max-h-[90vh] overflow-auto p-6`}
        >
          {children}
        </pre>
      </div>
    </div>
  );
}
