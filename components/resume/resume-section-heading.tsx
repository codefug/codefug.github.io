import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ResumeSectionHeading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "relative my-0 inline-block font-bold text-2xl text-gray-900 dark:text-white print:text-xl",
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="absolute bottom-1 left-0 h-2.5 w-full rounded-sm bg-primary/20 dark:bg-primary/30"
      />
    </h2>
  );
}
