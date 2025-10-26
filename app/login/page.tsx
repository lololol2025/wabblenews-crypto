'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import CryptoPriceTicker from '@/components/CryptoPriceTicker'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (username.length < 3) {
      alert('Username must be at least 3 characters')
      return
    }

    setLoading(true)

    try {
      const users = JSON.parse(localStorage.getItem('wabble_users') || '[]')
      const user = users.find((u: any) => u.username === username)

      if (!user) {
        alert('User not found. Please sign up first.')
        setLoading(false)
        return
      }

      localStorage.setItem('wabble_current_user', JSON.stringify(user))
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
            border: '2px solid rgba(127, 255, 0, 0.3)',
            boxShadow: '0 8px 32px rgba(127, 255, 0, 0.2)',
          }}
        >
          <h1 className="text-4xl font-black text-center mb-3 text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            Welcome Back
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Log in to comment and engage
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
              <h2 className="text-2xl font-bold text-white mb-2">Logged In!</h2>
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl text-white font-medium focus:outline-none transition-all"
                  placeholder="Enter username"
                  style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '2px solid rgba(127, 255, 0, 0.3)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(127, 255, 0, 0.7)'
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(127, 255, 0, 0.3)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(127, 255, 0, 0.3)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 font-black text-lg rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #7FFF00, #00C853)',
                  color: '#000',
                  boxShadow: '0 4px 12px rgba(127, 255, 0, 0.3)'
                }}
              >
                {loading ? 'Logging In...' : 'Log In'}
              </motion.button>
            </form>
          )}

          {/* Signup Link */}
          {!success && (
            <p className="text-center text-gray-400 mt-8">
              Don't have an account?{' '}
              <Link href="/signup" className="font-bold transition-colors" style={{ color: '#7FFF00' }}>
                Sign Up
              </Link>
            </p>
          )}
        </motion.div>
      </main>
    </div>
  )
}

