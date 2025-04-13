import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function BlockHeader({
  children,
  title,
  className,
}: {
  children: ReactNode;
  title: string;
  className?: string;
}) {
  return (
    <div>
      <h1
        className={cn(
          "mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100",
          className,
        )}
      >
        {title}
      </h1>
      <div className="mb-4 mt-2 w-full">{children}</div>
    </div>
  );
}
