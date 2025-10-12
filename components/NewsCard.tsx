'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface NewsCardProps {
  article: {
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
  index: number
  timezone?: string
}

export default function NewsCard({ article, index, timezone: propTimezone }: NewsCardProps) {
  const [timezone, setTimezone] = useState(propTimezone || 'UTC')
  
  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMinutes / 60)
    const diffDays = Math.floor(diffHours / 24)
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    } else if (diffHours > 0) {
      const remainingMinutes = diffMinutes % 60
      if (remainingMinutes > 0) {
        return `${diffHours}h ${remainingMinutes}m ago`
      }
      return `${diffHours}h ago`
    } else if (diffMinutes > 0) {
      return `${diffMinutes}m ago`
    } else {
      return 'Just now'
    }
  }
  
  const formatUTCTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  const timeAgo = formatTimeAgo(new Date(article.createdAt))
  const utcTime = formatUTCTime(new Date(article.createdAt))
  
  const getSentimentColors = (sentiment: string, intensity: string) => {
    switch (sentiment) {
      case 'very-positive':
        return {
          bg: 'rgba(0, 255, 127, 0.3)',
          text: '#00FF7F',
          border: '#00FF7F',
          glow: 'rgba(0, 255, 127, 0.8)',
          label: 'VERY BULLISH'
        }
      case 'positive':
        return {
          bg: 'rgba(0, 212, 255, 0.3)',
          text: '#00D4FF',
          border: '#00D4FF',
          glow: 'rgba(0, 212, 255, 0.8)',
          label: 'BULLISH'
        }
      case 'very-negative':
        return {
          bg: 'rgba(139, 0, 0, 0.3)',
          text: '#FF0040',
          border: '#8B0000',
          glow: 'rgba(139, 0, 0, 0.8)',
          label: 'VERY BEARISH'
        }
      case 'negative':
        return {
          bg: 'rgba(255, 0, 64, 0.3)',
          text: '#FF0040',
          border: '#FF0040',
          glow: 'rgba(255, 0, 64, 0.8)',
          label: 'BEARISH'
        }
      default:
        return {
          bg: 'rgba(74, 144, 226, 0.3)',
          text: '#4A90E2',
          border: '#4A90E2',
          glow: 'rgba(74, 144, 226, 0.8)',
          label: 'NEUTRAL'
        }
    }
  }

  const sentimentColors = getSentimentColors(article.sentiment || 'neutral', article.sentimentIntensity || 'low')

  // Update timezone when prop changes
  useEffect(() => {
    if (propTimezone) {
      setTimezone(propTimezone)
    } else {
      const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      setTimezone(detectedTimezone)
    }
  }, [propTimezone])

  return (
    <motion.article
      initial={{ opacity: 0, y: 60, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1, 
        ease: [0.16, 1, 0.3, 1]
      }}
      className="glass-effect rounded-3xl overflow-hidden group relative"
      style={{
        border: `2px solid ${sentimentColors.border}`,
        boxShadow: `0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px ${sentimentColors.glow}20`
      }}
    >
      <Link href={`/article/${article.id}`} className="block relative">
        {article.imageUrl && (
          <div className="relative h-64 overflow-hidden bg-black">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute top-4 left-4">
              <span 
                className="px-5 py-2 backdrop-blur-md text-sm font-black rounded-full border-2"
                style={{
                  backgroundColor: sentimentColors.bg,
                  color: sentimentColors.text,
                  borderColor: sentimentColors.border,
                  boxShadow: `inset 0 0 30px ${sentimentColors.glow}`
                }}
              >
                {sentimentColors.label}
              </span>
            </div>
          </div>
        )}
        
        <div className="p-10">
          {!article.imageUrl && (
            <div className="mb-5">
              <span 
                className="inline-block px-5 py-2 bg-primary/40 backdrop-blur-md text-primary text-sm font-black rounded-full border-2 border-primary"
                style={{ boxShadow: 'inset 0 0 30px rgba(0, 212, 255, 0.9)' }}
              >
                {article.category}
              </span>
            </div>
          )}
          
          <h2 className="text-3xl font-black text-white mb-5 line-clamp-2 leading-tight tracking-tighter">
            {article.title}
          </h2>
          
          <p className="text-gray-500 mb-8 line-clamp-4 text-xl leading-loose font-light" style={{ lineHeight: '1.9' }}>
            {article.content}
          </p>
          
          <div className="flex items-center justify-between pt-6 border-t border-gray-800/50">
            <div className="flex items-center space-x-4">
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-black"
                style={{
                  backgroundColor: `${sentimentColors.bg}80`,
                  borderColor: sentimentColors.border,
                  borderWidth: '2px',
                  color: sentimentColors.text,
                  boxShadow: `inset 0 0 30px ${sentimentColors.glow}`
                }}
              >
                {article.author.name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-white text-base">{article.author.name}</div>
                <div className="text-gray-600 text-sm font-medium">Author</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-primary font-black text-3xl tracking-tight">{timeAgo}</div>
              <div className="text-gray-500 text-base font-semibold uppercase tracking-wide">{utcTime} {timezone}</div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

