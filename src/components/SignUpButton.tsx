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
import { useSigner } from "~/hooks/account-kit/useSigner";

export function SignUpButton() {
  const signer = useSigner();

  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchor);
  const [loading, setLoading] = useState(false);

  const [accountName, setAccountName] = useState("");

  const handleCreateAccount = () => {
    if (!signer) {
      return;
    }

    setLoading(true);

    signer
      .authenticate({
        type: "passkey",
        createNew: true,
        username: accountName.trim().replace(" ", "-"),
      })
      .then((user) => {
        console.log("user", user);
        setAccountName("");
        handleClose();
      })
      .catch((error) => console.error("ahhh error creating passkey", error))
      .finally(() => setLoading(false));
  };

  const handleAccountNameInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const name = event.target.value;
    const regex = /^[a-zA-Z0-9 ]/;

    if (name === "") {
      setAccountName("");
      return;
    }

    const meetsLengthRequirement = name.length < 30;
    const meetsSpacesRequirement = !name.includes("  ");
    const meetsCharacterRequirement = regex.test(name);

    if (
      meetsLengthRequirement &&
      meetsSpacesRequirement &&
      meetsCharacterRequirement
    ) {
      setAccountName(name);
    }
  };

  const handleEnterOnInput = (event: React.KeyboardEvent) => {
    if (accountName === "" || event.key !== "Enter") {
      return;
    }

    handleCreateAccount();
  };

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const setInputFocus = (element: HTMLInputElement | null) => {
    if (!element) {
      return;
    }

    element.focus();
  };

  return (
    <>
      <Button loading={loading} onClick={handleOpen}>
        Sign Up
      </Button>
      <Popover
        open={open}
        onClose={handleClose}
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
            onChange={handleAccountNameInput}
            onKeyDown={handleEnterOnInput}
            value={accountName}
            label="Account Name"
            placeholder="Account 1"
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
            onClick={handleCreateAccount}
            loadingPosition="start"
            loading={loading}
            disabled={accountName.length === 0}
            size="large"
            fullWidth
          >
            Create Account with Passkey
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
