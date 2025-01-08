import { ReactNode } from "react";

import "@/public/styles/github-dark.css";
import { cn } from "@/lib/utils";
import Header from "@/components/ui/header";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Header />
      <div className={cn("prose mx-auto overflow-auto dark:prose-invert")}>
        {children}
      </div>
    </>
  );
}
