"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";
import { PATH } from "@/constants/path";

export default function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  const pathName = usePathname();
  const isResume = pathName.includes(PATH.RESUME);

  // 이력서는 인쇄용이라 light로 고정한다. forcedTheme은 저장된 설정을 덮어쓰지 않는다.
  return (
    <NextThemesProvider {...props} forcedTheme={isResume ? "light" : undefined}>
      {children}
    </NextThemesProvider>
  );
}
