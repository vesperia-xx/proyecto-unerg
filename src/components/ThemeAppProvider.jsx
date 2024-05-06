"use client";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const ThemeAppProvider = ({ children }) => {
  const theme = createTheme({
    typography: {
      fontFamily: "'Poppins', sans-serif",
      h6: {
        fontSize: 20,
        fontWeight: 600,
        color: "#05004E",
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeAppProvider;