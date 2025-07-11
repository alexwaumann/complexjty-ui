import Button from "@mui/material/Button";
import { useSigner } from "~/hooks/account-kit/useSigner";
import { useSignerStatus } from "~/hooks/account-kit/useSignerStatus";

export function LoginButton() {
  const signerStatus = useSignerStatus();
  const signer = useSigner();

  function onLogin() {
    if (!signer) {
      return;
    }

    signer
      .authenticate({ type: "passkey", createNew: false })
      .then((user) => console.log(user))
      .catch((error) => console.error("error logging in", error));
  }

  return (
    <Button
      variant="contained"
      loading={signerStatus.isAuthenticating}
      onClick={() => onLogin()}
    >
      Login
    </Button>
  );
}
