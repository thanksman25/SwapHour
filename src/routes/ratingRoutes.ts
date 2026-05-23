import { Router } from 'express';
import { createRating } from '../controllers/ratingController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();
router.use(protect); // Wajib login
router.post('/', createRating); // POST /api/ratings

export default router;