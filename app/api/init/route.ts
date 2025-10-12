import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Simple endpoint to test database connection
export async function GET() {
  try {
    // Test database connection
    const articleCount = await prisma.article.count()
    
    return NextResponse.json({
      message: 'Database connected successfully!',
      articleCount,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json(
      { error: 'Database connection failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}




