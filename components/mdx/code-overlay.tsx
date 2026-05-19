"use client";

import { Maximize2 } from "lucide-react";
import { type ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import OverlayModal from "./overlay-modal";

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
          className="absolute top-2 right-2 cursor-pointer rounded bg-black/30 p-1 opacity-0 transition-opacity hover:bg-black/60 group-hover:opacity-100 dark:bg-white/10 dark:hover:bg-white/30"
          aria-label="Click to view larger code block"
        >
          <Maximize2 className="size-4 text-white" />
        </button>
      </div>
      {isModalOpen &&
        createPortal(
          <OverlayModal
            onClose={() => setIsModalOpen(false)}
            className="w-full"
          >
            <pre
              className={`${className ?? ""} m-0! max-h-[90vh] overflow-auto rounded-lg! p-6`}
            >
              {children}
            </pre>
          </OverlayModal>,
          document.body,
        )}
    </>
  );
}
