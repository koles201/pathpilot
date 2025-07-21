import { Metadata } from "next"
import { ToastSnackbar } from "@/src/shared/ui/toastSnackbar"
import { ReduxProvider } from "@/src/app/providers/ReduxProvider"
import { Suspense } from "react"
import { Loader } from "@/src/shared/ui/loader"

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
          <ToastSnackbar />
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </ReduxProvider>
      </body>
    </html>
  )
}
