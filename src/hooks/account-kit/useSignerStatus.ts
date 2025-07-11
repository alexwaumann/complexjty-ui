import {
  getSignerStatus,
  watchSignerStatus,
  type SignerStatus,
} from "@account-kit/core";
import { useSyncExternalStore } from "react";
import { useAccountKitContext } from "../useAccountKitContext";

export function useSignerStatus(): SignerStatus {
  const { alchemyAccountsConfig } = useAccountKitContext();

  return useSyncExternalStore(
    watchSignerStatus(alchemyAccountsConfig),
    () => getSignerStatus(alchemyAccountsConfig),
    () => getSignerStatus(alchemyAccountsConfig),
  );
}
