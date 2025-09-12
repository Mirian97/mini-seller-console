export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: "New" | "Contacted" | "Qualified" | "Lost";
}

export interface Opportunity {
  id: string;
  name: string;
  stage: "Prospecting" | "Negotiation" | "Closed";
  amount?: number;
  accountName: string;
  leadId?: string;
}

export interface FilterState {
  search: string;
  status: string;
  sortBy: "score" | "name" | "company";
  sortOrder: "asc" | "desc";
}

export interface AppState {
  leads: Lead[];
  opportunities: Opportunity[];
  filters: FilterState;
  selectedLead: Lead | null;
  isLoading: boolean;
  error: string | null;
}
