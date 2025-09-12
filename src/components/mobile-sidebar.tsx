import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BarChart3, Target, Users, X } from "lucide-react";

interface MobileSidebarProps {
  activeTab: "leads" | "opportunities";
  onTabChange: (tab: "leads" | "opportunities") => void;
  isOpen: boolean;
  onClose: () => void;
}

export const MobileSidebar = ({
  activeTab,
  onTabChange,
  isOpen,
  onClose,
}: MobileSidebarProps) => {
  const menuItems = [
    {
      id: "leads" as const,
      label: "Leads",
      icon: Users,
      count: 0,
    },
    {
      id: "opportunities" as const,
      label: "Opportunities",
      icon: Target,
      count: 0,
    },
  ];

  const handleTabChange = (tab: "leads" | "opportunities") => {
    onTabChange(tab);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-72 bg-sidebar-bg text-sidebar-foreground transform transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-sidebar-foreground/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-8 w-8 text-sidebar-foreground" />
              <h1 className="text-xl font-bold">Mini Seller Console</h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-sidebar-foreground hover:bg-sidebar-foreground/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleTabChange(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left",
                        activeTab === item.id
                          ? "bg-primary text-primary-foreground"
                          : "text-sidebar-muted hover:bg-sidebar-foreground/5 hover:text-sidebar-foreground"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
