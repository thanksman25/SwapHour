import { Router } from 'express';
import { getNotifications, markAsRead } from '../controllers/notificationController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();
router.use(protect);
router.get('/', getNotifications);
router.patch('/:id/read', markAsRead);

export default router;