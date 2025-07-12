import {
  createAccount as createSmartContractAccount,
  getAccount,
  watchAccount,
  type AlchemySigner,
  type ModularAccountV2,
} from "@account-kit/core";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useSyncExternalStore } from "react";
import type { Address } from "viem";
import { useAccountKitContext } from "../useAccountKitContext";
import { useSignerStatus } from "./useSignerStatus";

export type UseAccountResult = {
  account?: ModularAccountV2<AlchemySigner>;
  address?: Address;
  isLoadingAccount: boolean;
};

export function useAccount(): UseAccountResult {
  const { alchemyAccountsConfig, queryClient } = useAccountKitContext();
  const signerStatus = useSignerStatus();

  const account = useSyncExternalStore(
    watchAccount("ModularAccountV2", alchemyAccountsConfig),
    () => getAccount({ type: "ModularAccountV2" }, alchemyAccountsConfig),
  );

  const { mutate: createAccount, isPending: isCreatingAccount } = useMutation(
    {
      mutationFn: async () => {
        if (account.status !== "RECONNECTING" && account.account) {
          return account.account;
        }

        return createSmartContractAccount(
          { type: "ModularAccountV2" },
          alchemyAccountsConfig,
        );
      },
      mutationKey: ["createAccount"],
    },
    queryClient,
  );

  useEffect(() => {
    if (signerStatus.isConnected && !account.account && !isCreatingAccount) {
      createAccount();
    }
  }, [account, isCreatingAccount, createAccount, signerStatus.isConnected]);

  return {
    account: account.status === "READY" ? account.account : undefined,
    address:
      account.status === "READY" || account.status === "RECONNECTING" ?
        account.account.address
      : undefined,
    isLoadingAccount:
      isCreatingAccount ||
      account.status === "INITIALIZING" ||
      account.status === "RECONNECTING" ||
      signerStatus.isInitializing ||
      signerStatus.isAuthenticating,
  };
}
