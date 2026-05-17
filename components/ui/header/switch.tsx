"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { memo, useEffect, useState } from "react";
import { Skeleton } from "../skeleton";
import Switch from "../switch";

export const HeaderSwitch = memo(function HeaderSwitch() {
  const { setTheme, resolvedTheme } = useTheme();
  const t = useTranslations("common");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return <Skeleton className="h-7 w-16 rounded-full bg-gray-400" />;

  return (
    <Switch
      checked={resolvedTheme === "dark"}
      aria-label={t("aria.themeToggle")}
      onCheckedChange={() =>
        resolvedTheme === "dark" ? setTheme("light") : setTheme("dark")
      }
    />
  );
});
