import {
  createAccount as createSmartContractAccount,
  getAccount,
  getSigner,
  getSignerStatus,
  getUser,
  hydrate,
  watchAccount,
  watchSigner,
  watchSignerStatus,
  watchUser,
  type AlchemySigner,
  type GetAccountResult,
  type SignerStatus,
} from "@account-kit/core";
import type { User } from "@account-kit/signer";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { create } from "zustand";
import { alchemyAccountsConfig, queryClient } from "~/config";

type AccountKitState = {
  user: User | null;
  signer: AlchemySigner;
  signerStatus: SignerStatus;
  account: GetAccountResult<"ModularAccountV2">;

  initialize: () => () => void;
};

export const useAccountKitStore = create<AccountKitState>((set) => ({
  user: getUser(alchemyAccountsConfig),
  signer: getSigner(alchemyAccountsConfig) as AlchemySigner,
  signerStatus: getSignerStatus(alchemyAccountsConfig),
  account: getAccount({ type: "ModularAccountV2" }, alchemyAccountsConfig),

  initialize: () => {
    hydrate(alchemyAccountsConfig)
      .onMount()
      .catch(() => console.error("FAILED TO HYDRATE ACCOUNT KIT"));

    const unwatchUser = watchUser(alchemyAccountsConfig)((user) =>
      set({ user }),
    );

    const unwatchSigner = watchSigner(alchemyAccountsConfig)((signer) =>
      set({ signer }),
    );

    const unwatchSignerStatus = watchSignerStatus(alchemyAccountsConfig)(
      (signerStatus) => set({ signerStatus }),
    );

    const unwatchAccount = watchAccount(
      "ModularAccountV2",
      alchemyAccountsConfig,
    )((account) => set({ account }));

    return () => {
      unwatchUser();
      unwatchSigner();
      unwatchSignerStatus();
      unwatchAccount();
    };
  },
}));

export const useUser = () => useAccountKitStore((state) => state.user);
export const useSigner = () => useAccountKitStore((state) => state.signer);
export const useSignerStatus = () =>
  useAccountKitStore((state) => state.signerStatus);
export const useAccount = () => {
  const account = useAccountKitStore((state) => state.account);
  const signerStatus = useSignerStatus();

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
};
