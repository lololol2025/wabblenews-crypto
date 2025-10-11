# 🚀 DEPLOYMENT INSTRUCTIONS

## GitHub Setup (Manual)

Since GitHub CLI is not installed, please:

1. **Go to GitHub**: https://github.com/new
2. **Repository name**: `wabblenews-crypto`
3. **Description**: `WabbleNews - Modern crypto news website with Telegram integration and AI sentiment analysis`
4. **Make it Public**
5. **Don't initialize** with README (we already have one)
6. **Click "Create repository"**

## Push to GitHub

After creating the repository, run these commands:

```bash
git remote add origin https://github.com/YOUR_USERNAME/wabblenews-crypto.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Vercel Deployment

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with GitHub
3. **Click "New Project"**
4. **Import** your `wabblenews-crypto` repository
5. **Add Environment Variables**:
   - `DATABASE_URL` (Vercel will provide PostgreSQL URL)
   - `TELEGRAM_BOT_TOKEN` = `8272262876:AAF4fhV702eceigviWwsxNPXMWOngLHCPMw`
   - `OPENAI_API_KEY` = Your OpenAI API key
   - `NEXT_PUBLIC_APP_URL` = Your Vercel domain
6. **Deploy!**

## Telegram Bot Setup

After deployment:

1. **Set webhook** (replace YOUR_DOMAIN with your Vercel domain):
   ```
   https://api.telegram.org/bot8272262876:AAF4fhV702eceigviWwsxNPXMWOngLHCPMw/setWebhook?url=https://YOUR_DOMAIN.vercel.app/api/telegram-webhook
   ```

2. **Add bot as admin** to your Telegram channel
3. **Post in channel** - articles will appear automatically!

## Project Structure

```
wabblenews-crypto/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── social/            # Social media page
│   ├── signup/            # Signup page
│   └── article/[id]/      # Article pages
├── components/            # React components
├── lib/                   # Utility libraries
├── prisma/               # Database schema & migrations
├── public/               # Static assets
└── README.md             # This file
```

## Features Included

✅ Real-time crypto price ticker
✅ Telegram bot auto-posting
✅ AI sentiment analysis
✅ User authentication
✅ Modern dark UI
✅ Responsive design
✅ Vercel-ready deployment

## Support

If you need help with deployment, check the README.md file!
