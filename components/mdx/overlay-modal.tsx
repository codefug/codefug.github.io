"use client";

import { Content, Overlay, Portal, Root, Title } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type OverlayModalProps = {
  children: ReactNode;
  onClose: () => void;
  className?: string;
};

/** Escape, 바깥 클릭, 포커스 가두기, 스크롤 잠금은 Radix Dialog가 맡는다. 여는 쪽이 마운트로 연다. */
export default function OverlayModal({
  children,
  onClose,
  className,
}: OverlayModalProps) {
  return (
    <Root open onOpenChange={(open) => !open && onClose()}>
      <Portal>
        <Overlay className="fixed inset-0 z-50 bg-black/75" />
        <Content
          aria-describedby={undefined}
          className={cn(
            "fixed top-1/2 left-1/2 z-50 max-h-[90vh] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-lg",
            className,
          )}
        >
          <Title className="sr-only">크게 보기</Title>
          <button
            type="button"
            className="absolute top-2 right-2 z-10 cursor-pointer"
            onClick={onClose}
            aria-label="닫기"
          >
            <X className="size-8 text-gray-500 opacity-50 hover:text-black hover:opacity-100 dark:hover:text-white" />
          </button>
          {children}
        </Content>
      </Portal>
    </Root>
  );
}
