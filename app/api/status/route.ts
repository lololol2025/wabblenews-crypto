import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test environment variables
    const envCheck = {
      DATABASE_URL: process.env.DATABASE_URL ? '✅ Set' : '❌ Missing',
      TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN ? '✅ Set' : '❌ Missing',
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ? '✅ Set' : '❌ Missing',
    }

    // Test database connection
    let dbStatus = '❌ Not tested'
    try {
      const { PrismaClient } = await import('@prisma/client')
      const prisma = new PrismaClient()
      await prisma.$connect()
      const articleCount = await prisma.article.count()
      dbStatus = `✅ Connected (${articleCount} articles)`
      await prisma.$disconnect()
    } catch (error) {
      dbStatus = `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }

    return NextResponse.json({
      message: 'WabbleNews Status Check - SIMPLIFIED VERSION',
      environment: envCheck,
      database: dbStatus,
      timestamp: new Date().toISOString(),
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
