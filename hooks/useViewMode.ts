"use client";

import { useCallback, useEffect, useState } from "react";

type ViewMode = "grid" | "list";

const STORAGE_KEY_PREFIX = "post-view-mode";

function storageKey(scope?: string) {
  return scope ? `${STORAGE_KEY_PREFIX}:${scope}` : STORAGE_KEY_PREFIX;
}

const viewModeStorage = {
  get(scope?: string): ViewMode {
    const stored = sessionStorage.getItem(storageKey(scope)) as ViewMode | null;
    return stored === "grid" || stored === "list" ? stored : "list";
  },
  set(mode: ViewMode, scope?: string): void {
    sessionStorage.setItem(storageKey(scope), mode);
  },
};

/**
 * 목록 보기 방식(리스트/갤러리) 상태.
 * 홈에는 카테고리별 섹션이 여러 개 있으므로 scope로 섹션마다 독립적으로 기억한다.
 *
 * 저장된 값은 첫 렌더 뒤에 반영되므로 잠깐 기본값이 보인다.
 * 처음부터 특정 방식으로 보여야 하는 목록은 이 훅 대신 지역 상태를 쓴다.
 */
export function useViewMode(scope?: string) {
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  useEffect(() => {
    setViewMode(viewModeStorage.get(scope));
  }, [scope]);

  const toggle = useCallback(
    (mode: ViewMode) => {
      setViewMode(mode);
      viewModeStorage.set(mode, scope);
    },
    [scope],
  );

  return { viewMode, toggle };
}
