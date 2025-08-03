import { ReactNode } from "react";

export function HeadComponent({ children }: { children: ReactNode }) {
  return (
    <h2 className="relative my-0 inline-block text-2xl font-bold text-primary dark:text-white">
      {children}
      <div className="absolute bottom-1 left-0 h-3 w-full rounded-sm bg-primary opacity-20" />
    </h2>
  );
}
