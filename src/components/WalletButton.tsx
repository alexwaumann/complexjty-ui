import CircleIcon from "@mui/icons-material/Circle";
import CopyIcon from "@mui/icons-material/ContentCopyOutlined";
import ShieldIcon from "@mui/icons-material/VerifiedUser";
import WalletIcon from "@mui/icons-material/WalletOutlined";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { formatEther } from "viem";
import { alchemySdk } from "~/config";
import { useAccount } from "~/hooks/account-kit/useAccount";
import { useUser } from "~/hooks/account-kit/useUser";

// TODO: secured by passkey and/or google oauth depending on auth details
export function WalletButton() {
  const user = useUser();
  const { account, address } = useAccount();
  const [isAccountDeployed, setIsAccountDeployed] = useState(false);
  const [etherBalance, setEtherBalance] = useState(0);

  const isPasskeySigner = Boolean(user?.credentialId);

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

  useEffect(() => {
    if (!address) {
      return;
    }

    alchemySdk.core
      .getBalance(address)
      .then((balance) =>
        setEtherBalance(Number(formatEther(balance.toBigInt()))),
      )
      .catch(() => null);
  }, [address]);

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
              $0.00
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
            <Link
              href={`https://testnet-explorer.optimism.io/address/${address}`}
              target="_blank"
              rel="noopenener"
              underline="hover"
              variant="caption"
              color="textPrimary"
            >
              {address}
            </Link>
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(address ?? "").catch(() => null);
              }}
              sx={{ padding: 0 }}
            >
              <CopyIcon
                color="primary"
                sx={{ width: "12px", height: "12px" }}
              />
            </IconButton>
          </Stack>

          <Divider />

          <Stack direction="column" gap={2} padding={2}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6">Wallet</Typography>
              <Button variant="contained">Add funds</Button>
            </Stack>
            <Paper>
              <Stack direction="column">
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={2}
                  paddingX={2}
                  paddingY={1}
                >
                  <Avatar
                    src="/token-images/usdc.png"
                    variant="circular"
                    sx={{ width: "28px", height: "28px" }}
                  />
                  <Stack direction="column" flexGrow={1}>
                    <Typography variant="subtitle2">0</Typography>
                    <Typography variant="caption">USDC</Typography>
                  </Stack>
                  <Typography variant="h6">$0.00</Typography>
                </Stack>
                <Divider />
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={2}
                  paddingX={2}
                  paddingY={1}
                >
                  <Avatar
                    src="/token-images/eth.png"
                    variant="circular"
                    sx={{ width: "28px", height: "28px" }}
                  />
                  <Stack direction="column" flexGrow={1}>
                    <Typography variant="subtitle2">{etherBalance}</Typography>
                    <Typography variant="caption">ETH</Typography>
                  </Stack>
                  <Typography variant="h6">$0.00</Typography>
                </Stack>
              </Stack>
            </Paper>
            <Stack direction="row" alignItems="center" gap={2}>
              <Button fullWidth>Send</Button>
              <Button fullWidth>Receive</Button>
            </Stack>
          </Stack>

          <Divider />

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={1}
            padding={1}
          >
            <ShieldIcon
              color="success"
              sx={{ width: "16px", height: "16px" }}
            />
            <Typography variant="caption">
              Secured by {isPasskeySigner ? "Passkey" : "Google OAuth"}
            </Typography>
          </Stack>
        </Stack>
      </Popover>
    </>
  );
}
