# WabbleNews Environment Variables

## Required for Netlify Deployment:

### Database (PostgreSQL)
```
DATABASE_URL=postgresql://username:password@host:port/database
```

### Admin Account
```
ADMIN_EMAIL=admin@wabblenews.com
ADMIN_PASSWORD=Admin123!@#
```

### Telegram Bot
```
TELEGRAM_BOT_TOKEN=8272262876:AAF4fhV702eceigviWwsxNPXMWOngLHCPMw
```

### OpenAI (Optional)
```
OPENAI_API_KEY=your-openai-api-key
```

### App URL
```
NEXT_PUBLIC_APP_URL=https://your-netlify-domain.netlify.app
```

## How to Set Up:

1. **Get PostgreSQL Database:**
   - Use Neon (free): https://neon.tech
   - Use Supabase (free): https://supabase.com
   - Use Railway (free): https://railway.app

2. **Set Environment Variables in Netlify:**
   - Go to Site Settings → Environment Variables
   - Add all the variables above

3. **Deploy:**
   - Connect your GitHub repo to Netlify
   - Deploy will work automatically!
