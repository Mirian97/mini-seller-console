import { OpportunityTable } from "@/components/opportunity-table";
import { TitlePage } from "@/components/title-page";
import { LoadingLayout } from "@/layouts/loading-layout";
import { getOpportunities } from "@/services";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/oportunity")({
  component: RouteComponent,
  loader: getOpportunities,
  pendingComponent: LoadingLayout,
});

function RouteComponent() {
  const oportunityData = Route.useLoaderData();

  return (
    <>
      <TitlePage
        className="mb-6"
        title="Opportunities"
        description="Track your sales opportunities and their progress"
      />
      <OpportunityTable opportunities={oportunityData} />
    </>
  );
}
