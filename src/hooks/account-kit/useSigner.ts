import { getSigner, watchSigner, type AlchemySigner } from "@account-kit/core";
import { useSyncExternalStore } from "react";
import { useAccountKitContext } from "../useAccountKitContext";

export function useSigner(): AlchemySigner {
  const { alchemyAccountsConfig } = useAccountKitContext();

  // NOTE: we do "as AlchemySigner" here because we hydrate() the client store
  //       in the __root.tsx beforeLoad to ensure a signer always exists
  return useSyncExternalStore(
    watchSigner(alchemyAccountsConfig),
    () => getSigner<AlchemySigner>(alchemyAccountsConfig) as AlchemySigner,
  );
}
