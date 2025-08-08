import { useQuery } from "@tanstack/react-query";
import { useAccountKitContext } from "../useAccountKitContext";
import { useSigner } from "./useSigner";
import { useUser } from "./useUser";
import { useSignerStatus } from "./useSignerStatus";

export function useGetAuthMethods() {
  const { queryClient } = useAccountKitContext();
  const user = useUser();
  const signer = useSigner();
  const { isConnected: isSignerConnected } = useSignerStatus();

  const { data: authMethods, error: getAuthMethodsError } = useQuery(
    {
      queryKey: ["get-auth-methods", user?.orgId],
      queryFn: async () => {
        if (!isSignerConnected) {
          throw Error("useListAuthMethods: no signer connected");
        }

        const authMethods = await signer.listAuthMethods();
        return {
          passkeys: authMethods.passkeys,
          recoveryEmail: authMethods.email,
        };
      },
      enabled: !!user && !!signer && isSignerConnected,
    },
    queryClient,
  );

  return { authMethods, getAuthMethodsError };
}
