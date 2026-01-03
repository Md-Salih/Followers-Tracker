import { prisma } from '../utils/prisma';

class ContentService {
  async getAllPosts(
    userId: string,
    options: { page: number; limit: number; sort: string }
  ) {
    const { page, limit, sort } = options;
    const skip = (page - 1) * limit;

    const orderBy = sort === 'recent' 
      ? { postedAt: 'desc' as const }
      : { engagementRate: 'desc' as const };

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy,
      }),
      prisma.post.count({ where: { userId } }),
    ]);

    return {
      posts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getPostById(userId: string, postId: string) {
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        userId,
      },
    });

    return post;
  }

  async getPostInsights(userId: string, postId: string) {
    const post = await this.getPostById(userId, postId);

    if (!post) return null;

    return {
      postId: post.id,
      likeCount: post.likeCount,
      commentCount: post.commentCount,
      engagementRate: post.engagementRate,
      postedAt: post.postedAt,
    };
  }

  async getStories(userId: string) {
    const stories = await prisma.story.findMany({
      where: {
        userId,
        expiresAt: { gt: new Date() },
      },
      orderBy: { postedAt: 'desc' },
    });

    return stories;
  }

  async getStoryById(userId: string, storyId: string) {
    const story = await prisma.story.findFirst({
      where: {
        id: storyId,
        userId,
      },
    });

    return story;
  }
}

export const contentService = new ContentService();
