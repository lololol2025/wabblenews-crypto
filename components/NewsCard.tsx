'use client'

import { motion } from 'framer-motion'
import { format } from 'date-fns'
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
      glow: intensity === 'high' ? 'rgba(127, 255, 0, 0.5)' : 'rgba(0, 200, 83, 0.5)'
    },
    'neutral': {
      color: '#2196F3',
      label: 'Neutral',
      glow: 'rgba(33, 150, 243, 0.5)'
    },
    'negative': {
      color: intensity === 'high' ? '#B71C1C' : '#E53935',
      label: intensity === 'high' ? 'Very Bearish' : 'Bearish',
      glow: intensity === 'high' ? 'rgba(183, 28, 28, 0.5)' : 'rgba(229, 57, 53, 0.5)'
    }
  }

  return colorMap[sentiment] || colorMap['neutral']
}

// Format date: "October 24" or "2024 October 24" if older than a year
const formatCardDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const yearDiff = now.getFullYear() - date.getFullYear()
  
  if (yearDiff >= 1) {
    return format(date, 'yyyy MMMM dd')
  }
  return format(date, 'MMMM dd')
}

export default function NewsCard({ article, index }: NewsCardProps) {
  const formattedDate = formatCardDate(article.createdAt)
  const [isHovered, setIsHovered] = useState(false)
  const sentimentColors = getSentimentColors(article.sentiment || 'neutral', article.sentimentIntensity || 'normal')
  
  // Get first image for header - if no image, don't show image area
  const headerImage = article.images?.[0] || article.imageUrl
  const hasImage = !!headerImage

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-xl overflow-visible"
      style={{
        width: '320px',
        height: hasImage ? '460px' : '320px',
      }}
    >
      {/* Main Card Container */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          height: hasImage ? '420px' : '280px',
          border: `2px solid ${sentimentColors.color}`,
          transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
          boxShadow: isHovered 
            ? `0 20px 50px rgba(0, 0, 0, 0.4), 0 0 60px ${sentimentColors.glow}, inset 0 0 80px ${sentimentColors.glow}`
            : `0 4px 15px rgba(0, 0, 0, 0.3), 0 0 20px ${sentimentColors.glow}`,
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          backdropFilter: 'blur(10px)',
          background: 'rgba(13, 13, 13, 0.8)',
          cursor: 'pointer'
        }}
        onClick={() => window.location.href = `/article/${article.id}`}
      >
        {/* Image Header - Only show if image exists */}
        {hasImage && (
          <div className="relative w-full h-[200px] overflow-hidden">
            <Image
              src={headerImage}
              alt={article.title}
              fill
              unoptimized
              className="object-cover"
              style={{
                filter: isHovered ? 'brightness(0.7) contrast(1.1)' : 'brightness(1)',
                transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />
            
            {/* Date in Image */}
            <div className="absolute bottom-3 left-3 z-10">
              <span 
                className="px-3 py-1.5 rounded-lg text-xs font-bold backdrop-blur-sm"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: '#fff',
                  fontFamily: 'var(--font-heading)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                {formattedDate}
              </span>
            </div>

            {/* Sentiment Chip */}
            <div className="absolute top-3 right-3 z-10">
              <span 
                className="px-3 py-1.5 rounded-full text-xs font-bold"
                style={{
                  backgroundColor: sentimentColors.color,
                  color: '#000',
                  boxShadow: `0 0 25px ${sentimentColors.glow}`,
                  fontFamily: 'var(--font-heading)'
                }}
              >
                {sentimentColors.label}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className={`p-4 flex flex-col ${hasImage ? 'h-[220px]' : 'h-[280px]'}`}>
          {/* Sentiment Chip - Only show if no image */}
          {!hasImage && (
            <div className="flex items-center justify-between mb-3">
              <span 
                className="px-3 py-1.5 rounded-full text-xs font-bold"
                style={{
                  backgroundColor: sentimentColors.color,
                  color: '#000',
                  boxShadow: `0 0 25px ${sentimentColors.glow}`,
                  fontFamily: 'var(--font-heading)'
                }}
              >
                {sentimentColors.label}
              </span>
              <span className="text-xs text-gray-400 font-medium">{formattedDate}</span>
            </div>
          )}

          {/* Title */}
          <h3
            className="font-bold text-white mb-2"
            style={{
              fontSize: '1.15rem',
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
            className="text-gray-300 text-sm mb-4 flex-1"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: hasImage ? 3 : 5,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: '1.6'
            }}
          >
            {article.content}
          </p>

          {/* Footer - Category tag only */}
          <div className="flex items-center justify-between gap-2">
            <span className="px-2 py-1 rounded bg-gray-800/50 text-xs text-gray-400">{article.category}</span>
          </div>
        </div>
      </div>

      {/* Buttons Row - OUTSIDE card, always clickable */}
      <div className="flex gap-3 mt-3 px-2">
        {/* View Button */}
        <Link 
          href={`/article/${article.id}`}
          className="flex-1 px-4 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${sentimentColors.color}, ${sentimentColors.color}dd)`,
            color: '#000',
            boxShadow: `0 4px 12px ${sentimentColors.glow}`,
            transform: 'scale(1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.boxShadow = `0 6px 20px ${sentimentColors.glow}`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = `0 4px 12px ${sentimentColors.glow}`
          }}
        >
          View
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        {/* Comment Button */}
        <Link 
          href={`/article/${article.id}#comments`}
          className="flex-1 px-4 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 backdrop-blur-sm transition-all duration-300"
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            border: `2px solid ${sentimentColors.color}`,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.background = `${sentimentColors.color}22`
            e.currentTarget.style.boxShadow = `0 6px 20px ${sentimentColors.glow}`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          Comments
        </Link>
      </div>
    </motion.article>
  )
}
