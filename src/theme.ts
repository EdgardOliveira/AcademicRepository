import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { ptBR as corePtBR } from "@mui/material/locale";
import { ptBR } from "@mui/x-data-grid";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme(
  {
    palette: {
      primary: {
        light: "#3d81bd",
        main: "#0D62AD",
        dark: "#094479",
        contrastText: "#fff",
      },
      secondary: {
        light: "#f05b5f",
        main: "#ED3237",
        dark: "#a52326",
        contrastText: "#000",
      },
      error: {
        main: red.A400,
      },
    },
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
  },
  ptBR, //Locale para Português do Brasil (x-data-grid)
  corePtBR //Local para Português do Brasil (core components)
);

export default theme;
