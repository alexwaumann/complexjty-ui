import { useMutation, type UseMutateFunction } from "@tanstack/react-query";
import { queryClient } from "~/config";
import { useSigner, useSignerStatus } from "~/store/accountKitStore";

export type UseAddPasskeyResult = {
  addPasskey: UseMutateFunction<string[], Error, void, unknown>;
  isAddingPasskey: boolean;
  addPasskeyError: Error | null;
};

export function useAddPasskey(): UseAddPasskeyResult {
  const signer = useSigner();
  const { isConnected: isSignerConnected } = useSignerStatus();

  const {
    mutate: addPasskey,
    isPending: isAddingPasskey,
    error: addPasskeyError,
  } = useMutation(
    {
      mutationFn: async () => {
        if (!isSignerConnected) {
          throw Error("useAddPasskey: no signer connected");
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
