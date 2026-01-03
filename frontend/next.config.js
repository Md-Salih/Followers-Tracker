/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'scontent.cdninstagram.com',
      'scontent-*.cdninstagram.com',
      'instagram.*.fbcdn.net',
      'localhost'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: '**.fbcdn.net',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_INSTAGRAM_CLIENT_ID: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID,
  },
};

module.exports = nextConfig;
