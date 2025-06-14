import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ gap: 2 }}>
          <Avatar src="/logo.png" />
          <Typography variant="h5">complexjty</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
