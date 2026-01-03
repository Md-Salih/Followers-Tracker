import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { syncLimiter } from '../middleware/rateLimit.middleware';
import * as followersController from '../controllers/followers.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/', followersController.getAllFollowers);
router.get('/recent', followersController.getRecentFollowers);
router.get('/lost', followersController.getUnfollowers);
router.get('/mutual', followersController.getMutualFollowers);
router.get('/ghost', followersController.getGhostFollowers);
router.get('/top-engagers', followersController.getTopEngagers);
router.post('/sync', syncLimiter, followersController.syncFollowers);
router.get('/changes', followersController.getFollowerChanges);
router.get('/:id', followersController.getFollowerById);

export default router;
