import type { ReactNode } from "react";

export function HighlightBullet({ children }: { children: ReactNode }) {
  return (
    <li
      className="relative my-0.5 list-none rounded-md px-3 py-1.5 pl-7 text-gray-900 dark:text-gray-100"
      style={{ backgroundColor: "rgba(31,29,129,0.08)" }}
    >
      <span
        aria-hidden
        className="absolute top-1.5 left-2 font-bold"
        style={{ color: "#1F1D81" }}
      >
        ★
      </span>
      {children}
    </li>
  );
}
