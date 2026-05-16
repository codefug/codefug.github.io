import type { ReactNode } from "react";

export function HighlightBullet({ children }: { children: ReactNode }) {
  return (
    <li className="relative my-0.5 list-none rounded-md bg-primary/10 px-3 py-1.5 pl-7 text-gray-900 dark:bg-primary/15 dark:text-gray-100">
      <span aria-hidden className="absolute top-1.5 left-2 text-primary">
        ★
      </span>
      {children}
    </li>
  );
}
