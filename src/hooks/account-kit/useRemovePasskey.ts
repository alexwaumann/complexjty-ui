import { useMutation, type UseMutateFunction } from "@tanstack/react-query";
import { useAccountKitContext } from "../useAccountKitContext";
import { useSigner } from "./useSigner";

export type UseRemovePasskeyResult = {
  removePasskey: UseMutateFunction<void, Error, string, unknown>;
  isRemovingPasskey: boolean;
  removePasskeyError: Error | null;
};

export function useRemovePasskey(): UseRemovePasskeyResult {
  const { queryClient } = useAccountKitContext();
  const signer = useSigner();

  const {
    mutate: removePasskey,
    isPending: isRemovingPasskey,
    error: removePasskeyError,
  } = useMutation(
    {
      mutationFn: async (authenticatorId: string) => {
        if (!signer) {
          throw new Error("useRemovePasskey: No signer");
        }

        await signer.removePasskey(authenticatorId);
        await queryClient.invalidateQueries({ queryKey: ["get-auth-methods"] });
      },
      mutationKey: ["removePasskey"],
    },
    queryClient,
  );

  return { removePasskey, isRemovingPasskey, removePasskeyError };
}
