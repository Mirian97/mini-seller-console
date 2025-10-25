import { LoadingSpinner } from "@/components/loading-spinner";

export const LoadingLayout = () => {
  return (
    <div className="h-full flex-1 bg-background flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-4 text-muted-foreground">
          Loading Mini Seller Console...
        </p>
      </div>
    </div>
  );
};
