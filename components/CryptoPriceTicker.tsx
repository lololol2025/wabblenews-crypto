'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

// Simple price display - NO LAG
function PriceDisplay({ price, isFlashing, flashType }: { 
  price: number, 
  isFlashing: boolean, 
  flashType: 'up' | 'down' | null 
}) {
  return (
    <span 
      className="text-white font-bold text-xl mr-4 tabular-nums"
      style={{
        color: isFlashing ? (flashType === 'up' ? '#00FF7F' : '#FF0040') : '#ffffff',
        textShadow: isFlashing ? 
          `0 0 8px ${flashType === 'up' ? 'rgba(0, 255, 127, 0.6)' : 'rgba(255, 0, 64, 0.6)'}` : 
          'none',
        transform: isFlashing ? 'scale(1.03)' : 'scale(1)',
        transition: 'all 0.2s ease-out',
      }}
    >
      ${price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: price < 1 ? 6 : 2,
      })}
    </span>
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
      newCryptos.forEach(crypto => {
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
    <div className="w-full overflow-hidden bg-black/90 backdrop-blur-xl border-b border-gray-700/50 sticky top-[96px] z-40">
      <div className="ticker-wrapper">
        <div className="ticker-content">
          {tripledCryptos.map((crypto, index) => {
            const isPositive = crypto.price_change_percentage_24h > 0
            const borderColor = isPositive ? '#00FF7F' : '#FF0040'
            const priceFlash = priceChanges[crypto.id]?.flash

            return (
              <div
                key={`${crypto.id}-${index}`}
                className="ticker-item inline-flex items-center px-7 py-3 mx-4 border-2 group relative overflow-hidden cursor-pointer"
                style={{
                  borderRadius: '22px',
                  borderColor,
                  backgroundColor: priceFlash === 'up' ? 
                    'rgba(0, 255, 127, 0.08)' : 
                    priceFlash === 'down' ? 
                    'rgba(255, 0, 64, 0.08)' : 
                    'rgba(5, 5, 5, 0.6)',
                  boxShadow: priceFlash ? 
                    `inset 0 0 15px ${priceFlash === 'up' ? 'rgba(0, 255, 127, 0.2)' : 'rgba(255, 0, 64, 0.2)'}` : 
                    'none',
                  transition: 'all 0.2s ease-out',
                  transform: priceFlash ? 'translateY(-1px)' : 'translateY(0)',
                }}
              >
                {/* Simple gradient background on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: isPositive
                      ? 'linear-gradient(135deg, rgba(0, 255, 127, 0.1) 0%, transparent 50%, rgba(0, 255, 127, 0.1) 100%)'
                      : 'linear-gradient(135deg, rgba(255, 0, 64, 0.1) 0%, transparent 50%, rgba(255, 0, 64, 0.1) 100%)',
                    backgroundSize: '200% 200%',
                    animation: 'gradient-shift 3s ease infinite',
                  }}
                />

                {/* Simple glow on hover */}
                <div 
                  className="absolute inset-0 rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    boxShadow: isPositive
                      ? '0 0 30px rgba(0, 255, 127, 0.4), inset 0 0 30px rgba(0, 255, 127, 0.3)'
                      : '0 0 30px rgba(255, 0, 64, 0.4), inset 0 0 30px rgba(255, 0, 64, 0.3)',
                    animation: 'pulse-glow 2s ease-in-out infinite',
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex items-center">
                  {/* Coin Logo */}
                  <div 
                    className="relative w-9 h-9 mr-4 flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                    style={{
                      filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
                    }}
                  >
                    <Image
                      src={crypto.image}
                      alt={crypto.name}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>

                  {/* Symbol */}
                  <span className="text-white font-black text-xl uppercase mr-4 tracking-wide transition-all duration-500 group-hover:tracking-widest">
                    {crypto.symbol}
                  </span>

                  {/* Price */}
                  <PriceDisplay 
                    price={crypto.current_price}
                    isFlashing={priceFlash}
                    flashType={priceFlash}
                  />

                  {/* 24h Change */}
                  <span
                    className="font-black text-xl flex items-center gap-1 transition-all duration-500 group-hover:scale-110"
                    style={{ 
                      color: borderColor,
                      filter: 'drop-shadow(0 0 8px currentColor)',
                    }}
                  >
                    <span 
                      className="text-2xl transition-transform duration-500 group-hover:scale-125"
                    >
                      {isPositive ? '↗' : '↘'}
                    </span>
                    {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                  </span>
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