import Giscus from "@/components/giscus";
import { cn } from "@/lib/utils";
import "@/public/styles/github-dark.css";
import { ReactNode } from "react";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className={cn("prose mx-auto mb-10 overflow-auto dark:prose-invert")}>
      {children}
      <Giscus />
    </div>
  );
}
