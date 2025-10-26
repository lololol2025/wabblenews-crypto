'use client'

import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

interface NewsCardProps {
  article: {
    id: string
    title: string
    content: string
    category: string
    sentiment?: string
    sentimentIntensity?: string
    createdAt: string
  }
  index: number
}

// Sentiment color mapping with both background and border colors
const getSentimentColors = (sentiment: string = 'neutral', intensity: string = 'normal') => {
  const colorMap: Record<string, any> = {
    'positive': {
      bg: intensity === 'high' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(34, 197, 94, 0.1)',
      border: intensity === 'high' ? '#10b981' : '#22c55e',
      text: intensity === 'high' ? '#10b981' : '#22c55e',
      label: intensity === 'high' ? 'Very Bullish' : 'Bullish',
      glow: intensity === 'high' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(34, 197, 94, 0.3)'
    },
    'neutral': {
      bg: 'rgba(59, 130, 246, 0.1)', // Blue instead of gray
      border: '#3b82f6',
      text: '#3b82f6',
      label: 'Neutral',
      glow: 'rgba(59, 130, 246, 0.3)'
    },
    'negative': {
      bg: intensity === 'high' ? 'rgba(185, 28, 28, 0.15)' : 'rgba(239, 68, 68, 0.1)',
      border: intensity === 'high' ? '#b91c1c' : '#ef4444',
      text: intensity === 'high' ? '#b91c1c' : '#ef4444',
      label: intensity === 'high' ? 'Very Bearish' : 'Bearish',
      glow: intensity === 'high' ? 'rgba(185, 28, 28, 0.4)' : 'rgba(239, 68, 68, 0.3)'
    }
  }

  return colorMap[sentiment] || colorMap['neutral']
}

export default function NewsCard({ article, index }: NewsCardProps) {
  const timeAgo = formatDistanceToNow(new Date(article.createdAt), { addSuffix: true })
  const [isHovered, setIsHovered] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const sentimentColors = getSentimentColors(article.sentiment || 'neutral', article.sentimentIntensity || 'normal')

  // Check if title is truncated
  useEffect(() => {
    if (titleRef.current) {
      setIsTruncated(titleRef.current.scrollHeight > titleRef.current.clientHeight)
    }
  }, [article.title])

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.05,
        ease: [0.4, 0, 0.2, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-[280px] h-[120px] rounded-xl overflow-hidden cursor-pointer"
      style={{
        backgroundColor: sentimentColors.bg,
        border: `2px solid ${sentimentColors.border}${isHovered ? 'FF' : 'CC'}`,
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? `0 12px 24px rgba(0, 0, 0, 0.15), 0 0 20px ${sentimentColors.glow}`
          : '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <Link 
        href={`/article/${article.id}`} 
        className="block h-full p-4 flex flex-col"
        aria-label={`Read article: ${article.title}`}
      >
        {/* Sentiment Tag */}
        <div className="absolute top-2 right-2">
          <span 
            className="text-xs font-bold px-2 py-1 rounded-full"
            style={{
              backgroundColor: sentimentColors.bg,
              color: sentimentColors.text,
              border: `1px solid ${sentimentColors.border}`,
              fontSize: '0.65rem',
              fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
            }}
          >
            {sentimentColors.label}
          </span>
        </div>
        
        {/* Title */}
        <h3
          ref={titleRef}
          className="font-black text-white flex-1 title-clamp"
          style={{
            fontSize: '0.95rem',
            lineHeight: '1.3',
            fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
            letterSpacing: '-0.01em',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {article.title}
        </h3>
        
        {/* Bottom Section */}
        <div className="flex items-end justify-between mt-2">
          <span 
            className="text-xs text-gray-400"
            style={{ 
              fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
              fontSize: '0.7rem'
            }}
          >
            {timeAgo}
          </span>
          
          {isTruncated && (
            <span 
              className="text-xs font-bold"
              style={{ 
                color: sentimentColors.text,
                fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                fontSize: '0.7rem'
              }}
            >
              View More →
            </span>
          )}
        </div>
      </Link>
    </motion.article>
  )
}