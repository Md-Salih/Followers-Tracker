import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import * as contentController from '../controllers/content.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/posts', contentController.getAllPosts);
router.get('/posts/:id', contentController.getPostById);
router.get('/posts/:id/insights', contentController.getPostInsights);
router.get('/stories', contentController.getStories);
router.get('/stories/:id', contentController.getStoryById);

export default router;
