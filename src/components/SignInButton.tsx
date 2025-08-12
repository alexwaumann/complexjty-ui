import GoogleIcon from "@mui/icons-material/Google";
import PasskeyIcon from "@mui/icons-material/Key";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { PasskeySyncDialog } from "~/components/dialogs/PasskeySyncDialog";
import { useSignIn } from "~/hooks/account-kit/useSignIn";

export function SignInButton() {
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
              py: 2,
              [theme.breakpoints.up("sm")]: { minWidth: "360px" },
              [theme.breakpoints.down("sm")]: { width: "100%" },
            },
          },
          backdrop: { invisible: false },
        }}
      >
        <Stack direction="column" alignItems="center" gap={2}>
          <Avatar
            sizes=""
            src="/public/logo.png"
            sx={{ width: 72, height: 72 }}
          />

          <Typography variant="h6">Complexjty</Typography>

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
            <Stack direction="column" alignItems="center" gap="1">
              <Typography variant="caption" color="textSecondary">
                Don't see your passkey?
              </Typography>

              <Link
                component="button"
                variant="caption"
                onClick={() => setIsPasskeySyncDialogOpen(true)}
              >
                Learn how to sync passkeys across devices
              </Link>

              <Link
                component="button"
                variant="caption"
                onClick={() =>
                  console.warn("Account recovery not implemented yet")
                }
              >
                Recover account with recovery email
              </Link>
            </Stack>
          )}

          <Divider flexItem>
            <Typography variant="caption">OR</Typography>
          </Divider>

          <Button
            loadingPosition="start"
            loading={isSigningIn && signInType === "newPasskey"}
            disabled={isSigningIn && signInType !== "newPasskey"}
            onClick={() =>
              signIn("newPasskey", {
                onSuccess: () => setSignInPopoverAnchor(null),
              })
            }
            startIcon={<PasskeyIcon />}
            fullWidth
          >
            Sign up with Passkey
          </Button>

          <Typography variant="caption">
            By signing up, you agree to the{" "}
            <Link
              href="https://www.alchemy.com/terms-conditions/end-user-terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
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
