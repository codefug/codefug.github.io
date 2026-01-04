import { useEffect } from "react";
import { useSidebar } from "@/components/ui/sidebar";

export const useSidebarOff = () => {
  const { setOpen, setOpenMobile } = useSidebar();

  useEffect(() => {
    setOpen(false);
    setOpenMobile(false);
  }, [setOpen, setOpenMobile]);
};
