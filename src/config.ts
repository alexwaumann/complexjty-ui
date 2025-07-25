import { createConfig } from "@account-kit/core";
import { alchemy, optimismSepolia } from "@account-kit/infra";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const alchemyAccountsConfig = createConfig({
  chain: optimismSepolia,
  transport: alchemy({
    alchemyConnection: {
      apiKey: import.meta.env.VITE_ALCHEMY_KEY,
    },
    nodeRpcUrl: "http://127.0.0.1:8545",
  }),
  sessionConfig: { storage: "localStorage", expirationTimeMs: 1000 * 60 * 60 },
});
