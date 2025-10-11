'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import CryptoPriceTicker from '@/components/CryptoPriceTicker'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'

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
    email: string
  }
}

export default function ArticlePage() {
  const params = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchArticle()
  }, [params.id])

  const fetchArticle = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/articles/${params.id}`)
      const data = await response.json()
      
      if (response.ok) {
        setArticle(data)
      } else {
        setError(data.error || 'Failed to fetch article')
      }
    } catch (err) {
      setError('An error occurred while fetching the article')
    } finally {
      setLoading(false)
    }
  }

  const getSentimentBorder = (sentiment?: string) => {
    const styles = {
      positive: 'neon-border-green',
      negative: 'neon-border-red',
      neutral: 'neon-border-blue',
    }
    return styles[sentiment as keyof typeof styles] || styles.neutral
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center min-h-[400px]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-gray-600 border-t-transparent rounded-full"
          />
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="glass-effect border border-gray-700 rounded-2xl p-12 text-center">
            <h1 className="text-3xl font-bold text-gray-100 mb-4">Article Not Found</h1>
            <p className="text-gray-400 mb-8">{error}</p>
            <Link href="/" className="text-primary hover:text-accent transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const timeAgo = formatDistanceToNow(new Date(article.createdAt), { addSuffix: true })

  return (
    <div className="min-h-screen pt-24">
      <Navbar />
      <CryptoPriceTicker />
      
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1.0, 
            ease: [0.19, 1.0, 0.22, 1.0]
          }}
          className={`glass-effect rounded-3xl p-12 md:p-20 border border-gray-800`}
        >
          <Link
            href="/"
            className="inline-flex items-center text-primary hover:text-accent mb-8 font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to News
          </Link>

          <div className="mb-6">
            <motion.span 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="px-4 py-1.5 bg-gray-800/50 backdrop-blur-sm text-gray-300 text-sm font-bold rounded-full border border-gray-600"
            >
              {article.category}
            </motion.span>
          </div>

          <motion.h1 
            className="text-6xl md:text-8xl font-black text-white mb-12 leading-none tracking-tighter"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3,
              ease: [0.19, 1.0, 0.22, 1.0]
            }}
          >
            {article.title}
          </motion.h1>

          <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-primary/20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gray-800/50 border border-gray-600 flex items-center justify-center text-gray-300 font-bold text-lg">
                {article.author.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-200">{article.author.name}</p>
                <time className="text-sm text-gray-500">{timeAgo}</time>
              </div>
            </div>
          </div>

          {article.imageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.3, 
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1.0]
              }}
              whileHover={{ scale: 1.02 }}
              className="mb-10 rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-auto opacity-95"
              />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.4, 
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1.0]
            }}
            className="prose prose-lg max-w-none"
          >
            <div className="text-gray-400 leading-loose whitespace-pre-wrap text-2xl font-light" style={{ lineHeight: '2.0' }}>
              {article.content}
            </div>
          </motion.div>
        </motion.div>
      </article>
    </div>
  )
}

