import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface TelegramMessage {
  message?: {
    text?: string
    caption?: string
    photo?: Array<{ file_path: string }>
  }
  channel_post?: {
    text?: string
    caption?: string
    photo?: Array<{ file_path: string }>
  }
}

async function analyzeSentiment(text: string): Promise<string> {
  try {
    // Simple keyword-based sentiment analysis
    const positiveWords = ['bullish', 'moon', 'pump', 'surge', 'rally', 'gain', 'up', 'rise', 'breakout', 'breakthrough', 'positive', 'good', 'great', 'excellent', 'amazing', 'huge', 'massive', 'incredible']
    const negativeWords = ['bearish', 'dump', 'crash', 'fall', 'drop', 'decline', 'down', 'negative', 'bad', 'terrible', 'awful', 'horrible', 'worst', 'fear', 'panic', 'sell']
    
    const lowerText = text.toLowerCase()
    
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length
    
    if (positiveCount > negativeCount) return 'positive'
    if (negativeCount > positiveCount) return 'negative'
    return 'neutral'
  } catch (error) {
    console.error('Sentiment analysis error:', error)
    return 'neutral'
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: TelegramMessage = await request.json()
    
    // Extract message data (works for both regular messages and channel posts)
    const message = body.message || body.channel_post
    
    if (!message) {
      return NextResponse.json({ ok: true })
    }

    // Get text content
    const text = message.text || message.caption || ''
    
    if (!text || text.length < 10) {
      return NextResponse.json({ ok: true })
    }

    // Analyze sentiment using AI
    const sentiment = await analyzeSentiment(text)

    // Create title from first line or first 60 characters
    const title = text.split('\n')[0].slice(0, 100) || 'Crypto News Update'

    // Create slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 50)

    // Get image URL if photo exists
    let imageUrl = null
    if (message.photo && message.photo.length > 0) {
      const photo = message.photo[message.photo.length - 1]
      imageUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${photo.file_path}`
    }

    // Create article in database (NO ADMIN NEEDED!)
    const article = await prisma.article.create({
      data: {
        title,
        content: text,
        slug: `${slug}-${Date.now()}`,
        category: 'Crypto News',
        sentiment,
        imageUrl,
        published: true,
        authorId: 'telegram-bot', // Simple ID for Telegram posts
      },
    })

    console.log(`✅ Article created: ${article.title}`)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Telegram webhook error:', error)
    return NextResponse.json({ ok: true })
  }
}