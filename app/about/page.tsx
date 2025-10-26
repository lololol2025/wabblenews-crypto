'use client'

import Navbar from '@/components/Navbar'
import CryptoPriceTicker from '@/components/CryptoPriceTicker'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <CryptoPriceTicker />
      
      {/* Hero Banner */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-transparent" />
        
        <div className="relative max-w-6xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Left: Profile/Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="relative w-64 h-64 rounded-2xl overflow-hidden ring-4 ring-[var(--color-accent-primary)]/30 shadow-2xl bg-gray-900 flex items-center justify-center">
                <Image
                  src="/wabble-logo.jpg"
                  alt="Wabble Logo"
                  fill
                  unoptimized
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                <span className="text-6xl">📰</span>
              </div>
            </motion.div>

            {/* Right: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-5xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                About <span style={{ color: 'var(--color-accent-primary)' }}>WabbleNews</span>
              </h1>
              
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Your premier source for real-time crypto news with AI-powered sentiment analysis. 
                We deliver breaking news and market insights faster than anyone else.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  { icon: '⚡', title: 'Lightning Fast', desc: 'Real-time updates delivered instantly' },
                  { icon: '🎯', title: 'Accurate Analysis', desc: 'AI-powered sentiment tracking' },
                  { icon: '🚀', title: 'Community Driven', desc: 'Powered by Crypto Wabble' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h3 className="text-white font-bold">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="flex gap-4"
              >
                <a href="#" className="px-6 py-3 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 font-bold transition-all duration-300 hover:scale-105">
                  Twitter
                </a>
                <a href="https://t.me/jonathanjames0" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg bg-[var(--color-accent-primary)]/20 hover:bg-[var(--color-accent-primary)]/30 text-[var(--color-accent-primary)] font-bold transition-all duration-300 hover:scale-105">
                  Telegram
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-black text-white mb-12 text-center"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Our Values
        </motion.h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { title: 'Speed', icon: '⚡', desc: 'Breaking news delivered in real-time' },
            { title: 'Accuracy', icon: '🎯', desc: 'Verified sources and fact-checking' },
            { title: 'Innovation', icon: '🚀', desc: 'Ultra-modern platform with AI' },
            { title: 'Community', icon: '💎', desc: 'Powered by Crypto Wabble' }
          ].map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-effect p-6 rounded-xl border border-gray-800 hover:border-[var(--color-accent-primary)]/50 transition-all duration-300"
            >
              <div className="text-4xl mb-3">{value.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                {value.title}
              </h3>
              <p className="text-gray-400 text-sm">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="glass-effect border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} <span style={{ color: '#00FF7F' }} className="font-black">WabbleNews</span>. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}