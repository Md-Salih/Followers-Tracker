import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { asyncHandler, AppError } from '../middleware/error.middleware';
import { contentService } from '../services/content.service';

export const getAllPosts = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { page = '1', limit = '20', sort = 'recent' } = req.query;

    const result = await contentService.getAllPosts(req.user!.id, {
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      sort: sort as string,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  }
);

export const getPostById = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const post = await contentService.getPostById(req.user!.id, id);

    if (!post) {
      throw new AppError('Post not found', 404);
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  }
);

export const getPostInsights = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const insights = await contentService.getPostInsights(req.user!.id, id);

    res.status(200).json({
      success: true,
      data: insights,
    });
  }
);

export const getStories = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const stories = await contentService.getStories(req.user!.id);

    res.status(200).json({
      success: true,
      data: { stories },
    });
  }
);

export const getStoryById = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const story = await contentService.getStoryById(req.user!.id, id);

    if (!story) {
      throw new AppError('Story not found', 404);
    }

    res.status(200).json({
      success: true,
      data: story,
    });
  }
);
