import { ReactNode } from "react";

import "@/public/styles/github-dark.css";
import { cn } from "@/lib/utils";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className={cn("prose max-w-full dark:prose-invert")}>{children}</div>
  );
}
