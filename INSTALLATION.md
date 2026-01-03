# 📦 Installation Instructions

## Choose Your Installation Method

### 🚀 Method 1: Docker (Recommended for Beginners)

**Time Required:** 5 minutes

```powershell
# 1. Clone the repository
git clone <your-repo-url>
cd instagram-followers-tracker

# 2. Create environment file
Copy-Item .env.example .env
notepad .env  # Add your Instagram credentials

# 3. Start all services
docker-compose up -d

# 4. Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

---

### 🛠️ Method 2: Manual Installation (For Development)

**Time Required:** 10-15 minutes

#### Prerequisites
```powershell
# Check if Node.js is installed
node --version  # Should be 20.0.0 or higher

# Check if PostgreSQL is installed
psql --version  # Should be 15 or higher

# Check if Redis is installed
redis-cli --version  # Should be 7 or higher
```

#### Step 1: Install Prerequisites

**Node.js 20+**
```powershell
# Download from https://nodejs.org/
# Or use winget
winget install OpenJS.NodeJS.LTS
```

**PostgreSQL 15+**
```powershell
# Download from https://www.postgresql.org/download/windows/
# Or use winget
winget install PostgreSQL.PostgreSQL

# After installation, create database
psql -U postgres
CREATE DATABASE instagram_tracker;
\q
```

**Redis 7+**
```powershell
# Download from https://redis.io/download
# Or use Windows Subsystem for Linux (WSL)
# Or use Docker for Redis only:
docker run -d -p 6379:6379 redis:7-alpine
```

#### Step 2: Backend Setup

```powershell
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
Copy-Item .env.example .env

# Edit .env with your configuration
notepad .env

# Required variables:
# DATABASE_URL=postgresql://postgres:password@localhost:5432/instagram_tracker
# INSTAGRAM_CLIENT_ID=your_instagram_client_id
# INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret
# JWT_SECRET=generate_a_random_32_char_string
# ENCRYPTION_KEY=generate_a_random_32_char_string

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start backend server
npm run dev
```

Backend will be available at: **http://localhost:5000**

#### Step 3: Frontend Setup

```powershell
# Open new PowerShell terminal
cd frontend

# Install dependencies
npm install

# Create .env.local file
Copy-Item .env.example .env.local

# Edit .env.local
notepad .env.local

# Required variables:
# NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
# NEXT_PUBLIC_APP_URL=http://localhost:3000
# NEXT_PUBLIC_INSTAGRAM_CLIENT_ID=your_instagram_client_id

# Start frontend server
npm run dev
```

Frontend will be available at: **http://localhost:3000**

---

## 🔑 Instagram OAuth Setup

1. **Go to Facebook Developers**
   - Visit: https://developers.facebook.com/

2. **Create New App**
   - Click "Create App"
   - Choose "Consumer" as app type
   - Fill in app details

3. **Add Instagram Basic Display**
   - In app dashboard, click "Add Product"
   - Find "Instagram Basic Display" and click "Set Up"

4. **Create Instagram App**
   - Fill in required fields
   - Display Name: "Instagram Tracker"
   - Valid OAuth Redirect URIs:
     ```
     http://localhost:5000/api/v1/auth/instagram/callback
     https://your-production-domain.com/api/v1/auth/instagram/callback
     ```
   - Deauthorize Callback URL: `http://localhost:5000/api/v1/auth/deauthorize`
   - Data Deletion Request URL: `http://localhost:5000/api/v1/auth/data-deletion`

5. **Get Credentials**
   - Copy "Instagram App ID" → This is your `INSTAGRAM_CLIENT_ID`
   - Copy "Instagram App Secret" → This is your `INSTAGRAM_CLIENT_SECRET`

6. **Add Test User (for development)**
   - Go to "Roles" → "Instagram Testers"
   - Add your Instagram account
   - Accept invitation on Instagram app

---

## 🔐 Generate Secure Secrets

### For Windows (PowerShell)

```powershell
# Generate JWT Secret
$JWT_SECRET = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
Write-Host "JWT_SECRET=$JWT_SECRET"

# Generate Encryption Key
$ENCRYPTION_KEY = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
Write-Host "ENCRYPTION_KEY=$ENCRYPTION_KEY"
```

### Alternative (Online Tool)
- Visit: https://randomkeygen.com/
- Use "CodeIgniter Encryption Keys" (256-bit)

---

## ✅ Verify Installation

### Test Backend

```powershell
# Test health endpoint
curl http://localhost:5000/health

# Expected response:
# {
#   "status": "healthy",
#   "timestamp": "2026-01-03T...",
#   "uptime": 123.456
# }
```

### Test Frontend

1. Open browser: http://localhost:3000
2. You should see the landing page
3. Click "Connect Instagram"
4. Should redirect to Instagram OAuth

### Test Database

```powershell
cd backend
npx prisma studio
# Opens database GUI at http://localhost:5555
```

---

## 🐛 Troubleshooting

### Port Already in Use

**Problem:** Port 5000 or 3000 is already in use

```powershell
# Find process using port
netstat -ano | findstr :5000

# Kill the process (replace <PID> with actual PID)
taskkill /PID <PID> /F
```

### Database Connection Error

**Problem:** Can't connect to PostgreSQL

```powershell
# Check if PostgreSQL is running
Get-Service -Name postgresql*

# If not running, start it
Start-Service postgresql-x64-15

# Test connection
psql -U postgres -d instagram_tracker
```

### Redis Connection Error

**Problem:** Can't connect to Redis

```powershell
# If using Docker for Redis
docker ps  # Check if Redis container is running

# If not running, start it
docker run -d -p 6379:6379 redis:7-alpine

# Test connection
redis-cli ping
# Should respond: PONG
```

### Module Not Found Error

**Problem:** Module not found after npm install

```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Reinstall
npm install
```

### Prisma Migration Error

**Problem:** Database migration fails

```powershell
# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Run migrations again
npx prisma migrate dev
```

---

## 📋 Post-Installation Checklist

After installation, verify:

- [ ] Backend server is running (http://localhost:5000/health)
- [ ] Frontend server is running (http://localhost:3000)
- [ ] PostgreSQL database is accessible
- [ ] Redis is running
- [ ] Instagram OAuth credentials are configured
- [ ] Can navigate to landing page
- [ ] "Connect Instagram" button works
- [ ] No console errors in browser

---

## 🎯 Next Steps

1. **Test the OAuth Flow**
   - Click "Connect Instagram"
   - Login with Instagram test account
   - Should redirect back with success

2. **View Dashboard**
   - After OAuth success, you should see dashboard
   - Try syncing followers

3. **Explore Features**
   - Check followers list
   - View analytics
   - Test AI features (if OpenAI key is configured)

4. **Customize**
   - Update branding and colors
   - Add custom features
   - Configure notifications

5. **Deploy**
   - Follow [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment

---

## 📚 Additional Resources

- **Quick Start Guide:** [GETTING_STARTED.md](GETTING_STARTED.md)
- **Architecture:** [ARCHITECTURE.md](ARCHITECTURE.md)
- **Deployment:** [DEPLOYMENT.md](DEPLOYMENT.md)
- **Mobile App:** [MOBILE_CONVERSION.md](MOBILE_CONVERSION.md)
- **Project Summary:** [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

---

## 💬 Need Help?

- Check [Troubleshooting](#troubleshooting) section above
- Review console logs for errors
- Check `.env` configuration
- Verify all services are running
- Open an issue on GitHub

---

## 🎉 Success!

If you can see the landing page and click through to Instagram OAuth, your installation is successful!

**Next:** Read [GETTING_STARTED.md](GETTING_STARTED.md) for usage guide.

---

**Estimated Total Installation Time:**
- Docker: 5 minutes
- Manual: 15 minutes
- With troubleshooting: 30 minutes max

**You're ready to start tracking Instagram followers!** 🚀
