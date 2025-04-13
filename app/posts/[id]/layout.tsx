import { cn } from "@/lib/utils";
import "@/public/styles/github-dark.css";
import { ReactNode } from "react";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className={cn("prose mr-auto overflow-auto dark:prose-invert")}>
      {children}
    </div>
  );
}
