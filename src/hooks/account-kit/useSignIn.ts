import { useMutation, type UseMutateFunction } from "@tanstack/react-query";
import { queryClient } from "~/config";
import { useSigner } from "~/store/accountKitStore";
import type { User } from "@account-kit/signer";

export type SignInType = "google" | "passkey" | "newPasskey";

export type UseSignInResult = {
  signIn: UseMutateFunction<User, Error, SignInType, unknown>;
  isSigningIn: boolean;
  signInType: SignInType | undefined;
  signInError: Error | null;
};

export function useSignIn(): UseSignInResult {
  const signer = useSigner();

  const {
    mutate: signIn,
    isPending: isSigningIn,
    variables: signInType,
    error: signInError,
  } = useMutation(
    {
      mutationFn: async (signInType: SignInType) => {
        const username = `initial-passkey - ${new Date().toLocaleString()}`;
        switch (signInType) {
          case "google":
            return signer.authenticate({
              type: "oauth",
              mode: "redirect",
              authProviderId: "google",
              redirectUrl: window.location.href,
            });

          case "passkey":
            return signer.authenticate({
              type: "passkey",
              createNew: false,
            });

          case "newPasskey":
            return signer.authenticate({
              type: "passkey",
              createNew: true,
              username,
              creationOpts: {
                publicKey: {
                  rp: {
                    id: import.meta.env.DEV ? "localhost" : "complexjty.com",
                    name: "Complexjty",
                  },
                },
              },
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
