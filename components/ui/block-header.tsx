import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function BlockHeader({
  children,
  title,
  className,
}: {
  children?: ReactNode;
  title: ReactNode;
  className?: string;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2.5">
        <span className="h-5 w-1 rounded-full bg-primary" aria-hidden="true" />
        <h1
          className={cn(
            "font-bold text-gray-900 text-lg md:text-xl dark:text-gray-100",
            className,
          )}
        >
          {title}
        </h1>
      </div>
      <div className="mb-4 w-full">{children}</div>
    </div>
  );
}
