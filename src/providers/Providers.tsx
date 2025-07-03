import ThemeProvider from "@mui/system/ThemeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import type React from "react";

import { alchemyAccountsConfig, queryClient } from "~/config";
import { theme } from "~/theme";
import { AccountKitProvider } from "./AccountKitProvider";

export function Providers(props: React.PropsWithChildren) {
  const { children } = props;

  return (
    <QueryClientProvider client={queryClient}>
      <AccountKitProvider
        config={alchemyAccountsConfig}
        queryClient={queryClient}
      >
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </AccountKitProvider>
    </QueryClientProvider>
  );
}
