import AddIcon from "@mui/icons-material/AddOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import PasskeyIcon from "@mui/icons-material/Key";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Pfp } from "~/components/ui/Pfp";
import { useAccount } from "~/hooks/account-kit/useAccount";
import { useGetAuthMethods } from "~/hooks/account-kit/useGetAuthMethods";
import { useSignOut } from "~/hooks/account-kit/useSignOut";
import { formatKey } from "~/utils/common";

export function AccountButton() {
  const { authMethods } = useGetAuthMethods();
  const { address } = useAccount();
  const { signOut, isSigningOut } = useSignOut();
  const theme = useTheme();
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
        slotProps={{
          paper: {
            sx: {
              width: "364px",
              mt: 1,
              [theme.breakpoints.down("sm")]: {
                width: "100%",
              },
            },
          },
        }}
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
            paddingRight={1.5}
          >
            <Typography variant="subtitle2" color="textSecondary">
              Manage Account
            </Typography>
            {!authMethods?.recoveryEmail && (
              <Tooltip
                title="Accounts with no recovery email risk losing account access if the passkey is lost."
                disableInteractive
              >
                <InfoOutlined
                  color="action"
                  sx={{ width: "16px", height: "16px" }}
                />
              </Tooltip>
            )}
          </Stack>

          {authMethods?.passkeys.map((passkeyInfo) => (
            <Stack
              direction="row"
              spacing={3}
              alignItems="center"
              key={passkeyInfo.authenticatorId}
            >
              <PasskeyIcon />
              <Stack direction="column" flexGrow={1}>
                <Typography variant="body2">{passkeyInfo.name}</Typography>
                <Typography variant="caption" color="textSecondary">
                  Passkey
                </Typography>
              </Stack>
            </Stack>
          ))}

          <Stack direction="row" spacing={3} alignItems="center">
            <EmailIcon color="disabled" />
            <Stack direction="column" flexGrow={1}>
              <Typography color="textDisabled" variant="body2">
                {authMethods?.recoveryEmail ?? "N/A"}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Recovery Email
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              {authMethods?.recoveryEmail && (
                <Tooltip title="Remove recovery email">
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
              {!authMethods?.recoveryEmail && (
                <Tooltip title="Add recovery email">
                  <IconButton disabled color="primary">
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Stack>
        </Stack>

        <Divider />

        <Stack direction="column" spacing={2} m={2}>
          <Button disabled={isSigningOut} onClick={() => signOut()} fullWidth>
            Sign out
          </Button>
        </Stack>
      </Popover>
    </>
  );
}
