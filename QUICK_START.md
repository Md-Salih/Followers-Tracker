# 🚀 Quick Setup Guide

Choose your preferred setup method:

## Method 1: Automated Setup (Recommended)

Run the interactive setup script that will guide you through everything:

```powershell
.\setup.ps1
```

This script will:
- ✅ Check your Node.js installation
- ✅ Help you set up database (Supabase or local)
- ✅ Help you set up Redis (Upstash or skip)
- ✅ Get Instagram OAuth credentials
- ✅ Generate secure encryption keys
- ✅ Create .env files
- ✅ Install dependencies
- ✅ Setup database

**Then just start the servers!**

## Method 2: Cloud Setup (No Local Database)

See [CLOUD_SETUP.md](CLOUD_SETUP.md) for detailed instructions using:
- **Supabase** (Free PostgreSQL)
- **Upstash** (Free Redis)

## Method 3: Manual Setup

See [INSTALLATION.md](INSTALLATION.md) for complete step-by-step instructions.

---

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ Node.js 20+ (You have v24.9.0 ✓)
- ✅ npm (You have v11.6.0 ✓)
- ⏳ Database: Supabase (free) OR PostgreSQL locally
- ⏳ Redis: Upstash (free) OR local Redis (optional)
- ⏳ Instagram Developer Account (free)

---

## 🎯 What You're Building

A **world-class Instagram Followers Tracker** with:

### Core Features (100% Free)
- 📊 Real-time follower tracking
- 🔍 Unfollow detection
- 👻 Ghost follower analysis
- 📈 Engagement metrics
- 📅 Historical analytics
- 🎨 Content planning tools
- 🤖 AI-powered suggestions

### Tech Stack
- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript, Prisma
- **Database:** PostgreSQL
- **Cache:** Redis
- **Auth:** Instagram OAuth 2.0

---

## 🏃 Quick Start

### Step 1: Get Free Services

#### Database (Choose one):
- **Option A:** [Supabase](https://supabase.com) - Free PostgreSQL ⭐
- **Option B:** [PostgreSQL Download](https://www.postgresql.org/download/) - Local install

#### Redis Cache (Choose one):
- **Option A:** [Upstash](https://upstash.com) - Free Redis ⭐
- **Option B:** Skip (optional feature)

#### Instagram OAuth:
- Go to [Facebook Developers](https://developers.facebook.com)
- Create App → Consumer
- Add Instagram Basic Display
- Get Client ID and Secret

### Step 2: Run Setup

```powershell
# Run automated setup
.\setup.ps1
```

### Step 3: Start Servers

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

### Step 4: Open App

Visit: **http://localhost:3000**

---

## 📚 Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - System design & API docs
- [CLOUD_SETUP.md](CLOUD_SETUP.md) - Cloud services setup
- [INSTALLATION.md](INSTALLATION.md) - Detailed installation
- [DEPLOYMENT.md](DEPLOYMENT.md) - Production deployment
- [GETTING_STARTED.md](GETTING_STARTED.md) - User guide
- [MOBILE_CONVERSION.md](MOBILE_CONVERSION.md) - React Native conversion

---

## 🆘 Troubleshooting

**Port already in use?**
```powershell
# Backend (5000)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Frontend (3000)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Database connection error?**
- Check DATABASE_URL in backend/.env
- Verify database is running
- Test connection: `npx prisma studio` in backend folder

**Instagram OAuth not working?**
- Verify redirect URI: http://localhost:5000/api/v1/auth/instagram/callback
- Check Client ID and Secret are correct
- Ensure app is in Development mode (allows test users)

---

## ✅ Success Checklist

- [ ] Database service running (Supabase or local)
- [ ] Redis service running (Upstash or local) - optional
- [ ] Instagram OAuth app created
- [ ] backend/.env file configured
- [ ] frontend/.env.local file configured
- [ ] Backend dependencies installed (npm install in backend)
- [ ] Frontend dependencies installed (npm install in frontend)
- [ ] Database migrations ran (npx prisma migrate deploy)
- [ ] Backend server running (localhost:5000)
- [ ] Frontend server running (localhost:3000)
- [ ] Can access http://localhost:3000

---

## 🎉 You're Done!

Your Instagram Followers Tracker is ready! Connect your Instagram account and start tracking!

**Next Steps:**
1. Open http://localhost:3000
2. Click "Connect Instagram"
3. Authorize the app
4. Start tracking your followers!

**Need Help?** Check the documentation files or open an issue.
