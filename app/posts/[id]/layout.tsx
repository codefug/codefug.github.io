import "@/public/styles/github-dark.css";
import { cn } from "@/lib/utils";
import Header from "@/components/ui/header";
import { ReactNode } from "react";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Header />
      <div className={cn("prose mr-auto overflow-auto dark:prose-invert")}>
        {children}
      </div>
    </>
  );
}
