import { useQuery } from "@tanstack/react-query";
import { queryClient } from "~/config";
import { useSigner, useSignerStatus, useUser } from "~/store/accountKitStore";

export function useGetAuthMethods() {
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
      enabled: !!user && isSignerConnected,
    },
    queryClient,
  );

  return { authMethods, getAuthMethodsError };
}
