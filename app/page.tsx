'use client'

import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import NewsGrid from '@/components/NewsGrid'
import Hero from '@/components/Hero'
import CryptoPriceTicker from '@/components/CryptoPriceTicker'
import { motion } from 'framer-motion'
import { Suspense } from 'react'

function HomeContent() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || undefined

  return (
    <div className="min-h-screen">
      <Navbar />
      <CryptoPriceTicker />
      
      {/* Hero Section */}
      <Hero />

      {/* Trending Articles Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="articles">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              Latest Posts
            </h2>
            <div className="h-1 flex-1 ml-8 bg-gradient-to-r from-[var(--color-accent-primary)]/30 to-transparent" />
          </div>
        </motion.div>

        <NewsGrid category={category} />
      </main>

      {/* Market Highlights Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-black text-white mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
            Market Highlights
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Bitcoin Surge', 'ETH Update', 'Market Trends'].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="glass-effect p-6 rounded-xl border border-gray-800 hover:border-[var(--color-accent-primary)]/50 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-2">{item}</h3>
                <p className="text-gray-400">Real-time market news and analysis</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

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