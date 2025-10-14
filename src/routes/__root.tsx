import { AppLayout } from "@/layouts/app-layout";
import { Error } from "@/layouts/error-layout";
import { LoadingLayout } from "@/layouts/loading-layout";
import { NotFoundLayout } from "@/layouts/not-found-layout";
import { createRootRoute } from "@tanstack/react-router";
import * as React from "react";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundLayout,
  pendingComponent: LoadingLayout,
  errorComponent: Error,
});

function RootComponent() {
  return (
    <React.Fragment>
      <AppLayout />
    </React.Fragment>
  );
}
