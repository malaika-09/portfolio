# Database Setup Guide - Neon PostgreSQL

## Why Database?

Vercel's serverless environment doesn't support persistent file storage. To save admin panel changes permanently, we need a database.

## Setup Steps

### 1. Create Neon Database (Free Tier)

1. Go to: **https://console.neon.tech**
2. Click "Sign Up" (use GitHub/Google)
3. Create a new project:
   - Name: `robotics-portfolio`
   - Region: Choose closest to you
   - Postgres version: Latest (16)
4. Copy the **Connection String**

### 2. Initialize Database Schema

1. Go to Neon Console → SQL Editor
2. Copy content from `lib/db/schema.sql`
3. Paste and Run

Or use this command locally:
```bash
# Install psql (PostgreSQL client)
# Then run:
psql "YOUR_DATABASE_URL" < lib/db/schema.sql
```

### 3. Add Database URL to Vercel

1. Go to Vercel Dashboard
2. Your Project → Settings → Environment Variables
3. Add new variable:
   - Name: `DATABASE_URL`
   - Value: `postgres://...` (your Neon connection string)
   - Environment: Production, Preview, Development
4. Click "Save"

### 4. Redeploy

```bash
npx vercel --prod
```

## Verify Setup

1. Open Admin Panel: `https://your-site.vercel.app/admin/login`
2. Go to About & Profile
3. Upload image and edit text
4. Click "Save Changes"
5. Refresh page → Changes should persist! ✅

## Connection String Format

```
postgres://username:password@host/database?sslmode=require
```

Example:
```
postgres://neondb_owner:AbC123XyZ@ep-cool-cloud-123456.us-east-1.aws.neon.tech/neondb?sslmode=require
```

## Free Tier Limits

- **Storage:** 0.5 GB
- **Compute:** 191 hours/month
- **Projects:** 10
- **Branches:** Unlimited

**This is MORE than enough for a portfolio website!**

## Troubleshooting

### "DATABASE_URL not found"
- Check environment variable is set in Vercel
- Redeploy after adding variable

### "Connection failed"
- Verify connection string is correct
- Check Neon project is not suspended

### "Table does not exist"
- Run schema.sql to create tables

## Alternative: Manual Setup

If automated setup doesn't work, contact me and I'll help you set it up manually.

## Need Help?

Contact: javaidm267@gmail.com
