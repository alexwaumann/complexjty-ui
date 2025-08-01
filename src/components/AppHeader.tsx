import TradeIcon from "@mui/icons-material/CandlestickChartOutlined";
import LeaderboardIcon from "@mui/icons-material/LeaderboardOutlined";
import ArenaIcon from "@mui/icons-material/StadiumOutlined";
import StoreIcon from "@mui/icons-material/StorefrontOutlined";
import FeedIcon from "@mui/icons-material/WhatshotOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useLocation, useNavigate } from "@tanstack/react-router";

import { AccountButton } from "~/components/AccountButton";
import { SignInButton } from "~/components/SignInButton";
import { useAccount } from "~/hooks/account-kit/useAccount";
import { WalletButton } from "./WalletButton";

export function AppHeader() {
  const { account } = useAccount();
  const navigate = useNavigate();
  const page = useLocation({
    select: (location) => location.pathname.split("/")[1] ?? "",
  });

  // TODO: create custome navItem that utilizes custom tanstack Link
  function navigateToPage(newPage: string) {
    if (newPage === page) {
      return;
    }

    navigate({ to: newPage }).catch(() => null);
  }

  return (
    <Stack direction="row" alignItems="center" height={96} sx={{ paddingY: 2 }}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Avatar
          variant="rounded"
          src="/logo.png"
          sx={{ width: 56, height: 56 }}
        />

        <Paper>
          <ToggleButtonGroup
            exclusive
            value={page}
            onChange={(_, value: string) => navigateToPage(`/${value}`)}
            color="primary"
            sx={{ height: 56 }}
          >
            <ToggleButton value="trade" sx={{ border: 0, width: 56 }}>
              <TradeIcon />
            </ToggleButton>
            <ToggleButton value="feed" sx={{ border: 0, width: 56 }}>
              <FeedIcon />
            </ToggleButton>
            <ToggleButton value="arena" sx={{ border: 0, width: 56 }}>
              <ArenaIcon />
            </ToggleButton>
            <ToggleButton value="leaderboard" sx={{ border: 0, width: 56 }}>
              <LeaderboardIcon />
            </ToggleButton>
            <ToggleButton value="store" sx={{ border: 0, width: 56 }}>
              <StoreIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Paper>
      </Stack>

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" spacing={1.5}>
        {!account ?
          <SignInButton />
        : <>
            <WalletButton />
            <AccountButton />
          </>
        }
      </Stack>
    </Stack>
  );
}
