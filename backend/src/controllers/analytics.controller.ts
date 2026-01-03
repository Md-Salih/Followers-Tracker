import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { asyncHandler } from '../middleware/error.middleware';
import { analyticsService } from '../services/analytics.service';

export const getOverview = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const overview = await analyticsService.getOverview(req.user!.id);

    res.status(200).json({
      success: true,
      data: overview,
    });
  }
);

export const getGrowthTrends = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { period = '30d' } = req.query;

    const trends = await analyticsService.getGrowthTrends(
      req.user!.id,
      period as string
    );

    res.status(200).json({
      success: true,
      data: trends,
    });
  }
);

export const getEngagementMetrics = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { period = '30d' } = req.query;

    const metrics = await analyticsService.getEngagementMetrics(
      req.user!.id,
      period as string
    );

    res.status(200).json({
      success: true,
      data: metrics,
    });
  }
);

export const getDemographics = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const demographics = await analyticsService.getDemographics(req.user!.id);

    res.status(200).json({
      success: true,
      data: demographics,
    });
  }
);

export const getBestTimeToPost = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const bestTime = await analyticsService.getBestTimeToPost(req.user!.id);

    res.status(200).json({
      success: true,
      data: bestTime,
    });
  }
);

export const getHashtagPerformance = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { limit = '20' } = req.query;

    const performance = await analyticsService.getHashtagPerformance(
      req.user!.id,
      parseInt(limit as string)
    );

    res.status(200).json({
      success: true,
      data: performance,
    });
  }
);

export const exportAnalytics = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { format = 'json' } = req.query;

    const data = await analyticsService.exportAnalytics(
      req.user!.id,
      format as string
    );

    if (format === 'csv') {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=analytics.csv');
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', 'attachment; filename=analytics.json');
    }

    res.status(200).send(data);
  }
);
