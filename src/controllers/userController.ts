import { Response, NextFunction } from 'express';
import prisma from '../utils/prismaClient';
import { AppError } from '../utils/AppError';
import { AuthRequest } from '../middlewares/authMiddleware';
import { calculateCompletion } from '../utils/profileCompletion'

export const updateProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try{
        // Tangkap data yang dikirim user dari body request
        const { bio, avatar_url } = req.body;

        // Ambil ID user dari token JWT yang sudah divalidasi oleh middleware 'protect'
        const userId = req.user.id;

        // Cari data user di database berdasarkan ID tersebut
        const currentUser = await prisma.user.findUnique({ where: {id: userId} });

        // Jika user tidak ditemukan di database (mungkin sudah dihapus), lempar error 404 
        if(!currentUser) {
            return next(new AppError('User tidak ditemukan', 404));
        }

        // Gabungkan data lama dengan data baru (bio & avatar_url) menggunakan spread operator(...)
        // ini berguna agar fungsi calculateCompletion bisa membaca data secara utuh
        const updateData = {...currentUser, bio, avatar_url };

        // Hitung Persentase kelengkapan profil dengan rumus yang sudah kita buat 
        const completionPercentage = calculateCompletion(updateData);

        // Simpan perubahan ke dalam database
        const updateUser = await prisma.user.update({
            where: {id: userId},
            data: {
                bio,
                avatar_url,
                profile_completion: completionPercentage, // update nilai persentasenya juga
            },
            // Bagian 'select' ini sangat penting untuk KEAMANAN!
            // Kita memilih kolom mana saja yang ingin ditampilkan sebagai response.
            // Kita sengaja TIDAK MENULIS password_hash agar password tidak bocor ke frontend.

            select: {
            id: true,
            name: true,
            email: true,
            bio: true,
            avatar_url: true,
            profile_completion: true,
            credit_hours: true,
            }
        });

        // Kirim response sukses ke client
        res.status(200).json({
            status: 'success',
            message: 'Profil berhasil diperbarui',
            data: updateUser
        });
    } catch (error) {
       // Jika ada error tak terduga (misal database mati), lempar ke Global Error Handler
       next(error);
    }
}