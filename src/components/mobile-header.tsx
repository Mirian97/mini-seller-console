import { Button } from "@/components/ui/button";
import { BarChart3, Menu } from "lucide-react";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export const MobileHeader = ({ onMenuClick }: MobileHeaderProps) => {
  return (
    <div className="lg:hidden bg-background border-b border-border px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-6 w-6 text-foreground" />
        <h1 className="text-lg font-bold text-foreground">
          Mini Seller Console
        </h1>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onMenuClick}
        className="text-foreground hover:bg-accent"
      >
        <Menu className="h-5 w-5" />
      </Button>
    </div>
  );
};
