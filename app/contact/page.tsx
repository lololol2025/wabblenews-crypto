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
    <div className="min-h-screen pt-24">
      <Navbar />
      <CryptoPriceTicker />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.7, 
            ease: [0.25, 0.1, 0.25, 1.0]
          }}
        >
          <h1 className="text-6xl md:text-7xl font-black text-white mb-8 text-center tracking-tighter">
            Contact Us
          </h1>
          <p className="text-gray-500 text-center mb-16 text-xl font-light">
            Have questions? We'd love to hear from you.
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass-effect border border-gray-800 rounded-3xl p-16 mb-16 text-center"
          >
            <div className="text-primary mb-8 flex justify-center">
              <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-4xl font-black text-white mb-6">Get in Touch</h3>
            <p className="text-primary text-2xl font-bold">contact@wabblenews.com</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.5,
              ease: [0.19, 1.0, 0.22, 1.0]
            }}
            className="glass-effect border border-gray-800 rounded-3xl p-12 md:p-16"
          >
            <h2 className="text-4xl font-black text-white mb-10">Send us a message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-semibold text-gray-300 mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-white text-lg"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-300 mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-white text-lg"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-base font-semibold text-gray-300 mb-3">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-white text-lg"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-semibold text-gray-300 mb-3">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={8}
                  className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-white text-lg resize-none"
                  placeholder="Tell us what's on your mind..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.96 }}
                className="relative w-full bg-primary text-black py-5 rounded-2xl font-black hover:bg-primary/90 transition-all duration-500 text-xl overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">Send Message</span>
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </main>

      <footer className="glass-effect border-t border-gray-800 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} <span className="text-green-400 font-black">WabbleNews</span>. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

