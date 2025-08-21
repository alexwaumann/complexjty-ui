import { createConfig } from "@account-kit/core";
import { alchemy, optimismSepolia } from "@account-kit/infra";
import { QueryClient } from "@tanstack/react-query";
import { Alchemy, Network } from "alchemy-sdk";

export const queryClient = new QueryClient();

export const alchemySdk = new Alchemy({
  apiKey: import.meta.env.VITE_ALCHEMY_KEY,
  network: Network.OPT_SEPOLIA,
});

export const alchemyAccountsConfig = createConfig({
  chain: optimismSepolia,
  transport: alchemy({ apiKey: import.meta.env.VITE_ALCHEMY_KEY }),
  policyId: import.meta.env.VITE_ALCHEMY_POLICY_ID,
  sessionConfig: { storage: "localStorage", expirationTimeMs: 1000 * 60 * 60 },
  enablePopupOauth: true,
});
