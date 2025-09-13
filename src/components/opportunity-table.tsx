import { Badge } from "@/components/ui/badge";
import type { Opportunity } from "@/types";
import { DollarSign, Target } from "lucide-react";

interface OpportunityTableProps {
  opportunities: Opportunity[];
}

const getStageBadgeVariant = (stage: Opportunity["stage"]) => {
  switch (stage) {
    case "Prospecting":
      return "success";
    case "Negotiation":
      return "default";
    case "Closed":
      return "default";
    default:
      return "secondary";
  }
};

export const OpportunityTable = ({ opportunities }: OpportunityTableProps) => {
  if (opportunities.length === 0) {
    return (
      <div className="bg-card rounded-lg border p-8 text-center">
        <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
        <h3 className="text-lg font-medium mb-2">No opportunities yet</h3>
        <p className="text-muted-foreground">
          Convert qualified leads to create your first opportunity
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground px-2">
        Showing {opportunities.length} opportunities
      </div>
      <div className="bg-card rounded-lg border">
        <div className="overflow-auto max-h-[55dvh] sm:max-h-[65dvh]">
          <table className="scrollable-table w-full text-sm">
            <thead className="bg-table-header">
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-foreground">
                  Name
                </th>
                <th className="text-left p-4 font-medium text-foreground">
                  Account
                </th>
                <th className="text-left p-4 font-medium text-foreground">
                  Stage
                </th>
                <th className="text-left p-4 font-medium text-foreground">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opportunity) => (
                <tr
                  key={opportunity.id}
                  className="border-b border-border hover:bg-table-header/60 transition-colors"
                >
                  <td className="p-4 font-medium">
                    <p className="line-clamp-1">{opportunity.name}</p>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    <p className="line-clamp-1">{opportunity.accountName}</p>
                  </td>
                  <td className="p-4">
                    <Badge
                      className="uppercase text-[9px] !font-semibold"
                      variant={getStageBadgeVariant(opportunity.stage)}
                    >
                      {opportunity.stage}
                    </Badge>
                  </td>
                  <td className="p-4">
                    {opportunity.amount ? (
                      <div className="flex items-center gap-1 text-foreground font-medium">
                        <DollarSign className="h-4 w-4" />
                        {opportunity.amount.toLocaleString()}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
