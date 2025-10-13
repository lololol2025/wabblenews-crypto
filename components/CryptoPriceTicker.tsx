'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

// Premium price display with advanced effects
function PriceDisplay({ price, isFlashing, flashType }: {
  price: number,
  isFlashing: boolean,
  flashType: 'up' | 'down' | null
}) {
  const glowIntensity = useMotionValue(0)
  const scaleValue = useMotionValue(1)

  const glowSpring = useSpring(glowIntensity, { stiffness: 300, damping: 20 })
  const scaleSpring = useSpring(scaleValue, { stiffness: 400, damping: 25 })

  useEffect(() => {
    if (isFlashing) {
      glowIntensity.set(1)
      scaleValue.set(1.05)
      const timer = setTimeout(() => {
        glowIntensity.set(0)
        scaleValue.set(1)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [isFlashing, glowIntensity, scaleValue])

  return (
    <motion.span
      className="relative font-bold text-xl mr-4 tabular-nums cursor-pointer"
      style={{
        color: isFlashing ? (flashType === 'up' ? '#00FF7F' : '#FF0040') : '#ffffff',
        textShadow: glowSpring.to(s => isFlashing ?
          `0 0 ${8 + s * 12}px ${flashType === 'up' ? 'rgba(0, 255, 127, 0.8)' : 'rgba(255, 0, 64, 0.8)'}` :
          'none'
        ),
        scale: scaleSpring,
      }}
      whileHover={{
        scale: 1.08,
        textShadow: `0 0 15px ${flashType === 'up' ? 'rgba(0, 255, 127, 0.6)' : 'rgba(255, 0, 64, 0.6)'}`
      }}
      transition={{ duration: 0.2 }}
    >
      ${price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: price < 1 ? 6 : 2,
      })}

      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 rounded-lg -z-10"
        style={{
          background: flashType === 'up'
            ? 'radial-gradient(circle, rgba(0, 255, 127, 0.2) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255, 0, 64, 0.2) 0%, transparent 70%)',
          opacity: glowSpring,
        }}
        animate={{
          scale: isFlashing ? [1, 1.2, 1] : 1,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </motion.span>
  )
}


interface CryptoData {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h: number
}

interface PriceChange {
  [key: string]: {
    previous: number
    flash: 'up' | 'down' | null
  }
}

export default function CryptoPriceTicker() {
  const [cryptos, setCryptos] = useState<CryptoData[]>([])
  const [priceChanges, setPriceChanges] = useState<PriceChange>({})
  const previousPrices = useRef<{ [key: string]: number }>({})

  const fetchCryptoData = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false&price_change_percentage=24h&x_cg_demo_api_key=CG-WGhyowZJTbpZiASkPAsWe2FU'
      )
      const data = await response.json()
      
      // Comprehensive filter for stablecoins and wrapped/duplicate tokens
      const filtered = data.filter((coin: CryptoData) => {
        const id = coin.id.toLowerCase()
        const symbol = coin.symbol.toLowerCase()
        const name = coin.name.toLowerCase()
        
        // Exclude specific problematic coins
        if (id.includes('figr') || symbol.includes('figr')) return false
        
        // Exclude stablecoins
        if (symbol.includes('usd') || name.includes('usd')) return false
        if (['usdt', 'usdc', 'busd', 'dai', 'tusd', 'usdp', 'gusd', 'frax', 'usdd', 'fdusd', 'pyusd'].includes(id)) return false
        
        // Exclude wrapped tokens
        if (symbol.startsWith('w') && symbol.length <= 5) return false
        if (name.includes('wrapped')) return false
        if (['weth', 'wbtc', 'wbnb', 'steth', 'beth', 'cbeth', 'reth'].includes(symbol)) return false
        
        // Exclude lido and staked versions
        if (name.includes('lido') || name.includes('staked')) return false
        if (id.includes('staked') || id.includes('wrapped')) return false
        
        // Exclude bridged tokens
        if (name.includes('bridged') || name.includes('wormhole')) return false
        
        // Exclude peg tokens
        if (name.includes('peg') || name.includes('pegged')) return false
        
        return true
      })
      
      const newCryptos = filtered.slice(0, 30)
      
      // Detect price changes - ONLY when price actually changes
      const newPriceChanges: PriceChange = {}
      newCryptos.forEach((crypto: CryptoData) => {
        const prevPrice = previousPrices.current[crypto.id]
        if (prevPrice !== undefined && prevPrice !== crypto.current_price) {
          // Flash for ANY price change (more sensitive)
          const changePercent = Math.abs((crypto.current_price - prevPrice) / prevPrice) * 100
          console.log(`💰 ${crypto.symbol}: ${prevPrice} → ${crypto.current_price} (${changePercent.toFixed(4)}%)`)
          
          newPriceChanges[crypto.id] = {
            previous: prevPrice,
            flash: crypto.current_price > prevPrice ? 'up' : 'down'
          }
          
            // Clear flash after animation
            setTimeout(() => {
              setPriceChanges(prev => ({
                ...prev,
                [crypto.id]: { ...prev[crypto.id], flash: null }
              }))
            }, 600)
        }
        previousPrices.current[crypto.id] = crypto.current_price
      })
      
      setPriceChanges(prev => ({ ...prev, ...newPriceChanges }))
      setCryptos(newCryptos)
    } catch (error) {
      console.error('Error fetching crypto data:', error)
    }
  }

  useEffect(() => {
    fetchCryptoData()
    
    // Fetch every 30 seconds
    const interval = setInterval(fetchCryptoData, 30000)
    
    return () => clearInterval(interval)
  }, [])

  if (cryptos.length === 0) return null

  // Triple the cryptos for seamless infinite scroll
  const tripledCryptos = [...cryptos, ...cryptos, ...cryptos]

  return (
    <motion.div
      className="w-full overflow-hidden sticky top-[96px] z-40"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Premium glass morphism background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.9) 50%, rgba(0,0,0,0.95) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      />

      {/* Animated accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-1"
        style={{
          background: 'linear-gradient(90deg, #00D4FF, #00FF7F, #FF6400, #FF0040)',
          backgroundSize: '400% 100%'
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="ticker-wrapper relative z-10">
        <div className="ticker-content">
          {tripledCryptos.map((crypto, index) => {
            const isPositive = crypto.price_change_percentage_24h > 0
            const borderColor = isPositive ? '#00FF7F' : '#FF0040'
            const priceFlash = priceChanges[crypto.id]?.flash

            return (
              <motion.div
                key={`${crypto.id}-${index}`}
                className="ticker-item inline-flex items-center px-8 py-4 mx-5 border-2 group relative overflow-hidden cursor-pointer"
                style={{
                  borderRadius: '24px',
                  borderColor: priceFlash ? (priceFlash === 'up' ? '#00FF7F' : '#FF0040') : borderColor,
                  background: priceFlash === 'up'
                    ? 'linear-gradient(135deg, rgba(0, 255, 127, 0.12) 0%, rgba(0, 255, 127, 0.05) 100%)'
                    : priceFlash === 'down'
                    ? 'linear-gradient(135deg, rgba(255, 0, 64, 0.12) 0%, rgba(255, 0, 64, 0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(5, 5, 5, 0.8) 0%, rgba(15, 15, 15, 0.6) 100%)',
                  boxShadow: priceFlash
                    ? `0 0 20px ${priceFlash === 'up' ? 'rgba(0, 255, 127, 0.4)' : 'rgba(255, 0, 64, 0.4)'}, inset 0 0 15px ${priceFlash === 'up' ? 'rgba(0, 255, 127, 0.2)' : 'rgba(255, 0, 64, 0.2)'}`
                    : '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow: `0 0 30px ${isPositive ? 'rgba(0, 255, 127, 0.6)' : 'rgba(255, 0, 64, 0.6)'}, 0 12px 40px rgba(0,0,0,0.8)`
                }}
                animate={{
                  y: priceFlash ? -1 : 0,
                }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              >
                {/* Premium gradient background on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0"
                  style={{
                    background: isPositive
                      ? 'linear-gradient(135deg, rgba(0, 255, 127, 0.15) 0%, rgba(0, 212, 255, 0.1) 50%, rgba(0, 255, 127, 0.15) 100%)'
                      : 'linear-gradient(135deg, rgba(255, 0, 64, 0.15) 0%, rgba(255, 100, 0, 0.1) 50%, rgba(255, 0, 64, 0.15) 100%)',
                    backgroundSize: '200% 200%',
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  whileHover={{
                    opacity: 0.3,
                  }}
                />

                {/* Animated border glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: `conic-gradient(from 0deg, ${isPositive ? '#00FF7F' : '#FF0040'}, ${isPositive ? '#00D4FF' : '#FF6400'}, ${isPositive ? '#00FF7F' : '#FF0040'})`,
                    padding: '2px',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor',
                    WebkitMaskComposite: 'xor'
                  }}
                  animate={{
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  whileHover={{
                    opacity: 0.8,
                  }}
                />

                {/* Premium glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0"
                  style={{
                    boxShadow: isPositive
                      ? '0 0 40px rgba(0, 255, 127, 0.5), inset 0 0 40px rgba(0, 255, 127, 0.3)'
                      : '0 0 40px rgba(255, 0, 64, 0.5), inset 0 0 40px rgba(255, 0, 64, 0.3)',
                  }}
                  animate={{
                    opacity: [0, 0.6, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  whileHover={{
                    opacity: 1,
                    scale: 1.1,
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex items-center">
                  {/* Premium Coin Logo */}
                  <motion.div
                    className="relative w-11 h-11 mr-5 flex-shrink-0"
                    style={{
                      filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))',
                    }}
                    whileHover={{
                      scale: 1.2,
                      rotate: 15,
                      filter: `drop-shadow(0 6px 20px ${isPositive ? 'rgba(0, 255, 127, 0.4)' : 'rgba(255, 0, 64, 0.4)'})`
                    }}
                    animate={{
                      rotate: priceFlash ? [0, 5, -5, 0] : 0
                    }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                  >
                    {/* Logo glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `radial-gradient(circle, ${isPositive ? 'rgba(0, 255, 127, 0.3)' : 'rgba(255, 0, 64, 0.3)'} 0%, transparent 70%)`,
                        filter: 'blur(4px)',
                      }}
                      animate={{
                        scale: priceFlash ? [1, 1.3, 1] : 1,
                        opacity: priceFlash ? [0.3, 0.7, 0.3] : 0.3
                      }}
                      transition={{ duration: 0.8 }}
                    />

                    <Image
                      src={crypto.image}
                      alt={crypto.name}
                      fill
                      className="object-contain relative z-10"
                      unoptimized
                    />
                  </div>

                  {/* Premium Symbol */}
                  <motion.span
                    className="text-white font-black text-xl uppercase mr-5 tracking-wide"
                    animate={{
                      letterSpacing: ['0.05em', '0.1em', '0.05em']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    whileHover={{
                      scale: 1.05,
                      color: isPositive ? '#00FF7F' : '#FF0040'
                    }}
                  >
                    {crypto.symbol}
                  </motion.span>

                  {/* Premium Price */}
                  <PriceDisplay
                    price={crypto.current_price}
                    isFlashing={!!priceFlash}
                    flashType={priceFlash}
                  />

                  {/* Premium 24h Change */}
                  <motion.span
                    className="font-black text-xl flex items-center gap-2 relative overflow-hidden"
                    style={{
                      color: borderColor,
                    }}
                    animate={{
                      scale: priceFlash ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 0.8 }}
                    whileHover={{
                      scale: 1.05,
                      filter: `drop-shadow(0 0 15px ${borderColor})`
                    }}
                  >
                    <motion.span
                      className="text-2xl"
                      animate={{
                        scale: priceFlash ? [1, 1.3, 1] : 1,
                        rotate: priceFlash ? [0, 10, -10, 0] : 0
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      {isPositive ? '↗' : '↘'}
                    </motion.span>

                    <span className="relative">
                      {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%

                      {/* Animated underline */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5"
                        style={{ background: borderColor }}
                        animate={{
                          width: ['0%', '100%', '0%']
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </span>
                  </motion.span>
                </div>

                {/* Top shine effect */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: isPositive
                      ? 'linear-gradient(90deg, transparent, rgba(0, 255, 127, 0.8), transparent)'
                      : 'linear-gradient(90deg, transparent, rgba(255, 0, 64, 0.8), transparent)',
                    animation: 'shine-slide 2s ease-in-out infinite',
                  }}
                />

                {/* Bottom shine effect */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: isPositive
                      ? 'linear-gradient(90deg, transparent, rgba(0, 255, 127, 0.8), transparent)'
                      : 'linear-gradient(90deg, transparent, rgba(255, 0, 64, 0.8), transparent)',
                    animation: 'shine-slide 2s ease-in-out infinite reverse',
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .ticker-wrapper {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 14px 0;
        }

        .ticker-content {
          display: inline-flex;
          white-space: nowrap;
          animation: scroll 60s linear infinite;
          will-change: transform;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .ticker-content:hover {
          animation-play-state: paused;
        }

        .ticker-item {
          flex-shrink: 0;
        }

        .ticker-item:hover {
          transform: scale(1.08) translateY(-4px);
          z-index: 10;
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes shine-slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

      `}</style>
    </div>
  )
}