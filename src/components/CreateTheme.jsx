import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#4079ED', 
    },
    secondary: {
      main: '#47AD64',
    },
    error: {
      main: '#EB5757',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

export default theme;
