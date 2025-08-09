import CheckCircleOutlineIcon from "@mui/icons-material/CloudSyncOutlined";
import CloudDoneOutlinedIcon from "@mui/icons-material/CloudDoneOutlined";
import PhonelinkOutlinedIcon from "@mui/icons-material/PhonelinkOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import Divider from "@mui/material/Divider";

type PasskeySyncDialogProps = {
  open: boolean;
  onClose: () => void;
};

const APPLE_PASSKEYS_LINK =
  "https://support.apple.com/guide/iphone/passwords-devices-iph82d6721b2/ios";
const GOOGLE_PASSKEYS_LINK =
  "https://support.google.com/chrome/answer/13168025";
const CHROME_SYNC_LINK = "https://support.google.com/chrome/answer/185277";

const NumAvatar: React.FC<{ n: number }> = ({ n }) => (
  <Avatar variant="circular" sx={{ width: 28, height: 28, fontSize: 14 }}>
    {n}
  </Avatar>
);

export const PasskeySyncDialog: React.FC<PasskeySyncDialogProps> = ({
  open,
  onClose,
}) => {
  const theme = useTheme();
  const isPhoneScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      fullScreen={isPhoneScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="passkey-sync-title"
    >
      <DialogTitle id="passkey-sync-title">
        Make sure your passkey is synced
      </DialogTitle>
      <DialogContent dividers>
        <Stack gap={3}>
          <Stack gap={1}>
            <Typography variant="body1" fontWeight={600}>
              Passkeys are the only way to sign in to Complexjty.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              If you lose access to a device and your passkey isn’t synced, you
              could be locked out. If you setup a recovery email, you <b>can</b>{" "}
              use it to temporarily authenticate and add a <b>new passkey</b>,
              but syncing is the best way to avoid needing recovery at all.
            </Typography>
          </Stack>

          <Stack gap={1}>
            <Typography variant="subtitle1">Benefits of syncing</Typography>
            <List dense sx={{ py: 0 }}>
              <ListItem>
                <ListItemIcon>
                  <CloudDoneOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Redundancy across devices"
                  secondary="Your passkey is copied to your other signed-in devices via your password manager."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PhonelinkOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Seamless sign-in anywhere"
                  secondary="Sign in on another device without needing the original device you created the passkey on."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <VerifiedUserOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Lower recovery risk"
                  secondary="If one device is lost or wiped, synced devices still hold your passkey."
                />
              </ListItem>
            </List>
          </Stack>

          <Divider />

          <Stack gap={1.25}>
            <Typography variant="subtitle1" fontWeight="600">
              Apple (iCloud Keychain)
            </Typography>
            <List dense sx={{ py: 0 }}>
              <ListItem>
                <ListItemIcon>
                  <NumAvatar n={1} />
                </ListItemIcon>
                <ListItemText
                  primary="Sign in with your Apple ID"
                  secondary="Make sure this device is signed into the Apple ID you use everywhere."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <NumAvatar n={2} />
                </ListItemIcon>
                <ListItemText
                  primary="Enable iCloud Keychain"
                  secondary="Turn on iCloud Keychain in Settings (iOS/iPadOS) or System Settings (macOS)."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <NumAvatar n={3} />
                </ListItemIcon>
                <ListItemText
                  primary="Verify sync"
                  secondary="Create your passkey, then check another Apple device to confirm it appears."
                />
              </ListItem>
            </List>
            <Stack direction="row" gap={1} flexWrap="wrap">
              <Button
                variant="outlined"
                startIcon={<SettingsOutlinedIcon />}
                onClick={() =>
                  window.open(
                    APPLE_PASSKEYS_LINK,
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              >
                Set up iCloud Keychain
              </Button>
            </Stack>
          </Stack>

          <Stack gap={1.25}>
            <Typography variant="subtitle1" fontWeight="600">
              Google Password Manager (Android / Chrome)
            </Typography>
            <List dense sx={{ py: 0 }}>
              <ListItem>
                <ListItemIcon>
                  <NumAvatar n={1} />
                </ListItemIcon>
                <ListItemText
                  primary="Sign in to your Google account"
                  secondary="Use the same Google account across your devices."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <NumAvatar n={2} />
                </ListItemIcon>
                <ListItemText
                  primary="Enable Password Manager & Chrome Sync"
                  secondary="Ensure Password Manager is on (Android) and Chrome Sync is enabled on desktop/mobile."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <NumAvatar n={3} />
                </ListItemIcon>
                <ListItemText
                  primary="Verify sync"
                  secondary="Create your passkey, then check another signed-in Chrome/Android device."
                />
              </ListItem>
            </List>
            <Stack direction="row" gap={1} flexWrap="wrap">
              <Button
                variant="outlined"
                startIcon={<SettingsOutlinedIcon />}
                onClick={() =>
                  window.open(
                    GOOGLE_PASSKEYS_LINK,
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              >
                Set up Google Password Manager
              </Button>
              <Button
                variant="outlined"
                startIcon={<CheckCircleOutlineIcon />}
                onClick={() =>
                  window.open(CHROME_SYNC_LINK, "_blank", "noopener,noreferrer")
                }
              >
                Turn on Chrome Sync
              </Button>
            </Stack>
          </Stack>

          <Divider />

          <Typography variant="caption" color="text.secondary">
            Tip: After creating your new passkey, confirm it appears in your
            password manager and on another signed-in device.
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button variant="text" onClick={onClose}>
          Got it
        </Button>
      </DialogActions>
    </Dialog>
  );
};
