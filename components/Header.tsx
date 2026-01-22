'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Algorithms', href: '#algorithms' },
    { label: 'Team', href: '#team' },
    { label: 'GitHub', href: 'https://github.com' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200 transition-shadow duration-200`}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="font-heading text-2xl font-bold text-black">
          AlgoScope
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <button className="text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
