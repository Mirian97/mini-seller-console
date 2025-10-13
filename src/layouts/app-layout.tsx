import { MobileHeader } from "@/components/mobile-header";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { Sidebar } from "@/components/sidebar";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Outlet } from "@tanstack/react-router";
import { useState } from "react";

export const AppLayout = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useLocalStorage<"leads" | "opportunities">(
    "activeTab",
    "leads"
  );
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const onToggleMobileSidebar = () =>
    setIsMobileSidebarOpen(!isMobileSidebarOpen);

  return (
    <div className="bg-background flex flex-1 min-h-screen w-full">
      {isMobile ? (
        <MobileSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isOpen={isMobileSidebarOpen}
          onClose={onToggleMobileSidebar}
        />
      ) : (
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      )}
      <div className="flex-1 flex flex-col w-full">
        {isMobile && <MobileHeader onMenuClick={onToggleMobileSidebar} />}
        <main className="flex-1 p-6">
          <div className="max-w-7xl w-full mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
