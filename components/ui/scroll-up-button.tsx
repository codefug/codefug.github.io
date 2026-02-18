"use client";

import { CircleArrowUp } from "lucide-react";
import { useCallback } from "react";

export function ScrollUpButton() {
  const handleScrollUp = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <CircleArrowUp
      width={32}
      height={32}
      className="fixed right-5 bottom-5 h-8 w-8 cursor-pointer opacity-50 hover:opacity-100"
      onClick={handleScrollUp}
    />
  );
}
