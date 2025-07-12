import type { User } from "@account-kit/signer";
import {
  useMutation,
  type UseMutateAsyncFunction,
  type UseMutateFunction,
} from "@tanstack/react-query";
import { useAccountKitContext } from "../useAccountKitContext";
import { useSigner } from "./useSigner";

export type UseSignInResult = {
  signIn: UseMutateFunction<User, Error, void, unknown>;
  signInAsync: UseMutateAsyncFunction<User, Error, void, unknown>;
  isSigningIn: boolean;
  signInError: Error | null;
};

export function useSignIn(): UseSignInResult {
  const { queryClient } = useAccountKitContext();
  const signer = useSigner();

  const {
    mutate: signIn,
    mutateAsync: signInAsync,
    isPending: isSigningIn,
    error: signInError,
  } = useMutation(
    {
      mutationFn: async () => {
        if (!signer) {
          throw new Error("useSignIn: No signer");
        }

        return signer.authenticate({
          type: "passkey",
          createNew: false,
        });
      },
      mutationKey: ["signIn"],
    },
    queryClient,
  );

  return {
    signIn,
    signInAsync,
    isSigningIn,
    signInError,
  };
}
