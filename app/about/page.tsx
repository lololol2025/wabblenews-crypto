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
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.19, 1.0, 0.22, 1.0]
          }}
          className="glass-effect border border-gray-800 rounded-2xl p-8 md:p-12"
        >
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary/30">
                <Image
                  src="/wabble-logo.jpg"
                  alt="Wabble Logo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
              About <span style={{ color: '#00FF7F' }}>WabbleNews</span>
            </h1>
          </div>

          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p className="text-lg leading-relaxed font-light">
              Welcome to <span style={{ color: '#00FF7F' }} className="font-black">WabbleNews</span> - your premier source for the latest crypto and tech news updates.
            </p>

            <p className="text-base leading-relaxed font-light">
              We are dedicated to bringing you timely, accurate, and engaging crypto news content. Our mission is to keep you informed about the market events that matter most, delivered with speed and precision.
            </p>

            <div className="glass-effect border border-primary/20 rounded-2xl p-8 my-6">
              <h2 className="text-2xl font-black text-white mb-6">Our Values</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary mr-3 text-2xl font-black">↗</span>
                  <span className="text-base font-light leading-relaxed"><strong className="text-white font-black">Speed:</strong> Breaking crypto news delivered in real-time</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 text-2xl font-black">↗</span>
                  <span className="text-base font-light leading-relaxed"><strong className="text-white font-black">Accuracy:</strong> We verify our sources and fact-check everything</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 text-2xl font-black">↗</span>
                  <span className="text-base font-light leading-relaxed"><strong className="text-white font-black">Innovation:</strong> Ultra-modern platform with advanced features</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 text-2xl font-black">↗</span>
                  <span className="text-base font-light leading-relaxed"><strong className="text-green-400 font-black">Community:</strong> Powered by Crypto Wabble community</span>
                </li>
              </ul>
            </div>

            <p className="text-base leading-relaxed font-light">
              Founded with a passion for crypto journalism and powered by cutting-edge technology, WabbleNews delivers breaking crypto news with unmatched speed and style.
            </p>

            <p className="text-base leading-relaxed font-light">
              Thank you for choosing <span style={{ color: '#00FF7F' }} className="font-black">WabbleNews</span> as your trusted crypto news source. Stay informed, stay ahead.
            </p>
          </div>
        </motion.div>
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

