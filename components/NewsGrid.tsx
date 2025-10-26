'use client'

import { useEffect, useState } from 'react'
import NewsCard from './NewsCard'
import SearchBar from './SearchBar'
import { motion } from 'framer-motion'

interface Article {
  id: string
  title: string
  content: string
  category: string
  sentiment?: string
  sentimentIntensity?: string
  imageUrl: string | null
  createdAt: string
  author: {
    name: string
  }
}

interface NewsGridProps {
  category?: string
  selectedCategories?: string[]
}

export default function NewsGrid({ category, selectedCategories = [] }: NewsGridProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchArticles()
  }, [category])

  useEffect(() => {
    let filtered = articles

    // Apply search filter
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(article =>
        selectedCategories.includes(article.category)
      )
    }

    setFilteredArticles(filtered)
  }, [articles, searchQuery, selectedCategories])

  useEffect(() => {
    if (false) {
      const query = searchQuery.toLowerCase()
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)
      )
      setFilteredArticles(filtered)
    }
  }, [searchQuery, articles])

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
        setFilteredArticles(data.articles)
      } else {
        setError(data.error || 'Failed to fetch articles')
      }
    } catch (err) {
      setError('An error occurred while fetching articles')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
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
          <p className="text-gray-400 text-lg">No posts yet. Stay tuned.</p>
        </div>
      </motion.div>
    )
  }

  return (
    <>
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Results Count */}
      {searchQuery && (
        <div className="text-center mb-4">
          <p className="text-gray-400 text-sm">
            Found {filteredArticles.length} post{filteredArticles.length !== 1 ? 's' : ''} matching "{searchQuery}"
          </p>
        </div>
      )}

      {/* No Results Message */}
      {filteredArticles.length === 0 && searchQuery && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="glass-effect rounded-2xl p-12 border border-gray-700 max-w-md mx-auto">
            <p className="text-gray-400 text-lg">No posts found for "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-6 py-2 rounded-lg font-bold text-sm"
              style={{
                background: 'linear-gradient(135deg, #00D4FF, #00A8E8)',
                color: '#000'
              }}
            >
              Clear Search
            </button>
          </div>
        </motion.div>
      )}

      {/* Articles Grid */}
      {filteredArticles.length > 0 && (
        <motion.div 
          className="flex gap-8 overflow-x-auto pb-20 snap-x snap-mandatory"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6,
            delay: 0.2,
            ease: [0.4, 0, 0.2, 1]
          }}
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(0, 212, 255, 0.5) rgba(0, 0, 0, 0.2)',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {filteredArticles.map((article, index) => (
            <div key={article.id} className="snap-start flex-shrink-0">
              <NewsCard article={article} index={index} />
            </div>
          ))}
      
          {/* Scrollbar styling for Webkit browsers */}
          <style jsx>{`
            div::-webkit-scrollbar {
              height: 8px;
            }
            
            div::-webkit-scrollbar-track {
              background: rgba(0, 0, 0, 0.2);
              border-radius: 4px;
            }
            
            div::-webkit-scrollbar-thumb {
              background: rgba(0, 212, 255, 0.5);
              border-radius: 4px;
            }
            
            div::-webkit-scrollbar-thumb:hover {
              background: rgba(0, 212, 255, 0.7);
            }
          `}</style>
        </motion.div>
      )}
    </>
  )
}

