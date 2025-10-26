'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import CryptoPriceTicker from '@/components/CryptoPriceTicker'
import { motion } from 'framer-motion'

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.username.length < 3) {
      alert('Username must be at least 3 characters')
      return
    }

    setLoading(true)

    // Simple client-side storage for demo
    try {
      const users = JSON.parse(localStorage.getItem('wabble_users') || '[]')
      
      // Check if username exists
      if (users.some((u: any) => u.username === formData.username)) {
        alert('Username already taken')
        setLoading(false)
        return
      }

      users.push({
        username: formData.username,
        name: formData.name,
        password: formData.password,
        createdAt: new Date().toISOString()
      })

      localStorage.setItem('wabble_users', JSON.stringify(users))
      localStorage.setItem('wabble_current_user', JSON.stringify({
        username: formData.username,
        name: formData.name
      }))

      setSuccess(true)
      
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } catch (error) {
      alert('Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24">
      <Navbar />
      <CryptoPriceTicker />
      
      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-10 rounded-3xl"
          style={{
            background: 'transparent',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(0, 212, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 212, 255, 0.2)',
          }}
        >
          <h1 className="text-4xl font-black text-center mb-3 text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            Create Account
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Join the community to comment on posts
          </p>

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto" style={{ color: '#7FFF00' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Account Created!</h2>
              <p className="text-gray-400">Redirecting to homepage...</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-white font-bold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  required
                  minLength={3}
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl text-white font-medium focus:outline-none transition-all"
                  placeholder="Enter username"
                  style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '2px solid rgba(0, 212, 255, 0.3)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.7)'
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
                <p className="text-gray-500 text-sm mt-2">At least 3 characters</p>
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-white font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl text-white font-medium focus:outline-none transition-all"
                  placeholder="Enter your name"
                  style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '2px solid rgba(0, 212, 255, 0.3)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.7)'
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-white font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl text-white font-medium focus:outline-none transition-all"
                  placeholder="Enter password"
                  style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '2px solid rgba(0, 212, 255, 0.3)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.7)'
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
                <p className="text-gray-500 text-sm mt-2">At least 6 characters</p>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 font-black text-lg rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #00D4FF, #00A8E8)',
                  color: '#000',
                  boxShadow: '0 4px 12px rgba(0, 212, 255, 0.3)'
                }}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </motion.button>
            </form>
          )}

          {/* Login Link */}
          {!success && (
            <p className="text-center text-gray-400 mt-8">
              Already have an account?{' '}
              <Link href="/login" className="font-bold transition-colors" style={{ color: '#00D4FF' }}>
                Log In
              </Link>
            </p>
          )}
        </motion.div>
      </main>
    </div>
  )
}
