import jwt from 'jsonwebtoken';
import axios from 'axios';
import { Request } from 'express';
import { prisma } from '../utils/prisma';
import { config } from '../config';
import { AppError } from '../middleware/error.middleware';
import { encrypt, decrypt } from '../utils/encryption';

class AuthService {
  async handleOAuthCallback(code: string, req: Request) {
    try {
      // Exchange code for access token
      const tokenResponse = await axios.post(
        `${config.instagram.authUrl}/access_token`,
        new URLSearchParams({
          client_id: config.instagram.clientId,
          client_secret: config.instagram.clientSecret,
          grant_type: 'authorization_code',
          redirect_uri: config.instagram.redirectUri,
          code,
        })
      );

      const { access_token, user_id } = tokenResponse.data;

      // Get user profile from Instagram
      const profileResponse = await axios.get(
        `${config.instagram.apiBaseUrl}/me`,
        {
          params: {
            fields: 'id,username,account_type,media_count',
            access_token,
          },
        }
      );

      const profile = profileResponse.data;

      // Encrypt tokens
      const encryptedAccessToken = encrypt(access_token);

      // Create or update user
      const user = await prisma.user.upsert({
        where: { instagramUserId: user_id.toString() },
        update: {
          accessToken: encryptedAccessToken,
          tokenExpiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days
          username: profile.username,
          accountType: profile.account_type,
          mediaCount: profile.media_count,
          lastSyncAt: new Date(),
        },
        create: {
          instagramUserId: user_id.toString(),
          username: profile.username,
          accessToken: encryptedAccessToken,
          tokenExpiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
          accountType: profile.account_type,
          mediaCount: profile.media_count,
        },
      });

      // Create session
      const session = await prisma.session.create({
        data: {
          userId: user.id,
          sessionToken: this.generateSessionToken(),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          ipAddress: req.ip,
          userAgent: req.headers['user-agent'],
        },
      });

      // Generate JWT
      const token = jwt.sign(
        {
          userId: user.id,
          sessionId: session.id,
        },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      return {
        token,
        user: {
          id: user.id,
          username: user.username,
          instagramUserId: user.instagramUserId,
        },
      };
    } catch (error) {
      throw new AppError('Failed to authenticate with Instagram', 500);
    }
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(
        refreshToken,
        config.jwt.refreshSecret
      ) as { userId: string };

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        throw new AppError('User not found', 404);
      }

      // Create new session
      const session = await prisma.session.create({
        data: {
          userId: user.id,
          sessionToken: this.generateSessionToken(),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      const token = jwt.sign(
        {
          userId: user.id,
          sessionId: session.id,
        },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      return { token };
    } catch (error) {
      throw new AppError('Invalid refresh token', 401);
    }
  }

  async logout(token: string) {
    try {
      const decoded = jwt.verify(token, config.jwt.secret) as {
        sessionId: string;
      };

      await prisma.session.update({
        where: { id: decoded.sessionId },
        data: { isActive: false },
      });
    } catch (error) {
      // Silent fail for logout
    }
  }

  async getCurrentUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        fullName: true,
        profilePictureUrl: true,
        followerCount: true,
        followingCount: true,
        mediaCount: true,
        accountType: true,
        isVerified: true,
        createdAt: true,
        lastSyncAt: true,
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  private generateSessionToken(): string {
    return require('crypto').randomBytes(32).toString('hex');
  }
}

export const authService = new AuthService();
