"use client";

import { usePathname, useRouter } from "next/navigation";
import { type MouseEvent, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { useSidebar } from "@/components/ui/sidebar";

/** 새 탭이나 수정키 클릭은 브라우저 기본 동작으로 둔다. */
function isPlainLeftClick(event: MouseEvent) {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

/**
 * 지금 도는 CSS 전환과 애니메이션이 끝나기를 기다린다. 고정 시간 대신 실제 애니메이션을 보므로
 * 사이드바의 duration이 바뀌어도 따라가고, 움직임 줄이기 설정으로 애니메이션이 없으면 바로 끝난다.
 */
function waitForAnimations() {
  // 끝나지 않는 반복 애니메이션까지 기다리면 영영 이동하지 않는다.
  const finite = document
    .getAnimations()
    .filter(
      (animation) => animation.effect?.getComputedTiming().endTime !== Infinity,
    );
  // 도중에 취소된 애니메이션은 finished가 reject되므로 allSettled로 받는다.
  return Promise.allSettled(finite.map((animation) => animation.finished));
}

/** 닫힘과 이동이 겹쳐 보이지 않도록 사이드바가 다 닫힌 뒤 이동한다. */
export function useNavigateAfterSidebarClose() {
  const router = useRouter();
  const pathname = usePathname();
  const { isMobile, open, openMobile, setOpen, setOpenMobile } = useSidebar();
  // 기다리는 사이 다른 링크를 누르면 앞선 이동은 버리고 마지막 것만 실행한다.
  const latestNavigationRef = useRef(0);

  // 이 훅을 거치지 않는 링크로 경로가 바뀌어도, 기다리던 이동이 그 페이지를 덮어쓰지 않게 한다.
  // biome-ignore lint/correctness/useExhaustiveDependencies: 경로가 바뀔 때마다 기다리던 이동을 버린다
  useEffect(() => {
    latestNavigationRef.current += 1;
  }, [pathname]);

  return (href: string) => async (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isPlainLeftClick(event)) return;
    event.preventDefault();

    const navigationId = ++latestNavigationRef.current;
    const wasOpen = isMobile ? openMobile : open;

    // 닫힘을 바로 화면에 반영해야 아래에서 닫힘 애니메이션을 잡을 수 있다.
    flushSync(() => (isMobile ? setOpenMobile(false) : setOpen(false)));
    if (wasOpen) await waitForAnimations();

    if (navigationId === latestNavigationRef.current) router.push(href);
  };
}
