"use client";

import { useCallback, useEffect, useState } from "react";

type ViewMode = "grid" | "list";
const STORAGE_KEY = "post-view-mode";

export function useViewMode() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY) as ViewMode | null;
    if (stored === "grid" || stored === "list") {
      setViewMode(stored);
    }
  }, []);

  const toggle = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    sessionStorage.setItem(STORAGE_KEY, mode);
  }, []);

  return { viewMode, toggle };
}
