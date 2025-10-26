'use client'

import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import NewsGrid from '@/components/NewsGrid'
import Hero from '@/components/Hero'
import CryptoPriceTicker from '@/components/CryptoPriceTicker'
import { motion } from 'framer-motion'
import { Suspense } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

function HomeContent() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || undefined
  const { t } = useLanguage()

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
            <div className="flex items-center gap-4">
              <h2 className="text-4xl font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                {t('latestPosts')}
              </h2>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300"
                style={{
                  background: 'rgba(0, 212, 255, 0.1)',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  color: '#00D4FF'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 212, 255, 0.2)'
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)'
                }}
              >
                <img src="/filter-icon.png" alt="Filter" className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
            <div className="h-1 flex-1 ml-8 bg-gradient-to-r from-[var(--color-accent-primary)]/30 to-transparent" />
          </div>
        </motion.div>

        <NewsGrid category={category} />
      </main>

      {/* Social Media Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-black text-white mb-4 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
            Follow WabbleNews on your favorite social platforms
          </h2>
          <p className="text-gray-400 text-center mb-12"></p>
          
          <div className="flex justify-center items-center gap-6 flex-wrap max-w-5xl mx-auto">
            {[
              {
                name: 'YouTube',
                handle: '@CryptoWabble',
                icon: <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
                color: '#FF0000',
                bg: 'from-red-600 to-red-700'
              },
              {
                name: 'Instagram',
                handle: '@cryptowabble',
                icon: <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
                color: '#E4405F',
                bg: 'from-pink-600 to-purple-600'
              },
              {
                name: 'X (Twitter)',
                handle: '@cryptowabble',
                icon: <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
                color: '#FFFFFF',
                bg: 'from-gray-800 to-gray-900'
              },
              {
                name: 'Telegram',
                handle: '@jonathanjames0',
                icon: <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>,
                color: '#0088CC',
                bg: 'from-blue-500 to-blue-600'
              }
            ].map((platform, i) => (
              <motion.a
                key={i}
                href={platform.name === 'Telegram' ? `https://t.me/${platform.handle.replace('@', '')}` : '#'}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-effect p-6 rounded-2xl border border-gray-800 hover:border-[var(--color-accent-primary)]/50 transition-all duration-300 text-center group"
                style={{ width: '170px' }}
              >
                <div className="flex justify-center mb-3">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${platform.bg} flex items-center justify-center group-hover:shadow-lg transition-all duration-300`}
                    style={{ color: platform.color, boxShadow: `0 0 15px ${platform.color}40` }}>
                    <div className="w-8 h-8">
                      {platform.icon}
                    </div>
                  </div>
                </div>
                <h3 className="text-base font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {platform.name}
                </h3>
                <p className="text-gray-400 text-xs">{platform.handle}</p>
              </motion.a>
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