import { OpportunityTable } from "@/components/opportunity-table";
import { getOpportunities } from "@/services";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/oportunity")({
  component: RouteComponent,
  loader: getOpportunities,
});

function RouteComponent() {
  const oportunityData = Route.useLoaderData();

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Opportunities
        </h1>
        <p className="text-muted-foreground">
          Track your sales opportunities and their progress
        </p>
      </div>
      <OpportunityTable opportunities={oportunityData} />
    </>
  );
}
