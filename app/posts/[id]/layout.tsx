import Giscus from "@/components/giscus";
import { cn } from "@/lib/utils";
import "@/public/styles/github-dark.css";
import type { ReactNode } from "react";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className={cn("prose dark:prose-invert mx-auto mb-10 overflow-auto")}>
      {children}
      <Giscus />
    </div>
  );
}
