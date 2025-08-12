'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Logo from '@/components/Logo'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
      <header className="bg-slate-900 shadow-lg sticky top-0 z-1001 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">

            <div className="flex-shrink-0">
              <Link href="/" className="block">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="block"
                >
                  <Logo size="3xl" />
                </motion.div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6">
              <Link href="/" className="text-slate-300 hover:text-emerald-400 transition-colors font-medium">
                Home
              </Link>
              <Link href="/vehicles" className="text-slate-300 hover:text-emerald-400 transition-colors font-medium">
                Inventory
              </Link>
              <Link href="/about" className="text-slate-300 hover:text-emerald-400 transition-colors font-medium">
                About
              </Link>
              <Link href="/faq" className="text-slate-300 hover:text-emerald-400 transition-colors font-medium">
                FAQ
              </Link>
              <Link href="/contact" className="text-slate-300 hover:text-emerald-400 transition-colors font-medium">
                Contact
              </Link>

            </nav>

            {/* CTA Button */}
            <div className="hidden sm:block flex-shrink-0">
              <a
                  href="tel:0402699999"
                  className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors font-semibold shadow-lg flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                0402 699 999
              </a>
            </div>

            {/* Mobile menu button */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-md text-slate-300 hover:text-emerald-400 flex-shrink-0"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
              <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="lg:hidden"
              >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900 border-t border-slate-700">
                  <Link href="/" className="block px-3 py-2 text-slate-300 hover:text-emerald-400">
                    Home
                  </Link>
                  <Link href="/vehicles" className="block px-3 py-2 text-slate-300 hover:text-emerald-400">
                    Inventory
                  </Link>
                  <Link href="/about" className="block px-3 py-2 text-slate-300 hover:text-emerald-400">
                    About
                  </Link>
                  <Link href="/faq" className="block px-3 py-2 text-slate-300 hover:text-emerald-400">
                    FAQ
                  </Link>
                  <Link href="/contact" className="block px-3 py-2 text-slate-300 hover:text-emerald-400">
                    Contact
                  </Link>

                </div>
              </motion.div>
          )}
        </div>
      </header>
  )
}