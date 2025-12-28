import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function BlockHeader({
  children,
  title,
  className,
}: {
  children: ReactNode;
  title: ReactNode;
  className?: string;
}) {
  return (
    <div>
      <h1
        className={cn(
          "mb-7 flex justify-center font-bold text-gray-900 text-lg md:text-xl dark:text-gray-100",
          className,
        )}
      >
        {title}
      </h1>
      <div className="mt-2 mb-4 w-full">{children}</div>
    </div>
  );
}
