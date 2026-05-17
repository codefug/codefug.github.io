import type { ReactNode } from "react";

export function ResumeSectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="relative my-0 inline-block font-bold text-2xl text-gray-900 dark:text-white print:text-xl">
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="absolute bottom-1 left-0 h-2.5 w-full rounded-sm bg-primary/20 dark:bg-primary/30"
      />
    </h2>
  );
}
