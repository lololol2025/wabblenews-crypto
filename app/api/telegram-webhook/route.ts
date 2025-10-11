import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import OpenAI from 'openai'

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

interface TelegramMessage {
  message?: {
    text?: string
    photo?: any[]
    caption?: string
    chat?: {
      id: number
    }
  }
  channel_post?: {
    text?: string
    photo?: any[]
    caption?: string
    chat?: {
      id: number
    }
  }
}

// Analyze sentiment using AI
async function analyzeSentiment(text: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a crypto market sentiment analyzer. Analyze the following crypto news and respond with ONLY ONE of these exact words:
- "very bullish" - extremely positive news
- "bullish" - positive news
- "neutral" - neutral or informational news
- "bearish" - negative news
- "very bearish" - extremely negative news
- "no impact" - news with minimal market impact

Respond with nothing else, just one of these exact phrases.`
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: 0.3,
      max_tokens: 10,
    })

    const sentiment = response.choices[0]?.message?.content?.toLowerCase().trim() || 'neutral'
    
    // Map to our sentiment values
    if (sentiment.includes('very bullish')) return 'very-positive'
    if (sentiment.includes('bullish')) return 'positive'
    if (sentiment.includes('very bearish')) return 'very-negative'
    if (sentiment.includes('bearish')) return 'negative'
    if (sentiment.includes('no impact')) return 'neutral'
    
    return 'neutral'
  } catch (error) {
    console.error('Error analyzing sentiment:', error)
    return 'neutral'
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: TelegramMessage = await request.json()
    
    // Extract message data (works for both regular messages and channel posts)
    const message = body.message || body.channel_post
    
    if (!message) {
      // Silent return - no message to process
      return NextResponse.json({ ok: true })
    }

    // Get text content
    const text = message.text || message.caption || ''
    
    if (!text || text.length < 10) {
      // Silent return - text too short
      return NextResponse.json({ ok: true })
    }

    // Get admin user (first admin in database)
    const admin = await prisma.admin.findFirst()
    
    if (!admin) {
      // Silent fail - just log to console, no error response
      console.log('⚠️ No admin found in database')
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

    // Get image URL if photo exists (NO MESSAGE SENDING - just fetching)
    let imageUrl = null
    if (message.photo && message.photo.length > 0) {
      const photo = message.photo[message.photo.length - 1]
      // Only construct URL for display, DO NOT send any messages
      imageUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${photo.file_path}`
    }

    // Create article in database
    const article = await prisma.article.create({
      data: {
        title,
        content: text,
        slug: `${slug}-${Date.now()}`,
        category: 'Crypto News',
        sentiment,
        imageUrl,
        published: true,
        authorId: admin.id,
      },
    })

    // Log to server console only (NOT to Telegram)
    console.log('✅ Article created:', article.id, 'Sentiment:', sentiment)

    // Return success without sending any messages
    return NextResponse.json({ ok: true })
  } catch (error) {
    // Log error to console only, don't send messages
    console.error('❌ Webhook error:', error)
    return NextResponse.json({ ok: true })
  }
}

// GET endpoint to verify webhook is working
export async function GET() {
  return NextResponse.json({ 
    status: 'Telegram webhook is active',
    timestamp: new Date().toISOString()
  })
}




