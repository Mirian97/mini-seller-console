import { cn } from "@/lib/utils";
import { BarChart3, Target, Users } from "lucide-react";

interface SidebarProps {
  activeTab: "leads" | "opportunities";
  onTabChange: (tab: "leads" | "opportunities") => void;
}

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
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

  return (
    <div className="w-72 bg-sidebar-bg text-sidebar-foreground h-screen flex flex-col">
      <div className="p-6 border-b border-sidebar-foreground/10">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-8 w-8 text-sidebar-foreground" />
          <h1 className="text-xl font-bold">Mini Seller Console</h1>
        </div>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
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
  );
};
