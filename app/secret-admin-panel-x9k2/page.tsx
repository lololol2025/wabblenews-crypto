'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import Image from 'next/image'

interface Admin {
  id: string
  email: string
  name: string
}

interface Article {
  id: string
  title: string
  content: string
  category: string
  sentiment: string
  imageUrl: string | null
  createdAt: string
  published: boolean
}

export default function SecretAdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [articles, setArticles] = useState<Article[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)

  // New article form state
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    category: 'Technology',
    sentiment: 'neutral',
    imageUrl: '',
  })

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      fetchArticles()
    }
  }, [isLoggedIn])

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken')
    if (!token) return

    try {
      const response = await fetch('/api/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setAdmin(data.admin)
        setIsLoggedIn(true)
      } else {
        localStorage.removeItem('adminToken')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('adminToken', data.token)
        setAdmin(data.admin)
        setIsLoggedIn(true)
        toast.success('🎉 Logged in successfully!')
      } else {
        toast.error(data.error || 'Login failed')
      }
    } catch (error) {
      toast.error('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setIsLoggedIn(false)
    setAdmin(null)
    toast.success('Logged out successfully')
  }

  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/articles?limit=100', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setArticles(data.articles)
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error)
    }
  }

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newArticle),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('✅ Article created successfully!')
        setNewArticle({ title: '', content: '', category: 'Technology', sentiment: 'neutral', imageUrl: '' })
        setShowCreateForm(false)
        fetchArticles()
      } else {
        toast.error(data.error || 'Failed to create article')
      }
    } catch (error) {
      toast.error('An error occurred while creating the article')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        toast.success('🗑️ Article deleted successfully!')
        fetchArticles()
      } else {
        toast.error('Failed to delete article')
      }
    } catch (error) {
      toast.error('An error occurred while deleting the article')
    }
  }

  const getSentimentBadge = (sentiment: string) => {
    return 'bg-primary/20 text-primary border-primary/40'
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.19, 1.0, 0.22, 1.0]
          }}
          className="glass-effect border border-gray-800 rounded-3xl p-10 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-gray-600">
                <Image
                  src="/wabble-logo.jpg"
                  alt="Wabble Logo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <h1 className="text-4xl font-black text-white mb-3">
              WabbleNews Admin
            </h1>
            <p className="text-gray-400 text-lg">Secure Admin Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-white text-lg"
                placeholder="admin@wabblenews.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-white text-lg"
                placeholder="Enter your password"
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.96 }}
              className="relative w-full bg-primary text-black py-5 rounded-2xl font-black hover:bg-primary/90 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed text-xl overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">{loading ? 'Signing in...' : 'Sign In'}</span>
            </motion.button>
          </form>
          
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-primary transition-colors">
              ← Back to News
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <nav className="glass-effect border-b border-neon-blue/20 shadow-neon-blue sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-3xl font-black text-white">
              WabbleNews Admin
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">Welcome, <span className="text-primary">{admin?.name}</span></span>
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-neon-red transition-colors"
              >
                Logout
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-black text-gray-100 mb-3">Manage Articles</h2>
            <p className="text-gray-400 text-lg">Create, view, and delete news articles</p>
          </div>
          <motion.button
            onClick={() => setShowCreateForm(!showCreateForm)}
            whileTap={{ scale: 0.96 }}
            className="relative px-10 py-5 bg-primary text-black rounded-2xl font-black hover:bg-primary/90 transition-all duration-500 text-xl overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10">{showCreateForm ? 'Cancel' : 'New Article'}</span>
          </motion.button>
        </div>

        <AnimatePresence>
          {showCreateForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="glass-effect border border-gray-800 rounded-3xl p-10 mb-10"
            >
              <h3 className="text-2xl font-bold text-gray-100 mb-6">Create New Article</h3>
              <form onSubmit={handleCreateArticle} className="space-y-6">
                <div>
                  <label className="block text-base font-semibold text-gray-300 mb-3">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={newArticle.title}
                    onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-dark-300 border border-primary/30 focus:ring-2 focus:ring-primary focus:border-transparent text-gray-200"
                    placeholder="Enter article title"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-semibold text-gray-300 mb-3">
                      Category *
                    </label>
                    <select
                      value={newArticle.category}
                      onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-dark-300 border border-primary/30 focus:ring-2 focus:ring-primary focus:border-transparent text-gray-200"
                    >
                      <option value="Technology">Technology</option>
                      <option value="Business">Business</option>
                      <option value="Crypto">Crypto</option>
                      <option value="Markets">Markets</option>
                      <option value="Politics">Politics</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-gray-300 mb-3">
                      Sentiment *
                    </label>
                    <select
                      value={newArticle.sentiment}
                      onChange={(e) => setNewArticle({ ...newArticle, sentiment: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-dark-300 border border-primary/30 focus:ring-2 focus:ring-primary focus:border-transparent text-gray-200"
                    >
                      <option value="positive">Positive</option>
                      <option value="neutral">Neutral</option>
                      <option value="negative">Negative</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-300 mb-3">
                    Content *
                  </label>
                  <textarea
                    value={newArticle.content}
                    onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-dark-300 border border-primary/30 focus:ring-2 focus:ring-primary focus:border-transparent text-gray-200"
                    rows={8}
                    placeholder="Write your article content here..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-300 mb-3">
                    Image URL (optional)
                  </label>
                  <input
                    type="url"
                    value={newArticle.imageUrl}
                    onChange={(e) => setNewArticle({ ...newArticle, imageUrl: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-dark-300 border border-primary/30 focus:ring-2 focus:ring-primary focus:border-transparent text-gray-200"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileTap={{ scale: 0.96 }}
                  className="relative w-full bg-primary text-black py-5 rounded-2xl font-black hover:bg-primary/90 transition-all duration-500 disabled:opacity-50 text-xl overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">{loading ? 'Creating...' : 'Create Article'}</span>
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="glass-effect rounded-2xl overflow-hidden border border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-300/50 border-b border-primary/20">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Sentiment
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10">
                {articles.map((article) => (
                  <motion.tr
                    key={article.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-dark-300/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-300 line-clamp-2">
                        {article.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary border border-primary/40">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getSentimentBadge(article.sentiment)}`}>
                        {article.sentiment}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {formatDistanceToNow(new Date(article.createdAt), { addSuffix: true })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <motion.a
                          href={`/article/${article.id}`}
                          target="_blank"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1 text-sm font-medium text-primary hover:text-accent transition-colors"
                        >
                          View
                        </motion.a>
                        <motion.button
                          onClick={() => handleDeleteArticle(article.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1 text-sm font-medium text-neon-red hover:text-red-400 transition-colors"
                        >
                          Delete
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {articles.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No articles yet. Create your first one.
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

