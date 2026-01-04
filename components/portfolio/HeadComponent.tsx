import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function HeadComponent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "relative my-0 inline-block font-bold text-2xl text-primary dark:text-white",
        className,
      )}
    >
      {children}
      <div className="absolute bottom-1 left-0 h-3 w-full rounded-sm bg-primary opacity-20" />
    </h2>
  );
}
