'use client';
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import ThemeAppProvider from "@/components/ThemeAppProvider";
import { store } from "@/redux/store";

export default function DashboardLayout({ children }) {
  return (
    <ThemeAppProvider>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Provider store={store}>{children}</Provider>
      </LocalizationProvider>
    </ThemeAppProvider>
  );
}