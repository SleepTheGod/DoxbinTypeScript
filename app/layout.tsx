import type React from "react"
import type { Metadata } from "next"
import { Source_Sans_3, Source_Code_Pro } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
})

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-source-code-pro",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Doxbin - Anonymous Paste Sharing",
    template: "%s | Doxbin",
  },
  description: "Doxbin is an anonymous paste sharing platform. Share information securely and anonymously.",
  keywords: ["doxbin", "paste", "pastebin", "anonymous", "sharing"],
  authors: [{ name: "Doxbin" }],
  creator: "Doxbin",
  publisher: "Doxbin",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://doxbin.com",
    siteName: "Doxbin",
    title: "Doxbin - Anonymous Paste Sharing",
    description: "Doxbin is an anonymous paste sharing platform. Share information securely and anonymously.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Doxbin - Anonymous Paste Sharing",
    description: "Doxbin is an anonymous paste sharing platform. Share information securely and anonymously.",
    creator: "@doxbin",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${sourceSans.variable} ${sourceCodePro.variable} font-sans antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
