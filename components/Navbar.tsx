'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'

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
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Premium Glass Morphism Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.9) 50%, rgba(0,0,0,0.95) 100%)',
          backdropFilter: 'blur(30px) saturate(180%)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      />

      {/* Animated Accent Line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          background: 'linear-gradient(90deg, #00D4FF, #00FF7F, #FF6400, #FF0040)',
          backgroundSize: '400% 100%'
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />

        <div className="flex justify-between items-center h-28">
          <Link href="/" className="flex items-center gap-6 group">
            {/* Premium Logo Container */}
            <motion.div
              className="relative w-18 h-18 rounded-2xl overflow-hidden"
              whileHover={{
                scale: 1.05,
                rotate: 5,
                boxShadow: '0 0 40px rgba(0, 212, 255, 0.8)'
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(0, 255, 127, 0.1) 100%)',
                border: '2px solid rgba(0, 212, 255, 0.3)',
                boxShadow: '0 0 30px rgba(0, 212, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
            >
              {/* Logo glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-30 blur-sm"
                style={{
                  background: 'radial-gradient(circle, rgba(0, 212, 255, 0.6) 0%, transparent 70%)'
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <Image
                src="/wabble-logo.jpg"
                alt="Wabble Logo"
                fill
                className="object-cover relative z-10 transition-all duration-700 group-hover:scale-110 group-hover:brightness-125"
              />
            </motion.div>

            {/* Premium Brand Name */}
            <motion.span
              className="text-5xl font-black tracking-tighter"
              style={{
                letterSpacing: '-0.04em',
                background: 'linear-gradient(135deg, #00D4FF 0%, #00FF7F 50%, #FF6400 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              WabbleNews
            </motion.span>
          </Link>

          <div className="hidden md:flex items-center space-x-3">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2 * index,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <Link href={link.href}>
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      boxShadow: '0 0 30px rgba(0, 212, 255, 0.6)'
                    }}
                    whileTap={{ scale: 0.96 }}
                    className="relative px-8 py-4 rounded-2xl text-lg font-bold overflow-hidden group"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)'
                    }}
                  >
                    {/* Animated gradient background */}
                    <motion.div
                      className="absolute inset-0 opacity-0"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(0, 255, 127, 0.1) 50%, rgba(0, 212, 255, 0.15) 100%)',
                        backgroundSize: '200% 200%',
                      }}
                      animate={{
                        opacity: [0, 0.8, 0],
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      whileHover={{
                        opacity: 0.3,
                      }}
                    />

                    {/* Animated border glow */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: 'conic-gradient(from 0deg, #00D4FF, #00FF7F, #00D4FF)',
                        padding: '1px',
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'xor',
                        WebkitMaskComposite: 'xor'
                      }}
                      animate={{
                        rotate: [0, 360]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      whileHover={{
                        opacity: 0.8,
                      }}
                    />

                    <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors duration-500">
                      {link.name}
                    </span>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Premium Mobile Menu Button */}
          <motion.button
            className="md:hidden relative p-4 rounded-2xl overflow-hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px rgba(0, 212, 255, 0.6)'
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
            }}
          >
            {/* Button glow effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)'
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <motion.svg
              className="w-7 h-7 relative z-10 text-gray-300"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{
                rotate: isMenuOpen ? 180 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </motion.svg>
          </motion.button>
        </div>

        {/* Premium Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden"
            >
              <div
                className="mx-4 mt-4 p-6 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(20,20,20,0.8) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
              >
                <div className="space-y-3">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                    >
                      <Link href={link.href}>
                        <motion.div
                          className="relative px-6 py-4 rounded-xl text-lg font-bold text-gray-300 overflow-hidden group"
                          whileHover={{
                            scale: 1.02,
                            x: 5,
                          }}
                          whileTap={{ scale: 0.98 }}
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                            border: '1px solid rgba(255,255,255,0.1)',
                          }}
                        >
                          {/* Hover gradient background */}
                          <motion.div
                            className="absolute inset-0 opacity-0"
                            style={{
                              background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(0, 255, 127, 0.1) 50%, rgba(0, 212, 255, 0.15) 100%)'
                            }}
                            whileHover={{
                              opacity: 0.3,
                            }}
                            transition={{ duration: 0.3 }}
                          />

                          <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                            {link.name}
                          </span>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

