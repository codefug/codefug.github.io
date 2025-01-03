"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftClose } from "lucide-react";

export default function SidebarButton() {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      onClick={toggleSidebar}
      className="flex h-7 w-7 items-center justify-center hover:bg-accent hover:text-black"
    >
      <PanelLeftClose size={20} />
    </button>
  );
}
