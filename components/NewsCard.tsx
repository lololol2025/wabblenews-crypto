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
      initial={{ opacity: 0, y: 80, scale: 0.8, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{ 
        duration: 1.2, 
        delay: index * 0.15, 
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      className="relative group"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Advanced Background Effects */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-20 blur-xl"
        style={{
          background: `linear-gradient(135deg, ${sentimentColors.border}40, ${sentimentColors.glow}20)`,
          transform: 'translateZ(-50px)'
        }}
      />
      
      {/* Main Card */}
      <div
        className="relative rounded-3xl overflow-hidden backdrop-blur-xl border-2 transition-all duration-500 group-hover:scale-[1.02] group-hover:rotate-1"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.9) 50%, rgba(0,0,0,0.8) 100%)',
          borderColor: sentimentColors.border,
          boxShadow: `
            0 0 0 1px ${sentimentColors.border}30,
            0 8px 32px rgba(0,0,0,0.8),
            0 0 60px ${sentimentColors.glow}40,
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.5)
          `,
          transform: 'translateZ(0)'
        }}
      >
        <Link href={`/article/${article.id}`} className="block relative h-full">
          {/* Advanced Image Section */}
          {article.imageUrl && (
            <div className="relative h-72 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/60 z-10" />
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Advanced Sentiment Badge */}
              <div className="absolute top-6 left-6 z-20">
                <div 
                  className="relative px-6 py-3 backdrop-blur-xl rounded-2xl border-2 font-black text-sm tracking-wider"
                  style={{
                    background: `linear-gradient(135deg, ${sentimentColors.bg}80, ${sentimentColors.bg}40)`,
                    color: sentimentColors.text,
                    borderColor: sentimentColors.border,
                    boxShadow: `
                      0 0 0 1px ${sentimentColors.border}50,
                      0 8px 32px rgba(0,0,0,0.6),
                      0 0 40px ${sentimentColors.glow}60,
                      inset 0 1px 0 rgba(255,255,255,0.2)
                    `
                  }}
                >
                  <div className="absolute inset-0 rounded-2xl opacity-30 blur-sm" 
                       style={{ background: sentimentColors.glow }} />
                  <span className="relative z-10">{sentimentColors.label}</span>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-6 right-6 z-20">
                <div className="w-3 h-3 rounded-full animate-pulse" 
                     style={{ backgroundColor: sentimentColors.border }} />
              </div>
            </div>
          )}
        
          {/* Advanced Content Section */}
          <div className="p-8 relative">
            {/* Category Badge for Non-Image Articles */}
            {!article.imageUrl && (
              <div className="mb-6">
                <div 
                  className="inline-block px-6 py-3 backdrop-blur-xl rounded-2xl border-2 font-black text-sm tracking-wider"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.3), rgba(0, 212, 255, 0.1))',
                    color: '#00D4FF',
                    borderColor: '#00D4FF',
                    boxShadow: `
                      0 0 0 1px rgba(0, 212, 255, 0.5),
                      0 8px 32px rgba(0,0,0,0.6),
                      0 0 40px rgba(0, 212, 255, 0.4),
                      inset 0 1px 0 rgba(255,255,255,0.2)
                    `
                  }}
                >
                  {article.category}
                </div>
              </div>
            )}
            
            {/* Advanced Title */}
            <h2 className="text-4xl font-black text-white mb-6 line-clamp-2 leading-tight tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-gray-200 group-hover:to-white transition-all duration-500">
              {article.title}
            </h2>
            
            {/* Advanced Content */}
            <p className="text-gray-400 mb-8 line-clamp-4 text-lg leading-relaxed font-medium" style={{ lineHeight: '1.8' }}>
              {article.content}
            </p>
          
            {/* Advanced Footer */}
            <div className="flex items-center justify-between pt-8 border-t border-gradient-to-r from-transparent via-gray-700/50 to-transparent">
              <div className="flex items-center space-x-5">
                {/* Advanced Author Avatar */}
                <div 
                  className="relative w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                  style={{
                    background: `linear-gradient(135deg, ${sentimentColors.bg}90, ${sentimentColors.bg}60)`,
                    borderColor: sentimentColors.border,
                    borderWidth: '3px',
                    color: sentimentColors.text,
                    boxShadow: `
                      0 0 0 2px ${sentimentColors.border}40,
                      0 8px 32px rgba(0,0,0,0.6),
                      0 0 40px ${sentimentColors.glow}50,
                      inset 0 2px 0 rgba(255,255,255,0.2),
                      inset 0 -2px 0 rgba(0,0,0,0.3)
                    `
                  }}
                >
                  <div className="absolute inset-0 rounded-2xl opacity-20 blur-sm" 
                       style={{ background: sentimentColors.glow }} />
                  <span className="relative z-10">{article.author.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-black text-white text-lg tracking-tight">{article.author.name}</div>
                  <div className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Author</div>
                </div>
              </div>
              
              {/* Advanced Time Display */}
              <div className="text-right">
                <div 
                  className="text-4xl font-black tracking-tighter mb-1"
                  style={{
                    background: `linear-gradient(135deg, ${sentimentColors.text}, ${sentimentColors.border})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {timeAgo}
                </div>
                <div className="text-gray-500 text-sm font-bold uppercase tracking-widest">
                  {utcTime} {timezone}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
      
      {/* Advanced Corner Accents */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-30">
        <div 
          className="absolute top-0 right-0 w-8 h-8 rounded-bl-3xl"
          style={{ 
            background: `linear-gradient(135deg, ${sentimentColors.border}60, transparent)`,
            filter: 'blur(1px)'
          }}
        />
      </div>
      
      <div className="absolute bottom-0 left-0 w-20 h-20 opacity-30">
        <div 
          className="absolute bottom-0 left-0 w-8 h-8 rounded-tr-3xl"
          style={{ 
            background: `linear-gradient(315deg, ${sentimentColors.border}60, transparent)`,
            filter: 'blur(1px)'
          }}
        />
      </div>
    </motion.article>
  )
}

