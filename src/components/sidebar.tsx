import { navList } from "@/constants/nav-list";
import { Link } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";

export const Sidebar = () => (
  <div className="w-72 bg-sidebar-bg text-sidebar-foreground h-screen flex flex-col">
    <div className="p-6 border-b border-sidebar-foreground/10">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-8 w-8 text-sidebar-foreground" />
        <h1 className="text-xl font-bold">Mini Seller Console</h1>
      </div>
    </div>
    <nav className="flex-1 p-4">
      <ul className="space-y-2">
        {navList.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.location}>
              <Link
                to={`/${item.location}`}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left"
                activeProps={{
                  className: "bg-primary text-primary-foreground",
                }}
                inactiveProps={{
                  className:
                    "text-sidebar-muted hover:bg-sidebar-foreground/5 hover:text-sidebar-foreground",
                }}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  </div>
);
