import { MobileHeader } from "@/components/mobile-header";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { Sidebar } from "@/components/sidebar";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { Outlet } from "@tanstack/react-router";
import { useState } from "react";

export const AppLayout = () => {
  const isMobile = useIsMobile();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const onToggleMobileSidebar = () =>
    setIsMobileSidebarOpen(!isMobileSidebarOpen);

  return (
    <div className="bg-background flex flex-1 min-h-screen w-full">
      {isMobile ? (
        <MobileSidebar
          isOpen={isMobileSidebarOpen}
          onClose={onToggleMobileSidebar}
        />
      ) : (
        <Sidebar />
      )}
      <div className="flex-1 flex flex-col w-full">
        {isMobile && <MobileHeader onMenuClick={onToggleMobileSidebar} />}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto flex flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
