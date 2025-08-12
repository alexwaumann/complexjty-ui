import { useMutation, type UseMutateFunction } from "@tanstack/react-query";
import { queryClient } from "~/config";
import { useSigner, useSignerStatus } from "~/store/accountKitStore";

export type UseSetRecoveryEmailResult = {
  setRecoveryEmail: UseMutateFunction<void, Error, string, unknown>;
  isSettingRecoveryEmail: boolean;
  recoveryEmailError: Error | null;
  isSetRecoveryEmailSuccess: boolean;
  resetUseSetRecoveryEmail: () => void;
};

export function useSetRecoveryEmail(): UseSetRecoveryEmailResult {
  const signer = useSigner();
  const { isConnected: isSignerConnected } = useSignerStatus();

  const {
    mutate: setRecoveryEmail,
    isPending: isSettingRecoveryEmail,
    error: recoveryEmailError,
    isSuccess: isSetRecoveryEmailSuccess,
    reset: resetUseSetRecoveryEmail,
  } = useMutation(
    {
      mutationFn: async (email: string) => {
        if (!isSignerConnected) {
          throw Error("useSetRecoveryEmail: no signer connected");
        }

        return signer.setEmail(email);
      },
      mutationKey: ["setRecoveryEmail"],
    },
    queryClient,
  );

  return {
    setRecoveryEmail,
    isSettingRecoveryEmail,
    recoveryEmailError,
    isSetRecoveryEmailSuccess,
    resetUseSetRecoveryEmail,
  };
}
