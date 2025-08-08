import { hydrate } from "@account-kit/core";
import Container from "@mui/material/Container";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AppHeader } from "~/components/AppHeader";
import { alchemyAccountsConfig } from "~/config";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    beforeLoad: async () => await hydrate(alchemyAccountsConfig).onMount(),
    component: RootLayoutComponent,
  },
);

function RootLayoutComponent() {
  return (
    <>
      <Container maxWidth="xl">
        <AppHeader />
        <Outlet />
      </Container>
      <TanStackRouterDevtools />
    </>
  );
}
