import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import * as analyticsController from '../controllers/analytics.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/overview', analyticsController.getOverview);
router.get('/growth', analyticsController.getGrowthTrends);
router.get('/engagement', analyticsController.getEngagementMetrics);
router.get('/demographics', analyticsController.getDemographics);
router.get('/best-time', analyticsController.getBestTimeToPost);
router.get('/hashtag-performance', analyticsController.getHashtagPerformance);
router.get('/export', analyticsController.exportAnalytics);

export default router;
