import React from "react"
import Navigation from "@/components/navigation"
import type { Metadata } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })

export const metadata: Metadata = {
  title: 'Algorithm Explorer',
  description: 'Interactive visualization and comparison of pathfinding algorithms with a cyberpunk aesthetic',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${orbitron.variable} font-sans antialiased bg-background text-foreground overflow-hidden`}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
