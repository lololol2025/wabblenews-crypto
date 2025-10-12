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
    <motion.article
      initial={{ opacity: 0, y: 60, scale: 0.85, rotateX: -20 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1, 
        ease: [0.16, 1, 0.3, 1]
      }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      className="glass-effect rounded-3xl overflow-hidden group relative"
      style={{
        border: `2px solid ${isHovered ? sentimentColors.border + '40' : 'rgba(255, 255, 255, 0.1)'}`,
        boxShadow: isHovered
          ? `0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px ${sentimentColors.glow}30`
          : '0 20px 40px rgba(0, 0, 0, 0.6)',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
      <Link href={`/article/${article.id}`} className="block relative" style={{ transform: 'translateZ(20px)' }}>
        {article.imageUrl && (
          <div className="relative h-64 overflow-hidden bg-black">
            <motion.img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1]
              }}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
              animate={{
                opacity: isHovered ? 0.7 : 0.9
              }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute top-4 left-4">
              <motion.span 
                animate={{
                  scale: isHovered ? 1.1 : 1
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30
                }}
                className="px-5 py-2 backdrop-blur-md text-sm font-black rounded-full border-2"
                style={{
                  backgroundColor: sentimentColors.bg,
                  color: sentimentColors.text,
                  borderColor: sentimentColors.border,
                  boxShadow: `inset 0 0 30px ${sentimentColors.glow}`
                }}
              >
                {sentimentColors.label}
              </motion.span>
            </div>
          </div>
        )}
        
        <motion.div
          className="p-10"
          style={{
            transform: 'translateZ(40px)',
            background: isHovered ? `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)` : 'transparent'
          }}
          animate={{
            background: isHovered ? `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)` : 'transparent'
          }}
          transition={{ duration: 0.3 }}
        >
          {!article.imageUrl && (
            <div className="mb-5">
              <motion.span 
                animate={{
                  scale: isHovered ? 1.1 : 1
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30
                }}
                className="inline-block px-5 py-2 bg-primary/40 backdrop-blur-md text-primary text-sm font-black rounded-full border-2 border-primary"
                style={{ boxShadow: 'inset 0 0 30px rgba(0, 212, 255, 0.9)' }}
              >
                {article.category}
              </motion.span>
            </div>
          )}
          
          <motion.h2
            className="text-3xl font-black mb-5 line-clamp-2 leading-tight tracking-tighter"
            animate={{
              color: isHovered ? sentimentColors.text : '#FFFFFF'
            }}
            transition={{ duration: 0.4 }}
          >
            {article.title}
          </motion.h2>
          
          <p className="text-gray-500 mb-8 line-clamp-4 text-xl leading-loose font-light" style={{ lineHeight: '1.9' }}>
            {article.content}
          </p>
          
          <div className="flex items-center justify-between pt-6 border-t border-gray-800/50">
            <div className="flex items-center space-x-4">
              <motion.div 
                animate={{
                  scale: isHovered ? 1.2 : 1,
                  rotate: isHovered ? 180 : 0
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 25
                }}
                className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-black"
                style={{
                  backgroundColor: `${sentimentColors.bg}80`,
                  borderColor: sentimentColors.border,
                  borderWidth: '2px',
                  color: sentimentColors.text,
                  boxShadow: `inset 0 0 30px ${sentimentColors.glow}`,
                  transform: 'translateZ(60px)'
                }}
              >
                {article.author.name.charAt(0)}
              </motion.div>
              <div>
                <div className="font-bold text-white text-base">{article.author.name}</div>
                <div className="text-gray-600 text-sm font-medium">Author</div>
              </div>
            </div>
            <motion.div
              className="text-right"
              animate={{
                opacity: isHovered ? 1 : 0.8
              }}
            >
              <div className="text-primary font-black text-3xl tracking-tight">{timeAgo.split(' ')[0]}</div>
              <div className="text-gray-500 text-base font-semibold uppercase tracking-wide">{timeAgo.split(' ').slice(1).join(' ')}</div>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  )
}

