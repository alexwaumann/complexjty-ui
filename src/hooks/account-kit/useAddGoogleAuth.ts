import { useMutation, type UseMutateFunction } from "@tanstack/react-query";
import { queryClient } from "~/config";
import { useSigner, useSignerStatus } from "~/store/accountKitStore";

export type UseAddGoogleAuthResult = {
  addGoogleAuth: UseMutateFunction<unknown, Error, void, unknown>;
  isAddingGoogleAuth: boolean;
  addGoogleAuthError: Error | null;
};

export function useAddGoogleAuth(): UseAddGoogleAuthResult {
  const signer = useSigner();
  const { isConnected: isSignerConnected } = useSignerStatus();

  const {
    mutate: addGoogleAuth,
    isPending: isAddingGoogleAuth,
    error: addGoogleAuthError,
  } = useMutation(
    {
      mutationFn: async () => {
        if (!isSignerConnected) {
          throw Error("useAddGoogleAuth: no signer connected");
        }

        const providerInfo = await signer.addOauthProvider({
          mode: "popup",
          authProviderId: "google",
        });
        await queryClient.invalidateQueries({ queryKey: ["get-auth-methods"] });

        return providerInfo;
      },
      mutationKey: ["addGoogleAuth"],
    },
    queryClient,
  );

  return { addGoogleAuth, isAddingGoogleAuth, addGoogleAuthError };
}
