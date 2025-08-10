import { disconnect } from "@account-kit/core";
import { useMutation, type UseMutateFunction } from "@tanstack/react-query";
import { alchemyAccountsConfig, queryClient } from "~/config";

export type UseSignOutResult = {
  signOut: UseMutateFunction<void, Error, void, unknown>;
  isSigningOut: boolean;
  signOutError: Error | null;
};

export function useSignOut(): UseSignOutResult {
  const {
    mutate: signOut,
    isPending: isSigningOut,
    error: signOutError,
  } = useMutation(
    {
      mutationFn: async () => await disconnect(alchemyAccountsConfig),
      mutationKey: ["signOut"],
    },
    queryClient,
  );

  return {
    signOut,
    isSigningOut,
    signOutError,
  };
}
