'use client'
import { store } from "@/redux/store"
import { Provider } from "react-redux"


export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
    <html lang="es">
      <body>{children}</body>
    </html>
    </Provider>
  )
}
