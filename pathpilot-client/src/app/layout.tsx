import { Metadata } from "next"
import { ToastSnackbar } from "@/src/shared/ui/toastSnackbar"
import { ReduxProvider } from "@/src/app/providers/ReduxProvider"
import { Suspense } from "react"
import { Loader } from "@/src/shared/ui/loader"
import AppTheme from "@/src/shared/ui/sharedTheme/AppTheme"
import * as React from "react"

export const metadata: Metadata = {
  title: "Pathpilot",
  description: "Platform for discovering best trip roads",
  icons: {
    icon: "/fav.svg",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ToastSnackbar/>
          <AppTheme>
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </AppTheme>
        </ReduxProvider>
      </body>
    </html>
  )
}
