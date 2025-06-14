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

    components: {
      MuiAppBar: { defaultProps: { variant: "outlined" } },
      MuiAvatar: { defaultProps: { variant: "rounded" } },
      MuiButton: { defaultProps: { disableElevation: true } },
      MuiCard: { defaultProps: { variant: "outlined" } },
      MuiSelect: { defaultProps: { variant: "outlined" } },
      MuiTextField: { defaultProps: { variant: "outlined" } },
    },
  }),
);
