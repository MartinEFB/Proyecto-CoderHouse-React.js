import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    background: { default: "#ffffff", paper: "#ffffff" },
    text: { primary: "#111111", secondary: "#6b7280" },
    primary: { main: "#111111" },
    divider: "#e5e7eb",
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, fontSize: "1.75rem" },
    h2: { fontWeight: 700, fontSize: "1.4rem" },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 700 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          boxShadow: "none",
        },
        containedPrimary: {
          backgroundColor: "#111111",
          "&:hover": { backgroundColor: "#000000", boxShadow: "none" },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "1px solid #e5e7eb",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #e5e7eb",
        },
      },
    },
  },
});

export default theme;