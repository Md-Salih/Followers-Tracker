import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Instagram Followers Tracker - Advanced Analytics & Management',
  description: 'Track your Instagram followers, analyze engagement, and manage your content with advanced analytics tools.',
  keywords: 'instagram, followers, tracker, analytics, engagement, social media',
  authors: [{ name: 'Instagram Tracker Team' }],
  openGraph: {
    title: 'Instagram Followers Tracker',
    description: 'Advanced Instagram analytics and follower management platform',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instagram Followers Tracker',
    description: 'Advanced Instagram analytics and follower management platform',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
