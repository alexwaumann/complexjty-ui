import TradeIcon from "@mui/icons-material/CandlestickChartOutlined";
import LeaderboardIcon from "@mui/icons-material/LeaderboardOutlined";
import ArenaIcon from "@mui/icons-material/StadiumOutlined";
import StoreIcon from "@mui/icons-material/StorefrontOutlined";
import FeedIcon from "@mui/icons-material/WhatshotOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { AccountButton } from "~/components/AccountButton";
import { SignInButton } from "~/components/SignInButton";
import { WalletButton } from "~/components/WalletButton";
import { useSignerStatus } from "~/hooks/account-kit/useSignerStatus";

export function AppHeader() {
  const { isConnected: hasSigner } = useSignerStatus();

  const navigate = useNavigate();
  const page = useLocation({
    select: (location) => location.pathname.split("/")[1] ?? "",
  });

  const theme = useTheme();
  const isPhoneScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // TODO: create custom navItem that utilizes custom tanstack Link
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

        {!isPhoneScreen && (
          <Paper>
            <ToggleButtonGroup
              exclusive
              value={page}
              onChange={(_, value: string) =>
                value && navigateToPage(`/${value}`)
              }
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
        )}
      </Stack>

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" spacing={1.5}>
        {!hasSigner ?
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
