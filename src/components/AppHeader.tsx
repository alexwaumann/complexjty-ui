import TradeIcon from "@mui/icons-material/CandlestickChartOutlined";
import LeaderboardIcon from "@mui/icons-material/LeaderboardOutlined";
import ArenaIcon from "@mui/icons-material/StadiumOutlined";
import StoreIcon from "@mui/icons-material/StorefrontOutlined";
import FeedIcon from "@mui/icons-material/WhatshotOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "@tanstack/react-router";

export function AppHeader() {
  const navigate = useNavigate();
  const page = useLocation({
    select: (location) => location.pathname.split("/")[1] ?? "",
  });
  const isAuthenticated = false;

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
          sx={{ width: 64, height: 64 }}
        />

        <Paper>
          <ToggleButtonGroup
            exclusive
            value={page}
            onChange={(_, value: string) => navigateToPage(`/${value}`)}
            color="primary"
            sx={{ height: 64 }}
          >
            <ToggleButton value="trade" sx={{ border: 0, width: 64 }}>
              <TradeIcon />
            </ToggleButton>
            <ToggleButton value="feed" sx={{ border: 0, width: 64 }}>
              <FeedIcon />
            </ToggleButton>
            <ToggleButton value="arena" sx={{ border: 0, width: 64 }}>
              <ArenaIcon />
            </ToggleButton>
            <ToggleButton value="leaderboard" sx={{ border: 0, width: 64 }}>
              <LeaderboardIcon />
            </ToggleButton>
            <ToggleButton value="store" sx={{ border: 0, width: 64 }}>
              <StoreIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Paper>
      </Stack>

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" spacing={1.5}>
        {!isAuthenticated ?
          <>
            <Button>Create Account</Button>
            <Button variant="contained">Login</Button>
          </>
        : <>
            <Paper
              sx={{
                height: 64,
                padding: 2,
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                height="100%"
              >
                <Stack direction="column" alignItems="center">
                  <Typography variant="subtitle1" color="primary">
                    godyl
                  </Typography>
                  <Typography variant="caption">0x1A3...2b4C</Typography>
                </Stack>
              </Stack>
            </Paper>

            <Avatar
              variant="rounded"
              src="/placeholder-pfp.png"
              sx={{
                height: 64,
                width: 64,
                border: 1,
                borderWidth: 2,
                borderColor: "rarity.artifact",
              }}
            />
          </>
        }
      </Stack>
    </Stack>
  );
}
