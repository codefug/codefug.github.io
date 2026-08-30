"use client";

import { BirthdayBackground } from "./birthday-background";
import { BirthdayContent } from "./birthday-content";
import { BirthdayTitle } from "./birthday-title";
import { useConfetti } from "./hooks/use-confetti";

export function BirthdayBanner() {
  const canvasRef = useConfetti();

  return (
    <div className="relative mb-6 overflow-hidden rounded-lg py-12">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <BirthdayBackground />

      <div className="relative z-10 px-4 text-center">
        <BirthdayTitle />
        <BirthdayContent />
      </div>
    </div>
  );
}
