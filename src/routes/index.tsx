/* eslint-disable @typescript-eslint/no-unused-vars */
import { LeadDetailPanel } from "@/components/lead-detail-panel";
import { LeadTable } from "@/components/lead-table";
import { TitlePage } from "@/components/title-page";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { getLeads } from "@/services";
import type { FilterState, Lead, Opportunity } from "@/types";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: getLeads,
});

const initialFilters: FilterState = {
  search: "",
  status: "all",
  sortBy: "score",
  sortOrder: "desc",
};

function RouteComponent() {
  const leadData = Route.useLoaderData();
  const [leads, setLeads] = useState<Lead[]>(leadData);
  const [filters, setFilters] = useLocalStorage<FilterState>(
    "leadFilters",
    initialFilters
  );
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [_, setOpportunities] = useLocalStorage<Opportunity[]>(
    "opportunities",
    []
  );
  const handleClosePanel = () => setSelectedLead(null);
  const handleLeadSelect = (lead: Lead) => setSelectedLead(lead);

  const handleLeadUpdate = (updatedLead: Lead) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead))
    );
    setSelectedLead(updatedLead);
  };

  const handleConvertToOpportunity = (opportunity: Opportunity) => {
    setOpportunities((prev) => [...prev, opportunity]);

    if (opportunity.leadId) {
      const updatedLead = leads.find((lead) => lead.id === opportunity.leadId);
      if (updatedLead) {
        handleLeadUpdate({ ...updatedLead, status: "Qualified" });
      }
    }
  };

  return (
    <>
      <div className="max-w-7xl w-full mx-auto">
        <TitlePage
          className="mb-6"
          title="Leads Management"
          description="Manage your sales leads and convert them to opportunities"
        />
        <LeadTable
          leads={leads}
          filters={filters}
          onFiltersChange={setFilters}
          onLeadSelect={handleLeadSelect}
          selectedLead={selectedLead}
        />
      </div>
      <LeadDetailPanel
        lead={selectedLead}
        isOpen={!!selectedLead}
        onClose={handleClosePanel}
        onLeadUpdate={handleLeadUpdate}
        onConvertToOpportunity={handleConvertToOpportunity}
      />
    </>
  );
}
