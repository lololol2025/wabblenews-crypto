'use client'

import Navbar from '@/components/Navbar'
import CryptoPriceTicker from '@/components/CryptoPriceTicker'
import { motion } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Message sent! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <CryptoPriceTicker />
      
      <main className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-black text-white text-center mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Get in Touch
          </h1>
          <p className="text-gray-400 text-center mb-16 text-lg">
            Have questions? We'd love to hear from you
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Left: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="glass-effect rounded-xl p-8 border border-gray-800"
            >
              <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                Send us a message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:border-transparent transition-all duration-300 text-white"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:border-transparent transition-all duration-300 text-white"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:border-transparent transition-all duration-300 text-white"
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:border-transparent transition-all duration-300 text-white resize-none"
                    placeholder="Tell us what's on your mind..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.02 }}
                  className="btn-primary w-full text-base py-4"
                >
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </motion.button>
              </form>
            </motion.div>

            {/* Right: Contact Info & Social */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-6"
            >
              {/* Telegram Card - PRIMARY CONTACT */}
              <div className="glass-effect rounded-xl p-10 border-2 border-blue-500/50">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold mb-2">
                      URGENT CONTACT
                    </div>
                    <h3 className="text-2xl font-black text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Telegram</h3>
                    <a 
                      href="https://t.me/jonathanjames0" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xl text-blue-400 font-bold hover:underline block"
                    >
                      @jonathanjames0
                    </a>
                    <p className="text-gray-400 text-sm mt-2">
                      Best way to reach us instantly for urgent matters
                    </p>
                  </div>
                </div>
              </div>

              {/* Brand Image/Banner */}
              <div className="glass-effect rounded-xl p-8 border border-gray-800 h-72 flex items-center justify-center bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-transparent">
                <div className="text-center">
                  <h3 className="text-4xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    WabbleNews
                  </h3>
                  <p className="text-xl text-gray-300 font-bold mb-2">Real-time crypto & market news</p>
                  <p className="text-gray-400 text-base">AI-powered sentiment analysis</p>
                  <div className="mt-6 flex justify-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <footer className="glass-effect border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-center items-center">
            <p className="text-gray-500 text-sm text-center">&copy; {new Date().getFullYear()} <span className="text-green-400 font-black">WabbleNews</span>. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}