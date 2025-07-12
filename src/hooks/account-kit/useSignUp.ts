import type { User } from "@account-kit/signer";
import { useMutation, type UseMutateFunction } from "@tanstack/react-query";
import { useAccountKitContext } from "../useAccountKitContext";
import { useSigner } from "./useSigner";

export type UseSignUpResult = {
  signUp: UseMutateFunction<User, Error, SignUpMutationFnArgs, unknown>;
  isSigningUp: boolean;
  signUpError: Error | null;
};

export type SignUpMutationFnArgs = { passkeyName: string };

export function useSignUp(): UseSignUpResult {
  const { queryClient } = useAccountKitContext();
  const signer = useSigner();

  const {
    mutate: signUp,
    isPending: isSigningUp,
    error: signUpError,
  } = useMutation(
    {
      mutationFn: async (args: SignUpMutationFnArgs) => {
        const { passkeyName } = args;

        if (!signer) {
          throw new Error("useSignUp: No signer");
        }

        if (!isValidPasskeyName(passkeyName)) {
          throw new Error("useSignUp: Invalid passkey name");
        }

        return signer.authenticate({
          type: "passkey",
          createNew: true,
          username: passkeyName.trim().replace(" ", "-"),
        });
      },
      mutationKey: ["signUp"],
    },
    queryClient,
  );

  return {
    signUp,
    isSigningUp,
    signUpError,
  };
}

export function isValidPasskeyName(passkeyName: string): boolean {
  const name = passkeyName;
  const regex = /^[a-zA-Z0-9 ]/;

  const meetsLengthRequirement = name.length < 30 && name.length > 0;
  const meetsSpacesRequirement = !name.includes("  ");
  const meetsCharacterRequirement = regex.test(name);

  if (
    !meetsLengthRequirement ||
    !meetsSpacesRequirement ||
    !meetsCharacterRequirement
  ) {
    return false;
  }

  return true;
}
