import { getSigner, watchSigner, type AlchemySigner } from "@account-kit/core";
import { useSyncExternalStore } from "react";
import { useAccountKitContext } from "../useAccountKitContext";

export function useSigner<T extends AlchemySigner>(): T | null {
  const { alchemyAccountsConfig } = useAccountKitContext();

  return useSyncExternalStore(
    watchSigner(alchemyAccountsConfig),
    () => getSigner<T>(alchemyAccountsConfig),
    () => null,
  );
}
