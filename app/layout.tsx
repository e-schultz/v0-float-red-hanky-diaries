import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "600"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-jetbrains-mono",
  style: ["normal", "italic"],
})

// Define metadata with social media cards
export const metadata: Metadata = {
  title: "Red Hanky Popper Zine - Bottom Epistemology",
  description:
    "A Single Page Application in Bottom Epistemology exploring consciousness expansion and temporal activism.",
  openGraph: {
    title: "Red Hanky Popper Zine - Bottom Epistemology",
    description:
      "A Single Page Application in Bottom Epistemology exploring consciousness expansion and temporal activism.",
    images: [
      {
        url: "/images/social-card.png",
        width: 1200,
        height: 630,
        alt: "Red Hanky Popper Zine",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Red Hanky Popper Zine - Bottom Epistemology",
    description:
      "A Single Page Application in Bottom Epistemology exploring consciousness expansion and temporal activism.",
    images: ["/images/social-card.png"],
    creator: "@redhankypopper",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
