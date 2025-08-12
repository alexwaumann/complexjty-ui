import { useMutation, type UseMutateFunction } from "@tanstack/react-query";
import { queryClient } from "~/config";
import { useSigner } from "~/store/accountKitStore";

export type UseRemovePasskeyResult = {
  removePasskey: UseMutateFunction<void, Error, string, unknown>;
  isRemovingPasskey: boolean;
  removePasskeyError: Error | null;
};

export function useRemovePasskey(): UseRemovePasskeyResult {
  const signer = useSigner();

  const {
    mutate: removePasskey,
    isPending: isRemovingPasskey,
    error: removePasskeyError,
  } = useMutation(
    {
      mutationFn: async (authenticatorId: string) => {
        await signer.removePasskey(authenticatorId);
        await queryClient.invalidateQueries({ queryKey: ["get-auth-methods"] });
      },
      mutationKey: ["removePasskey"],
    },
    queryClient,
  );

  return { removePasskey, isRemovingPasskey, removePasskeyError };
}
