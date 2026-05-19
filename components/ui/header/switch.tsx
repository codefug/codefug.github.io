"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { memo, useCallback, useEffect, useState } from "react";
import { Skeleton } from "../skeleton";
import Switch from "../switch";

function useThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const toggle = useCallback(
    () => setTheme(isDark ? "light" : "dark"),
    [isDark, setTheme],
  );
  return { isDark, toggle };
}

export const HeaderSwitch = memo(function HeaderSwitch() {
  const t = useTranslations("common");
  const [mounted, setMounted] = useState(false);
  const { isDark, toggle } = useThemeToggle();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return <Skeleton className="h-7 w-16 rounded-full bg-gray-400" />;

  return (
    <Switch
      checked={isDark}
      aria-label={t("aria.themeToggle")}
      onCheckedChange={toggle}
    />
  );
});
