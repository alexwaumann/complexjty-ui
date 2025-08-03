import AddIcon from "@mui/icons-material/AddOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import ExportIcon from "@mui/icons-material/DownloadOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import PasskeyIcon from "@mui/icons-material/Key";
import LoginIcon from "@mui/icons-material/LoginOutlined";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Pfp } from "~/components/ui/Pfp";
import { useAccount } from "~/hooks/account-kit/useAccount";
import { useGetAuthMethods } from "~/hooks/account-kit/useGetAuthMethods";
import { useSignOut } from "~/hooks/account-kit/useSignOut";
import { formatKey } from "~/utils/common";

export function AccountButton() {
  const { googleOauthInfo, passkeyAuthInfo } = useGetAuthMethods();
  const { address } = useAccount();
  const { signOut, isSigningOut } = useSignOut();
  const [accountAnchor, setAccountAnchor] = useState<HTMLButtonElement | null>(
    null,
  );

  return (
    <>
      <ButtonBase
        onClick={(event) => setAccountAnchor(event.currentTarget)}
        disableRipple
      >
        <Pfp size={56} />
      </ButtonBase>

      <Popover
        open={Boolean(accountAnchor)}
        onClose={() => setAccountAnchor(null)}
        anchorEl={accountAnchor}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{ paper: { sx: { width: "364px", mt: 1 } } }}
      >
        <Stack direction="column" alignItems="center" spacing={1} mt={3} mb={2}>
          <Pfp size={128} />
          <Stack direction="column" alignItems="center">
            <Typography variant="h6" color="primary">
              {address && formatKey(address)}
            </Typography>
            <Typography variant="caption">rank placeholder</Typography>
          </Stack>
        </Stack>

        <Divider />

        <Stack direction="column" spacing={2} m={2}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle2" color="textSecondary">
              Manage Account
            </Typography>
            <Tooltip title="Your wallet can be controlled by either your google account signer or your passkey signer. Passkey-only accounts risk losing account access if the passkey is lost.">
              <InfoOutlined
                color="action"
                sx={{ width: "16px", height: "16px" }}
              />
            </Tooltip>
          </Stack>

          <Stack direction="row" spacing={3} alignItems="center">
            <GoogleIcon
              color={googleOauthInfo.active ? "primary" : "inherit"}
            />
            <Stack direction="column" flexGrow={1}>
              <Typography
                variant="body2"
                color={googleOauthInfo.active ? "primary" : "inherit"}
              >
                {googleOauthInfo.email ?? "N/A"}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Google Account Signer
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              {googleOauthInfo.email && googleOauthInfo.active && (
                <Tooltip title="Export private key">
                  <IconButton color="primary">
                    <ExportIcon />
                  </IconButton>
                </Tooltip>
              )}
              {googleOauthInfo.email && !googleOauthInfo.active && (
                <>
                  <Tooltip title="Switch to google account signer">
                    <IconButton color="primary">
                      <LoginIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete google account signer">
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </>
              )}
              {!googleOauthInfo.email && (
                <Tooltip title="Add google account signer">
                  <IconButton color="primary">
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={3} alignItems="center">
            <PasskeyIcon
              color={passkeyAuthInfo.active ? "primary" : "inherit"}
            />
            <Stack direction="column" flexGrow={1}>
              <Typography
                variant="body2"
                color={passkeyAuthInfo.active ? "primary" : "inherit"}
              >
                {(passkeyAuthInfo.authenticatorId &&
                  formatKey(passkeyAuthInfo.authenticatorId)) ??
                  "N/A"}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Passkey Signer
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              {passkeyAuthInfo.authenticatorId && passkeyAuthInfo.active && (
                <Tooltip title="Export private key">
                  <IconButton color="primary">
                    <ExportIcon />
                  </IconButton>
                </Tooltip>
              )}
              {passkeyAuthInfo.authenticatorId && !passkeyAuthInfo.active && (
                <>
                  <Tooltip title="Switch to passkey signer">
                    <IconButton color="primary">
                      <LoginIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete passkey signer">
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </>
              )}
              {!passkeyAuthInfo.authenticatorId && (
                <Tooltip title="Add passkey signer">
                  <IconButton color="primary">
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Stack>

          <Button disabled={isSigningOut} onClick={() => signOut()} fullWidth>
            Sign out
          </Button>
        </Stack>
      </Popover>
    </>
  );
}
