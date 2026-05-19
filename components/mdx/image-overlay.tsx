"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import OverlayModal from "./overlay-modal";

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
          <OverlayModal
            onClose={() => setIsModalOpen(false)}
            className="bg-white p-2 dark:bg-gray-800"
          >
            <img
              src={src}
              alt={alt ?? ""}
              className="max-h-[85vh] max-w-[85vw] rounded object-contain"
            />
          </OverlayModal>,
          document.body,
        )}
    </>
  );
}
