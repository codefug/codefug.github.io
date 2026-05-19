"use client";

import { X } from "lucide-react";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useEventListener } from "usehooks-ts";
import useOutsideClick from "@/hooks/use-outside-click";

type ImageOverlayProps = {
  src?: string;
  alt?: string;
  className?: string;
};

export default function ImageOverlay({
  src,
  alt,
  className,
}: ImageOverlayProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!src) return null;

  return (
    <>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: handled below */}
      <img
        src={src}
        alt={alt ?? ""}
        className={`cursor-zoom-in ${className ?? ""}`}
        onClick={() => setIsModalOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setIsModalOpen(true);
        }}
        aria-label="Click to view larger image"
      />
      {isModalOpen &&
        createPortal(
          <Modal src={src} alt={alt} onClose={() => setIsModalOpen(false)} />,
          document.body,
        )}
    </>
  );
}

function Modal({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt?: string;
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
        className="relative max-h-[90vh] max-w-[90vw] overflow-auto rounded-lg bg-white p-2 dark:bg-gray-800"
      >
        <button
          className="absolute top-2 right-2 z-10"
          onClick={onClose}
          aria-label="Close image overlay"
          type="button"
        >
          <X className="size-8 text-gray-500 opacity-50 hover:text-black hover:opacity-100 dark:hover:text-white" />
        </button>
        <img
          src={src}
          alt={alt ?? ""}
          className="max-h-[85vh] max-w-[85vw] rounded object-contain"
        />
      </div>
    </div>
  );
}
