import { cn } from "@/lib/utils";
import { ReactNode } from "react";

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
          "mb-4 text-lg font-bold text-gray-900 dark:text-gray-100 md:text-xl",
          className,
        )}
      >
        {title}
      </h1>
      <div className="mb-4 mt-2 w-full">{children}</div>
    </div>
  );
}
