'use client'

import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import NewsGrid from '@/components/NewsGrid'
import CryptoPriceTicker from '@/components/CryptoPriceTicker'
import TimezoneSelector from '@/components/TimezoneSelector'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Suspense, useState } from 'react'

function HomeContent() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || undefined
  const { scrollYProgress } = useScroll()
  const [timezone, setTimezone] = useState('UTC')
  
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 0.8, 0])

  return (
    <div className="min-h-screen pt-24">
      <Navbar />
      <CryptoPriceTicker />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Advanced Header Section */}
        <div className="relative mb-16">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-3xl blur-3xl" />
          
          {/* Timezone Selector */}
          <div className="flex justify-end mb-12">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl" />
              <div className="relative">
                <TimezoneSelector onTimezoneChange={setTimezone} />
              </div>
            </div>
          </div>
          {/* PREMIUM Hero Section */}
          <motion.div
            style={{ y: headerY, opacity: headerOpacity }}
            className="relative mb-32"
          >
            {/* Premium Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-purple-500/10 to-green-500/15 rounded-3xl blur-3xl animate-pulse" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-3xl" />

            {/* Animated Orbs */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute top-20 right-20 w-24 h-24 bg-green-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-purple-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />

            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotateX: -30 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-16 rounded-3xl backdrop-blur-xl border border-white/20"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(20,20,20,0.9) 50%, rgba(0,0,0,0.7) 100%)',
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.2),
                  0 25px 80px rgba(0,0,0,0.9),
                  0 0 120px rgba(0, 212, 255, 0.4),
                  inset 0 1px 0 rgba(255,255,255,0.2),
                  inset 0 -1px 0 rgba(0,0,0,0.3)
                `
              }}
            >
              <motion.h1
                className="text-7xl md:text-9xl font-black mb-12 leading-tight tracking-tighter"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.3, delay: 0.4 }}
                style={{
                  background: 'linear-gradient(135deg, #00D4FF 0%, #00FF7F 30%, #FF6400 70%, #FF0040 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  backgroundSize: '300% 300%',
                  animation: 'gradient-shift 4s ease infinite',
                  filter: 'drop-shadow(0 0 60px rgba(0, 212, 255, 0.6))'
                }}
              >
                Wabble<span className="text-white drop-shadow-2xl">News</span>
              </motion.h1>
              
              {/* Premium Accent Line */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="h-3 w-48 bg-gradient-to-r from-primary via-green-400 via-purple-400 to-primary mb-12 rounded-full relative overflow-hidden"
                style={{
                  transformOrigin: 'left',
                  boxShadow: '0 0 40px rgba(0, 212, 255, 0.8), 0 0 80px rgba(0, 255, 127, 0.6), 0 0 120px rgba(168, 85, 247, 0.4)'
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 3
                  }}
                />
              </motion.div>

              <motion.p
                className="text-gray-200 text-2xl md:text-3xl font-light tracking-wide max-w-5xl leading-relaxed relative"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
                style={{
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
                }}
              >
                The <span className="font-bold text-primary" style={{ textShadow: '0 0 15px rgba(0, 212, 255, 0.6)' }}>fastest</span> crypto and market news shared{' '}
                <span className="font-bold text-green-400" style={{ textShadow: '0 0 15px rgba(0, 255, 127, 0.6)' }}>almost instantly</span>. Real-time updates delivered{' '}
                <span className="font-bold text-purple-400" style={{ textShadow: '0 0 15px rgba(168, 85, 247, 0.6)' }}>straight from our sources</span>. Stay ahead with{' '}
                <span
                  className="font-bold relative"
                  style={{
                    background: 'linear-gradient(135deg, #00FF7F, #00D4FF, #A855F7)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: '900',
                    textShadow: '0 0 25px rgba(0, 255, 127, 0.8)'
                  }}
                >
                  WabbleNews
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary to-green-400 rounded-full"
                    animate={{
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </span>.
              </motion.p>

              {/* Premium CTA Button */}
              <motion.div
                className="flex justify-center mt-16"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <motion.button
                  className="relative px-16 py-6 bg-gradient-to-r from-primary via-green-400 to-purple-400 text-black font-black text-2xl rounded-2xl overflow-hidden group"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 80px rgba(0, 212, 255, 0.8), 0 0 120px rgba(0, 255, 127, 0.6), 0 0 160px rgba(168, 85, 247, 0.4)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    boxShadow: '0 25px 50px rgba(0, 212, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 3
                    }}
                  />
                  <span className="relative z-10">Explore Premium News</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <NewsGrid timezone={timezone} />
      </main>

      <footer className="glass-effect border-t border-gray-800 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} <span style={{ color: '#00FF7F' }} className="font-black">WabbleNews</span>. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}

