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
        if (!signer || !isSignerConnected) {
          throw Error("useListAuthMethods: no signer connected");
        }

        return signer.listAuthMethods();
      },
      enabled: !!user && !!signer && isSignerConnected,
    },
    queryClient,
  );

  const googleOauthInfo = {
    active: Boolean(user?.email),
    email: authMethods?.oauthProviders[0]?.userDisplayName,
  };

  // TODO: why doesn't authMethod passkey info have credentialId?
  const passkeyAuthInfo = {
    active: Boolean(user?.credentialId),
    authenticatorId: authMethods?.passkeys[0]?.authenticatorId,
    credentialId: user?.credentialId,
  };

  return { googleOauthInfo, passkeyAuthInfo, getAuthMethodsError };
}
