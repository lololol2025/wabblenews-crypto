'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

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
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 15 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 15 })
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    mouseX.set(distanceX / (rect.width / 2))
    mouseY.set(distanceY / (rect.height / 2))
  }
  
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }
  
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
          bg: 'linear-gradient(135deg, rgba(0, 255, 127, 0.15) 0%, rgba(0, 255, 127, 0.05) 100%)',
          text: '#00FF7F',
          border: 'linear-gradient(135deg, #00FF7F, #00D4FF)',
          glow: '0 0 40px rgba(0, 255, 127, 0.6), 0 0 80px rgba(0, 255, 127, 0.3)',
          shadow: '0 25px 50px rgba(0, 255, 127, 0.2)',
          label: 'VERY BULLISH',
          accent: '#00FF7F'
        }
      case 'positive':
        return {
          bg: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(0, 212, 255, 0.05) 100%)',
          text: '#00D4FF',
          border: 'linear-gradient(135deg, #00D4FF, #0099FF)',
          glow: '0 0 40px rgba(0, 212, 255, 0.6), 0 0 80px rgba(0, 212, 255, 0.3)',
          shadow: '0 25px 50px rgba(0, 212, 255, 0.2)',
          label: 'BULLISH',
          accent: '#00D4FF'
        }
      case 'very-negative':
        return {
          bg: 'linear-gradient(135deg, rgba(255, 0, 64, 0.15) 0%, rgba(255, 0, 64, 0.05) 100%)',
          text: '#FF0040',
          border: 'linear-gradient(135deg, #FF0040, #CC0000)',
          glow: '0 0 40px rgba(255, 0, 64, 0.6), 0 0 80px rgba(255, 0, 64, 0.3)',
          shadow: '0 25px 50px rgba(255, 0, 64, 0.2)',
          label: 'VERY BEARISH',
          accent: '#FF0040'
        }
      case 'negative':
        return {
          bg: 'linear-gradient(135deg, rgba(255, 100, 0, 0.15) 0%, rgba(255, 100, 0, 0.05) 100%)',
          text: '#FF6400',
          border: 'linear-gradient(135deg, #FF6400, #FF0000)',
          glow: '0 0 40px rgba(255, 100, 0, 0.6), 0 0 80px rgba(255, 100, 0, 0.3)',
          shadow: '0 25px 50px rgba(255, 100, 0, 0.2)',
          label: 'BEARISH',
          accent: '#FF6400'
        }
      default:
        return {
          bg: 'linear-gradient(135deg, rgba(74, 144, 226, 0.15) 0%, rgba(74, 144, 226, 0.05) 100%)',
          text: '#4A90E2',
          border: 'linear-gradient(135deg, #4A90E2, #2E5BBA)',
          glow: '0 0 40px rgba(74, 144, 226, 0.6), 0 0 80px rgba(74, 144, 226, 0.3)',
          shadow: '0 25px 50px rgba(74, 144, 226, 0.2)',
          label: 'NEUTRAL',
          accent: '#4A90E2'
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
      ref={cardRef}
      initial={{ opacity: 0, y: 100, scale: 0.7, rotateX: -25 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{ 
        duration: 1.5, 
        delay: index * 0.2, 
        ease: [0.16, 1, 0.3, 1],
        type: "spring",
        stiffness: 80,
        damping: 25
      }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
        perspective: 1200,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      className="relative group cursor-pointer"
    >
      {/* Premium Glass Morphism Background */}
      <div 
        className="absolute inset-0 rounded-3xl"
        style={{
          background: sentimentColors.bg,
          backdropFilter: 'blur(30px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: `
            ${sentimentColors.glow},
            ${sentimentColors.shadow},
            0 0 0 1px rgba(255,255,255,0.05),
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.2)
          `,
          transform: 'translateZ(0)'
        }}
      />
      
      {/* Animated Gradient Border */}
      <motion.div 
        className="absolute inset-0 rounded-3xl"
        style={{
          background: sentimentColors.border,
          padding: '2px',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMaskComposite: 'xor'
        }}
        animate={{
          opacity: isHovered ? 1 : 0.7,
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Floating Particles Effect */}
      {isHovered && (
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full opacity-60"
              style={{
                background: sentimentColors.accent,
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                scale: [0.5, 1, 0.5],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}
      
      {/* Main Content Container */}
      <div className="relative z-10">
        <Link href={`/article/${article.id}`} className="block relative h-full">
          {/* Premium Image Section */}
          {article.imageUrl && (
            <div className="relative h-80 overflow-hidden">
              <motion.img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
                animate={{
                  scale: isHovered ? 1.15 : 1,
                  filter: isHovered ? 'brightness(1.1) contrast(1.1)' : 'brightness(1) contrast(1)'
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              
              {/* Advanced Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/70 z-10" />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20"
                animate={{
                  opacity: isHovered ? 0.8 : 0.6
                }}
                transition={{ duration: 0.4 }}
              />
              
              {/* Animated Glow Effect */}
              <motion.div 
                className="absolute inset-0 z-30"
                style={{
                  background: `radial-gradient(circle at center, ${sentimentColors.accent}20 0%, transparent 70%)`,
                  opacity: isHovered ? 1 : 0
                }}
                transition={{ duration: 0.6 }}
              />
              
              {/* Premium Sentiment Badge */}
              <div className="absolute top-6 left-6 z-40">
                <motion.div 
                  className="relative px-6 py-3 backdrop-blur-xl rounded-2xl border-2 font-black text-sm tracking-wider"
                  style={{
                    background: `linear-gradient(135deg, ${sentimentColors.accent}20, ${sentimentColors.accent}10)`,
                    borderColor: sentimentColors.accent,
                    color: sentimentColors.accent,
                    boxShadow: `
                      0 0 20px ${sentimentColors.accent}40,
                      inset 0 1px 0 rgba(255,255,255,0.2),
                      inset 0 -1px 0 rgba(0,0,0,0.2)
                    `
                  }}
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                    rotate: isHovered ? 2 : 0,
                    boxShadow: isHovered 
                      ? `0 0 30px ${sentimentColors.accent}60, inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.3)`
                      : `0 0 20px ${sentimentColors.accent}40, inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.2)`
                  }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                >
                  {sentimentColors.label}
                  
                  {/* Animated Accent Line */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-1 rounded-full"
                    style={{ background: sentimentColors.accent }}
                    animate={{
                      width: isHovered ? '100%' : '60%'
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-6 right-6 z-20">
                <div className="w-3 h-3 rounded-full animate-pulse" 
                     style={{ backgroundColor: sentimentColors.border }} />
              </div>
            </div>
          )}
        
          {/* Premium Content Section */}
          <div className="p-10 relative">
            {/* Category Badge for Non-Image Articles */}
            {!article.imageUrl && (
              <div className="mb-8">
                <motion.div 
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
                  animate={{
                    scale: isHovered ? 1.05 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {article.category}
                </motion.div>
              </div>
            )}
            
            {/* Premium Title */}
            <motion.h2 
              className="text-4xl font-black mb-6 line-clamp-2 leading-tight tracking-tighter"
              style={{ color: '#FFFFFF' }}
              animate={{
                color: isHovered ? sentimentColors.accent : '#FFFFFF'
              }}
              transition={{ duration: 0.4 }}
            >
              {article.title}
            </motion.h2>
            
            {/* Premium Description */}
            <motion.p 
              className="text-gray-400 mb-10 line-clamp-4 text-lg leading-relaxed font-light"
              animate={{
                color: isHovered ? '#E5E7EB' : '#9CA3AF'
              }}
              transition={{ duration: 0.4 }}
            >
              {article.content}
            </motion.p>
          
            {/* Premium Footer */}
            <div className="flex items-center justify-between pt-10 border-t border-gradient-to-r from-transparent via-gray-700/50 to-transparent">
              <div className="flex items-center space-x-6">
                {/* Premium Author Avatar */}
                <motion.div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${sentimentColors.accent}30, ${sentimentColors.accent}10)`,
                    borderColor: sentimentColors.accent,
                    borderWidth: '3px',
                    color: sentimentColors.accent,
                    boxShadow: `
                      0 0 0 1px ${sentimentColors.accent}50,
                      0 12px 40px rgba(0,0,0,0.8),
                      0 0 60px ${sentimentColors.glow}50,
                      inset 0 1px 0 rgba(255,255,255,0.3),
                      inset 0 -1px 0 rgba(0,0,0,0.3)
                    `
                  }}
                  animate={{
                    scale: isHovered ? 1.15 : 1,
                    rotate: isHovered ? 8 : 0,
                    boxShadow: isHovered 
                      ? `0 0 0 1px ${sentimentColors.accent}70, 0 16px 50px rgba(0,0,0,0.9), 0 0 80px ${sentimentColors.glow}60, inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.4)`
                      : `0 0 0 1px ${sentimentColors.accent}50, 0 12px 40px rgba(0,0,0,0.8), 0 0 60px ${sentimentColors.glow}50, inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.3)`
                  }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                >
                  <div className="absolute inset-0 rounded-2xl opacity-30 blur-sm" 
                       style={{ background: sentimentColors.glow }} />
                  <span className="relative z-10">{article.author.name.charAt(0)}</span>
                  
                  {/* Animated Ring */}
                  <motion.div 
                    className="absolute inset-0 rounded-2xl border-2"
                    style={{ borderColor: sentimentColors.accent }}
                    animate={{
                      scale: isHovered ? 1.2 : 1,
                      opacity: isHovered ? 0.6 : 0.3
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
                
                <div>
                  <div className="font-bold text-white text-xl">{article.author.name}</div>
                  <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Author</div>
                </div>
              </div>
              
              {/* Premium Time Display */}
              <motion.div
                className="text-right"
                animate={{
                  scale: isHovered ? 1.08 : 1,
                  x: isHovered ? 5 : 0
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-primary font-black text-5xl tracking-tight mb-2">{timeAgo}</div>
                <div className="text-gray-500 text-lg font-semibold uppercase tracking-wider">{utcTime} {timezone}</div>
              </motion.div>
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

