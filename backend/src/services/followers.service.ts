import axios from 'axios';
import { prisma } from '../utils/prisma';
import { decrypt } from '../utils/encryption';
import { config } from '../config';
import { AppError } from '../middleware/error.middleware';

class FollowersService {
  async getAllFollowers(
    userId: string,
    options: {
      page: number;
      limit: number;
      sort: string;
      filter: string;
    }
  ) {
    const { page, limit, sort, filter } = options;
    const skip = (page - 1) * limit;

    let where: any = { userId };

    if (filter === 'mutual') {
      where.isFollowingBack = true;
    } else if (filter === 'ghost') {
      where.engagementScore = { lt: 1.0 };
    } else if (filter === 'top-engagers') {
      where.engagementScore = { gt: 5.0 };
    }

    let orderBy: any = {};
    if (sort === 'recent') {
      orderBy = { followedAt: 'desc' };
    } else if (sort === 'engagement') {
      orderBy = { engagementScore: 'desc' };
    } else if (sort === 'alphabetical') {
      orderBy = { username: 'asc' };
    }

    const [followers, total] = await Promise.all([
      prisma.follower.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      prisma.follower.count({ where }),
    ]);

    return {
      followers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getRecentFollowers(userId: string, days: number) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const followers = await prisma.follower.findMany({
      where: {
        userId,
        followedAt: { gte: since },
      },
      orderBy: { followedAt: 'desc' },
    });

    return followers;
  }

  async getUnfollowers(userId: string, days: number) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const unfollowers = await prisma.followerChange.findMany({
      where: {
        userId,
        changeType: 'lost',
        detectedAt: { gte: since },
      },
      orderBy: { detectedAt: 'desc' },
    });

    return unfollowers;
  }

  async getMutualFollowers(userId: string) {
    const mutuals = await prisma.follower.findMany({
      where: {
        userId,
        isFollowingBack: true,
      },
      orderBy: { username: 'asc' },
    });

    return mutuals;
  }

  async getGhostFollowers(userId: string, threshold: number) {
    const ghosts = await prisma.follower.findMany({
      where: {
        userId,
        engagementScore: { lt: threshold },
      },
      orderBy: { engagementScore: 'asc' },
    });

    return ghosts;
  }

  async getTopEngagers(userId: string, limit: number) {
    const topEngagers = await prisma.follower.findMany({
      where: { userId },
      orderBy: { engagementScore: 'desc' },
      take: limit,
    });

    return topEngagers;
  }

  async syncFollowers(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.accessToken) {
      throw new AppError('User not found or not authenticated', 404);
    }

    try {
      const accessToken = decrypt(user.accessToken);

      // Note: Instagram Basic Display API has limitations
      // This is a placeholder for the actual implementation
      // In production, you would need Instagram Graph API for business accounts

      const response = await axios.get(
        `${config.instagram.apiBaseUrl}/me`,
        {
          params: {
            fields: 'followers_count,follows_count',
            access_token: accessToken,
          },
        }
      );

      // Update user counts
      await prisma.user.update({
        where: { id: userId },
        data: {
          followerCount: response.data.followers_count || 0,
          followingCount: response.data.follows_count || 0,
          lastSyncAt: new Date(),
        },
      });

      return {
        followerCount: response.data.followers_count || 0,
        followingCount: response.data.follows_count || 0,
        syncedAt: new Date(),
      };
    } catch (error) {
      throw new AppError('Failed to sync followers', 500);
    }
  }

  async getFollowerChanges(
    userId: string,
    days: number,
    type?: string
  ) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const where: any = {
      userId,
      detectedAt: { gte: since },
    };

    if (type) {
      where.changeType = type;
    }

    const changes = await prisma.followerChange.findMany({
      where,
      orderBy: { detectedAt: 'desc' },
    });

    return changes;
  }

  async getFollowerById(userId: string, followerId: string) {
    const follower = await prisma.follower.findFirst({
      where: {
        id: followerId,
        userId,
      },
    });

    return follower;
  }
}

export const followersService = new FollowersService();
