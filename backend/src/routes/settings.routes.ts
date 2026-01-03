import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import * as settingsController from '../controllers/settings.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/', settingsController.getSettings);
router.put('/', settingsController.updateSettings);
router.get('/notifications', settingsController.getNotifications);
router.put('/notifications', settingsController.updateNotifications);
router.delete('/account', settingsController.deleteAccount);

export default router;
