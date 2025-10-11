# WabbleNews - Crypto News Website

A modern crypto news website with real-time price tracking, AI sentiment analysis, and Telegram integration.

## Features

- 📰 Real-time crypto news articles
- 📊 Live cryptocurrency price ticker (top 30 coins)
- 🤖 AI-powered sentiment analysis
- 📱 Telegram bot integration for auto-posting
- 🔐 User authentication (username/password + OAuth)
- 💬 Comment system (coming soon)
- 🎨 Modern dark theme with glass-morphism effects
- ⚡ Built with Next.js 14, TypeScript, Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite (development), PostgreSQL (production)
- **Authentication**: bcryptjs, OAuth (Google, Telegram)
- **APIs**: CoinGecko (crypto prices), OpenAI (sentiment analysis), Telegram Bot API
- **Deployment**: Vercel-ready

## Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run database migrations: `npx prisma db push`
5. Start development server: `npm run dev`

## Environment Variables

Create a `.env.local` file with:

```env
DATABASE_URL="file:./dev.db"
TELEGRAM_BOT_TOKEN="your-telegram-bot-token"
OPENAI_API_KEY="your-openai-api-key"
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Telegram Bot Setup

1. Create a bot with @BotFather on Telegram
2. Add bot token to environment variables
3. Set webhook: `https://api.telegram.org/bot<TOKEN>/setWebhook?url=<YOUR_DOMAIN>/api/telegram-webhook`
4. Add bot as admin to your channel with "View Messages" permission
5. Post in channel - articles will appear automatically!

## Deployment

This project is optimized for Vercel deployment:

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy!

## License

MIT License
