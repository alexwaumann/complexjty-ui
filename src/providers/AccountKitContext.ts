import type { AlchemyAccountsConfig } from "@account-kit/core";
import type { QueryClient } from "@tanstack/react-query";
import { createContext } from "react";

export type AccountKitContextProps = {
  alchemyAccountsConfig: AlchemyAccountsConfig;
  queryClient: QueryClient;
};

export const AccountKitContext = createContext<
  AccountKitContextProps | undefined
>(undefined);
