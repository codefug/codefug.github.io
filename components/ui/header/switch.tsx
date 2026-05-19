"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { memo, useCallback, useEffect, useState } from "react";

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
    return <div className="h-5 w-5 animate-pulse rounded bg-muted" />;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("aria.themeToggle")}
      className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:cursor-pointer hover:bg-accent hover:text-foreground"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
});
