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
          {/* Advanced Hero Section */}
          <motion.div
            style={{ y: headerY, opacity: headerOpacity }}
            className="relative mb-24"
          >
            {/* Advanced Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-green-500/10 rounded-3xl blur-3xl" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-3xl" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ 
                duration: 1.5, 
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              className="relative p-12 rounded-3xl backdrop-blur-xl border border-white/10"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(20,20,20,0.8) 50%, rgba(0,0,0,0.6) 100%)',
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.1),
                  0 20px 60px rgba(0,0,0,0.8),
                  0 0 100px rgba(0, 212, 255, 0.3),
                  inset 0 1px 0 rgba(255,255,255,0.1)
                `
              }}
            >
              <motion.h1 
                className="text-6xl md:text-8xl font-black text-white mb-10 leading-none tracking-tighter"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #E0E0E0 50%, #AAAAAA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 40px rgba(255,255,255,0.3)'
                }}
              >
                Latest Crypto News
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1.0, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="h-2 w-40 bg-gradient-to-r from-primary via-green-500 to-primary mb-10 rounded-full"
                style={{ 
                  transformOrigin: 'left',
                  boxShadow: '0 0 30px rgba(0, 212, 255, 0.8), 0 0 60px rgba(0, 255, 127, 0.6)' 
                }}
              />
              
              <motion.p 
                className="text-gray-300 text-xl md:text-2xl font-medium tracking-wide max-w-3xl leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 1.0, 
                  delay: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                The fastest crypto and market news shared almost instantly. Real-time updates delivered straight from our sources. Stay ahead with <span style={{ 
                  background: 'linear-gradient(135deg, #00FF7F, #00D4FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: '900'
                }}>WabbleNews</span>.
              </motion.p>
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

