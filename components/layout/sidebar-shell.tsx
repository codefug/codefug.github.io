"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";
import { isSidebarOffPath } from "@/constants/path";
import { SidebarProvider } from "../ui/sidebar";

/** effect로 닫으면 하이드레이션 후 한 번 번쩍이므로, 경로로 첫 렌더부터 닫힌 상태를 계산한다. */
export function SidebarShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isOff = isSidebarOffPath(pathname);
  const [open, setOpen] = useState(true);

  return (
    <SidebarProvider open={isOff ? false : open} onOpenChange={setOpen}>
      {children}
    </SidebarProvider>
  );
}
