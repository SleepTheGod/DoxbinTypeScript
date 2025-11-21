import type React from "react"
import type { Metadata } from "next"
import { Source_Sans_3 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Navbar } from "@/components/navbar"

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-source-sans",
})

export const metadata: Metadata = {
  title: "Doxbin",
  description: "Doxbin - Anonymous paste sharing",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${sourceSans.variable} font-sans antialiased`}>
        <Navbar />
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
