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
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-end mb-8">
          <TimezoneSelector onTimezoneChange={setTimezone} />
        </div>
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1.0, 
              ease: [0.19, 1.0, 0.22, 1.0]
            }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-black text-white mb-8 leading-none tracking-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                ease: [0.19, 1.0, 0.22, 1.0]
              }}
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, #AAAAAA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Latest Crypto News
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.19, 1.0, 0.22, 1.0] }}
              className="h-1 w-32 bg-gradient-to-r from-primary via-primary/50 to-transparent mb-8 rounded-full"
              style={{ 
                transformOrigin: 'left',
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.8)' 
              }}
            />
            <motion.p 
              className="text-gray-500 text-lg md:text-xl font-light tracking-wide max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.4,
                ease: [0.19, 1.0, 0.22, 1.0]
              }}
            >
              The fastest crypto and market news shared almost instantly. Real-time updates delivered straight from our sources. Stay ahead with <span style={{ color: '#00FF7F' }} className="font-bold">WabbleNews</span>.
            </motion.p>
          </motion.div>
        </motion.div>

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

