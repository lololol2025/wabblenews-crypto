'use client'

import Navbar from '@/components/Navbar'
import CryptoPriceTicker from '@/components/CryptoPriceTicker'
import { motion } from 'framer-motion'

export default function SocialPage() {
  const socials = [
    {
      name: 'YouTube',
      handle: '@CryptoWabble',
      url: 'https://www.youtube.com/@CryptoWabble',
      color: '#FF0000',
      gradient: 'from-red-600 to-red-500',
      borderColor: 'border-red-500/30',
      textColor: 'text-red-500',
      hoverBg: 'hover:bg-red-500/10',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      handle: '@cryptowabble',
      url: 'https://www.instagram.com/cryptowabble/',
      color: '#E1306C',
      gradient: 'from-pink-600 via-purple-500 to-orange-500',
      borderColor: 'border-pink-500/30',
      textColor: 'text-pink-500',
      hoverBg: 'hover:bg-pink-500/10',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'X (Twitter)',
      handle: '@CryptoWabble',
      url: 'https://x.com/CryptoWabble',
      color: '#FFFFFF',
      gradient: 'from-gray-800 to-gray-900',
      borderColor: 'border-gray-600/30',
      textColor: 'text-gray-200',
      hoverBg: 'hover:bg-gray-700/10',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'Telegram',
      handle: '@cryptowabble',
      url: 'https://t.me/cryptowabble',
      color: '#0088CC',
      gradient: 'from-blue-500 to-blue-600',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-400',
      hoverBg: 'hover:bg-blue-500/10',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="min-h-screen pt-24">
      <Navbar />
      <CryptoPriceTicker />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.7, 
            ease: [0.25, 0.1, 0.25, 1.0]
          }}
        >
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-7xl font-black text-white mb-8 tracking-tighter">
              Connect With Us
            </h1>
            <p className="text-gray-500 text-xl font-light">
              Follow WabbleNews on your favorite social platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {socials.map((social, index) => {
              // Different hover animation for each platform
              const getHoverAnimation = () => {
                switch(social.name) {
                  case 'YouTube':
                    return { y: -20, rotateX: 15, scale: 1.05 }
                  case 'Instagram':
                    return { y: -15, rotateZ: 3, scale: 1.06 }
                  case 'X (Twitter)':
                    return { y: -25, rotateY: -10, scale: 1.04 }
                  case 'Telegram':
                    return { y: -18, rotateX: -12, rotateY: 5, scale: 1.05 }
                  default:
                    return { y: -15, scale: 1.05 }
                }
              }

              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 60, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.9, 
                    delay: index * 0.2,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  whileHover={{ 
                    y: -15,
                    scale: 1.03,
                    transition: {
                      type: 'spring',
                      stiffness: 300,
                      damping: 25
                    }
                  }}
                  whileTap={{ scale: 0.97 }}
                  className={`social-card glass-effect border ${social.borderColor} rounded-3xl p-16 text-center group relative overflow-hidden transition-all duration-500`}
                >
                  {/* Colored glow effect - fades in on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: `radial-gradient(circle at center, ${social.color}15 0%, transparent 70%)`,
                      boxShadow: `inset 0 0 80px ${social.color}25, 0 0 60px ${social.color}20`,
                    }}
                  />
                  
                  <div className="relative z-10">
                    <div className={`flex justify-center mb-8 ${social.textColor} transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2`}>
                      <div style={social.name === 'Instagram' ? {
                        background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      } : {}}>
                        {social.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-black text-white mb-4 group-hover:tracking-wider transition-all duration-500">
                      {social.name}
                    </h3>
                    
                    <p className={`text-gray-500 text-xl font-light group-hover:${social.textColor} transition-all duration-500`}>
                      {social.handle}
                    </p>
                  </div>
                  
                  {/* Animated bottom line with glow */}
                  <div 
                    className={`absolute bottom-0 left-0 h-2 bg-gradient-to-r ${social.gradient} w-0 group-hover:w-full transition-all duration-700 ease-out`}
                    style={{ 
                      boxShadow: `0 0 40px ${social.color}`,
                    }}
                  />
                </motion.a>
              )
            })}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass-effect border border-gray-800 rounded-3xl p-16 mt-16 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-black text-white mb-6">Stay Connected</h2>
            <p className="text-gray-400 text-xl font-light leading-relaxed">
              Follow Crypto Wabble on social media to get the latest crypto news updates, market insights, and exclusive analysis delivered straight to your feed.
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}

