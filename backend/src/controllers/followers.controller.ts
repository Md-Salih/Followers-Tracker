import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { asyncHandler, AppError } from '../middleware/error.middleware';
import { followersService } from '../services/followers.service';

export const getAllFollowers = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { page = '1', limit = '20', sort = 'recent', filter = 'all' } = req.query;

    const result = await followersService.getAllFollowers(
      req.user!.id,
      {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        sort: sort as string,
        filter: filter as string,
      }
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  }
);

export const getRecentFollowers = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { days = '7' } = req.query;

    const followers = await followersService.getRecentFollowers(
      req.user!.id,
      parseInt(days as string)
    );

    res.status(200).json({
      success: true,
      data: { followers },
    });
  }
);

export const getUnfollowers = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { days = '7' } = req.query;

    const unfollowers = await followersService.getUnfollowers(
      req.user!.id,
      parseInt(days as string)
    );

    res.status(200).json({
      success: true,
      data: { unfollowers, count: unfollowers.length },
    });
  }
);

export const getMutualFollowers = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const followers = await followersService.getMutualFollowers(req.user!.id);

    res.status(200).json({
      success: true,
      data: { followers },
    });
  }
);

export const getGhostFollowers = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { threshold = '1.0' } = req.query;

    const ghostFollowers = await followersService.getGhostFollowers(
      req.user!.id,
      parseFloat(threshold as string)
    );

    res.status(200).json({
      success: true,
      data: { ghostFollowers },
    });
  }
);

export const getTopEngagers = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { limit = '10' } = req.query;

    const topEngagers = await followersService.getTopEngagers(
      req.user!.id,
      parseInt(limit as string)
    );

    res.status(200).json({
      success: true,
      data: { topEngagers },
    });
  }
);

export const syncFollowers = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const result = await followersService.syncFollowers(req.user!.id);

    res.status(200).json({
      success: true,
      data: result,
      message: 'Followers synced successfully',
    });
  }
);

export const getFollowerChanges = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { days = '30', type } = req.query;

    const changes = await followersService.getFollowerChanges(
      req.user!.id,
      parseInt(days as string),
      type as string | undefined
    );

    res.status(200).json({
      success: true,
      data: { changes },
    });
  }
);

export const getFollowerById = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const follower = await followersService.getFollowerById(req.user!.id, id);

    if (!follower) {
      throw new AppError('Follower not found', 404);
    }

    res.status(200).json({
      success: true,
      data: follower,
    });
  }
);
