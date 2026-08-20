"use client";

import { usePathname, useRouter } from "next/navigation";
import { type MouseEvent, useCallback, useEffect, useRef } from "react";
import { useSidebar } from "@/components/ui/sidebar";

/**
 * 사이드바 닫힘 애니메이션이 끝난 뒤에 페이지를 이동한다.
 *
 * 닫는 동작과 이동을 동시에 하면 사이드바가 사라지는 도중에 새 페이지가 들어와
 * 두 움직임이 겹쳐 보인다. 닫힘이 끝날 때까지 기다렸다가 이동시킨다.
 *
 * 기다리는 시간은 실제로 닫히는 요소의 트랜지션 길이에 맞춘 값이다.
 * - 데스크톱: Sidebar의 `duration-200`
 * - 모바일: Sheet의 `data-[state=closed]:duration-300`
 * 두 클래스를 바꾸면 이 값도 함께 바꿔야 한다.
 */
const DESKTOP_CLOSE_MS = 200;
const MOBILE_CLOSE_MS = 300;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useNavigateAfterSidebarClose() {
  const router = useRouter();
  const pathname = usePathname();
  const { isMobile, open, openMobile, setOpen, setOpenMobile } = useSidebar();
  const timerRef = useRef<number | null>(null);
  /** 이동을 예약한 시점의 경로. 여기서 벗어나면 예약을 버린다. */
  const pendingFrom = useRef<string | null>(null);

  const clearPendingNavigation = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    pendingFrom.current = null;
  }, []);

  /**
   * 경로가 바뀌면 예약된 이동을 버린다. 언마운트 때도 같이 정리된다.
   *
   * 다른 링크를 눌러 먼저 이동해 버린 경우까지 여기서 막는다. 그 링크는 이
   * 훅을 거치지 않으므로(사이드바를 유지하는 링크엔 핸들러가 없다) 클릭
   * 시점에는 취소할 방법이 없고, 남은 타이머가 뒤늦게 깨어나 사용자가
   * 마지막에 고른 페이지를 덮어쓴다.
   *
   * 정리 시점을 경로에 맞추기 위해 pathname을 effect 안에서 읽는다.
   * 이 값을 의존성에서 빼면 예약된 이동이 취소되지 않는다.
   */
  useEffect(() => {
    // 예약을 걸어둔 경로에서 벗어났다면 그 이동은 더 이상 유효하지 않다.
    if (pendingFrom.current !== null && pendingFrom.current !== pathname) {
      clearPendingNavigation();
    }
    return clearPendingNavigation;
  }, [clearPendingNavigation, pathname]);

  return useCallback(
    (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      // 새 탭·수정키 클릭은 브라우저 기본 동작으로 두는 게 맞다.
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return;
      }

      event.preventDefault();

      // 앞서 예약된 이동이 있으면 버린다.
      // 남겨두면 나중에 깨어나 방금 누른 링크를 덮어쓴다.
      clearPendingNavigation();

      const isOpen = isMobile ? openMobile : open;
      if (isMobile) {
        setOpenMobile(false);
      } else {
        setOpen(false);
      }

      // 닫을 것이 없거나 애니메이션을 끄는 설정이면 기다릴 이유가 없다.
      if (!isOpen || prefersReducedMotion()) {
        router.push(href);
        return;
      }

      pendingFrom.current = pathname;
      timerRef.current = window.setTimeout(
        () => {
          timerRef.current = null;
          pendingFrom.current = null;
          router.push(href);
        },
        isMobile ? MOBILE_CLOSE_MS : DESKTOP_CLOSE_MS,
      );
    },
    [
      clearPendingNavigation,
      isMobile,
      open,
      openMobile,
      pathname,
      router,
      setOpen,
      setOpenMobile,
    ],
  );
}
