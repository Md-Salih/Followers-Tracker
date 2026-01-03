import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Environment
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  
  // Database
  databaseUrl: process.env.DATABASE_URL || '',
  
  // Redis
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  redisPassword: process.env.REDIS_PASSWORD || '',
  
  // Instagram OAuth
  instagram: {
    clientId: process.env.INSTAGRAM_CLIENT_ID || '',
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || '',
    redirectUri: process.env.INSTAGRAM_REDIRECT_URI || '',
    apiBaseUrl: 'https://graph.instagram.com',
    authUrl: 'https://api.instagram.com/oauth',
  },
  
  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '60d',
  },
  
  // Encryption
  encryption: {
    key: process.env.ENCRYPTION_KEY || '',
    algorithm: process.env.ENCRYPTION_ALGORITHM || 'aes-256-gcm',
  },
  
  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },
  
  // OpenAI
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
  },
  
  // AWS S3
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    region: process.env.AWS_REGION || 'us-east-1',
    s3Bucket: process.env.AWS_S3_BUCKET || '',
  },
  
  // Frontend URL
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
  
  // Session
  sessionSecret: process.env.SESSION_SECRET || 'your-session-secret',
} as const;

// Validate required environment variables
const requiredEnvVars = [
  'DATABASE_URL',
  'INSTAGRAM_CLIENT_ID',
  'INSTAGRAM_CLIENT_SECRET',
  'JWT_SECRET',
  'ENCRYPTION_KEY',
];

const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0 && config.nodeEnv === 'production') {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}
