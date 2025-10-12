import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: 'Webhook test endpoint is working!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    botTokenExists: !!process.env.TELEGRAM_BOT_TOKEN
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    return NextResponse.json({ 
      message: 'Test webhook received!',
      receivedData: body,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to parse JSON',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 400 })
  }
}
