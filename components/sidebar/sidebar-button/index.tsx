"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function SidebarButton({ children }: { children: ReactNode }) {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      onClick={toggleSidebar}
      className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-accent hover:text-black hover:dark:text-white"
    >
      {children}
    </button>
  );
}
