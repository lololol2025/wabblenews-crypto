'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { useState } from 'react'

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
}

export default function NewsCard({ article, index }: NewsCardProps) {
  const timeAgo = formatDistanceToNow(new Date(article.createdAt), { addSuffix: true })
  const [isHovered, setIsHovered] = useState(false)
  
  // Get user's timezone and format exact time
  const articleDate = new Date(article.createdAt)
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const exactTime = articleDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: userTimezone
  })
  const timezoneAbbr = articleDate.toLocaleTimeString('en-US', {
    timeZoneName: 'short',
    timeZone: userTimezone
  }).split(' ').pop()
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 50 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 50 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg'])
  
  const getSentimentColors = (sentiment: string, intensity: string) => {
    switch (sentiment) {
      case 'very-positive':
        return {
          bg: 'rgba(0, 255, 127, 0.15)',
          text: '#00FF7F',
          border: '#00FF7F',
          glow: 'rgba(0, 255, 127, 0.6)',
          label: 'VERY BULLISH'
        }
      case 'positive':
        return {
          bg: 'rgba(16, 185, 129, 0.15)',
          text: '#10B981',
          border: '#10B981',
          glow: 'rgba(16, 185, 129, 0.6)',
          label: 'BULLISH'
        }
      case 'very-negative':
        return {
          bg: 'rgba(239, 68, 68, 0.15)',
          text: '#EF4444',
          border: '#EF4444',
          glow: 'rgba(239, 68, 68, 0.6)',
          label: 'VERY BEARISH'
        }
      case 'negative':
        return {
          bg: 'rgba(245, 158, 11, 0.15)',
          text: '#F59E0B',
          border: '#F59E0B',
          glow: 'rgba(245, 158, 11, 0.6)',
          label: 'BEARISH'
        }
      default:
        return {
          bg: 'rgba(107, 114, 128, 0.15)',
          text: '#6B7280',
          border: '#6B7280',
          glow: 'rgba(107, 114, 128, 0.6)',
          label: 'NEUTRAL'
        }
    }
  }

  const sentimentColors = getSentimentColors(article.sentiment || 'neutral', article.sentimentIntensity || 'low')

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <div className="relative">
      {/* Always-visible sentiment label above card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="absolute -top-3 left-4 z-20 px-3 py-1 rounded-full text-xs font-black backdrop-blur-md"
        style={{
          backgroundColor: sentimentColors.bg,
          color: sentimentColors.text,
          border: `1.5px solid ${sentimentColors.border}`,
          boxShadow: `0 0 20px ${sentimentColors.glow}`
        }}
      >
        {sentimentColors.label}
      </motion.div>

      <motion.article
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.1, 
          ease: [0.16, 1, 0.3, 1]
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.015, y: -4 }}
        className="glass-effect rounded-2xl overflow-hidden group relative"
        style={{
          border: `2px solid ${sentimentColors.border}${isHovered ? 'FF' : '60'}`,
          boxShadow: isHovered
            ? `0 25px 70px rgba(0, 0, 0, 0.9), 0 0 60px ${sentimentColors.glow}, 0 0 120px ${sentimentColors.glow}40`
            : `0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px ${sentimentColors.glow}40`,
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
      <Link href={`/article/${article.id}`} className="block relative">
        {article.imageUrl && (
          <div className="relative h-64 overflow-hidden bg-black">
            <motion.img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
              animate={{
                scale: isHovered ? 1.08 : 1,
              }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1]
              }}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
              animate={{
                opacity: isHovered ? 0.7 : 0.9
              }}
              transition={{ duration: 0.4 }}
            />
          </div>
        )}
        
        <div className="p-6">
          <motion.h2
            className="text-xl font-black mb-3 leading-tight tracking-tight"
            animate={{
              color: isHovered ? sentimentColors.text : '#FFFFFF'
            }}
            transition={{ duration: 0.3 }}
          >
            {article.title}
          </motion.h2>
          
          <p className="text-gray-400 mb-5 text-sm leading-relaxed font-light whitespace-pre-wrap">
            {article.content}
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-800/30">
            <div className="text-left">
              <div className="text-gray-300 font-bold text-sm">{timeAgo}</div>
              <div className="text-gray-500 text-xs">{exactTime} {timezoneAbbr}</div>
            </div>
            
            <Link href={`/article/${article.id}#comments`}>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: `0 0 30px ${sentimentColors.glow}, 0 0 60px ${sentimentColors.glow}40`
                }}
                className="relative px-6 py-3 rounded-xl text-sm font-black flex items-center gap-2 overflow-hidden group/btn"
                style={{
                  background: `linear-gradient(135deg, ${sentimentColors.bg}80, ${sentimentColors.bg}40)`,
                  color: sentimentColors.text,
                  border: `2px solid ${sentimentColors.border}`,
                  boxShadow: `0 0 20px ${sentimentColors.glow}40, inset 0 1px 0 rgba(255,255,255,0.1)`,
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover/btn:opacity-100"
                  style={{
                    background: `radial-gradient(circle at center, ${sentimentColors.glow}30 0%, transparent 70%)`,
                    transition: 'opacity 0.4s ease'
                  }}
                />
                <span className="relative z-10 text-lg">💬</span>
                <span className="relative z-10">Comment</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </Link>
    </motion.article>
    </div>
  )
}

