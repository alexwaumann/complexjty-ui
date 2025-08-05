import { useMutation, type UseMutateFunction } from "@tanstack/react-query";
import { useSigner } from "./useSigner";
import { useAccountKitContext } from "../useAccountKitContext";

export type UseAddPasskeyResult = {
  addPasskey: UseMutateFunction<string[], Error, void, unknown>;
  isAddingPasskey: boolean;
  addPasskeyError: Error | null;
};

export function useAddPasskey(): UseAddPasskeyResult {
  const { queryClient } = useAccountKitContext();
  const signer = useSigner();

  const {
    mutate: addPasskey,
    isPending: isAddingPasskey,
    error: addPasskeyError,
  } = useMutation(
    {
      mutationFn: async () => {
        if (!signer) {
          throw new Error("useAddPasskey: No signer");
        }

        const authenticatorIds = await signer.addPasskey();
        await queryClient.invalidateQueries({ queryKey: ["get-auth-methods"] });

        return authenticatorIds;
      },
      mutationKey: ["addPasskey"],
    },
    queryClient,
  );

  return { addPasskey, isAddingPasskey, addPasskeyError };
}
