import type { PasskeyInfo } from "@account-kit/signer";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "~/config";
import { useSigner, useSignerStatus, useUser } from "~/store/accountKitStore";

export type AuthMethods =
  | {
      type: "google";
      email: string;
    }
  | {
      type: "passkey";
      passkeys: PasskeyInfo[];
      recoveryEmail: string;
    };

export function useGetAuthMethods() {
  const user = useUser();
  const signer = useSigner();
  const { isConnected: isSignerConnected } = useSignerStatus();

  const { data: authMethods, error: getAuthMethodsError } = useQuery<
    unknown,
    Error,
    AuthMethods
  >(
    {
      queryKey: ["get-auth-methods", user?.orgId],
      queryFn: async () => {
        if (!isSignerConnected) {
          throw Error("useListAuthMethods: no signer connected");
        }

        const authMethods = await signer.listAuthMethods();
        if (authMethods.oauthProviders.length > 0) {
          return {
            type: "google",
            email: authMethods.oauthProviders[0].userDisplayName ?? "",
          };
        }

        return {
          type: "passkey",
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
