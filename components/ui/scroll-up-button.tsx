"use client";

import { ArrowUp } from "lucide-react";
import { useCallback } from "react";

export function ScrollUpButton() {
  const handleScrollUp = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      type="button"
      onClick={handleScrollUp}
      aria-label="맨 위로 이동"
      className="fixed right-5 bottom-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-primary hover:text-white hover:shadow-md dark:bg-primary/20 dark:hover:bg-primary print:hidden"
    >
      <ArrowUp size={16} strokeWidth={2.5} />
    </button>
  );
}
