import { Router } from 'express';
import { createSkill, getSkills, getSkillById, updateSkill, deleteSkill } from '../controllers/skillController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// 1. RUTE PUBLIK: Siapapun boleh melihat katalog skill (meskipun belum login)
router.get('/', getSkills);
router.get('/:id', getSkillById);

// 2. MIDDLEWARE GLOBAL UNTUK RUTE DI BAWAHNYA
// Dengan menaruh 'router.use(protect)' di sini, semua rute di bawah baris ini
// otomatis akan dilindungi. Kita tidak perlu menulis 'protect' satu per satu lagi.
router.use(protect); 

// 3. RUTE PRIVAT: Hanya bisa diakses kalau sudah login (punya JWT)
router.post('/', createSkill);           // Menambah skill
router.put('/:id', updateSkill);         // Mengubah skill (butuh ID spesifik di URL)
router.delete('/:id', deleteSkill);      // Menghapus skill (butuh ID spesifik di URL)

export default router;