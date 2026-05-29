import { Router } from 'express';
import { createSwapRequest, respondSwapRequest, completeSwapRequest, getMySwaps } from '../controllers/swapController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// Semua proses Swap WAJIB login, jadi kita pasang pelindung di awal
router.use(protect);

// Endpoint 1: Meminta skill
router.post('/', createSwapRequest);

// Endpoint 2: Merespons request (terima/tolak)
router.patch('/:id/respond', respondSwapRequest);

// Endpoint 3: Tandai selesai
router.patch('/:id/complete', completeSwapRequest);

// Endpoint 4: Get my swaps history
router.get('/', getMySwaps);

export default router;