# 🚀 Instagram Followers Tracker & Manager

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/typescript-%5E5.0.0-blue.svg)

**World-class Instagram analytics and management platform**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Documentation](#-documentation) • [API](#-api-documentation)

</div>

---

## 🌟 Overview

The **Instagram Followers Tracker & Manager** is a premium, free-to-use platform that provides advanced analytics, follower insights, and content management tools for Instagram users. Built with modern technologies and designed with a focus on performance, security, and user experience.

### ✨ Why Choose This Platform?

- **100% Free Core Features** - No paywalls for essential functionality
- **Legally Compliant** - OAuth-based authentication, no password storage
- **Blazing Fast** - Optimized for performance with caching and CDN
- **Premium UI/UX** - Modern glassmorphism design with smooth animations
- **Privacy First** - GDPR compliant with encrypted data storage
- **Scalable Architecture** - Built to handle millions of users
- **Mobile Ready** - Web-first with easy conversion to iOS/Android

---

## 🎯 Features

### 👥 Followers Management
- **Real-time Tracking** - Monitor followers gained and lost
- **Unfollowers Detection** - See who unfollowed you
- **Mutual Followers** - Find accounts you both follow
- **Ghost Followers** - Identify inactive followers
- **Engagement Ranking** - Sort by interaction levels
- **Growth Analytics** - Visualize follower trends over time

### 📊 Advanced Analytics
- **Dashboard Overview** - Key metrics at a glance
- **Growth Trends** - Daily, weekly, monthly charts
- **Engagement Heatmap** - Best times to post
- **Content Performance** - Track post and story insights
- **Demographic Insights** - Understand your audience
- **Competitor Analysis** - Compare with similar accounts

### 🖼️ Content Management
- **Story Viewer** - View stories anonymously (where permitted)
- **Content Downloader** - Save your own content in HD
- **Post Performance** - Detailed engagement metrics
- **Content Calendar** - Plan and schedule posts
- **Story Insights** - View counts and reach statistics

### 🧠 AI-Powered Features
- **Caption Generator** - AI-powered caption suggestions
- **Hashtag Optimizer** - Smart hashtag recommendations
- **Growth Tips** - Personalized improvement suggestions
- **Best Time Predictor** - Optimal posting schedule

### 🎨 Premium UI/UX
- **Glassmorphism Design** - Modern, beautiful interface
- **Dark/Light Themes** - Choose your preferred mode
- **Smooth Animations** - Framer Motion powered transitions
- **3D Micro-interactions** - Delightful user experience
- **Responsive Design** - Perfect on all devices
- **Accessibility** - WCAG 2.1 AA compliant

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn/ui
- **Animations:** Framer Motion + GSAP
- **State Management:** Zustand + React Query
- **Charts:** Recharts + Chart.js
- **Forms:** React Hook Form + Zod

### Backend
- **Runtime:** Node.js 20+
- **Framework:** Express.js
- **Language:** TypeScript
- **ORM:** Prisma
- **Authentication:** Passport.js + JWT
- **Validation:** Zod
- **Security:** Helmet + Express Rate Limit

### Database & Infrastructure
- **Database:** PostgreSQL 15+
- **Cache:** Redis 7+
- **Storage:** AWS S3 / Azure Blob
- **Queue:** Bull (Redis-based)
- **Deployment:** Docker + Kubernetes ready

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.0.0 or higher
- **npm** or **yarn** or **pnpm**
- **PostgreSQL** 15 or higher
- **Redis** 7 or higher
- **Docker** (optional, for containerized setup)
- **Instagram Developer Account** (for OAuth credentials)

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/instagram-followers-tracker.git
cd instagram-followers-tracker
```

### 2. Install Dependencies

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd backend
npm install
```

### 3. Environment Setup

#### Frontend (.env.local)
```bash
# Copy the example environment file
cp .env.example .env.local

# Edit the file with your configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_INSTAGRAM_CLIENT_ID=your_instagram_client_id
```

#### Backend (.env)
```bash
# Copy the example environment file
cp .env.example .env

# Edit the file with your configuration
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/insta_tracker

# Redis
REDIS_URL=redis://localhost:6379

# Instagram OAuth
INSTAGRAM_CLIENT_ID=your_instagram_client_id
INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret
INSTAGRAM_REDIRECT_URI=http://localhost:5000/api/v1/auth/instagram/callback

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRES_IN=7d

# Encryption
ENCRYPTION_KEY=your_32_character_encryption_key

# OpenAI (optional, for AI features)
OPENAI_API_KEY=your_openai_api_key
```

### 4. Database Setup

```bash
cd backend

# Run migrations
npx prisma migrate dev

# Seed database (optional)
npm run seed

# Generate Prisma Client
npx prisma generate
```

### 5. Start Development Servers

#### Backend
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

#### Frontend
```bash
cd frontend
npm run dev
# App runs on http://localhost:3000
```

### 6. Docker Setup (Alternative)

```bash
# Start all services with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## 📱 Instagram OAuth Setup

### 1. Create Instagram App
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Instagram Basic Display product
4. Configure OAuth Redirect URIs:
   - Development: `http://localhost:5000/api/v1/auth/instagram/callback`
   - Production: `https://your-domain.com/api/v1/auth/instagram/callback`

### 2. Required Permissions
- `user_profile` - Basic profile information
- `user_media` - Access to user's media

### 3. Test Users
Add test users in the Instagram App settings for development

---

## 🎨 UI/UX Showcase

### Design System

#### Color Palette
```css
/* Light Theme */
--primary: #8B5CF6        /* Purple */
--secondary: #06B6D4      /* Cyan */
--accent: #EC4899         /* Pink */
--background: #FFFFFF
--foreground: #09090B

/* Dark Theme */
--primary: #A78BFA
--secondary: #22D3EE
--accent: #F472B6
--background: #09090B
--foreground: #FAFAFA
```

#### Typography
- **Headings:** Inter (Bold)
- **Body:** Inter (Regular)
- **Code:** Fira Code

#### Animations
- **Page Transitions:** 300ms ease-in-out
- **Micro-interactions:** Spring physics
- **Charts:** Animated on load

---

## 📖 API Documentation

### Authentication

#### Login with Instagram
```http
POST /api/v1/auth/instagram/oauth
```

**Response:**
```json
{
  "success": true,
  "data": {
    "authUrl": "https://api.instagram.com/oauth/authorize?..."
  }
}
```

#### Get Current User
```http
GET /api/v1/auth/me
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "username": "johndoe",
    "fullName": "John Doe",
    "profilePicture": "https://...",
    "followerCount": 1234,
    "followingCount": 567
  }
}
```

### Followers

#### Get All Followers
```http
GET /api/v1/followers?page=1&limit=20&sort=recent
Authorization: Bearer {token}
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)
- `sort` - Sort by: `recent`, `engagement`, `alphabetical`
- `filter` - Filter: `all`, `mutual`, `ghost`, `top-engagers`

**Response:**
```json
{
  "success": true,
  "data": {
    "followers": [
      {
        "id": "uuid",
        "username": "follower1",
        "fullName": "Follower One",
        "profilePicture": "https://...",
        "isFollowingBack": true,
        "engagementScore": 8.5,
        "followedAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "total": 1234,
      "page": 1,
      "limit": 20,
      "totalPages": 62
    }
  }
}
```

#### Get Unfollowers
```http
GET /api/v1/followers/lost?days=7
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "unfollowers": [
      {
        "username": "user123",
        "fullName": "User Name",
        "profilePicture": "https://...",
        "unfollowedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "count": 5
  }
}
```

### Analytics

#### Get Dashboard Overview
```http
GET /api/v1/analytics/overview
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "followerCount": 1234,
    "followingCount": 567,
    "engagementRate": 3.45,
    "recentGains": 15,
    "recentLosses": 5,
    "growthRate": 0.81,
    "topPosts": [...],
    "insights": {
      "bestTimeToPost": "18:00",
      "mostActiveDay": "Saturday",
      "averageLikes": 123,
      "averageComments": 45
    }
  }
}
```

#### Get Growth Trends
```http
GET /api/v1/analytics/growth?period=30d
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "chartData": [
      {
        "date": "2024-01-01",
        "followerCount": 1200,
        "followingCount": 560,
        "engagement": 3.2
      }
    ],
    "summary": {
      "totalGrowth": 34,
      "growthPercentage": 2.8,
      "averageDaily": 1.13
    }
  }
}
```

### AI Features

#### Generate Caption
```http
POST /api/v1/ai/generate-caption
Authorization: Bearer {token}
Content-Type: application/json

{
  "imageDescription": "sunset at the beach",
  "tone": "casual",
  "includeHashtags": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "captions": [
      "Chasing sunsets and good vibes 🌅 #BeachLife #SunsetLovers",
      "Golden hour perfection at my favorite spot ✨ #BeachVibes",
      "Nothing beats a beach sunset 🌊 #CoastalLiving #Paradise"
    ]
  }
}
```

---

## 🔒 Security

### Security Features
- **OAuth 2.0** - Secure Instagram authentication
- **JWT Tokens** - Stateless session management
- **AES-256 Encryption** - Sensitive data encryption
- **Rate Limiting** - DDoS protection
- **CORS Protection** - Cross-origin security
- **Helmet.js** - Security headers
- **Input Validation** - Zod schema validation
- **SQL Injection Prevention** - Parameterized queries (Prisma)
- **XSS Protection** - Content Security Policy

### Best Practices
- Never store Instagram passwords
- Rotate JWT secrets regularly
- Use HTTPS in production
- Implement audit logging
- Regular security audits
- Keep dependencies updated

---

## 📊 Performance Optimization

### Frontend Optimizations
- **Code Splitting** - Lazy loading routes
- **Image Optimization** - Next.js Image component
- **Caching** - React Query with stale-while-revalidate
- **Bundle Analysis** - Webpack Bundle Analyzer
- **Compression** - Gzip/Brotli compression

### Backend Optimizations
- **Database Indexing** - Optimized queries
- **Connection Pooling** - Efficient DB connections
- **Redis Caching** - API response caching
- **Query Optimization** - N+1 query prevention
- **Background Jobs** - Async processing with Bull

### Performance Metrics
- **Lighthouse Score:** 95+
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 2.5s
- **API Response Time:** < 200ms (p95)

---

## 🧪 Testing

### Run Tests

#### Backend Tests
```bash
cd backend

# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

#### Frontend Tests
```bash
cd frontend

# Unit tests
npm run test

# E2E tests (Playwright)
npm run test:e2e

# Component tests
npm run test:component
```

---

## 🚀 Deployment

### Production Deployment

#### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

#### Backend (Docker + Railway/DigitalOcean)
```bash
# Build Docker image
docker build -t insta-tracker-backend .

# Run container
docker run -p 5000:5000 --env-file .env insta-tracker-backend
```

#### Database (Managed PostgreSQL)
- AWS RDS
- DigitalOcean Managed Database
- Supabase
- Neon

#### Redis (Managed)
- Redis Cloud
- Upstash
- AWS ElastiCache

---

## 📱 Mobile App Conversion

### React Native Setup

```bash
# Create React Native project
npx react-native init InstaTrackerMobile --template react-native-template-typescript

# Install shared dependencies
cd InstaTrackerMobile
npm install @tanstack/react-query zustand

# Link shared code
ln -s ../shared ./shared
```

### Conversion Steps
1. Extract business logic to `shared/` directory
2. Replace Next.js routing with React Navigation
3. Adapt UI components for mobile
4. Implement native OAuth flow
5. Add push notifications
6. Test on iOS and Android

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Instagram Basic Display API](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Shadcn/ui](https://ui.shadcn.com/)

---

## 📞 Support

- **Documentation:** [docs.yourapp.com](https://docs.yourapp.com)
- **Email:** support@yourapp.com
- **Discord:** [Join our community](https://discord.gg/yourapp)
- **Twitter:** [@yourapp](https://twitter.com/yourapp)

---

## 🗺️ Roadmap

### Q1 2026
- [x] MVP Launch
- [ ] AI Caption Generator
- [ ] Mobile App Beta

### Q2 2026
- [ ] Competitor Analysis
- [ ] Advanced Filters
- [ ] API for Developers

### Q3 2026
- [ ] Team Collaboration
- [ ] White Label Solution
- [ ] Enterprise Features

---

<div align="center">

**Made with ❤️ by the Instagram Followers Tracker Team**

⭐ Star us on GitHub — it helps!

[Website](https://yourapp.com) • [Documentation](https://docs.yourapp.com) • [Blog](https://blog.yourapp.com)

</div>
