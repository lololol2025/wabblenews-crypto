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
    images?: string[]
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
        className="glass-effect rounded-2xl overflow-hidden group relative"
            style={{
              border: `3px solid ${sentimentColors.border}${isHovered ? 'FF' : '80'}`,
              boxShadow: isHovered
                ? `0 30px 80px rgba(0, 0, 0, 0.95), 0 0 80px ${sentimentColors.glow}, 0 0 150px ${sentimentColors.glow}50, inset 0 1px 0 rgba(255,255,255,0.1)`
                : `0 25px 50px rgba(0, 0, 0, 0.8), 0 0 40px ${sentimentColors.glow}60, inset 0 1px 0 rgba(255,255,255,0.05)`,
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              backdropFilter: 'blur(20px)',
              filter: 'contrast(1.1) brightness(1.05)'
            }}
      >
      <Link href={`/article/${article.id}`} className="block relative pointer-events-none">
        {article.images && article.images.length > 0 && (
          <div className="w-full">
            {article.images.length === 1 && (
              <div className="w-full h-48 bg-black/20 overflow-hidden">
                <img
                  src={article.images[0]}
                  alt="Post image"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {article.images.length === 2 && (
              <div className="grid grid-cols-2 gap-1 h-40">
                {article.images.map((img, i) => (
                  <div key={i} className="bg-black/20 overflow-hidden">
                    <img
                      src={img}
                      alt={`Post image ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            
            {article.images.length === 3 && (
              <div className="grid grid-cols-2 gap-1 h-40">
                <div className="bg-black/20 overflow-hidden">
                  <img
                    src={article.images[0]}
                    alt="Post image 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-rows-2 gap-1">
                  {article.images.slice(1).map((img, i) => (
                    <div key={i} className="bg-black/20 overflow-hidden">
                      <img
                        src={img}
                        alt={`Post image ${i + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {article.images.length >= 4 && (
              <div className="grid grid-cols-2 gap-1 h-40">
                {article.images.slice(0, 4).map((img, i) => (
                  <div key={i} className="bg-black/20 overflow-hidden relative">
                    <img
                      src={img}
                      alt={`Post image ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {i === 3 && article.images && article.images.length > 4 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white text-2xl font-black">+{article.images.length - 4}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        <div className="p-6 flex flex-col h-[280px]">
          {/* Sentiment tag inline with text */}
          <div className="flex items-start gap-3 mb-4">
            <span 
              className="px-4 py-2 rounded-full text-sm font-black whitespace-nowrap flex-shrink-0"
              style={{
                backgroundColor: sentimentColors.bg,
                color: sentimentColors.text,
                border: `3px solid ${sentimentColors.border}`,
                boxShadow: `0 0 25px ${sentimentColors.glow}, 0 4px 15px rgba(0,0,0,0.3)`,
                fontWeight: 900,
                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                filter: 'contrast(1.2) brightness(1.1)',
                backdropFilter: 'blur(10px)'
              }}
            >
              {sentimentColors.label}
            </span>
            <h2
              className="font-black leading-tight tracking-tight flex-1 text-white"
              style={{ 
                fontSize: article.title.length > 80 ? '1.1rem' : article.title.length > 50 ? '1.3rem' : '1.5rem',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.1)',
                filter: 'contrast(1.2) brightness(1.1)'
              }}
            >
              {article.title}
            </h2>
          </div>
          
          <p 
            className="text-gray-50 leading-relaxed whitespace-pre-wrap flex-1 overflow-hidden"
            style={{ 
              fontSize: article.content.length > 250 ? '0.95rem' : article.content.length > 150 ? '1.1rem' : '1.2rem',
              fontWeight: 700,
              lineHeight: '1.7',
              letterSpacing: '0.02em',
              textShadow: '0 1px 4px rgba(0,0,0,0.6), 0 0 10px rgba(255,255,255,0.05)',
              filter: 'contrast(1.15) brightness(1.05)'
            }}
          >
            {article.content}
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-800/30">
            <div className="text-left">
              <div className="text-gray-200 font-black text-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)', filter: 'contrast(1.2)' }}>{timeAgo}</div>
              <div className="text-gray-400 text-xs font-bold" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>{exactTime} {timezoneAbbr}</div>
            </div>
            
            <motion.button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                window.location.href = `/article/${article.id}#comments`
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 0 30px ${sentimentColors.glow}, 0 0 60px ${sentimentColors.glow}40`
              }}
            className="relative px-8 py-4 rounded-xl text-base font-black flex items-center gap-3 overflow-hidden group/btn pointer-events-auto cursor-pointer"
            style={{
              background: `linear-gradient(135deg, ${sentimentColors.bg}90, ${sentimentColors.bg}60)`,
              color: sentimentColors.text,
              border: `3px solid ${sentimentColors.border}`,
              boxShadow: `0 0 30px ${sentimentColors.glow}60, 0 8px 25px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)`,
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              textShadow: '0 1px 3px rgba(0,0,0,0.8)',
              filter: 'contrast(1.2) brightness(1.1)',
              backdropFilter: 'blur(15px)'
            }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover/btn:opacity-100"
                style={{
                  background: `radial-gradient(circle at center, ${sentimentColors.glow}30 0%, transparent 70%)`,
                  transition: 'opacity 0.4s ease'
                }}
              />
              <span className="relative z-10 text-xl">💬</span>
              <span className="relative z-10">Comment</span>
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.article>
    </div>
  )
}

