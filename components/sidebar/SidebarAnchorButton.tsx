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
        `rounded-md px-2 text-gray-400 hover:bg-accent hover:text-black hover:underline hover:drop-shadow-lg group-hover:text-black group-hover:dark:text-white hover:dark:text-white`,
        className,
      )}
      {...props}
    />
  );
}
