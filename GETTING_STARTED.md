# 🚀 Quick Start Guide - Instagram Followers Tracker

## 📋 Prerequisites

Ensure you have the following installed:
- Node.js 20+ ([Download](https://nodejs.org/))
- PostgreSQL 15+ ([Download](https://www.postgresql.org/download/))
- Redis 7+ ([Download](https://redis.io/download))
- Git ([Download](https://git-scm.com/downloads))

---

## 🎯 Getting Started (5 Minutes)

### Step 1: Clone the Repository

```powershell
git clone https://github.com/yourusername/instagram-followers-tracker.git
cd instagram-followers-tracker
```

### Step 2: Setup Instagram OAuth

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add "Instagram Basic Display" product
4. Add OAuth Redirect URI: `http://localhost:5000/api/v1/auth/instagram/callback`
5. Copy your **Client ID** and **Client Secret**

### Step 3: Backend Setup

```powershell
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your credentials
# Required: DATABASE_URL, INSTAGRAM_CLIENT_ID, INSTAGRAM_CLIENT_SECRET, JWT_SECRET, ENCRYPTION_KEY
notepad .env

# Run database migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate

# Start backend server
npm run dev
```

Backend will run on: **http://localhost:5000**

### Step 4: Frontend Setup

```powershell
# Open new terminal
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local
notepad .env.local

# Start frontend
npm run dev
```

Frontend will run on: **http://localhost:3000**

### Step 5: Access the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/health

---

## 🐳 Quick Start with Docker (Easiest)

```powershell
# Create .env file in root directory
cp .env.example .env

# Edit with your Instagram credentials
notepad .env

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

Services:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- PostgreSQL: localhost:5432
- Redis: localhost:6379

---

## 🔑 Environment Variables Quick Reference

### Backend (.env)

```bash
# Required
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/instagram_tracker
INSTAGRAM_CLIENT_ID=your_client_id_here
INSTAGRAM_CLIENT_SECRET=your_client_secret_here
JWT_SECRET=your_random_secret_key_min_32_chars
ENCRYPTION_KEY=your_32_character_encryption_key

# Optional
OPENAI_API_KEY=your_openai_key_for_ai_features
```

### Frontend (.env.local)

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_INSTAGRAM_CLIENT_ID=your_client_id_here
```

---

## 📦 Project Structure

```
instagram-followers-tracker/
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # App routes
│   │   ├── components/    # React components
│   │   ├── lib/           # Utilities
│   │   └── styles/        # Global styles
│   └── package.json
│
├── backend/               # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Express middleware
│   │   └── utils/         # Helper functions
│   ├── prisma/           # Database schema
│   └── package.json
│
├── docker-compose.yml     # Docker configuration
├── ARCHITECTURE.md        # System architecture
├── DEPLOYMENT.md          # Deployment guide
└── README.md             # Main documentation
```

---

## 🧪 Testing

### Backend Tests
```powershell
cd backend
npm test
npm run test:coverage
```

### Frontend Tests
```powershell
cd frontend
npm test
npm run test:e2e
```

---

## 🛠️ Common Commands

### Backend
```powershell
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run linter
npx prisma studio    # Open database GUI
npx prisma migrate dev --name init  # Create migration
```

### Frontend
```powershell
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run linter
```

---

## 🐛 Troubleshooting

### Database Connection Error
```powershell
# Check if PostgreSQL is running
# On Windows: Check Services

# Test connection
psql -U postgres -d instagram_tracker
```

### Port Already in Use
```powershell
# Find process using port
netstat -ano | findstr :5000

# Kill process (replace PID)
taskkill /PID <PID> /F
```

### Redis Connection Error
```powershell
# Check if Redis is running
# On Windows: Check Services or run redis-server.exe
```

### Prisma Migration Error
```powershell
# Reset database
npx prisma migrate reset

# Re-run migrations
npx prisma migrate dev
```

---

## 📚 API Documentation

### Authentication
```bash
# Get Instagram OAuth URL
GET /api/v1/auth/instagram/oauth

# OAuth Callback
GET /api/v1/auth/instagram/callback?code=xxx

# Get Current User
GET /api/v1/auth/me
Authorization: Bearer {token}
```

### Followers
```bash
# Get All Followers
GET /api/v1/followers?page=1&limit=20
Authorization: Bearer {token}

# Sync Followers
POST /api/v1/followers/sync
Authorization: Bearer {token}

# Get Unfollowers
GET /api/v1/followers/lost?days=7
Authorization: Bearer {token}
```

### Analytics
```bash
# Get Overview
GET /api/v1/analytics/overview
Authorization: Bearer {token}

# Get Growth Trends
GET /api/v1/analytics/growth?period=30d
Authorization: Bearer {token}
```

---

## 🎨 Features Overview

### ✅ Implemented Features
- Instagram OAuth Authentication
- Followers tracking and management
- Unfollowers detection
- Analytics dashboard
- Growth trends visualization
- REST API with JWT authentication
- PostgreSQL database with Prisma
- Redis caching
- Rate limiting and security
- Error handling and logging

### 🚧 Coming Soon
- AI-powered caption generation
- Advanced hashtag suggestions
- Story analytics
- Post scheduling
- Mobile app (React Native)
- Real-time notifications
- Team collaboration

---

## 🔐 Security Best Practices

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Use strong secrets** - Generate with `openssl rand -base64 32`
3. **Enable HTTPS in production** - Use SSL certificates
4. **Keep dependencies updated** - Run `npm audit fix`
5. **Rotate secrets regularly** - Update JWT and encryption keys
6. **Monitor logs** - Check for suspicious activity

---

## 📊 Performance Tips

1. **Enable Redis caching** - Significantly reduces API response time
2. **Use database indexes** - Already configured in Prisma schema
3. **Optimize images** - Next.js Image component handles this
4. **Enable compression** - Gzip/Brotli enabled by default
5. **Monitor with tools** - Use PM2, New Relic, or Datadog

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support & Resources

- **Documentation:** [ARCHITECTURE.md](ARCHITECTURE.md)
- **Deployment Guide:** [DEPLOYMENT.md](DEPLOYMENT.md)
- **Mobile Conversion:** [MOBILE_CONVERSION.md](MOBILE_CONVERSION.md)
- **API Reference:** http://localhost:5000/health
- **Issues:** GitHub Issues
- **Discussions:** GitHub Discussions

---

## 🎓 Learning Resources

### Recommended Reading
- [Instagram Basic Display API](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)

### Video Tutorials
- Next.js App Router
- Prisma ORM Basics
- Instagram API Integration
- Docker & Docker Compose

---

## ✨ What's Next?

### Phase 1: Test the Application
1. ✅ Start both frontend and backend
2. ✅ Click "Connect Instagram" button
3. ✅ Complete OAuth flow
4. ✅ View your dashboard
5. ✅ Sync your followers

### Phase 2: Customize
1. Update branding and colors
2. Add custom analytics
3. Implement additional features
4. Configure notifications

### Phase 3: Deploy
1. Follow [DEPLOYMENT.md](DEPLOYMENT.md)
2. Set up production database
3. Configure domain and SSL
4. Monitor and scale

---

## 🌟 Success Metrics

Once deployed, track these KPIs:
- **Daily Active Users (DAU)**
- **API Response Times**
- **Error Rate**
- **User Retention**
- **Feature Adoption**

---

## 🏆 Built With

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend:** Node.js 20, Express, TypeScript, Prisma
- **Database:** PostgreSQL 15
- **Cache:** Redis 7
- **Auth:** JWT, Instagram OAuth
- **Deployment:** Docker, Vercel, Railway

---

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Instagram API Team
- Next.js Team
- Prisma Team
- Open Source Community

---

**Ready to Build? Let's Go! 🚀**

```powershell
# Quick start command
cd instagram-followers-tracker && docker-compose up -d
```

Visit http://localhost:3000 and start tracking! 📊

---

**Questions?** Open an issue or discussion on GitHub.

**Found a bug?** Please report it with detailed steps to reproduce.

**Want to contribute?** Pull requests are always welcome!

---

Made with ❤️ by developers, for developers.
