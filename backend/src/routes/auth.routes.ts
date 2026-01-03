import { Router } from 'express';
import { authLimiter } from '../middleware/rateLimit.middleware';
import { authenticate } from '../middleware/auth.middleware';
import * as authController from '../controllers/auth.controller';

const router = Router();

// OAuth flow
router.get('/instagram/oauth', authLimiter, authController.initiateInstagramOAuth);
router.get('/instagram/callback', authController.handleInstagramCallback);

// Token management
router.post('/refresh', authController.refreshToken);
router.post('/logout', authenticate, authController.logout);

// User info
router.get('/me', authenticate, authController.getCurrentUser);

export default router;
