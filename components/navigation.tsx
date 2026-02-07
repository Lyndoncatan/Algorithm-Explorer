'use client'

import React from "react"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold glow-primary">
          ▲ ALGORITHM EXPLORER
        </Link>

        <div className="hidden md:flex gap-8">
          <NavLink href="/" active={isActive('/')}>
            Home
          </NavLink>
          <NavLink href="/comparison" active={isActive('/comparison')}>
            Compare
          </NavLink>
          <NavLink href="/docs" active={isActive('/docs')}>
            Docs
          </NavLink>
        </div>

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`text-sm font-mono transition-colors duration-200 ${
        active ? 'text-primary glow-primary' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {children}
    </Link>
  )
}

function MobileMenu() {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
    <div className="flex gap-4">
      <Link
        href="/"
        className={`text-sm font-mono transition-colors ${isActive('/') ? 'text-primary glow-primary' : 'text-muted-foreground'}`}
      >
        Home
      </Link>
      <Link
        href="/comparison"
        className={`text-sm font-mono transition-colors ${isActive('/comparison') ? 'text-primary glow-primary' : 'text-muted-foreground'}`}
      >
        Compare
      </Link>
      <Link
        href="/docs"
        className={`text-sm font-mono transition-colors ${isActive('/docs') ? 'text-primary glow-primary' : 'text-muted-foreground'}`}
      >
        Docs
      </Link>
    </div>
  )
}
