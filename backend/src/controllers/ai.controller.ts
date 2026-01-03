import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { asyncHandler, AppError } from '../middleware/error.middleware';
import { aiService } from '../services/ai.service';

export const generateCaption = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { imageDescription, tone, includeHashtags } = req.body;

    if (!imageDescription) {
      throw new AppError('Image description is required', 400);
    }

    const captions = await aiService.generateCaption(
      req.user!.id,
      imageDescription,
      tone,
      includeHashtags
    );

    res.status(200).json({
      success: true,
      data: { captions },
    });
  }
);

export const suggestHashtags = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { content, niche } = req.body;

    if (!content) {
      throw new AppError('Content is required', 400);
    }

    const hashtags = await aiService.suggestHashtags(
      req.user!.id,
      content,
      niche
    );

    res.status(200).json({
      success: true,
      data: { hashtags },
    });
  }
);

export const analyzeContent = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { content } = req.body;

    if (!content) {
      throw new AppError('Content is required', 400);
    }

    const analysis = await aiService.analyzeContent(req.user!.id, content);

    res.status(200).json({
      success: true,
      data: analysis,
    });
  }
);

export const getGrowthTips = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const tips = await aiService.getGrowthTips(req.user!.id);

    res.status(200).json({
      success: true,
      data: { tips },
    });
  }
);

export const getSuggestionsHistory = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { type, limit = '20' } = req.query;

    const suggestions = await aiService.getSuggestionsHistory(
      req.user!.id,
      type as string | undefined,
      parseInt(limit as string)
    );

    res.status(200).json({
      success: true,
      data: { suggestions },
    });
  }
);
