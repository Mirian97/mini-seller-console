import { LeadDetailPanel } from "@/components/lead-detail-panel";
import { LeadTable } from "@/components/lead-table";
import { LoadingSpinner } from "@/components/loading-spinner";
import { OpportunityTable } from "@/components/opportunity-table";
import { Sidebar } from "@/components/sidebar";
import leadsData from "@/data/leads.json";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { FilterState, Lead, Opportunity } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const initialFilters: FilterState = {
  search: "",
  status: "all",
  sortBy: "score",
  sortOrder: "desc",
};

const LeadPage = () => {
  const [activeTab, setActiveTab] = useLocalStorage<"leads" | "opportunities">(
    "activeTab",
    "leads"
  );
  const [leads, setLeads] = useState<Lead[]>([]);
  const [opportunities, setOpportunities] = useLocalStorage<Opportunity[]>(
    "opportunities",
    []
  );
  const [filters, setFilters] = useLocalStorage<FilterState>(
    "leadFilters",
    initialFilters
  );
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLeads = async () => {
      try {
        setLoading(true);
        setError(null);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLeads(leadsData as Lead[]);
      } catch (err) {
        setError("Failed to load leads data");
        toast.error("Failed to load leads data. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };
    loadLeads();
  }, []);

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

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const handleClosePanel = () => {
    setSelectedLead(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-muted-foreground">
            Loading Mini Seller Console...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-primary hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background flex flex-1">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {activeTab === "leads" ? (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Leads Management
                </h1>
                <p className="text-muted-foreground">
                  Manage your sales leads and convert them to opportunities
                </p>
              </div>
              <LeadTable
                leads={leads}
                filters={filters}
                onFiltersChange={setFilters}
                onLeadSelect={handleLeadSelect}
                selectedLead={selectedLead}
              />
            </>
          ) : (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Opportunities
                </h1>
                <p className="text-muted-foreground">
                  Track your sales opportunities and their progress
                </p>
              </div>
              <OpportunityTable opportunities={opportunities} />
            </>
          )}
        </div>
      </main>
      <LeadDetailPanel
        lead={selectedLead}
        isOpen={!!selectedLead}
        onClose={handleClosePanel}
        onLeadUpdate={handleLeadUpdate}
        onConvertToOpportunity={handleConvertToOpportunity}
      />
    </div>
  );
};

export default LeadPage;
