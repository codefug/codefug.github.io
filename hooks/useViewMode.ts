"use client";

import { useCallback, useEffect, useState } from "react";

type ViewMode = "grid" | "list";

const viewModeStorage = {
  get(): ViewMode {
    const stored = sessionStorage.getItem("post-view-mode") as ViewMode | null;
    return stored === "grid" || stored === "list" ? stored : "list";
  },
  set(mode: ViewMode): void {
    sessionStorage.setItem("post-view-mode", mode);
  },
};

export function useViewMode() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  useEffect(() => {
    setViewMode(viewModeStorage.get());
  }, []);

  const toggle = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    viewModeStorage.set(mode);
  }, []);

  return { viewMode, toggle };
}
