'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Logo from '@/components/Logo'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
      <header className="bg-slate-900 shadow-lg sticky top-0 z-50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Give it more space */}
            <div className="flex-shrink-0">
              <Link href="/" className="block">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="block"
                >
                  <Logo size="2xl" />
                </motion.div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
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
            <div className="hidden md:block flex-shrink-0">
              <Link
                  href="/contact"
                  className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors font-semibold shadow-lg"
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md text-slate-300 hover:text-emerald-400 flex-shrink-0"
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
                  className="md:hidden"
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