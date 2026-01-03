import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { asyncHandler } from '../middleware/error.middleware';
import { settingsService } from '../services/settings.service';

export const getSettings = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const settings = await settingsService.getSettings(req.user!.id);

    res.status(200).json({
      success: true,
      data: settings,
    });
  }
);

export const updateSettings = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const settings = await settingsService.updateSettings(
      req.user!.id,
      req.body
    );

    res.status(200).json({
      success: true,
      data: settings,
      message: 'Settings updated successfully',
    });
  }
);

export const getNotifications = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const notifications = await settingsService.getNotifications(req.user!.id);

    res.status(200).json({
      success: true,
      data: notifications,
    });
  }
);

export const updateNotifications = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const notifications = await settingsService.updateNotifications(
      req.user!.id,
      req.body
    );

    res.status(200).json({
      success: true,
      data: notifications,
      message: 'Notification preferences updated successfully',
    });
  }
);

export const deleteAccount = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    await settingsService.deleteAccount(req.user!.id);

    res.status(200).json({
      success: true,
      message: 'Account deleted successfully',
    });
  }
);
