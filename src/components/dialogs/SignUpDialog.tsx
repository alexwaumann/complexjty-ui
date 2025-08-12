import ArrowForwardIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import SyncedAcrossDevicesIcon from "@mui/icons-material/DevicesOutlined";
import BiometricsIcon from "@mui/icons-material/FingerprintOutlined";
import SecureIcon from "@mui/icons-material/GppGoodOutlined";
import QrCodeIcon from "@mui/icons-material/QrCodeScannerOutlined";
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
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { useSetRecoveryEmail } from "~/hooks/account-kit/useSetRecoveryEmail";
import { useSignIn } from "~/hooks/account-kit/useSignIn";
import { isValidEmail } from "~/utils/common";

type SignUpDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const SignUpDialog: React.FC<SignUpDialogProps> = ({
  open,
  onClose,
}) => {
  const { signIn, isSigningIn } = useSignIn();
  const {
    setRecoveryEmail,
    isSettingRecoveryEmail,
    recoveryEmailError,
    isSetRecoveryEmailSuccess,
    resetUseSetRecoveryEmail,
  } = useSetRecoveryEmail();

  const theme = useTheme();
  const isPhoneScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [email, setEmail] = useState("");
  const [stage, setStage] = useState<"createPasskey" | "setEmailRecovery">(
    "createPasskey",
  );

  const handleSignUp = () => {
    signIn("newPasskey", {
      onSuccess: () => {
        setStage("setEmailRecovery");
      },
    });
  };

  const handleSetRecoveryEmail = () => {
    if (!isValidEmail(email)) {
      return;
    }

    setRecoveryEmail(email, {
      onSuccess: () => {
        setTimeout(() => {
          handleCloseDialog();
        }, 3000);
      },
    });
  };

  const reset = () => {
    setEmail("");
    setStage("createPasskey");
    resetUseSetRecoveryEmail();
  };

  const handleCloseDialog = () => {
    onClose();
    setTimeout(() => reset(), 250);
  };

  return (
    <Dialog
      fullScreen={isPhoneScreen}
      open={open}
      onClose={() => stage === "createPasskey" && handleCloseDialog()}
      disableRestoreFocus
      maxWidth="sm"
    >
      <DialogTitle>
        <Stack alignItems="center" gap={2}>
          <Avatar src="/public/logo.png" sx={{ width: 72, height: 72 }} />

          <Typography variant="h6">Complexjty</Typography>
        </Stack>
      </DialogTitle>

      {stage === "createPasskey" && (
        <>
          <DialogContent>
            <Stack gap={3}>
              <Typography variant="body1">
                We've ditched passwords! Create a <strong>passkey</strong> to
                sign in with your Face ID, fingerprint, or screen lock. It's the
                most secure and convenient way to access your account.
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Your passkey is saved securely on this device and synced across
                your other devices through your Google Account or iCloud
                Keychain.
              </Typography>

              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <SecureIcon fontSize="large" color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Phishing-Resistant Security"
                    secondary="Passkeys are bound to our website, protecting you from fake sites and scams."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BiometricsIcon fontSize="large" color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Faster, Easier Sign-Ins"
                    secondary="No more forgotten passwords. Your face, finger, or PIN is your key."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SyncedAcrossDevicesIcon fontSize="large" color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Synced Across Devices"
                    secondary="Your passkey is automatically available on your other personal phones, tablets, and computers."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <QrCodeIcon color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Sign In Anywhere"
                    secondary="Use your phone to securely log in on any other device—like a friend's laptop—by scanning a QR code."
                  />
                </ListItem>
              </List>

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
            <Button variant="text" onClick={() => handleCloseDialog()}>
              Cancel
            </Button>
            <Button
              loading={isSigningIn}
              loadingPosition="start"
              variant="contained"
              onClick={() => handleSignUp()}
            >
              {isSigningIn ? "Creating passkey" : "Continue with passkey"}
            </Button>
          </DialogActions>
        </>
      )}

      {stage === "setEmailRecovery" && (
        <>
          <DialogContent>
            <Stack gap={2}>
              <Typography variant="body1">
                Your passkey is now <strong>active</strong> and will sync with
                your other devices via your Google or Apple account.
              </Typography>

              <Typography variant="body2" color="text.secondary">
                For extra peace of mind, adding a recovery email provides a
                secure backup to ensure you can always access your account.
              </Typography>

              <Stack direction="row" alignItems="start" gap={1} mt={2}>
                <TextField
                  type="email"
                  label="Recovery Email (optional)"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyUp={(event) =>
                    event.key === "Enter" &&
                    isValidEmail(email) &&
                    handleSetRecoveryEmail()
                  }
                  error={!!recoveryEmailError}
                  helperText={recoveryEmailError?.message}
                  disabled={isSettingRecoveryEmail || isSetRecoveryEmailSuccess}
                  autoFocus
                  slotProps={{ inputLabel: { shrink: true } }}
                  size="medium"
                  fullWidth
                />
                <Button
                  variant="contained"
                  onClick={handleSetRecoveryEmail}
                  loading={isSettingRecoveryEmail}
                  disabled={!isValidEmail(email)}
                  color={isSetRecoveryEmailSuccess ? "success" : "primary"}
                  sx={{ minWidth: "auto", height: 56, padding: "14px" }}
                >
                  {isSetRecoveryEmailSuccess ?
                    <CheckCircleOutlineIcon />
                  : <ArrowForwardIcon />}
                </Button>
              </Stack>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button variant="text" onClick={() => handleCloseDialog()}>
              {isSetRecoveryEmailSuccess ? "Close" : "Skip for now"}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
