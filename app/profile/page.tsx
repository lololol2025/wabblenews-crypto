'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import CryptoPriceTicker from '@/components/CryptoPriceTicker'
import { motion } from 'framer-motion'

export default function ProfilePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
    profilePhoto: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const currentUser = localStorage.getItem('wabble_current_user')
    if (!currentUser) {
      router.push('/login')
      return
    }
    
    const user = JSON.parse(currentUser)
    setFormData({
      username: user.username,
      name: user.name,
      password: '',
      profilePhoto: user.profilePhoto || '/profile-icon.jpg',
    })
  }, [router])

  const validatePassword = (password: string): string | null => {
    if (password && password.length > 0) {
      if (password.length < 8) return 'Password must be at least 8 characters'
      if (!/[A-Z]/.test(password)) return 'Password must contain at least 1 uppercase letter'
      if (!/[a-z]/.test(password)) return 'Password must contain at least 1 lowercase letter'
      if (!/[0-9]/.test(password)) return 'Password must contain at least 1 number'
    }
    return null
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Photo must be less than 2MB')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, profilePhoto: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters')
      return
    }

    if (formData.password) {
      const passwordError = validatePassword(formData.password)
      if (passwordError) {
        setError(passwordError)
        return
      }
    }

    setLoading(true)

    try {
      const users = JSON.parse(localStorage.getItem('wabble_users') || '[]')
      const currentUser = JSON.parse(localStorage.getItem('wabble_current_user') || '{}')
      
      // Check if username is taken by another user
      const existingUser = users.find((u: any) => u.username === formData.username && u.username !== currentUser.username)
      if (existingUser) {
        setError('⚠️ Username already taken! Please choose another.')
        setLoading(false)
        return
      }

      // Find and update user
      const userIndex = users.findIndex((u: any) => u.username === currentUser.username)
      if (userIndex !== -1) {
        users[userIndex] = {
          ...users[userIndex],
          username: formData.username,
          name: formData.name,
          ...(formData.password && { password: formData.password }),
          profilePhoto: formData.profilePhoto,
        }

        localStorage.setItem('wabble_users', JSON.stringify(users))
        localStorage.setItem('wabble_current_user', JSON.stringify({
          username: formData.username,
          name: formData.name,
          profilePhoto: formData.profilePhoto,
        }))

        // Trigger profile update event
        window.dispatchEvent(new Event('profileUpdated'))

        setSuccess(true)
        setTimeout(() => {
          router.push('/')
        }, 1500)
      }
    } catch (error) {
      setError('Failed to update profile')
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
            Edit Profile
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Update your profile information
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

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
              <h2 className="text-2xl font-bold text-white mb-2">Profile Updated!</h2>
              <p className="text-gray-400">Redirecting to homepage...</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Photo Preview */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <img 
                    src={formData.profilePhoto} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-[var(--color-accent-primary)]" 
                  />
                </div>
              </div>

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
                  New Password <span className="text-gray-500 font-normal">(leave blank to keep current)</span>
                </label>
                <input
                  type="password"
                  id="password"
                  minLength={8}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl text-white font-medium focus:outline-none transition-all"
                  placeholder="Enter new password"
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
                <p className="text-gray-500 text-xs mt-2">Min 8 chars, 1 uppercase, 1 lowercase, 1 number</p>
              </div>

              {/* Profile Photo */}
              <div>
                <label htmlFor="photo" className="block text-white font-bold mb-2">
                  Change Profile Photo
                </label>
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="w-full px-5 py-4 rounded-xl text-white font-medium focus:outline-none transition-all"
                  style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '2px solid rgba(0, 212, 255, 0.3)',
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
                  background: 'linear-gradient(135deg, #00D4FF, #00A8E8)',
                  color: '#000',
                  boxShadow: '0 4px 12px rgba(0, 212, 255, 0.3)'
                }}
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </motion.button>
            </form>
          )}
        </motion.div>
      </main>
    </div>
  )
}

