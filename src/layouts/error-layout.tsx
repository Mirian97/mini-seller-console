export const Error = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <p className="text-destructive mb-4">Something went wrong!</p>
      <button
        onClick={() => window.location.reload()}
        className="text-primary hover:underline"
      >
        Try again
      </button>
    </div>
  </div>
);
