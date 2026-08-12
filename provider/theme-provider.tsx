"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ComponentProps, useMemo } from "react";
import { PATH } from "@/constants/path";

export default function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  const pathName = usePathname();
  const isResume = useMemo(() => pathName.includes(PATH.RESUME), [pathName]);

  // 이력서는 인쇄·PDF 공유를 전제로 하므로 항상 light 로 고정한다.
  // forcedTheme 은 저장된 설정을 덮어쓰지 않아 다른 페이지에선 원래 테마가 유지된다.
  return (
    <NextThemesProvider {...props} forcedTheme={isResume ? "light" : undefined}>
      {children}
    </NextThemesProvider>
  );
}
