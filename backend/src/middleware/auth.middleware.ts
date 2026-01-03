import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { AppError } from './error.middleware';
import { prisma } from '../utils/prisma';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    instagramUserId: string;
    username: string;
  };
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401);
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, config.jwt.secret) as {
      userId: string;
      sessionId: string;
    };

    // Check if session is still active
    const session = await prisma.session.findUnique({
      where: { id: decoded.sessionId },
      include: { user: true },
    });

    if (!session || !session.isActive || session.expiresAt < new Date()) {
      throw new AppError('Invalid or expired session', 401);
    }

    // Update last activity
    await prisma.session.update({
      where: { id: session.id },
      data: { lastActivityAt: new Date() },
    });

    // Attach user to request
    req.user = {
      id: session.user.id,
      instagramUserId: session.user.instagramUserId,
      username: session.user.username,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new AppError('Invalid token', 401));
    }
    next(error);
  }
};
