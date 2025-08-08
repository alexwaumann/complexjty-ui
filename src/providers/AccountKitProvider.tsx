import { type AlchemyAccountsConfig } from "@account-kit/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { useMemo } from "react";

import { AccountKitContext } from "./AccountKitContext";

export type AccountKitProviderProps = {
  config: AlchemyAccountsConfig;
  queryClient: QueryClient;
};

export function AccountKitProvider(
  props: React.PropsWithChildren<AccountKitProviderProps>,
) {
  const { config, queryClient, children } = props;

  const initalContext = useMemo(
    () => ({ alchemyAccountsConfig: config, queryClient }),
    [config, queryClient],
  );

  return (
    <AccountKitContext value={initalContext}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AccountKitContext>
  );
}
