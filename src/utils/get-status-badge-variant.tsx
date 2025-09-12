import type { Lead } from "@/types";

export const getStatusBadgeVariant = (status: Lead["status"]) => {
  switch (status) {
    case "New":
      return "success";
    case "Contacted":
      return "default";
    case "Qualified":
      return "default";
    case "Lost":
      return "destructive";
    default:
      return "secondary";
  }
};
