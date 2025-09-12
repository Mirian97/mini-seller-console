import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { FilterState, Lead } from "@/types";
import { getScoreColor } from "@/utils/get-score-color";
import { getStatusBadgeVariant } from "@/utils/get-status-badge-variant";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Filter,
  Search,
  Users,
} from "lucide-react";
import { useState } from "react";

interface LeadTableProps {
  leads: Lead[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onLeadSelect: (lead: Lead) => void;
  selectedLead: Lead | null;
}

export const LeadTable = ({
  leads,
  filters,
  onFiltersChange,
  onLeadSelect,
  selectedLead,
}: LeadTableProps) => {
  const [sortField, setSortField] = useState<keyof Lead>("score");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: keyof Lead) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const filteredAndSortedLeads = leads
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

  const SortIcon = ({ field }: { field: keyof Lead }) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 p-4 bg-card rounded-lg border">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search leads by name or company..."
            value={filters.search}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value })
            }
            className="pl-10"
          />
        </div>
        <Select
          value={filters.status}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, status: value })
          }
        >
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Contacted">Contacted</SelectItem>
            <SelectItem value="Qualified">Qualified</SelectItem>
            <SelectItem value="Lost">Lost</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="text-sm text-muted-foreground px-2">
        Showing {filteredAndSortedLeads.length} of {leads.length} leads
      </div>
      <div className="bg-card rounded-lg border">
        <div className="overflow-auto max-h-[65dvh]">
          <table className="scrollable-table w-full text-sm">
            <thead className="bg-table-header">
              <tr className="[&>th]:p-4 [&>th]:border-b [&>th]:border-border">
                <th className="text-left font-medium text-foreground">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("name")}
                    className="h-auto !px-0 font-medium text-foreground hover:text-primary"
                  >
                    Name <SortIcon field="name" />
                  </Button>
                </th>
                <th className="text-left font-medium text-foreground">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("company")}
                    className="h-auto !px-0 font-medium text-foreground hover:text-primary"
                  >
                    Company <SortIcon field="company" />
                  </Button>
                </th>
                <th className="text-left font-medium text-foreground">
                  Source
                </th>
                <th className="text-left font-medium text-foreground">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("score")}
                    className="h-auto !px-0 font-medium text-foreground hover:text-primary"
                  >
                    Score <SortIcon field="score" />
                  </Button>
                </th>
                <th className="text-left font-medium text-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedLeads.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => onLeadSelect(lead)}
                  className={cn(
                    "cursor-pointer border-border border-b transition-colors [&>td]:py-2 [&>td]:px-4",
                    "hover:bg-table-rowHover",
                    selectedLead?.id === lead.id &&
                      "bg-primary/5 border-primary/20"
                  )}
                >
                  <td className="px-4 py-0 font-medium leading-tight">
                    <p className="line-clamp-1">{lead.name}</p>
                    <p className="text-muted-foreground text-[11px]">
                      {lead.email}
                    </p>
                  </td>
                  <td className="text-muted-foreground">
                    <p className="line-clamp-1">{lead.company}</p>
                  </td>
                  <td className="text-muted-foreground capitalize">
                    <p className="line-clamp-1">{lead.source}</p>
                  </td>
                  <td>
                    <span
                      className={cn("font-medium", getScoreColor(lead.score))}
                    >
                      {lead.score}
                    </span>
                  </td>
                  <td>
                    <Badge
                      className="uppercase text-[9px] !font-semibold"
                      variant={getStatusBadgeVariant(lead.status)}
                    >
                      {lead.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredAndSortedLeads.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No leads found</p>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};
