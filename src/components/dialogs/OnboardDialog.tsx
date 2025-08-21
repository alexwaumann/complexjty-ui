import BiometricsIcon from "@mui/icons-material/FingerprintOutlined";
import DoneIcon from "@mui/icons-material/CheckCircleOutline";
import SecureIcon from "@mui/icons-material/GppGoodOutlined";
import QrCodeIcon from "@mui/icons-material/QrCodeScannerOutlined";
import TrustedSecurityIcon from "@mui/icons-material/VerifiedUserOutlined";
import SubmitIcon from "@mui/icons-material/ChevronRightOutlined";
import EmailIcon from "@mui/icons-material/EmailRounded";
import SecureEmailIcon from "@mui/icons-material/MailLockRounded";
import GoogleIcon from "@mui/icons-material/Google";
import PasskeyIcon from "@mui/icons-material/KeyRounded";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { isValidEmail } from "~/utils/common";
import { useSignIn } from "~/hooks/account-kit/useSignIn";

/** TODO:
 *  - add passkey step for email/google sign-up
 *  - add recovery setup step for passkey sign-up
 *  - add onboard steps for funding account (optional)
 *  - add follow-up steps for username + pfp
 */

type OnboardDialogProps = {
  open: boolean;
  onClose: () => void;
};

type Stage =
  | "initial"
  | "emailSignUp"
  | "emailOtp"
  | "googleSignUp"
  | "passkeySignUp"
  | "addPasskey"
  | "success";

export function OnboardDialog({ open, onClose }: OnboardDialogProps) {
  const { signIn, isSigningIn, resetUseSignIn } = useSignIn();

  const [stage, setStage] = useState<Stage>("initial");
  const [email, setEmail] = useState("");

  const handleCloseDialog = () => {
    onClose();
    setTimeout(reset, 250);
  };

  const handleSignInWithEmail = () => {
    console.warn("handleSignInWithEmail: not implemented yet");
  };

  const handleSignInWithGoogle = () => {
    signIn("google", {
      onSuccess: () => {
        setStage("success");
        setTimeout(handleCloseDialog, 2000);
      },
    });
  };

  const handleSignInWithPasskey = () => {
    signIn("newPasskey", {
      onSuccess: () => {
        setStage("success");
        setTimeout(handleCloseDialog, 2000);
      },
    });
  };

  const reset = () => {
    setStage("initial");
    setEmail("");
    resetUseSignIn();
  };

  return (
    <Dialog
      open={open}
      onClose={() => !isSigningIn && handleCloseDialog()}
      disableRestoreFocus
      maxWidth="sm"
    >
      <DialogTitle>
        <Stack alignItems="center" gap={2}>
          <Avatar src="/logo.png" sx={{ width: 72, height: 72 }} />
          <Typography variant="h6">Sign up for Complexjty</Typography>
        </Stack>
      </DialogTitle>

      {stage === "initial" && (
        <DialogContent sx={{ minWidth: 360 }}>
          <Stack gap={2}>
            <Button
              startIcon={<EmailIcon />}
              endIcon={<SubmitIcon />}
              onClick={() => setStage("emailSignUp")}
              variant="contained"
              size="large"
              fullWidth
              sx={{ justifyContent: "space-between" }}
            >
              Continue with Email
            </Button>

            <Button
              startIcon={<GoogleIcon />}
              endIcon={<SubmitIcon />}
              onClick={() => setStage("googleSignUp")}
              variant="contained"
              size="large"
              fullWidth
              sx={{ justifyContent: "space-between" }}
            >
              Continue with Google
            </Button>

            <Stack alignItems="center" gap={0.5}>
              <Button
                startIcon={<PasskeyIcon />}
                endIcon={<SubmitIcon />}
                onClick={() => setStage("passkeySignUp")}
                variant="contained"
                size="large"
                fullWidth
                sx={{ justifyContent: "space-between" }}
              >
                Continue with Passkey
              </Button>
              <Typography variant="caption" color="textSecondary">
                No email required, completely private.
              </Typography>
            </Stack>
          </Stack>
        </DialogContent>
      )}

      {stage === "emailSignUp" && (
        <>
          <DialogContent>
            <Stack gap={2} pt={1}>
              <TextField
                type="email"
                label="Email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyUp={(event) =>
                  event.key === "Enter" &&
                  isValidEmail(email) &&
                  handleSignInWithEmail()
                }
                //error={!!recoveryEmailError}
                //helperText={recoveryEmailError?.message}
                //disabled={isSettingRecoveryEmail || isSetRecoveryEmailSuccess}
                autoFocus
                slotProps={{ inputLabel: { shrink: true } }}
                size="medium"
                sx={{ minWidth: 320 }}
                fullWidth
              />

              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <SecureEmailIcon fontSize="large" color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Simple Sign-In"
                    secondary="Sign in with a temporary, one-time code. No need to create or remember another password."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TrustedSecurityIcon fontSize="large" color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Trusted Security"
                    secondary="Your account is protected by your existing email sign-in and security settings."
                  />
                </ListItem>
              </List>

              <Typography variant="caption" color="text.secondary">
                You will receive an email with a temporary, one-time code.
              </Typography>

              <Typography variant="caption">
                By signing in, you agree to the{" "}
                <Link
                  href="https://www.alchemy.com/terms-conditions/end-user-terms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </Link>
              </Typography>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button
              disabled={isSigningIn}
              variant="text"
              onClick={() => setStage("initial")}
            >
              Try another way
            </Button>
            <Button
              loading={isSigningIn}
              loadingPosition="start"
              variant="contained"
              onClick={() => handleSignInWithEmail()}
            >
              {isSigningIn ? "Signing in" : "Sign in with Email"}
            </Button>
          </DialogActions>
        </>
      )}

      {stage === "googleSignUp" && (
        <>
          <DialogContent>
            <Stack gap={2}>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <GoogleIcon fontSize="large" color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Simple Sign-In"
                    secondary="Sign in with Google for one-tap setup. No need to create or remember another password."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TrustedSecurityIcon fontSize="large" color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Trusted Security"
                    secondary="Your account is protected by your existing Google sign-in and security settings."
                  />
                </ListItem>
              </List>

              <Typography variant="caption" color="text.secondary">
                You will be directed to Google to securely sign in. Our sign-in
                process is powered by Alchemy.
              </Typography>

              <Typography variant="caption">
                By signing in, you agree to the{" "}
                <Link
                  href="https://www.alchemy.com/terms-conditions/end-user-terms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </Link>
              </Typography>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button
              disabled={isSigningIn}
              variant="text"
              onClick={() => setStage("initial")}
            >
              Try another way
            </Button>
            <Button
              loading={isSigningIn}
              loadingPosition="start"
              autoFocus
              variant="contained"
              onClick={() => handleSignInWithGoogle()}
            >
              {isSigningIn ? "Signing in..." : "Sign in with Google"}
            </Button>
          </DialogActions>
        </>
      )}

      {stage === "passkeySignUp" && (
        <>
          <DialogContent>
            <Stack gap={2}>
              <Typography variant="body1">
                Passkeys are the most secure and convenient way to access your
                account.
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Your passkey is saved securely on this device and automatically
                synced across your other devices through your Google Account or
                iCloud Keychain.
              </Typography>

              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <BiometricsIcon fontSize="large" color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Simple Sign-In"
                    secondary="Sign in with your Face ID, fingerprint, or screen lock. No need to create or remember another password."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <QrCodeIcon color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Sign In Anywhere"
                    secondary="Use your phone to securely sign in on any other device by scanning a QR code."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SecureIcon fontSize="large" color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Phishing-Resistant Security"
                    secondary="Passkeys are bound to our website, protecting you from fake sites and scams."
                  />
                </ListItem>
              </List>

              <Typography variant="caption" color="text.secondary">
                You will be prompted by your device to save your passkey using
                your Face ID, fingerprint, or screen lock.
              </Typography>

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
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button
              disabled={isSigningIn}
              variant="text"
              onClick={() => setStage("initial")}
            >
              Try another way
            </Button>
            <Button
              loading={isSigningIn}
              loadingPosition="start"
              autoFocus
              variant="contained"
              onClick={() => handleSignInWithPasskey()}
            >
              {isSigningIn ? "Signing in..." : "Sign in with Passkey"}
            </Button>
          </DialogActions>
        </>
      )}

      {stage === "success" && (
        <>
          <DialogContent>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              gap={2}
            >
              <DoneIcon fontSize="large" color="success" />
              <Typography variant="h6" color="success">
                Account created
              </Typography>
            </Stack>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
