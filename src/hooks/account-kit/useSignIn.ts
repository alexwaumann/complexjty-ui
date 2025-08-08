import type { User } from "@account-kit/signer";
import { useMutation, type UseMutateFunction } from "@tanstack/react-query";
import { useAccountKitContext } from "../useAccountKitContext";
import { useSigner } from "./useSigner";

export type SignInType = "passkey" | "newPasskey";

export type UseSignInResult = {
  signIn: UseMutateFunction<User, Error, SignInType, unknown>;
  isSigningIn: boolean;
  signInType: SignInType | undefined;
  signInError: Error | null;
};

export function useSignIn(): UseSignInResult {
  const { queryClient } = useAccountKitContext();
  const signer = useSigner();

  const {
    mutate: signIn,
    isPending: isSigningIn,
    variables: signInType,
    error: signInError,
  } = useMutation(
    {
      mutationFn: async (signInType: SignInType) => {
        switch (signInType) {
          case "passkey":
            return signer.authenticate({
              type: "passkey",
              createNew: false,
            });

          case "newPasskey":
            return signer.authenticate({
              type: "passkey",
              createNew: true,
              username: "anon",
              //creationOpts: {
              //  publicKey: { rp: { id: "complexjty.com", name: "Complexjty" } },
              //},
            });
        }
      },
      mutationKey: ["signIn"],
    },
    queryClient,
  );

  return {
    signIn,
    isSigningIn,
    signInType,
    signInError,
  };
}
