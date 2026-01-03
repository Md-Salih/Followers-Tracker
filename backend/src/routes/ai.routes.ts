import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { aiLimiter } from '../middleware/rateLimit.middleware';
import * as aiController from '../controllers/ai.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);
router.use(aiLimiter);

router.post('/generate-caption', aiController.generateCaption);
router.post('/suggest-hashtags', aiController.suggestHashtags);
router.post('/analyze-content', aiController.analyzeContent);
router.post('/growth-tips', aiController.getGrowthTips);
router.get('/suggestions/history', aiController.getSuggestionsHistory);

export default router;
