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
  
  const sentimentStyles = {
    'very-positive': 'neon-border-green',
    'positive': 'neon-border-green',
    'very-negative': 'neon-border-red',
    'negative': 'neon-border-red',
    'neutral': 'neon-border-blue',
  }

  const sentimentClass = sentimentStyles[article.sentiment as keyof typeof sentimentStyles] || sentimentStyles.neutral
  
  const sentimentLabels = {
    'very-positive': 'VERY BULLISH',
    'positive': 'BULLISH',
    'very-negative': 'VERY BEARISH',
    'negative': 'BEARISH',
    'neutral': 'NEUTRAL',
  }
  
  const sentimentLabel = sentimentLabels[article.sentiment as keyof typeof sentimentLabels] || 'NEUTRAL'

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
      className={`glass-effect rounded-3xl overflow-hidden group ${sentimentClass} relative`}
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
                className={`px-5 py-2 backdrop-blur-md text-sm font-black rounded-full border-2 ${
                  article.sentiment === 'very-positive' || article.sentiment === 'positive'
                    ? 'bg-green-500/30 text-green-400 border-green-400'
                    : article.sentiment === 'very-negative' || article.sentiment === 'negative'
                    ? 'bg-red-500/30 text-red-400 border-red-400'
                    : 'bg-blue-500/30 text-blue-400 border-blue-400'
                }`}
                style={{ 
                  boxShadow: article.sentiment === 'very-positive' || article.sentiment === 'positive'
                    ? 'inset 0 0 30px rgba(0, 255, 127, 0.6)'
                    : article.sentiment === 'very-negative' || article.sentiment === 'negative'
                    ? 'inset 0 0 30px rgba(255, 0, 64, 0.6)'
                    : 'inset 0 0 30px rgba(0, 212, 255, 0.6)'
                }}
              >
                {sentimentLabel}
              </motion.span>
            </div>
          </div>
        )}
        
        <div className="p-10" style={{ transform: 'translateZ(40px)' }}>
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
            className="text-3xl font-black text-white mb-5 line-clamp-2 leading-tight tracking-tighter"
            animate={{
              color: isHovered ? '#00D4FF' : '#FFFFFF'
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
                className="w-14 h-14 rounded-full bg-primary/40 border-2 border-primary flex items-center justify-center text-primary font-black text-lg"
                style={{ 
                  boxShadow: 'inset 0 0 30px rgba(0, 212, 255, 1.0)',
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
        </div>
      </Link>
    </motion.article>
  )
}

