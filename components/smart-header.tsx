"use client"

import { useEffect, useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

interface SmartHeaderProps {
  userName?: string
}

export function SmartHeader({ userName }: SmartHeaderProps) {
  const [showUserName, setShowUserName] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check if we've scrolled past the main header section (roughly 200px)
      const scrollY = window.scrollY
      setShowUserName(scrollY > 200)
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center space-x-2 min-w-0">
          <h2 className={`text-lg font-semibold transition-all duration-300 ${
            showUserName ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
          }`}>
            {showUserName && userName ? userName : ''}
          </h2>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
