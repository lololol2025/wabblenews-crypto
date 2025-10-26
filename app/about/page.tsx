'use client'

import Navbar from '@/components/Navbar'
import CryptoPriceTicker from '@/components/CryptoPriceTicker'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24">
      <Navbar />
      <CryptoPriceTicker />
      
      <main className="max-w-4xl mx-auto px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.4, 0, 0.2, 1]
          }}
          className="glass-effect rounded-xl p-6"
        >
          {/* Compact Hero Section */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/30">
              <Image
                src="/wabble-logo.jpg"
                alt="Wabble Logo"
                fill
                className="object-cover"
              />
            </div>
            <h1 className="text-3xl font-black text-white">
              About <span style={{ color: '#00FF7F' }}>WabbleNews</span>
            </h1>
          </div>
          
          {/* One-line description */}
          <p className="text-lg text-gray-300 mb-4 font-light">
            Your premier source for real-time crypto news with AI-powered sentiment analysis.
          </p>
          
          {/* Compact Values Grid */}
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-effect rounded-lg p-4 border border-primary/20"
            >
              <span className="text-primary text-xl font-black mb-1 block">↗</span>
              <h3 className="text-white font-black text-sm mb-1">Speed</h3>
              <p className="text-gray-400 text-xs leading-tight">Breaking news delivered in real-time</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect rounded-lg p-4 border border-primary/20"
            >
              <span className="text-primary text-xl font-black mb-1 block">↗</span>
              <h3 className="text-white font-black text-sm mb-1">Accuracy</h3>
              <p className="text-gray-400 text-xs leading-tight">Verified sources and fact-checking</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-effect rounded-lg p-4 border border-primary/20"
            >
              <span className="text-primary text-xl font-black mb-1 block">↗</span>
              <h3 className="text-white font-black text-sm mb-1">Innovation</h3>
              <p className="text-gray-400 text-xs leading-tight">Ultra-modern platform with AI</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-effect rounded-lg p-4 border border-primary/20"
            >
              <span className="text-green-400 text-xl font-black mb-1 block">↗</span>
              <h3 className="text-white font-black text-sm mb-1">Community</h3>
              <p className="text-gray-400 text-xs leading-tight">Powered by Crypto Wabble</p>
            </motion.div>
          </div>
          
          {/* Compact footer message */}
          <p className="text-sm text-gray-400 mt-4 text-center">
            Thank you for choosing <span style={{ color: '#00FF7F' }} className="font-black">WabbleNews</span> as your trusted crypto news source.
          </p>
        </motion.div>
      </main>

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