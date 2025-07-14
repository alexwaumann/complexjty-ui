import Button from "@mui/material/Button";
import { useSignIn } from "~/hooks/account-kit/useSignIn";

export function SignInButton() {
  const { signIn, isSigningIn } = useSignIn();

  return (
    <Button
      variant="contained"
      loadingPosition="start"
      loading={isSigningIn}
      onClick={() => signIn()}
      size="large"
    >
      Sign in
    </Button>
  );
}
