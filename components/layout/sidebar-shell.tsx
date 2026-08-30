"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";
import { isSidebarOffPath } from "@/constants/path";
import { SidebarProvider } from "../ui/sidebar";

/**
 * 사이드바를 쓰지 않는 페이지에서 사이드바를 닫아 둔다.
 *
 * 열린 채로 그린 뒤 effect로 닫으면 하이드레이션 후에야 닫혀서 한 번 번쩍인다.
 * 그래서 경로로 열림 여부를 계산해 첫 렌더부터 닫힌 상태로 만든다.
 * 사용자가 열어 둔 채로 이 페이지에 들어와도 렌더마다 경로를 다시 보므로 닫힌다.
 */
export function SidebarShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isOff = isSidebarOffPath(pathname);
  // 사용자가 직접 여닫은 상태. 사이드바를 쓰는 페이지에서만 쓴다.
  const [open, setOpen] = useState(true);

  return (
    <SidebarProvider open={isOff ? false : open} onOpenChange={setOpen}>
      {children}
    </SidebarProvider>
  );
}
