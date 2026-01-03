import { prisma } from '../utils/prisma';

class AnalyticsService {
  async getOverview(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return null;

    // Get recent changes (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const [recentGains, recentLosses] = await Promise.all([
      prisma.followerChange.count({
        where: {
          userId,
          changeType: 'gained',
          detectedAt: { gte: weekAgo },
        },
      }),
      prisma.followerChange.count({
        where: {
          userId,
          changeType: 'lost',
          detectedAt: { gte: weekAgo },
        },
      }),
    ]);

    const netGrowth = recentGains - recentLosses;
    const growthRate = user.followerCount > 0 
      ? (netGrowth / user.followerCount) * 100 
      : 0;

    return {
      followerCount: user.followerCount,
      followingCount: user.followingCount,
      recentGains,
      recentLosses,
      netGrowth,
      growthRate: parseFloat(growthRate.toFixed(2)),
      lastSyncAt: user.lastSyncAt,
    };
  }

  async getGrowthTrends(userId: string, period: string) {
    // Implementation for growth trends
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
    
    const snapshots = await prisma.analyticsSnapshot.findMany({
      where: {
        userId,
        snapshotDate: {
          gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000),
        },
      },
      orderBy: { snapshotDate: 'asc' },
    });

    return { chartData: snapshots };
  }

  async getEngagementMetrics(userId: string, period: string) {
    // Placeholder implementation
    return {
      averageEngagementRate: 3.5,
      totalLikes: 1234,
      totalComments: 567,
      averageReach: 5000,
    };
  }

  async getDemographics(userId: string) {
    // Placeholder implementation
    return {
      topCountries: ['US', 'UK', 'CA'],
      ageRanges: { '18-24': 30, '25-34': 45, '35-44': 25 },
      genderSplit: { male: 40, female: 60 },
    };
  }

  async getBestTimeToPost(userId: string) {
    // Placeholder implementation
    return {
      bestDay: 'Saturday',
      bestHour: 18,
      timezone: 'UTC',
    };
  }

  async getHashtagPerformance(userId: string, limit: number) {
    // Placeholder implementation
    return {
      hashtags: [
        { tag: '#instagram', uses: 50, avgLikes: 150 },
        { tag: '#photography', uses: 40, avgLikes: 130 },
      ],
    };
  }

  async exportAnalytics(userId: string, format: string) {
    const overview = await this.getOverview(userId);
    
    if (format === 'csv') {
      return 'metric,value\nfollowers,' + overview?.followerCount;
    }
    
    return JSON.stringify(overview, null, 2);
  }
}

export const analyticsService = new AnalyticsService();
