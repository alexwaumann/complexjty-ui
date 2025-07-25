import WalletIcon from "@mui/icons-material/WalletOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import OpenIcon from "@mui/icons-material/OpenInNewOutlined";
import ButtonBase from "@mui/material/ButtonBase";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useAccount } from "~/hooks/account-kit/useAccount";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

export function WalletButton() {
  const { account, address } = useAccount();
  const [isAccountDeployed, setIsAccountDeployed] = useState(false);

  const [walletAnchor, setWalletAnchor] = useState<HTMLButtonElement | null>(
    null,
  );

  useEffect(() => {
    if (!account) {
      return;
    }

    account
      .isAccountDeployed()
      .then((isDeployed) => setIsAccountDeployed(isDeployed))
      .catch(() => false);
  }, [account]);

  return (
    <>
      <ButtonBase
        onClick={(event) => setWalletAnchor(event.currentTarget)}
        disableRipple
      >
        <Paper
          sx={{
            height: 56,
            padding: 2,
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <WalletIcon color="primary" />
            <Typography variant="subtitle1" color="primary">
              anon
            </Typography>
          </Stack>
        </Paper>
      </ButtonBase>

      <Popover
        open={Boolean(walletAnchor)}
        onClose={() => setWalletAnchor(null)}
        anchorEl={walletAnchor}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{ paper: { sx: { mt: 1 } } }}
      >
        <Stack direction="column">
          <Stack direction="row" alignItems="center" gap={1} padding={2}>
            <Tooltip title={isAccountDeployed ? "Deployed" : "Not deployed"}>
              <CircleIcon
                color={isAccountDeployed ? "success" : "warning"}
                sx={{ width: "8px", height: "8px" }}
              />
            </Tooltip>
            <Typography color="primary" variant="caption">
              {address}
            </Typography>
            <OpenIcon color="primary" sx={{ width: "12px", height: "12px" }} />
          </Stack>

          <Divider />

          <Stack direction="column" padding={2}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6">Wallet</Typography>
              <Button>Add funds</Button>
            </Stack>
            <Stack direction="row" alignItems="center"></Stack>
            <Stack direction="row" alignItems="center"></Stack>
          </Stack>
        </Stack>
      </Popover>
    </>
  );
}
