# 🚀 Quick Start - Cloud-Based Setup

Since Docker/PostgreSQL installation had issues, let's use **free cloud services** to get you running in 5 minutes!

## Step 1: Get Free PostgreSQL Database (Supabase)

1. **Go to:** https://supabase.com/
2. **Sign up** (free, no credit card required)
3. **Create new project:**
   - Project name: `instagram-tracker`
   - Database password: (create a strong password)
   - Region: Choose closest to you
4. **Get connection string:**
   - Go to Project Settings → Database
   - Copy the "Connection string" (URI format)
   - Example: `postgresql://postgres:password@db.xxx.supabase.co:5432/postgres`

## Step 2: Get Free Redis (Upstash)

1. **Go to:** https://upstash.com/
2. **Sign up** (free, no credit card required)
3. **Create Redis database:**
   - Name: `instagram-tracker`
   - Region: Choose closest to you
4. **Get connection string:**
   - Copy the "Connection String"
   - Example: `redis://default:password@xxx.upstash.io:6379`

## Step 3: Setup Backend

Open PowerShell in project root and run:

```powershell
# Navigate to backend
cd backend

# Install dependencies (if not already done)
npm install

# Create .env file
@"
NODE_ENV=development
PORT=5000

# Database (from Supabase)
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxx.supabase.co:5432/postgres

# Redis (from Upstash)
REDIS_URL=redis://default:YOUR_PASSWORD@xxx.upstash.io:6379

# Instagram OAuth (Get from Facebook Developers)
INSTAGRAM_CLIENT_ID=your_instagram_client_id
INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret
INSTAGRAM_REDIRECT_URI=http://localhost:5000/api/v1/auth/instagram/callback

# JWT (Generate random 32+ character strings)
JWT_SECRET=your_super_secret_jwt_key_change_this_32_chars_min
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_secret_key_32_chars_min
JWT_REFRESH_EXPIRES_IN=60d

# Encryption (Generate random 32 character string)
ENCRYPTION_KEY=your_32_character_encryption_key

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Session
SESSION_SECRET=your_session_secret_32_chars_min
"@ | Out-File -FilePath .env -Encoding utf8

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Start backend
npm run dev
```

## Step 4: Setup Frontend (in new terminal)

```powershell
# Navigate to frontend
cd frontend

# Install dependencies (if not already done)
npm install

# Create .env.local file
@"
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_INSTAGRAM_CLIENT_ID=your_instagram_client_id
"@ | Out-File -FilePath .env.local -Encoding utf8

# Start frontend
npm run dev
```

## Step 5: Get Instagram OAuth Credentials

1. **Go to:** https://developers.facebook.com/
2. **Create App** → Consumer
3. **Add Product** → Instagram Basic Display
4. **Configure:**
   - OAuth Redirect URI: `http://localhost:5000/api/v1/auth/instagram/callback`
5. **Copy:**
   - Instagram App ID → This is your `INSTAGRAM_CLIENT_ID`
   - Instagram App Secret → This is your `INSTAGRAM_CLIENT_SECRET`
6. **Update both .env files** with these credentials

## Step 6: Access Your App

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/health
- **Database GUI:** Run `npx prisma studio` in backend folder

## 🎯 Checklist

- [ ] Created Supabase account and got DATABASE_URL
- [ ] Created Upstash account and got REDIS_URL
- [ ] Created Instagram app and got OAuth credentials
- [ ] Updated backend/.env with all credentials
- [ ] Updated frontend/.env.local with credentials
- [ ] Ran `npx prisma generate` in backend
- [ ] Ran `npx prisma migrate deploy` in backend
- [ ] Started backend with `npm run dev`
- [ ] Started frontend with `npm run dev`
- [ ] Can access http://localhost:3000

## ✅ You're Done!

Your entire Instagram Followers Tracker platform is now running with:
- ✅ Cloud PostgreSQL database (Supabase - free tier)
- ✅ Cloud Redis cache (Upstash - free tier)
- ✅ Backend API server (local)
- ✅ Frontend web app (local)
- ✅ Instagram OAuth integration

**Next:** Click "Connect Instagram" on http://localhost:3000 and start tracking!

---

**Pro Tip:** Both Supabase and Upstash have generous free tiers that will work perfectly for development and even small-scale production use!
