# WabbleNews - Telegram Setup Guide

## 🚀 STEP-BY-STEP SETUP FOR YOUR CHANNEL @sfsfdfssdf

### **STEP 1: CREATE DATABASE TABLES IN NEON**

1. Go to Neon Tech SQL Editor
2. Run this SQL command:

```sql
-- Create Article table
CREATE TABLE IF NOT EXISTS "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "sentiment" TEXT,
    "imageUrl" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- Create unique index
CREATE UNIQUE INDEX IF NOT EXISTS "Article_slug_key" ON "Article"("slug");
```

### **STEP 2: SET UP TELEGRAM WEBHOOK**

Visit this URL in your browser:
```
https://api.telegram.org/bot8272262876:AAF4fhV702eceigviWwsxNPXMWOngLHCPMw/setWebhook?url=https://symphonious-gingersnap-89f461.netlify.app/api/telegram-webhook
```

You should see: `{"ok":true,"result":true,"description":"Webhook was set"}`

### **STEP 3: MAKE BOT ADMIN IN YOUR CHANNEL**

1. Open your channel @sfsfdfssdf
2. Go to channel settings
3. Click "Administrators"
4. Add your bot
5. Give it "Post Messages" permission

### **STEP 4: TEST IT**

Post a message in @sfsfdfssdf and check your website!

### **STEP 5: CHECK WEBHOOK STATUS**

Visit: `https://api.telegram.org/bot8272262876:AAF4fhV702eceigviWwsxNPXMWOngLHCPMw/getWebhookInfo`

## ✅ DONE!

Your bot will now automatically post messages from @sfsfdfssdf to your website!

