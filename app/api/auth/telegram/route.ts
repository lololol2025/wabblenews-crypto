import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Telegram OAuth configuration
  const TELEGRAM_BOT_USERNAME = process.env.TELEGRAM_BOT_USERNAME
  const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/telegram/callback`
  
  if (!TELEGRAM_BOT_USERNAME) {
    return NextResponse.json({ error: 'Telegram OAuth not configured' }, { status: 500 })
  }

  const telegramAuthUrl = `https://oauth.telegram.org/auth?${new URLSearchParams({
    bot_id: process.env.TELEGRAM_BOT_ID || '',
    origin: process.env.NEXT_PUBLIC_APP_URL || '',
    request_access: 'write',
    return_to: REDIRECT_URI,
  })}`

  return NextResponse.redirect(telegramAuthUrl)
}

