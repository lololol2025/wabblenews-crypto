import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test webhook info
    const webhookResponse = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getWebhookInfo`
    )
    const webhookData = await webhookResponse.json()
    
    // Test bot info
    const botResponse = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getMe`
    )
    const botData = await botResponse.json()
    
    // Test environment variables
    const envCheck = {
      DATABASE_URL: process.env.DATABASE_URL ? '✅ Set' : '❌ Missing',
      TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN ? '✅ Set' : '❌ Missing',
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ? '✅ Set' : '❌ Missing',
    }

    // Test database connection
    let dbStatus = '❌ Not tested'
    let articleCount = 0
    try {
      const { PrismaClient } = await import('@prisma/client')
      const prisma = new PrismaClient()
      await prisma.$connect()
      articleCount = await prisma.article.count()
      dbStatus = `✅ Connected (${articleCount} articles)`
      await prisma.$disconnect()
    } catch (error) {
      dbStatus = `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }

    return NextResponse.json({
      message: 'WabbleNews Debug Status',
      environment: envCheck,
      database: dbStatus,
      telegram: {
        bot: botData,
        webhook: webhookData,
      },
      timestamp: new Date().toISOString(),
    }, { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Status check failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}
