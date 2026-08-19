"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import OverlayModal from "./overlay-modal";

type ImageOverlayProps = {
  src?: string;
  alt?: string;
  className?: string;
};

/**
 * 뱃지(shields.io 등)는 확대할 내용이 없고, 여러 개를 한 줄에 늘어놓는
 * 용도라서 block 버튼으로 감싸면 세로로 쌓여 표가 망가진다.
 */
function isInlineBadge(src: string): boolean {
  return src.startsWith("https://img.shields.io/");
}

export default function ImageOverlay({
  src,
  alt,
  className,
}: ImageOverlayProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!src) return null;

  if (isInlineBadge(src)) {
    return (
      <img
        src={src}
        alt={alt ?? ""}
        className={`mr-1 inline-block align-middle ${className ?? ""}`}
      />
    );
  }

  return (
    <>
      {/*
        img에 onClick만 달면 키보드로는 포커스가 가지 않아 열 수 없다.
        button으로 감싸면 포커스·Enter/Space·스크린리더 인식이 전부 따라온다.
      */}
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="block max-w-full cursor-zoom-in"
        aria-label={alt ? `${alt} 크게 보기` : "이미지 크게 보기"}
      >
        <img src={src} alt={alt ?? ""} className={className} />
      </button>
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
