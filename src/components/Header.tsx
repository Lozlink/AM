'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
      <header className="bg-black shadow-lg sticky top-0 z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-2xl font-bold text-white"
              >
                AM AUTO <span className="text-orange-500">GROUP</span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-300 hover:text-orange-500 transition-colors font-medium">
                Home
              </Link>
              <Link href="/vehicles" className="text-gray-300 hover:text-orange-500 transition-colors font-medium">
                Inventory
              </Link>
              <Link href="/services" className="text-gray-300 hover:text-orange-500 transition-colors font-medium">
                Services
              </Link>
              <Link href="/valuation" className="text-gray-300 hover:text-orange-500 transition-colors font-medium">
                Valuation
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-orange-500 transition-colors font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-orange-500 transition-colors font-medium">
                Contact
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link
                  href="/contact"
                  className="bg-orange-500 text-black px-6 py-2 rounded-lg hover:bg-orange-400 transition-colors font-semibold"
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-300 hover:text-orange-500"
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
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black border-t border-gray-800">
                  <Link href="/" className="block px-3 py-2 text-gray-300 hover:text-orange-500">
                    Home
                  </Link>
                  <Link href="/vehicles" className="block px-3 py-2 text-gray-300 hover:text-orange-500">
                    Inventory
                  </Link>
                  <Link href="/services" className="block px-3 py-2 text-gray-300 hover:text-orange-500">
                    Services
                  </Link>
                  <Link href="/valuation" className="block px-3 py-2 text-gray-300 hover:text-orange-500">
                    Valuation
                  </Link>
                  <Link href="/about" className="block px-3 py-2 text-gray-300 hover:text-orange-500">
                    About
                  </Link>
                  <Link href="/contact" className="block px-3 py-2 text-gray-300 hover:text-orange-500">
                    Contact
                  </Link>
                </div>
              </motion.div>
          )}
        </div>
      </header>
  )
}