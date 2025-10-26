'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import LanguageSelector from './LanguageSelector'
import TimezoneSelector from './TimezoneSelector'
import ThemeSelector from './ThemeSelector'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Social Media', href: '/social' },
    { name: 'Sign Up', href: '/signup' },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.19, 1.0, 0.22, 1.0]
      }}
      className="glass-effect border-b border-primary/20 fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <Link href="/" className="flex items-center gap-5 group">
            <motion.div
              className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary/30"
              whileTap={{ scale: 0.95 }}
              style={{ boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)' }}
            >
              <Image
                src="/wabble-logo.jpg"
                alt="Wabble Logo"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
              />
            </motion.div>
            <motion.span
              className="text-4xl font-black text-white tracking-tighter"
              style={{ 
                letterSpacing: '-0.04em',
                background: 'linear-gradient(180deg, #FFFFFF 0%, #AAAAAA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              WabbleNews
            </motion.span>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.15 * index,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <Link href={link.href}>
                  <motion.div
                    whileTap={{ scale: 0.96 }}
                    className="relative px-7 py-3 rounded-2xl text-lg font-bold text-gray-400 overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                      {link.name}
                    </span>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
            
            {/* Language, Timezone & Theme Selectors */}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-700">
              <LanguageSelector />
              <TimezoneSelector />
              <ThemeSelector />
            </div>
          </div>

          <button
            className="md:hidden p-2 text-gray-300 hover:text-primary transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden py-4 space-y-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-primary hover:bg-dark-200/50"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

