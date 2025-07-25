import SignOutIcon from "@mui/icons-material/LogoutOutlined";
import ProfileIcon from "@mui/icons-material/PersonOutline";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import ButtonBase from "@mui/material/ButtonBase";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import { Pfp } from "~/components/ui/Pfp";

export function AccountButton() {
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
        slotProps={{ paper: { sx: { width: "264px", mt: 1 } } }}
      >
        <Stack direction="column" alignItems="center" spacing={1} mt={3} mb={2}>
          <Pfp size={128} />
          <Typography variant="h6" color="primary">
            anon
          </Typography>
        </Stack>

        <Divider />

        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ProfileIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SignOutIcon />
              </ListItemIcon>
              <ListItemText primary="Sign out" />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </>
  );
}
