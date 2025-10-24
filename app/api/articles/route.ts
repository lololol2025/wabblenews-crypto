import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Advanced sentiment analysis function
function analyzeSentiment(text: string): { sentiment: string; intensity: string } {
  try {
    // Advanced keyword-based sentiment analysis
    const veryPositiveWords = ['moon', 'pump', 'surge', 'rally', 'breakout', 'breakthrough', 'explosive', 'massive', 'huge', 'incredible', 'amazing', 'revolutionary', 'game-changing', 'record-breaking', 'skyrocket', 'soar', 'explode', 'parabolic', 'unstoppable']
    const positiveWords = ['bullish', 'gain', 'up', 'rise', 'increase', 'growth', 'profit', 'win', 'success', 'positive', 'good', 'great', 'excellent', 'strong', 'robust', 'optimistic', 'hopeful', 'confident', 'promising', 'encouraging']
    const veryNegativeWords = ['crash', 'dump', 'collapse', 'plunge', 'disaster', 'catastrophic', 'devastating', 'panic', 'fear', 'terror', 'worst', 'horrible', 'terrible', 'awful', 'disastrous', 'cataclysmic', 'meltdown', 'bloodbath']
    const negativeWords = ['bearish', 'fall', 'drop', 'decline', 'down', 'loss', 'negative', 'bad', 'weak', 'poor', 'declining', 'falling', 'decreasing', 'worrying', 'concerning', 'pessimistic', 'dismal', 'grim']

    const lowerText = text.toLowerCase()

    const veryPositiveCount = veryPositiveWords.filter(word => lowerText.includes(word)).length
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length
    const veryNegativeCount = veryNegativeWords.filter(word => lowerText.includes(word)).length
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length

    const totalPositive = veryPositiveCount * 2 + positiveCount
    const totalNegative = veryNegativeCount * 2 + negativeCount

    if (totalPositive > totalNegative + 2) {
      return veryPositiveCount > positiveCount ? { sentiment: 'very-positive', intensity: 'very-high' } : { sentiment: 'positive', intensity: 'high' }
    }
    if (totalNegative > totalPositive + 2) {
      return veryNegativeCount > negativeCount ? { sentiment: 'very-negative', intensity: 'very-high' } : { sentiment: 'negative', intensity: 'high' }
    }
    if (totalPositive > totalNegative) return { sentiment: 'positive', intensity: 'medium' }
    if (totalNegative > totalPositive) return { sentiment: 'negative', intensity: 'medium' }

    return { sentiment: 'neutral', intensity: 'low' }
  } catch (error) {
    console.error('Sentiment analysis error:', error)
    return { sentiment: 'neutral', intensity: 'low' }
  }
}

// GET all articles (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const category = searchParams.get('category')

    // Try to connect to database, but don't fail if it doesn't work
    try {
      const where = {
        published: true,
        ...(category && { category }),
      }

      const [articles, total] = await Promise.all([
        prisma.article.findMany({
          where,
          orderBy: {
            createdAt: 'desc',
          },
          take: limit,
          skip: offset,
        }),
        prisma.article.count({ where }),
      ])

      return NextResponse.json({
        articles,
        total,
        limit,
        offset,
      })
    } catch (dbError) {
      console.log('Database not available, returning sample articles')
      
      // Return advanced sample articles if database is not available
      const sampleArticles = [
        {
          id: 'sample-demo',
          title: 'JUST IN: Canary Sui ETF has been added to DTCC website under $SUIS',
          content: 'A listing on DTCC means the ETF is now officially registered and its infrastructure is ready for trading on exchanges.',
          category: 'Breaking News',
          sentiment: 'positive',
          sentimentIntensity: 'high',
          imageUrl: 'https://pbs.twimg.com/profile_images/1727752967032639488/JTlXG-zN_400x400.jpg',
          createdAt: new Date().toISOString(),
          author: { name: 'WabbleNews AI' }
        },
        {
          id: 'sample-1',
          title: 'Bitcoin Skyrockets to Record-Breaking $108,000',
          content: 'Bitcoin has achieved an unprecedented milestone, surging past $108,000 in a massive parabolic move that has left analysts and investors stunned worldwide.',
          category: 'Breaking News',
          sentiment: analyzeSentiment('Bitcoin Skyrockets to Record-Breaking $108,000 massive parabolic move incredible breakthrough unstoppable').sentiment,
          sentimentIntensity: analyzeSentiment('Bitcoin Skyrockets to Record-Breaking $108,000 massive parabolic move incredible breakthrough unstoppable').intensity,
          imageUrl: null,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          author: { name: 'WabbleNews AI' }
        },
        {
          id: 'sample-2',
          title: '⚠️⚠️ JUST IN: President Trump defends Binance founder CZ',
          content: 'Trump says CZ "wasn\'t guilty" and only served 4 months in jail. Trump tells a CNN reporter they "know nothing about crypto" and calls them fake news, adding that "CZ is not guilty — the Biden administration arrested him."',
          category: 'Politics',
          sentiment: 'neutral',
          sentimentIntensity: 'medium',
          imageUrl: null,
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          author: { name: 'WabbleNews AI' }
        },
        {
          id: 'sample-3',
          title: '⚠️ JUST IN: Trump says a $20 trillion investment is coming to the USA',
          content: 'The stock market is hitting all-time highs, and all of it is pouring in thanks to the tariffs.',
          category: 'Economy',
          sentiment: 'very-positive',
          sentimentIntensity: 'very-high',
          imageUrl: null,
          createdAt: new Date(Date.now() - 10800000).toISOString(),
          author: { name: 'WabbleNews AI' }
        },
        {
          id: 'sample-4',
          title: 'Solana network experiences brief downtime',
          content: 'SOL drops 8% as validators report consensus issues. Network restored after 2 hours.',
          category: 'Network Issues',
          sentiment: 'negative',
          sentimentIntensity: 'high',
          imageUrl: null,
          createdAt: new Date(Date.now() - 14400000).toISOString(),
          author: { name: 'WabbleNews AI' }
        }
      ]

      return NextResponse.json({
        articles: sampleArticles,
        total: sampleArticles.length,
        limit,
        offset,
      })
    }
  } catch (error) {
    console.error('Get articles error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

