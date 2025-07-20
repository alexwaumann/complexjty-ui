import PassKeyIcon from "@mui/icons-material/Key";
import AccountIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { isValidPasskeyName, useSignUp } from "~/hooks/account-kit/useSignUp";

export function SignUpButton() {
  const { signUp, isSigningUp } = useSignUp();
  const [passkeyName, setPasskeyName] = useState("");

  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const isPopoverOpen = Boolean(anchor);

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchor(null);
    setPasskeyName("");
  };

  const handleSignUp = () => {
    if (!isValidPasskeyName(passkeyName)) {
      return;
    }

    signUp({ passkeyName }, { onSuccess: () => handleClosePopover() });
  };

  const handlePasskeyNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const name = event.target.value;

    if (name === "") {
      setPasskeyName("");
      return;
    }

    if (!isValidPasskeyName(name)) {
      return;
    }

    setPasskeyName(name);
  };

  const handleEnterOnPasskeyNameInput = (event: React.KeyboardEvent) => {
    if (event.key !== "Enter" || passkeyName === "") {
      return;
    }

    handleSignUp();
  };

  const setInputFocus = (element: HTMLInputElement | null) => {
    if (!element) {
      return;
    }

    element.focus();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpenPopover} size="large">
        Sign up
      </Button>
      <Popover
        open={isPopoverOpen}
        onClose={handleClosePopover}
        anchorEl={anchor}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{ paper: { sx: { mt: 1, padding: 2 } } }}
      >
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <TextField
            inputRef={setInputFocus}
            onChange={handlePasskeyNameInputChange}
            onKeyDown={handleEnterOnPasskeyNameInput}
            value={passkeyName}
            label="Passkey name"
            placeholder="Passkey 1"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountIcon />
                  </InputAdornment>
                ),
              },
              inputLabel: { shrink: true },
            }}
            fullWidth
          />
          <Button
            variant="contained"
            startIcon={<PassKeyIcon />}
            onClick={handleSignUp}
            loadingPosition="start"
            loading={isSigningUp}
            disabled={passkeyName.length === 0}
            size="large"
            fullWidth
          >
            Sign up with passkey
          </Button>
          <Typography variant="caption">
            By signing up, you agree to the{" "}
            <Link
              href="https://www.alchemy.com/terms-conditions/end-user-terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </Link>
          </Typography>
        </Stack>
      </Popover>
    </>
  );
}
