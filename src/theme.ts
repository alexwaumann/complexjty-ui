import { createTheme, responsiveFontSizes } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    rarity: {
      common: string;
      uncommon: string;
      rare: string;
      mythic: string;
      artifact: string;
    };
  }

  interface PaletteOptions {
    rarity: {
      common: string;
      uncommon: string;
      rare: string;
      mythic: string;
      artifact: string;
    };
  }
}

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#ce93d8",
      },
      secondary: {
        main: "#90caf9",
      },
      rarity: {
        common: "white",
        uncommon: "#388e3c",
        rare: "#6cace4",
        mythic: "#ce93d8",
        artifact: "#710c04",
      },
    },

    shape: { borderRadius: 12 },

    components: {
      MuiAppBar: { defaultProps: { variant: "outlined", elevation: 0 } },
      MuiAvatar: { defaultProps: { variant: "rounded" } },
      MuiButton: {
        defaultProps: { disableElevation: true, variant: "outlined" },
      },
      MuiCard: { defaultProps: { variant: "outlined" } },
      MuiSelect: { defaultProps: { variant: "outlined" } },
      MuiTextField: { defaultProps: { variant: "outlined" } },
    },

    typography: {
      button: {
        textTransform: "none",
      },
    },
  }),
);
