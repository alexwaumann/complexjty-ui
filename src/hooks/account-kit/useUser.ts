import { getUser, watchUser } from "@account-kit/core";
import { useAccountKitContext } from "../useAccountKitContext";
import { useSyncExternalStore } from "react";

export function useUser() {
  const { alchemyAccountsConfig } = useAccountKitContext();

  return useSyncExternalStore(watchUser(alchemyAccountsConfig), () =>
    getUser(alchemyAccountsConfig),
  );
}
