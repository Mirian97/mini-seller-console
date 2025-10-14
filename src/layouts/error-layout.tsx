import { Button } from "@/components/ui/button";
import { CircleAlert, RotateCw } from "lucide-react";

export const Error = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6">
    <div className="flex flex-col items-center text-center space-y-6">
      <CircleAlert className="size-12 text-red-400" />
      <div>
        <h1 className="text-2xl font-semibold tracking-tight mb-1">
          Something went wrong
        </h1>
        <p className="text-sm text-muted-foreground max-w-sm">
          An unexpected error occurred. Please refresh the page or try again
          later.
        </p>
      </div>
      <Button onClick={() => window.location.reload()}>
        Refresh page
        <RotateCw />
      </Button>
    </div>
  </div>
);
