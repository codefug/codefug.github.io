"use client";

import { BirthdayBackground } from "./birthday-background";
import { BirthdayContent } from "./birthday-content";
import { BirthdayTitle } from "./birthday-title";
import { useConfetti } from "./hooks/use-confetti";

/**
 * 생일 배너 메인 컴포넌트
 * 관심사 분리를 통해 각 기능을 독립적인 컴포넌트로 구성했습니다.
 */
export function BirthdayBanner() {
  const canvasRef = useConfetti();

  return (
    <div className="relative mb-6 overflow-hidden rounded-lg border border-gray-800 bg-black py-12">
      {/* Canvas for confetti - 처음 한 번만 실행 */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      {/* 배경 애니메이션 */}
      <BirthdayBackground />

      {/* 콘텐츠 */}
      <div className="relative z-10 px-4 text-center">
        <BirthdayTitle />
        <BirthdayContent />
      </div>
    </div>
  );
}
