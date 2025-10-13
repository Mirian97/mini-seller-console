import { AppLayout } from "@/layouts/app-layout";
import { Error } from "@/layouts/error-layout";
import { Loading } from "@/layouts/loading-layout";
import { NotFound } from "@/layouts/not-found-layout";
import { createRootRoute } from "@tanstack/react-router";
import * as React from "react";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
  pendingComponent: Loading,
  errorComponent: Error,
});

function RootComponent() {
  return (
    <React.Fragment>
      <AppLayout />
    </React.Fragment>
  );
}
