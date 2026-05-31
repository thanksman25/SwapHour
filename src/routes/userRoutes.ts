import { Router } from 'express';
import { updateProfile, getProfile } from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// Metode GET untuk Frontend mengambil data
router.get('/profile', protect, getProfile);

// Metode PUT digunakan karena kita menimpa (mengubah) data yang sudah ada.
// Rute ini kita jaga dengan middleware 'protect' agar hanya user terverifikasi (punya JWT) yang bisa akses.
router.put('/profile', protect, updateProfile);

export default router;