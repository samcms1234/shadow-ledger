"use client"

import "./globals.css"
import { WagmiProvider } from "wagmi"
import { getConfig } from "@/lib/wagmi"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/query-client"
import { ToastProvider } from "@/context/toast.context"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={getConfig()}>
          <QueryClientProvider client={queryClient}>
            <ToastProvider>
              {children}
            </ToastProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  )
}
