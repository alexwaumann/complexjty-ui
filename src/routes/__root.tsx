import Container from "@mui/material/Container";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AppHeader } from "~/components/AppHeader";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
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
