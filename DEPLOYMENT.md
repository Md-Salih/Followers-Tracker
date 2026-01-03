# 🚀 Deployment Guide - Instagram Followers Tracker

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Setup](#database-setup)
4. [Backend Deployment](#backend-deployment)
5. [Frontend Deployment](#frontend-deployment)
6. [Production Checklist](#production-checklist)

---

## Prerequisites

### Required Accounts
- **Instagram Developer Account** (for OAuth credentials)
- **Hosting Provider** (AWS, DigitalOcean, Railway, etc.)
- **PostgreSQL Database** (Managed or self-hosted)
- **Redis Instance** (Managed or self-hosted)
- **Domain Name** (optional but recommended)

### Required Tools
- Node.js 20+
- Docker & Docker Compose
- Git
- PostgreSQL Client

---

## Environment Setup

### 1. Instagram OAuth Configuration

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add "Instagram Basic Display" product
4. Configure OAuth redirect URIs:
   - Development: `http://localhost:5000/api/v1/auth/instagram/callback`
   - Production: `https://your-domain.com/api/v1/auth/instagram/callback`
5. Copy your Client ID and Client Secret

### 2. Backend Environment Variables

Create `backend/.env` file:

```bash
# Environment
NODE_ENV=production
PORT=5000

# Database
DATABASE_URL=postgresql://user:password@host:5432/instagram_tracker

# Redis
REDIS_URL=redis://host:6379
REDIS_PASSWORD=your_redis_password

# Instagram OAuth
INSTAGRAM_CLIENT_ID=your_client_id
INSTAGRAM_CLIENT_SECRET=your_client_secret
INSTAGRAM_REDIRECT_URI=https://your-domain.com/api/v1/auth/instagram/callback

# JWT (Generate secure random strings)
JWT_SECRET=your_very_secure_secret_key_here
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_secret_key_here
JWT_REFRESH_EXPIRES_IN=60d

# Encryption (32 character key)
ENCRYPTION_KEY=your_32_character_encryption_key_

# OpenAI (Optional)
OPENAI_API_KEY=your_openai_api_key

# Frontend URL
FRONTEND_URL=https://your-frontend-domain.com

# Session
SESSION_SECRET=your_session_secret
```

### 3. Frontend Environment Variables

Create `frontend/.env.local`:

```bash
NEXT_PUBLIC_API_URL=https://api.your-domain.com/api/v1
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_INSTAGRAM_CLIENT_ID=your_instagram_client_id
```

---

## Database Setup

### Option 1: Managed PostgreSQL (Recommended)

**Providers:**
- **Supabase** (Free tier available)
- **AWS RDS** (Scalable)
- **DigitalOcean Managed Databases** (Easy setup)
- **Neon** (Serverless)

**Setup Steps:**
1. Create a new PostgreSQL instance
2. Note the connection string
3. Update `DATABASE_URL` in backend `.env`
4. Run migrations (see below)

### Option 2: Docker PostgreSQL

```bash
docker run -d \
  --name postgres \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=instagram_tracker \
  -p 5432:5432 \
  postgres:15-alpine
```

### Run Database Migrations

```bash
cd backend
npm install
npx prisma migrate deploy
npx prisma generate
```

---

## Backend Deployment

### Option 1: Docker Deployment (Recommended)

1. **Build Docker Image:**
```bash
cd backend
docker build -t instagram-tracker-backend .
```

2. **Run Container:**
```bash
docker run -d \
  --name instagram-tracker-backend \
  -p 5000:5000 \
  --env-file .env \
  instagram-tracker-backend
```

3. **Using Docker Compose:**
```bash
# From project root
docker-compose up -d
```

### Option 2: Railway Deployment

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login and deploy:
```bash
cd backend
railway login
railway init
railway up
```

3. Add environment variables in Railway dashboard

### Option 3: DigitalOcean App Platform

1. Create a new app from GitHub repository
2. Select "backend" as the source directory
3. Choose "Dockerfile" as build method
4. Add environment variables
5. Deploy

### Option 4: AWS EC2

1. **Launch EC2 Instance:**
   - Ubuntu 22.04 LTS
   - t2.small or larger
   - Open ports: 22 (SSH), 5000 (API)

2. **SSH into instance:**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

3. **Install dependencies:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
```

4. **Clone and setup:**
```bash
git clone your-repo-url
cd instagram-followers-tracker/backend
npm install
npm run build
```

5. **Run with PM2:**
```bash
npm install -g pm2
pm2 start dist/server.js --name instagram-tracker
pm2 startup
pm2 save
```

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
cd frontend
vercel --prod
```

3. **Environment Variables:**
Add in Vercel dashboard:
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_INSTAGRAM_CLIENT_ID`

### Option 2: Netlify

1. **Build command:** `npm run build`
2. **Publish directory:** `.next`
3. Add environment variables in Netlify dashboard

### Option 3: Self-Hosted

```bash
cd frontend
npm install
npm run build
npm start # or use PM2
```

---

## Production Checklist

### Security
- [ ] All environment variables are set
- [ ] JWT secrets are random and secure (min 32 characters)
- [ ] Encryption key is 32 characters
- [ ] HTTPS is enabled (SSL certificate)
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled
- [ ] Database credentials are secure
- [ ] Instagram OAuth redirect URIs are whitelisted

### Database
- [ ] Database migrations are run
- [ ] Database is backed up regularly
- [ ] Connection pooling is configured
- [ ] Indexes are created
- [ ] Database is in production mode

### Performance
- [ ] Redis cache is configured
- [ ] CDN is set up for static assets
- [ ] Gzip/Brotli compression is enabled
- [ ] Images are optimized
- [ ] API responses are cached

### Monitoring
- [ ] Error tracking is set up (Sentry)
- [ ] Logging is configured
- [ ] Uptime monitoring is active
- [ ] Performance monitoring is enabled
- [ ] Database monitoring is set up

### Testing
- [ ] All API endpoints are tested
- [ ] Authentication flow works
- [ ] Instagram OAuth integration works
- [ ] Error handling is tested
- [ ] Load testing is performed

---

## Post-Deployment

### 1. Test Instagram OAuth Flow
```bash
curl https://your-api.com/api/v1/auth/instagram/oauth
```

### 2. Check Health Endpoint
```bash
curl https://your-api.com/health
```

### 3. Monitor Logs
```bash
# If using Docker
docker logs -f instagram-tracker-backend

# If using PM2
pm2 logs instagram-tracker
```

### 4. Setup Monitoring

**Uptime Monitoring:**
- UptimeRobot (free)
- Pingdom
- Better Uptime

**Error Tracking:**
- Sentry
- Rollbar
- BugSnag

---

## Scaling Strategies

### Horizontal Scaling
- Deploy multiple backend instances
- Use load balancer (Nginx, AWS ALB)
- Session storage in Redis (stateless design)

### Database Scaling
- Read replicas for analytics queries
- Connection pooling (PgBouncer)
- Partitioning for time-series data

### Caching Strategy
- Redis for API responses
- CDN for static assets
- Browser caching headers

---

## Backup Strategy

### Database Backups
```bash
# Automated daily backups
0 2 * * * pg_dump $DATABASE_URL > backup_$(date +\%Y\%m\%d).sql

# Backup to S3
aws s3 cp backup.sql s3://your-bucket/backups/
```

### Application Backups
- Git repository (source code)
- Docker images (versioned)
- Environment variables (secure vault)

---

## Troubleshooting

### Common Issues

**1. Database Connection Failed**
- Check DATABASE_URL format
- Verify database is running
- Check firewall rules

**2. Instagram OAuth Not Working**
- Verify redirect URIs match exactly
- Check client ID and secret
- Ensure HTTPS in production

**3. High Memory Usage**
- Check for memory leaks
- Increase instance size
- Optimize queries

**4. Slow API Responses**
- Enable Redis caching
- Optimize database queries
- Add database indexes
- Use CDN

---

## Support

For deployment issues:
- Check logs: `docker logs` or `pm2 logs`
- Review error messages
- Check environment variables
- Verify all services are running

---

**Last Updated:** January 2026
