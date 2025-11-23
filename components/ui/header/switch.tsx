import { useTheme } from "next-themes";
import { memo, useEffect, useState } from "react";
import Switch from "../switch";
import { Skeleton } from "../skeleton";

export const HeaderSwitch = memo(function HeaderSwitch() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return <Skeleton className="h-7 w-16 rounded-full bg-gray-400" />;

  return (
    <Switch
      checked={theme === "dark"}
      aria-label="테마 전환"
      onCheckedChange={() =>
        theme === "light" ? setTheme("dark") : setTheme("light")
      }
    />
  );
});
