import AddIcon from "@mui/icons-material/AddOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import PasskeyIcon from "@mui/icons-material/Key";
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
import { useAddPasskey } from "~/hooks/account-kit/useAddPasskey";
import { useGetAuthMethods } from "~/hooks/account-kit/useGetAuthMethods";
import { useRemovePasskey } from "~/hooks/account-kit/useRemovePasskey";
import { useSignOut } from "~/hooks/account-kit/useSignOut";
import { formatKey } from "~/utils/common";

export function AccountButton() {
  const { authMethods } = useGetAuthMethods();
  const { addPasskey, isAddingPasskey } = useAddPasskey();
  const { removePasskey, isRemovingPasskey } = useRemovePasskey();
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
            <Tooltip
              title="Your account can be accessed by authenticating with your google account or your passkey. Passkey-only accounts risk losing account access if the passkey is lost."
              disableInteractive
            >
              <InfoOutlined
                color="action"
                sx={{ width: "16px", height: "16px" }}
              />
            </Tooltip>
          </Stack>

          <Stack direction="row" spacing={3} alignItems="center">
            <GoogleIcon />
            <Stack direction="column" flexGrow={1}>
              <Typography variant="body2">
                {authMethods?.googleEmail ?? "N/A"}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Google Account
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              {authMethods?.googleEmail &&
                authMethods?.passkeyAuthenticatorId && (
                  <Tooltip title="Remove google account">
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                )}
              {!authMethods?.googleEmail && (
                <Tooltip title="Add google account">
                  <IconButton color="primary">
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={3} alignItems="center">
            <PasskeyIcon />
            <Stack direction="column" flexGrow={1}>
              <Typography variant="body2">
                {(authMethods?.passkeyAuthenticatorId &&
                  formatKey(authMethods.passkeyAuthenticatorId)) ??
                  "N/A"}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Passkey
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              {authMethods?.passkeyAuthenticatorId &&
                authMethods.googleEmail && (
                  <Tooltip title="Remove passkey">
                    <IconButton
                      loading={isRemovingPasskey}
                      onClick={() =>
                        removePasskey(authMethods.passkeyAuthenticatorId)
                      }
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                )}
              {!authMethods?.passkeyAuthenticatorId && (
                <Tooltip title="Add passkey">
                  <IconButton
                    loading={isAddingPasskey}
                    onClick={() => addPasskey()}
                    color="primary"
                  >
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
