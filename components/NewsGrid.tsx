'use client'

import { useEffect, useState } from 'react'
import NewsCard from './NewsCard'
import { motion } from 'framer-motion'

interface Article {
  id: string
  title: string
  content: string
  category: string
  sentiment?: string
  imageUrl: string | null
  createdAt: string
  author: {
    name: string
  }
}

interface NewsGridProps {
  category?: string
  timezone?: string
}

export default function NewsGrid({ category, timezone }: NewsGridProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchArticles()
  }, [category])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const url = category
        ? `/api/articles?category=${category}`
        : '/api/articles'
      
      const response = await fetch(url)
      const data = await response.json()
      
      if (response.ok) {
        setArticles(data.articles)
      } else {
        setError(data.error || 'Failed to fetch articles')
      }
    } catch (err) {
      setError('An error occurred while fetching articles')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-gray-600 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="glass-effect rounded-2xl p-8 border border-gray-700 max-w-md mx-auto">
          <p className="text-neon-red font-semibold">{error}</p>
        </div>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="glass-effect rounded-2xl p-12 border border-gray-700 max-w-md mx-auto">
          <p className="text-gray-400 text-lg">No articles yet. Stay tuned.</p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="relative">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-green-500/5 rounded-3xl blur-3xl" />
      
      <motion.div 
        className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1.5,
          delay: 1.0,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 100,
          damping: 20
        }}
      >
        {articles.map((article, index) => (
          <NewsCard key={article.id} article={article} index={index} timezone={timezone} />
        ))}
      </motion.div>
    </div>
  )
}

