import GoogleIcon from "@mui/icons-material/Google";
import PasskeyIcon from "@mui/icons-material/Key";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { PasskeySyncDialog } from "~/components/dialogs/PasskeySyncDialog";

import { useSignIn } from "~/hooks/account-kit/useSignIn";

type SignInButtonProps = {
  openSignUpDialog: () => void;
};

export function SignInButton({ openSignUpDialog }: SignInButtonProps) {
  const { signIn, isSigningIn, signInType, signInError } = useSignIn();
  const theme = useTheme();

  const [isPasskeySyncDialogOpen, setIsPasskeySyncDialogOpen] = useState(false);

  const [signInPopoverAnchor, setSignInPopoverAnchor] =
    useState<HTMLElement | null>(null);
  const isPopoverOpen = Boolean(signInPopoverAnchor);

  return (
    <>
      <Button
        variant="contained"
        onClick={(event) => setSignInPopoverAnchor(event.currentTarget)}
        size="large"
      >
        Sign in
      </Button>
      <Popover
        open={isPopoverOpen}
        onClose={() => setSignInPopoverAnchor(null)}
        anchorEl={signInPopoverAnchor}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            sx: {
              mt: 2,
              px: 4,
              py: 3,
              [theme.breakpoints.up("sm")]: { minWidth: "360px" },
              [theme.breakpoints.down("sm")]: { width: "100%" },
            },
          },
          backdrop: { invisible: false },
        }}
      >
        <Stack gap={3}>
          <Stack alignItems="center" gap={2}>
            <Avatar src="/public/logo.png" sx={{ width: 72, height: 72 }} />
            <Typography variant="h6">Complexjty</Typography>
          </Stack>

          <Stack gap={2}>
            <Button
              loadingPosition="start"
              loading={isSigningIn && signInType === "google"}
              disabled={isSigningIn && signInType !== "google"}
              onClick={() =>
                signIn("google", {
                  onSuccess: () => setSignInPopoverAnchor(null),
                })
              }
              variant="contained"
              startIcon={<GoogleIcon />}
              fullWidth
            >
              Sign in with Google
            </Button>

            <Button
              loadingPosition="start"
              loading={isSigningIn && signInType === "passkey"}
              disabled={isSigningIn && signInType !== "passkey"}
              onClick={() =>
                signIn("passkey", {
                  onSuccess: () => setSignInPopoverAnchor(null),
                })
              }
              variant="contained"
              startIcon={<PasskeyIcon />}
              fullWidth
            >
              Sign in with Passkey
            </Button>

            {signInType === "passkey" && signInError && (
              <Stack alignItems="start" gap="1">
                <Typography variant="caption" color="textSecondary">
                  Lost your passkey?{" "}
                  <Link
                    component="button"
                    onClick={() =>
                      console.warn("Account recovery not implemented yet")
                    }
                  >
                    Recover account with email.
                  </Link>
                </Typography>

                <Typography variant="caption" color="textSecondary">
                  Don't see your passkey?{" "}
                  <Link
                    component="button"
                    onClick={() => setIsPasskeySyncDialogOpen(true)}
                  >
                    Sync passkeys guide.
                  </Link>
                </Typography>
              </Stack>
            )}
          </Stack>

          <Typography variant="body2" color="textSecondary">
            New to Complexjty?{" "}
            <Link
              component="button"
              onClick={() => {
                openSignUpDialog();
                setSignInPopoverAnchor(null);
              }}
            >
              Sign up now.
            </Link>
          </Typography>
        </Stack>
      </Popover>
      <PasskeySyncDialog
        open={isPasskeySyncDialogOpen}
        onClose={() => setIsPasskeySyncDialogOpen(false)}
      />
    </>
  );
}
