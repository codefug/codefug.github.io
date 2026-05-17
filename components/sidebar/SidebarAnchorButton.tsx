import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function SidebarAnchorButton({
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps) {
  return (
    <Link
      className={cn(
        "rounded-md px-3 py-1.5 text-sidebar-foreground/70 text-sm transition-colors",
        "hover:bg-primary/10 hover:text-primary",
        "dark:hover:bg-primary/20 dark:hover:text-sidebar-foreground",
        className,
      )}
      {...props}
    />
  );
}
