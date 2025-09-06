import type React from "react"
import type { Metadata } from "next"
import { Vidaloka } from "next/font/google"
import { Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ProgressProvider } from "@/lib/progress-context"
import "./globals.css"

const vidaloka = Vidaloka({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vidaloka",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Dyvyn - 7 Day Challenge",
  description: "Transform your discipline in 7 days with premium challenges and AI coaching",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${vidaloka.variable} ${montserrat.variable}`}>
        <ProgressProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </ProgressProvider>
        <Analytics />
      </body>
    </html>
  )
}
