"use client";

import type { ReactNode } from "react";
import { useSidebar } from "@/components/ui/sidebar";

export default function SidebarButton({ children }: { children: ReactNode }) {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      onClick={toggleSidebar}
      className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-accent hover:text-black hover:dark:text-white"
      aria-label="사이드바 열기/닫기"
      aria-expanded={false}
    >
      {children}
    </button>
  );
}
