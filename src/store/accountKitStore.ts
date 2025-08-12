import {
  getAccount,
  getSigner,
  getSignerStatus,
  getUser,
  hydrate,
  watchSigner,
  watchSignerStatus,
  watchSmartAccountClient,
  watchUser,
  type AlchemySigner,
  type GetAccountResult,
  type GetSmartAccountClientResult,
  type SignerStatus,
} from "@account-kit/core";
import type { User } from "@account-kit/signer";
import { create } from "zustand";
import { alchemyAccountsConfig } from "~/config";

type AccountKitState = {
  user: User | null;
  signer: AlchemySigner;
  signerStatus: SignerStatus;
  account: GetAccountResult<"ModularAccountV2">;
  smartAccountClient: GetSmartAccountClientResult;

  initialize: () => () => void;
};

export const useAccountKitStore = create<AccountKitState>((set) => ({
  user: getUser(alchemyAccountsConfig),
  signer: getSigner(alchemyAccountsConfig) as AlchemySigner,
  signerStatus: getSignerStatus(alchemyAccountsConfig),
  account: getAccount({ type: "ModularAccountV2" }, alchemyAccountsConfig),
  smartAccountClient: {
    client: undefined,
    address: undefined,
    isLoadingClient: true,
  },

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

    const unwatchSmartAccountClient = watchSmartAccountClient(
      { type: "ModularAccountV2" },
      alchemyAccountsConfig,
    )((smartAccountClient) => set({ smartAccountClient }));

    return () => {
      unwatchUser();
      unwatchSigner();
      unwatchSignerStatus();
      unwatchSmartAccountClient();
    };
  },
}));

export const useUser = () => useAccountKitStore((state) => state.user);
export const useSigner = () => useAccountKitStore((state) => state.signer);
export const useSignerStatus = () =>
  useAccountKitStore((state) => state.signerStatus);
export const useSmartAccountClient = () =>
  useAccountKitStore((state) => state.smartAccountClient);
