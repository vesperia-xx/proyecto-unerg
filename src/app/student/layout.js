"use client";

import { Provider } from "react-redux";
import ThemeAppProvider from "@/components/ThemeAppProvider";
import { store } from "@/redux/store";

export default function DashboardLayout({
  children
}) {
  return (
    <ThemeAppProvider>
      <Provider store={store}>{children}</Provider>
    </ThemeAppProvider>
  );
}