import leadsData from "@/data/leads.json";
import type { Lead } from "@/types";

export const getLeads = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return leadsData as Lead[];
};

export const getOpportunities = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return localStorage.getItem("opportunities")
    ? JSON.parse(localStorage.getItem("opportunities")!)
    : [];
};
