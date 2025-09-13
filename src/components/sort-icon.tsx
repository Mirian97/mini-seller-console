import type { Lead } from "@/types";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

export const SortIcon = ({
  field,
  sortField,
  sortDirection,
}: {
  field: keyof Lead;
  sortField: keyof Lead;
  sortDirection: "asc" | "desc";
}) => {
  if (sortField !== field) {
    return <ArrowUpDown className="h-4 w-4" />;
  }
  return sortDirection === "asc" ? (
    <ArrowUp className="h-4 w-4" />
  ) : (
    <ArrowDown className="h-4 w-4" />
  );
};
