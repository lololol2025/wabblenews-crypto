'use client'

import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

interface NewsCardProps {
  article: {
    id: string
    title: string
    content: string
    category: string
    sentiment?: string
    sentimentIntensity?: string
    imageUrl: string | null
    images?: string[]
    createdAt: string
  }
  index: number
}

// Enhanced sentiment color mapping
const getSentimentColors = (sentiment: string = 'neutral', intensity: string = 'normal') => {
  const colorMap: Record<string, any> = {
    'positive': {
      color: intensity === 'high' ? '#7FFF00' : '#00C853',
      label: intensity === 'high' ? 'Very Bullish' : 'Bullish',
      glow: intensity === 'high' ? 'rgba(127, 255, 0, 0.4)' : 'rgba(0, 200, 83, 0.4)'
    },
    'neutral': {
      color: '#2196F3',
      label: 'Neutral',
      glow: 'rgba(33, 150, 243, 0.4)'
    },
    'negative': {
      color: intensity === 'high' ? '#B71C1C' : '#E53935',
      label: intensity === 'high' ? 'Very Bearish' : 'Bearish',
      glow: intensity === 'high' ? 'rgba(183, 28, 28, 0.4)' : 'rgba(229, 57, 53, 0.4)'
    }
  }

  return colorMap[sentiment] || colorMap['neutral']
}

export default function NewsCard({ article, index }: NewsCardProps) {
  const timeAgo = formatDistanceToNow(new Date(article.createdAt), { addSuffix: true })
  const [isHovered, setIsHovered] = useState(false)
  const sentimentColors = getSentimentColors(article.sentiment || 'neutral', article.sentimentIntensity || 'normal')
  
  // Get first image for header
  const headerImage = article.images?.[0] || article.imageUrl || '/placeholder-news.jpg'

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-xl overflow-hidden cursor-pointer"
      style={{
        width: '320px',
        height: '380px',
        backgroundColor: 'rgba(26, 29, 35, 0.8)',
        transform: isHovered ? 'translateY(-8px) scale(1.03)' : 'translateY(0) scale(1)',
        boxShadow: isHovered 
          ? `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 40px ${sentimentColors.glow}`
          : '0 4px 12px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.25s ease-in-out',
        backdropFilter: 'blur(10px)'
      }}
    >
      <Link href={`/article/${article.id}`} className="block h-full">
        {/* Image Header */}
        <div className="relative w-full h-[180px] overflow-hidden">
          <Image
            src={headerImage}
            alt={article.title}
            fill
            className="object-cover"
            style={{
              filter: isHovered ? 'brightness(0.7)' : 'brightness(1)',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.25s ease-in-out'
            }}
          />
          
          {/* Sentiment Chip */}
          <div className="absolute top-3 right-3">
            <span 
              className="px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                backgroundColor: sentimentColors.color,
                color: '#000',
                boxShadow: `0 0 20px ${sentimentColors.glow}`,
                fontFamily: 'var(--font-heading)'
              }}
            >
              {sentimentColors.label}
            </span>
          </div>

          {/* View Details Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/40"
          >
            <span className="text-white font-bold flex items-center gap-2">
              View Details
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col h-[200px]">
          {/* Title */}
          <h3
            className="font-bold text-white mb-2"
            style={{
              fontSize: '1.1rem',
              lineHeight: '1.4',
              fontFamily: 'var(--font-heading)',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {article.title}
          </h3>

          {/* Excerpt */}
          <p
            className="text-gray-400 text-sm mb-4 flex-1"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: '1.5'
            }}
          >
            {article.content}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{timeAgo}</span>
            <span className="px-2 py-1 rounded bg-gray-800/50">{article.category}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}