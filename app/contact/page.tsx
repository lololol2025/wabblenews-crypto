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
      
      <main className="max-w-3xl mx-auto px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.4, 0, 0.2, 1]
          }}
          className="glass-effect rounded-xl p-6"
        >
          {/* Compact Header with inline email */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-black text-white mb-2">Contact Us</h1>
            <p className="text-primary font-bold">contact@wabblenews.com</p>
          </div>

          {/* Compact Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-gray-900/50 border border-gray-700 focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-300 text-white text-sm"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-gray-900/50 border border-gray-700 focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-300 text-white text-sm"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-gray-900/50 border border-gray-700 focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-300 text-white text-sm"
                placeholder="What's this about?"
                required
              />
            </div>

            <div>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 rounded-lg bg-gray-900/50 border border-gray-700 focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-300 text-white text-sm resize-none"
                placeholder="Tell us what's on your mind..."
                required
              />
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              className="relative w-full bg-primary text-black py-3 rounded-lg font-black hover:bg-primary/90 transition-all duration-300 text-base overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10">Send Message</span>
            </motion.button>
          </form>

          {/* Quick contact options */}
          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">
              For urgent matters, reach out on{' '}
              <a href="#" className="text-primary hover:underline">Twitter</a> or{' '}
              <a href="#" className="text-primary hover:underline">Telegram</a>
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="glass-effect border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} <span className="text-green-400 font-black">WabbleNews</span>. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}