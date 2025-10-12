import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
      
      // Return sample articles if database is not available
      const sampleArticles = [
        {
          id: 'sample-1',
          title: 'Bitcoin Hits New All-Time High! 🚀',
          content: 'Bitcoin has reached a new all-time high of $100,000, marking a historic moment in cryptocurrency history.',
          category: 'Crypto News',
          sentiment: 'positive',
          imageUrl: null,
          createdAt: new Date().toISOString(),
          author: { name: 'WabbleNews Bot' }
        },
        {
          id: 'sample-2', 
          title: 'Ethereum 2.0 Upgrade Complete ✅',
          content: 'The Ethereum network has successfully completed its major upgrade, improving scalability and reducing energy consumption.',
          category: 'Crypto News',
          sentiment: 'positive',
          imageUrl: null,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          author: { name: 'WabbleNews Bot' }
        },
        {
          id: 'sample-3',
          title: 'Market Analysis: Altcoin Season Begins 📈',
          content: 'Technical indicators suggest that altcoin season is beginning, with many alternative cryptocurrencies showing strong momentum.',
          category: 'Market Analysis',
          sentiment: 'positive',
          imageUrl: null,
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          author: { name: 'WabbleNews Bot' }
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

