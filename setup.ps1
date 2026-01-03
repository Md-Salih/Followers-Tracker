# Instagram Followers Tracker - Setup Script
# Run this script step by step to set up the entire project

Write-Host "🚀 Instagram Followers Tracker - Setup Guide" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "✓ Checking Node.js installation..." -ForegroundColor Green
$nodeVersion = node --version
Write-Host "  Node.js version: $nodeVersion" -ForegroundColor White
Write-Host ""

# Step 1: Database Setup
Write-Host "STEP 1: Database Setup (Choose one option)" -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Yellow
Write-Host ""
Write-Host "Option A - Use Supabase (Recommended - Free Cloud)" -ForegroundColor Cyan
Write-Host "  1. Go to https://supabase.com/" -ForegroundColor White
Write-Host "  2. Sign up (free, no credit card)" -ForegroundColor White
Write-Host "  3. Create project 'instagram-tracker'" -ForegroundColor White
Write-Host "  4. Get connection string from Settings → Database" -ForegroundColor White
Write-Host ""
Write-Host "Option B - Use local PostgreSQL" -ForegroundColor Cyan
Write-Host "  1. Download: https://www.postgresql.org/download/windows/" -ForegroundColor White
Write-Host "  2. Install (remember password!)" -ForegroundColor White
Write-Host "  3. Connection string: postgresql://postgres:password@localhost:5432/instagram_tracker" -ForegroundColor White
Write-Host ""

$database = Read-Host "Enter your DATABASE_URL"
Write-Host ""

# Step 2: Redis Setup
Write-Host "STEP 2: Redis Setup (Choose one option)" -ForegroundColor Yellow
Write-Host "=======================================" -ForegroundColor Yellow
Write-Host ""
Write-Host "Option A - Use Upstash (Recommended - Free Cloud)" -ForegroundColor Cyan
Write-Host "  1. Go to https://upstash.com/" -ForegroundColor White
Write-Host "  2. Sign up (free, no credit card)" -ForegroundColor White
Write-Host "  3. Create database 'instagram-tracker'" -ForegroundColor White
Write-Host "  4. Copy connection string" -ForegroundColor White
Write-Host ""
Write-Host "Option B - Skip Redis (Optional)" -ForegroundColor Cyan
Write-Host "  Leave blank to skip (app will work without caching)" -ForegroundColor White
Write-Host ""

$redis = Read-Host "Enter your REDIS_URL (or press Enter to skip)"
if ([string]::IsNullOrWhiteSpace($redis)) {
    $redis = ""
    Write-Host "  ⚠ Skipping Redis (caching disabled)" -ForegroundColor Yellow
}
Write-Host ""

# Step 3: Instagram OAuth
Write-Host "STEP 3: Instagram OAuth Credentials" -ForegroundColor Yellow
Write-Host "===================================" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Go to https://developers.facebook.com/" -ForegroundColor White
Write-Host "2. Create App → Consumer" -ForegroundColor White
Write-Host "3. Add Product → Instagram Basic Display" -ForegroundColor White
Write-Host "4. OAuth Redirect URI: http://localhost:5000/api/v1/auth/instagram/callback" -ForegroundColor White
Write-Host "5. Copy Instagram App ID and Secret" -ForegroundColor White
Write-Host ""

$instagramClientId = Read-Host "Enter INSTAGRAM_CLIENT_ID"
$instagramClientSecret = Read-Host "Enter INSTAGRAM_CLIENT_SECRET"
Write-Host ""

# Generate secure secrets
Write-Host "Generating secure encryption keys..." -ForegroundColor Green
$jwtSecret = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 48 | ForEach-Object {[char]$_})
$jwtRefreshSecret = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 48 | ForEach-Object {[char]$_})
$encryptionKey = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
$sessionSecret = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 48 | ForEach-Object {[char]$_})
Write-Host ""

# Create backend .env file
Write-Host "Creating backend/.env file..." -ForegroundColor Green
$backendEnv = @"
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=$database

# Redis
REDIS_URL=$redis

# Instagram OAuth
INSTAGRAM_CLIENT_ID=$instagramClientId
INSTAGRAM_CLIENT_SECRET=$instagramClientSecret
INSTAGRAM_REDIRECT_URI=http://localhost:5000/api/v1/auth/instagram/callback

# JWT
JWT_SECRET=$jwtSecret
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=$jwtRefreshSecret
JWT_REFRESH_EXPIRES_IN=60d

# Encryption
ENCRYPTION_KEY=$encryptionKey

# Frontend
FRONTEND_URL=http://localhost:3000

# Session
SESSION_SECRET=$sessionSecret
"@

$backendEnv | Out-File -FilePath "backend\.env" -Encoding utf8
Write-Host "✓ backend/.env created" -ForegroundColor Green
Write-Host ""

# Create frontend .env.local file
Write-Host "Creating frontend/.env.local file..." -ForegroundColor Green
$frontendEnv = @"
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_INSTAGRAM_CLIENT_ID=$instagramClientId
"@

$frontendEnv | Out-File -FilePath "frontend\.env.local" -Encoding utf8
Write-Host "✓ frontend/.env.local created" -ForegroundColor Green
Write-Host ""

# Install dependencies
Write-Host "STEP 4: Installing Dependencies" -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Yellow
Write-Host ""

Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
Set-Location backend
if (-not (Test-Path "node_modules")) {
    npm install
} else {
    Write-Host "  ✓ Already installed" -ForegroundColor Green
}
Write-Host ""

Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
Set-Location ..\frontend
if (-not (Test-Path "node_modules")) {
    npm install
} else {
    Write-Host "  ✓ Already installed" -ForegroundColor Green
}
Set-Location ..
Write-Host ""

# Setup database
Write-Host "STEP 5: Database Setup" -ForegroundColor Yellow
Write-Host "======================" -ForegroundColor Yellow
Write-Host ""

Set-Location backend
Write-Host "Generating Prisma Client..." -ForegroundColor Cyan
npx prisma generate
Write-Host ""

Write-Host "Running database migrations..." -ForegroundColor Cyan
npx prisma migrate deploy
Write-Host ""

Set-Location ..

# Final instructions
Write-Host "=============================================" -ForegroundColor Green
Write-Host "✓ SETUP COMPLETE!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host ""
Write-Host "To start your app:" -ForegroundColor Cyan
Write-Host ""
Write-Host "Terminal 1 (Backend):" -ForegroundColor Yellow
Write-Host "  cd backend" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 2 (Frontend):" -ForegroundColor Yellow
Write-Host "  cd frontend" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Then open: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "View database: npx prisma studio (in backend folder)" -ForegroundColor Gray
Write-Host ""
