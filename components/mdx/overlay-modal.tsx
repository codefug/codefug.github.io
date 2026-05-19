"use client";

import { X } from "lucide-react";
import { type ReactNode, useRef } from "react";
import { useEventListener } from "usehooks-ts";
import useOutsideClick from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";

type OverlayModalProps = {
  children: ReactNode;
  onClose: () => void;
  className?: string;
};

export default function OverlayModal({
  children,
  onClose,
  className,
}: OverlayModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, onClose);
  useEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
      <div
        ref={ref}
        className={cn(
          "relative max-h-[90vh] max-w-[90vw] overflow-auto rounded-lg",
          className,
        )}
      >
        <button
          type="button"
          className="absolute top-2 right-2 z-10 cursor-pointer"
          onClick={onClose}
          aria-label="닫기"
        >
          <X className="size-8 text-gray-500 opacity-50 hover:text-black hover:opacity-100 dark:hover:text-white" />
        </button>
        {children}
      </div>
    </div>
  );
}
