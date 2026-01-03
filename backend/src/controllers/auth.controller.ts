import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { asyncHandler, AppError } from '../middleware/error.middleware';
import { authService } from '../services/auth.service';
import { config } from '../config';

export const initiateInstagramOAuth = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const authUrl = `${config.instagram.authUrl}/authorize?client_id=${config.instagram.clientId}&redirect_uri=${config.instagram.redirectUri}&scope=user_profile,user_media&response_type=code`;

    res.status(200).json({
      success: true,
      data: { authUrl },
    });
  }
);

export const handleInstagramCallback = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { code } = req.query;

    if (!code || typeof code !== 'string') {
      throw new AppError('Authorization code is required', 400);
    }

    const result = await authService.handleOAuthCallback(code, req);

    // Redirect to frontend with token
    res.redirect(`${config.frontendUrl}/auth/callback?token=${result.token}`);
  }
);

export const refreshToken = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AppError('Refresh token is required', 400);
    }

    const result = await authService.refreshAccessToken(refreshToken);

    res.status(200).json({
      success: true,
      data: result,
    });
  }
);

export const logout = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (token) {
      await authService.logout(token);
    }

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  }
);

export const getCurrentUser = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw new AppError('User not found', 404);
    }

    const user = await authService.getCurrentUser(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  }
);
