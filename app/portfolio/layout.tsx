import { SidebarOff } from "@/components/portfolio/sidebar-off";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarOff />
      {children}
    </>
  );
}
