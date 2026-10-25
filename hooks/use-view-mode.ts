"use client";

import { useEffect, useState } from "react";

export type ViewMode = "grid" | "list";

/** 저장값은 첫 렌더 뒤에 반영돼 잠깐 기본값이 보인다. 처음부터 정해진 방식이 필요한 목록은 지역 상태를 쓴다. */
export function useViewMode(scope: string) {
  const key = `post-view-mode:${scope}`;
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  useEffect(() => {
    const stored = sessionStorage.getItem(key);
    setViewMode(stored === "grid" || stored === "list" ? stored : "list");
  }, [key]);

  const toggle = (mode: ViewMode) => {
    setViewMode(mode);
    sessionStorage.setItem(key, mode);
  };

  return { viewMode, toggle };
}
