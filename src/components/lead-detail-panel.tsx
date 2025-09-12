import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Lead, Opportunity } from "@/types";
import { getScoreColor } from "@/utils/get-score-color";
import { getStatusBadgeVariant } from "@/utils/get-status-badge-variant";
import { validateEmail } from "@/utils/validate-email";
import { AlertCircle, ArrowRight, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface LeadDetailPanelProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onLeadUpdate: (lead: Lead) => void;
  onConvertToOpportunity: (opportunity: Opportunity) => void;
}

export const LeadDetailPanel = ({
  lead,
  isOpen,
  onClose,
  onLeadUpdate,
  onConvertToOpportunity,
}: LeadDetailPanelProps) => {
  const [editedLead, setEditedLead] = useState<Lead | null>(null);
  const [isSaving, setSaving] = useState(false);
  const [isConverting, setConverting] = useState(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (lead) {
      setEditedLead({ ...lead });
      setEmailError("");
    }
  }, [lead]);

  const handleSave = async () => {
    if (!editedLead) return;
    if (!validateEmail(editedLead.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setSaving(true);
    setEmailError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      onLeadUpdate(editedLead);
      toast.success("Lead information has been successfully updated.");
    } catch (error) {
      toast.error("Failed to update lead. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (lead) {
      setEditedLead({ ...lead });
      setEmailError("");
    }
  };

  const handleConvertToOpportunity = async () => {
    if (!editedLead) return;
    setConverting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const opportunity: Opportunity = {
        id: `opp-${Date.now()}`,
        name: `${editedLead.name} - ${editedLead.company}`,
        stage: "Prospecting",
        accountName: editedLead.company,
        leadId: editedLead.id,
      };
      onConvertToOpportunity(opportunity);
      toast.success("Lead has been successfully converted to an opportunity.");
      onClose();
    } catch (error) {
      toast.success("Failed to convert lead. Please try again.");
    } finally {
      setConverting(false);
    }
  };

  if (!isOpen || !lead || !editedLead) return null;

  const hasChanges = JSON.stringify(lead) !== JSON.stringify(editedLead);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-96 bg-card border-l border-border z-50 flex flex-col animate-in slide-in-from-right duration-200">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold">Lead Details</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-5">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editedLead.name}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={editedLead.company}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={editedLead.email}
                onChange={(e) => {
                  setEditedLead({ ...editedLead, email: e.target.value });
                  setEmailError("");
                }}
                className={emailError ? "border-destructive" : ""}
              />
              {emailError && (
                <div className="flex items-center gap-2 mt-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {emailError}
                </div>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="status">Status *</Label>
              <Select
                value={editedLead.status}
                onValueChange={(value: Lead["status"]) =>
                  setEditedLead({ ...editedLead, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Qualified">Qualified</SelectItem>
                  <SelectItem value="Lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Source</Label>
              <Input
                value={editedLead.source}
                disabled
                className="bg-muted capitalize"
              />
            </div>
            <div className="space-y-1">
              <Label>Lead Score</Label>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={cn(
                    "text-2xl font-bold",
                    getScoreColor(editedLead.score)
                  )}
                >
                  {editedLead.score}
                </span>
                <span className="text-muted-foreground">/ 100</span>
              </div>
            </div>
            <div className="space-y-1">
              <Label>Current Status</Label>
              <div className="mt-2">
                <Badge
                  className="uppercase text-[9px] !font-semibold"
                  variant={getStatusBadgeVariant(editedLead.status)}
                >
                  {editedLead.status}
                </Badge>
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-3">
            <h3 className="font-medium">Actions</h3>
            <Button
              onClick={handleConvertToOpportunity}
              disabled={isConverting || editedLead.status === "Lost"}
              className="w-full"
              size="lg"
              variant="success"
            >
              {isConverting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Converting...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Convert to Opportunity
                </div>
              )}
            </Button>
            {editedLead.status === "Lost" && (
              <p className="text-sm text-muted-foreground text-center">
                Lost leads cannot be converted to opportunities
              </p>
            )}
          </div>
        </div>
        <div className="border-t border-border p-6">
          <div className="flex gap-3">
            <Button
              onClick={handleSave}
              disabled={!hasChanges || isSaving || !!emailError}
              className="flex-1"
            >
              {isSaving ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </div>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
          {hasChanges && (
            <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              You have unsaved changes
            </div>
          )}
        </div>
      </div>
    </>
  );
};
