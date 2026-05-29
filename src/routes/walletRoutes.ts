import { Router } from 'express';
import { getMyTransactions } from '../controllers/walletController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();
router.use(protect);

router.get('/transactions', getMyTransactions);

export default router;
