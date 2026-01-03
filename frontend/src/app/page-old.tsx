'use client';

import { motion } from 'framer-motion';
import { Instagram, TrendingUp, Users, BarChart3, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-cyan-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-cyan-900/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full glass-effect"
          >
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">100% Free • No Credit Card Required</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Instagram Analytics</span>
            <br />
            <span className="text-foreground">Made Simple</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Track followers, analyze engagement, and grow your Instagram presence with
            powerful analytics tools that actually work.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/login">
              <Button size="lg" className="text-lg px-8 py-6 gap-2 group">
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Connect Instagram
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                View Demo Dashboard
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            Join 100,000+ users tracking their Instagram growth
          </p>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl glass-effect hover:glass-effect-strong transition-all group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 text-center"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl glass-effect"
            >
              <div className="text-5xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-lg text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center p-12 rounded-3xl glass-effect-strong"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Grow Your Instagram?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start tracking your followers and analyzing your growth today.
          </p>
          <Link href="/auth/login">
            <Button size="lg" className="text-lg px-8 py-6 gap-2">
              <Instagram className="w-5 h-5" />
              Get Started Free
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p>© 2026 Instagram Followers Tracker. All rights reserved.</p>
        <div className="flex gap-4 justify-center mt-4">
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">
            Terms of Service
          </Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">
            Contact
          </Link>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Users,
    title: 'Follower Tracking',
    description: 'Monitor followers gained and lost in real-time with detailed analytics.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Analytics',
    description: 'Visualize your growth trends with beautiful charts and insights.',
  },
  {
    icon: BarChart3,
    title: 'Engagement Metrics',
    description: 'Track likes, comments, and engagement rates for all your posts.',
  },
  {
    icon: Sparkles,
    title: 'AI Assistant',
    description: 'Get AI-powered caption suggestions and hashtag recommendations.',
  },
];

const stats = [
  { value: '100K+', label: 'Active Users' },
  { value: '10M+', label: 'Followers Tracked' },
  { value: '99.9%', label: 'Uptime' },
];
