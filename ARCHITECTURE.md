# 🏗️ Instagram Followers Tracker - System Architecture

## 📋 Table of Contents
1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Layers](#architecture-layers)
4. [Database Schema](#database-schema)
5. [API Endpoints](#api-endpoints)
6. [Security Architecture](#security-architecture)
7. [Deployment Strategy](#deployment-strategy)
8. [Scalability Design](#scalability-design)

---

## 🎯 System Overview

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Web App    │  │  Mobile App  │  │   PWA        │  │
│  │  (Next.js)   │  │ (React Native)│  │              │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↓ HTTPS
┌─────────────────────────────────────────────────────────┐
│                   API Gateway / CDN                      │
│              (Cloudflare / AWS CloudFront)               │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                   Application Layer                      │
│  ┌──────────────────────────────────────────────────┐  │
│  │          Backend API (Node.js/Express)            │  │
│  │  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐ │  │
│  │  │ Auth   │  │Analytics│  │Followers│  │Content │ │  │
│  │  │Service │  │ Service │  │ Service │  │Service │ │  │
│  │  └────────┘  └────────┘  └────────┘  └────────┘ │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    Data Layer                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │PostgreSQL│  │  Redis   │  │  S3/Blob │             │
│  │ Primary  │  │  Cache   │  │  Storage │             │
│  │   DB     │  │          │  │          │             │
│  └──────────┘  └──────────┘  └──────────┘             │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              External Services                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Instagram   │  │   AI APIs    │  │  Analytics   │  │
│  │  Graph API   │  │  (OpenAI)    │  │  (Mixpanel)  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend Stack
```javascript
{
  "framework": "Next.js 14 (App Router)",
  "language": "TypeScript",
  "styling": "Tailwind CSS + Shadcn/ui",
  "animations": "Framer Motion + GSAP",
  "charts": "Recharts + Chart.js",
  "state": "Zustand + React Query",
  "forms": "React Hook Form + Zod",
  "icons": "Lucide React",
  "themes": "next-themes"
}
```

### Backend Stack
```javascript
{
  "runtime": "Node.js 20+",
  "framework": "Express.js",
  "language": "TypeScript",
  "validation": "Zod",
  "orm": "Prisma",
  "authentication": "Passport.js + JWT",
  "encryption": "bcrypt + crypto",
  "rateLimit": "express-rate-limit",
  "cors": "cors",
  "security": "helmet + express-validator"
}
```

### Database & Cache
```javascript
{
  "primary": "PostgreSQL 15+",
  "cache": "Redis 7+",
  "search": "PostgreSQL Full-Text Search",
  "queue": "Bull (Redis-based)",
  "storage": "AWS S3 / Azure Blob"
}
```

### DevOps & Infrastructure
```javascript
{
  "containerization": "Docker + Docker Compose",
  "orchestration": "Kubernetes (optional)",
  "cicd": "GitHub Actions",
  "monitoring": "Prometheus + Grafana",
  "logging": "Winston + ELK Stack",
  "deployment": "Vercel (Frontend) + AWS/DigitalOcean (Backend)"
}
```

---

## 🔧 Architecture Layers

### 1. Presentation Layer (Frontend)
**Location:** `/frontend`

#### Key Components:
- **Authentication**: OAuth flow, token management
- **Dashboard**: Real-time analytics, charts
- **Followers Manager**: List views, filters, search
- **Content Hub**: Posts, stories, reels management
- **AI Assistant**: Caption generator, hashtag suggestions
- **Settings**: Profile, preferences, integrations

#### State Management:
```typescript
// Global State (Zustand)
- userStore: Authentication state
- followersStore: Followers data
- analyticsStore: Analytics data
- uiStore: Theme, modals, notifications

// Server State (React Query)
- API data caching
- Background refetching
- Optimistic updates
```

### 2. Application Layer (Backend)

#### Service Architecture:
```
backend/
├── src/
│   ├── services/
│   │   ├── auth/          # Authentication & OAuth
│   │   ├── followers/     # Followers tracking logic
│   │   ├── analytics/     # Analytics calculations
│   │   ├── content/       # Content management
│   │   ├── ai/           # AI-powered features
│   │   └── instagram/    # Instagram API integration
│   ├── middleware/
│   │   ├── auth.ts       # JWT verification
│   │   ├── rateLimit.ts  # Rate limiting
│   │   ├── validation.ts # Request validation
│   │   └── error.ts      # Error handling
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── utils/            # Helpers & utilities
```

### 3. Data Layer

#### Database Design Philosophy:
- **Normalization**: 3NF for core data
- **Denormalization**: For analytics & reports
- **Partitioning**: Time-based for analytics
- **Indexing**: Optimized for common queries

---

## 💾 Database Schema

### Core Tables

#### 1. Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    instagram_user_id VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    profile_picture_url TEXT,
    email VARCHAR(255),
    access_token TEXT ENCRYPTED,
    refresh_token TEXT ENCRYPTED,
    token_expires_at TIMESTAMP,
    account_type VARCHAR(50) DEFAULT 'personal',
    is_verified BOOLEAN DEFAULT false,
    follower_count INTEGER DEFAULT 0,
    following_count INTEGER DEFAULT 0,
    media_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_sync_at TIMESTAMP,
    settings JSONB,
    
    INDEX idx_instagram_user_id (instagram_user_id),
    INDEX idx_username (username),
    INDEX idx_created_at (created_at)
);
```

#### 2. Followers Table
```sql
CREATE TABLE followers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    follower_instagram_id VARCHAR(255) NOT NULL,
    username VARCHAR(255),
    full_name VARCHAR(255),
    profile_picture_url TEXT,
    followed_at TIMESTAMP,
    is_following_back BOOLEAN DEFAULT false,
    engagement_score DECIMAL(5,2) DEFAULT 0,
    last_interaction_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(user_id, follower_instagram_id),
    INDEX idx_user_id (user_id),
    INDEX idx_follower_instagram_id (follower_instagram_id),
    INDEX idx_engagement_score (engagement_score DESC)
);
```

#### 3. Follower Changes Table (Historical Tracking)
```sql
CREATE TABLE follower_changes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    follower_instagram_id VARCHAR(255) NOT NULL,
    username VARCHAR(255),
    change_type VARCHAR(20) NOT NULL, -- 'gained', 'lost'
    detected_at TIMESTAMP DEFAULT NOW(),
    metadata JSONB,
    
    INDEX idx_user_id_detected_at (user_id, detected_at DESC),
    INDEX idx_change_type (change_type)
);
```

#### 4. Analytics Snapshots Table
```sql
CREATE TABLE analytics_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    snapshot_date DATE NOT NULL,
    follower_count INTEGER,
    following_count INTEGER,
    engagement_rate DECIMAL(5,2),
    profile_views INTEGER,
    website_clicks INTEGER,
    reach INTEGER,
    impressions INTEGER,
    metrics JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(user_id, snapshot_date),
    INDEX idx_user_id_date (user_id, snapshot_date DESC)
) PARTITION BY RANGE (snapshot_date);
```

#### 5. Posts Table
```sql
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    instagram_media_id VARCHAR(255) UNIQUE NOT NULL,
    media_type VARCHAR(50), -- 'photo', 'video', 'carousel'
    media_url TEXT,
    thumbnail_url TEXT,
    caption TEXT,
    permalink TEXT,
    like_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    engagement_rate DECIMAL(5,2),
    posted_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_user_id_posted_at (user_id, posted_at DESC),
    INDEX idx_engagement_rate (engagement_rate DESC)
);
```

#### 6. Stories Table
```sql
CREATE TABLE stories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    instagram_story_id VARCHAR(255) UNIQUE NOT NULL,
    media_type VARCHAR(50),
    media_url TEXT,
    thumbnail_url TEXT,
    view_count INTEGER DEFAULT 0,
    reach INTEGER,
    impressions INTEGER,
    posted_at TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_user_id_posted_at (user_id, posted_at DESC),
    INDEX idx_expires_at (expires_at)
);
```

#### 7. AI Suggestions Table
```sql
CREATE TABLE ai_suggestions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    suggestion_type VARCHAR(50), -- 'caption', 'hashtag', 'best_time'
    content TEXT,
    metadata JSONB,
    used BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_user_id_type (user_id, suggestion_type)
);
```

#### 8. Sessions Table (Security)
```sql
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_token TEXT UNIQUE NOT NULL,
    device_info JSONB,
    ip_address INET,
    user_agent TEXT,
    is_active BOOLEAN DEFAULT true,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    last_activity_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_session_token (session_token),
    INDEX idx_user_id (user_id),
    INDEX idx_expires_at (expires_at)
);
```

---

## 🔌 API Endpoints

### Authentication Endpoints
```
POST   /api/v1/auth/instagram/oauth          # Initiate Instagram OAuth
GET    /api/v1/auth/instagram/callback       # OAuth callback
POST   /api/v1/auth/refresh                  # Refresh access token
POST   /api/v1/auth/logout                   # Logout user
GET    /api/v1/auth/me                       # Get current user
```

### Followers Management
```
GET    /api/v1/followers                     # Get all followers (paginated)
GET    /api/v1/followers/recent              # Recent followers
GET    /api/v1/followers/lost                # Unfollowers list
GET    /api/v1/followers/mutual              # Mutual followers
GET    /api/v1/followers/ghost               # Ghost followers (low engagement)
GET    /api/v1/followers/top-engagers        # Top engaging followers
POST   /api/v1/followers/sync                # Sync followers data
GET    /api/v1/followers/changes             # Follower changes history
GET    /api/v1/followers/:id                 # Get specific follower details
```

### Analytics Endpoints
```
GET    /api/v1/analytics/overview            # Dashboard overview
GET    /api/v1/analytics/growth              # Growth trends
GET    /api/v1/analytics/engagement          # Engagement metrics
GET    /api/v1/analytics/demographics        # Follower demographics
GET    /api/v1/analytics/best-time           # Best time to post
GET    /api/v1/analytics/hashtag-performance # Hashtag performance
GET    /api/v1/analytics/competitor          # Competitor analysis
GET    /api/v1/analytics/export              # Export analytics data
```

### Content Management
```
GET    /api/v1/content/posts                 # Get all posts
GET    /api/v1/content/posts/:id             # Get post details
GET    /api/v1/content/posts/:id/insights    # Post insights
GET    /api/v1/content/stories               # Get stories
GET    /api/v1/content/stories/:id           # Get story details
POST   /api/v1/content/download              # Download content (legal)
GET    /api/v1/content/schedule              # Get scheduled posts
POST   /api/v1/content/schedule              # Schedule a post
DELETE /api/v1/content/schedule/:id          # Delete scheduled post
```

### AI Assistant Endpoints
```
POST   /api/v1/ai/generate-caption           # Generate caption
POST   /api/v1/ai/suggest-hashtags           # Suggest hashtags
POST   /api/v1/ai/analyze-content            # Analyze content
POST   /api/v1/ai/growth-tips                # Get growth recommendations
GET    /api/v1/ai/suggestions/history        # Get past suggestions
```

### User Settings
```
GET    /api/v1/settings                      # Get user settings
PUT    /api/v1/settings                      # Update settings
GET    /api/v1/settings/notifications        # Get notification preferences
PUT    /api/v1/settings/notifications        # Update notifications
DELETE /api/v1/settings/account              # Delete account
```

---

## 🔒 Security Architecture

### 1. Authentication Flow
```
1. User clicks "Login with Instagram"
2. Redirect to Instagram OAuth authorization
3. User grants permissions
4. Instagram redirects to callback with code
5. Backend exchanges code for access_token
6. Backend creates JWT session token
7. Store access_token encrypted in database
8. Return JWT to frontend
9. Frontend stores JWT in httpOnly cookie
```

### 2. Token Management
```typescript
// Token Structure
interface TokenPayload {
  userId: string;
  sessionId: string;
  iat: number;  // Issued at
  exp: number;  // Expires at (7 days)
}

// Refresh Strategy
- Access token: 7 days
- Refresh token: 60 days (Instagram)
- Auto-refresh 1 day before expiry
- Encrypted storage using AES-256
```

### 3. Security Middleware Stack
```typescript
// Request Flow
1. CORS protection
2. Helmet security headers
3. Rate limiting (100 req/15min per IP)
4. JWT validation
5. Session verification
6. Request validation (Zod)
7. Authorization check
8. Route handler
9. Error handling
10. Audit logging
```

### 4. Data Protection
```typescript
// Encryption Strategy
- Access tokens: AES-256-GCM encryption
- Sensitive data: Field-level encryption
- Transport: TLS 1.3 only
- Database: Encrypted at rest
- Backups: Encrypted backups
```

### 5. Rate Limiting Rules
```typescript
const rateLimits = {
  auth: '5 requests per 15 minutes',
  api: '100 requests per 15 minutes',
  sync: '1 request per 5 minutes',
  download: '10 requests per hour',
  ai: '20 requests per hour'
};
```

---

## 🚀 Deployment Strategy

### Production Architecture
```
┌─────────────────────────────────────────────┐
│           Cloudflare (CDN + DDoS)           │
└─────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────┐
│  Frontend: Vercel / Netlify                  │
│  - Next.js SSR/SSG                           │
│  - Edge Functions                            │
│  - Automatic HTTPS                           │
└──────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────┐
│  Backend: AWS/DigitalOcean/Railway           │
│  - Docker Container                          │
│  - Auto-scaling (2-10 instances)             │
│  - Load Balancer                             │
└──────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────┐
│  Database: Managed PostgreSQL                │
│  - AWS RDS / DigitalOcean Managed DB         │
│  - Automated backups                         │
│  - Read replicas                             │
└──────────────────────────────────────────────┘
┌──────────────────────────────────────────────┐
│  Cache: Redis Cloud / Upstash                │
│  - Session storage                           │
│  - API caching                               │
└──────────────────────────────────────────────┘
```

### Environment Configuration
```bash
# Development
NODE_ENV=development
DATABASE_URL=postgresql://localhost:5432/insta_tracker_dev
REDIS_URL=redis://localhost:6379

# Production
NODE_ENV=production
DATABASE_URL=postgresql://prod.db.com:5432/insta_tracker
REDIS_URL=redis://prod.redis.com:6379
CDN_URL=https://cdn.yourapp.com
```

---

## 📈 Scalability Design

### Horizontal Scaling Strategy
```yaml
Load Distribution:
  - Round-robin load balancing
  - Session affinity via Redis
  - Stateless API design
  - Microservices ready

Caching Strategy:
  - Redis for session data (TTL: 7 days)
  - API response caching (TTL: 5-60 min)
  - Static assets on CDN
  - Database query caching

Database Optimization:
  - Connection pooling (20-100 connections)
  - Read replicas for analytics
  - Partitioning for time-series data
  - Materialized views for reports
  
Background Jobs:
  - Bull queue for async tasks
  - Follower sync jobs
  - Analytics calculations
  - Email notifications
```

### Performance Targets
```yaml
Response Times:
  - API endpoints: < 200ms (p95)
  - Dashboard load: < 1.5s (LCP)
  - Search queries: < 100ms
  
Throughput:
  - 1000+ requests/second
  - 10,000+ concurrent users
  - 1M+ daily active users support
  
Availability:
  - 99.9% uptime SLA
  - Zero-downtime deployments
  - Automatic failover
```

---

## 📱 Mobile App Conversion (Web → Native)

### React Native Conversion Path
```typescript
// Shared Code Structure
shared/
├── api/          # API client (100% reusable)
├── hooks/        # Custom hooks (90% reusable)
├── stores/       # State management (100% reusable)
├── utils/        # Utilities (100% reusable)
└── types/        # TypeScript types (100% reusable)

// Platform-specific
mobile/
├── screens/      # React Native screens
├── navigation/   # React Navigation
└── components/   # Native components

web/
├── pages/        # Next.js pages
└── components/   # Web components
```

### Conversion Checklist
- [ ] Extract business logic to shared module
- [ ] Replace Next.js routing with React Navigation
- [ ] Adapt UI components for mobile gestures
- [ ] Implement native authentication flow
- [ ] Add push notifications (FCM/APNs)
- [ ] Optimize for mobile performance
- [ ] Add offline support
- [ ] Implement biometric auth
- [ ] Test on iOS and Android devices

---

## 🔄 Data Sync Strategy

### Real-time Sync Architecture
```typescript
// Sync Intervals
- Followers: Every 6 hours (automatic)
- Analytics: Every 24 hours (automatic)
- Stories: Every 1 hour (automatic)
- Posts: On-demand + every 12 hours

// Sync Process
1. Check last_sync_at timestamp
2. Fetch data from Instagram API
3. Compare with existing data
4. Calculate changes (new/lost followers)
5. Update database
6. Invalidate cache
7. Trigger notifications if needed
8. Update last_sync_at
```

---

## 📊 Monitoring & Observability

### Monitoring Stack
```yaml
Application Metrics:
  - Response times (p50, p95, p99)
  - Error rates
  - Request throughput
  - Active users

System Metrics:
  - CPU usage
  - Memory usage
  - Disk I/O
  - Network traffic

Business Metrics:
  - Daily active users
  - Sync success rate
  - API usage per user
  - Feature adoption

Alerts:
  - Error rate > 1%
  - Response time > 500ms
  - CPU usage > 80%
  - Database connections > 90%
```

---

## 🎯 Development Roadmap

### Phase 1: MVP (Weeks 1-4)
- [ ] Authentication system
- [ ] Basic followers tracking
- [ ] Simple dashboard
- [ ] Core API endpoints

### Phase 2: Analytics (Weeks 5-8)
- [ ] Advanced analytics
- [ ] Growth trends
- [ ] Engagement metrics
- [ ] Export functionality

### Phase 3: Premium Features (Weeks 9-12)
- [ ] AI assistant
- [ ] Content planning
- [ ] Competitor analysis
- [ ] Advanced filters

### Phase 4: Mobile & Scale (Weeks 13-16)
- [ ] React Native app
- [ ] Performance optimization
- [ ] Load testing
- [ ] Production deployment

---

**Last Updated:** January 2026
**Version:** 1.0.0
**Architecture Type:** Microservices-ready Monolith
