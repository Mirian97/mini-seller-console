import type { FilterState, Lead } from "@/types";

export function filterAndSortLeads(
  leads: Lead[],
  filters: FilterState,
  sortField: keyof Lead,
  sortDirection: "asc" | "desc"
): Lead[] {
  return leads
    .filter((lead) => {
      const matchesSearch =
        filters.search === "" ||
        lead.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        lead.company.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus =
        filters.status === "" ||
        filters.status === "all" ||
        lead.status === filters.status;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
}
