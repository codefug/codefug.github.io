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
      className="fixed bottom-5 right-5 h-8 w-8 opacity-50 hover:cursor-pointer hover:opacity-100"
      onClick={handleScrollUp}
    />
  );
}
