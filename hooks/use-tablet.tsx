import { useEffect, useState } from "react";

const TABLET_BREAKPOINT = 1024;

export function useIsTablet() {
  // 서버와 클라이언트의 초기 렌더링을 일치시키기 위해 false로 시작
  const [isTablet, setIsTablet] = useState<boolean>(false);

  useEffect(() => {
    // 클라이언트에서만 실행되므로 하이드레이션 이후 실제 값으로 업데이트
    const mql = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsTablet(window.innerWidth < TABLET_BREAKPOINT);
    };

    // 초기값 설정
    setIsTablet(window.innerWidth < TABLET_BREAKPOINT);

    // 리스너 등록
    mql.addEventListener("change", onChange);

    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isTablet;
}
