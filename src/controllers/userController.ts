import { Response, NextFunction } from 'express';
import prisma from '../utils/prismaClient';
import { AppError } from '../utils/AppError';
import { AuthRequest } from '../middlewares/authMiddleware';
import { calculateCompletion } from '../utils/profileCompletion';

// ==========================================
// 1. FUNGSI UNTUK MENGAMBIL DATA PROFIL UTUH (FULL RELATIONS)
// ==========================================
export const getProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;

    const userProfile = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        // 1. DATA DASAR USER (Tanpa password_hash demi keamanan)
        id: true,
        name: true,
        email: true,
        bio: true,
        avatar_url: true,
        profile_completion: true,
        credit_hours: true,
        average_rating: true,
        total_ratings: true,
        is_active: true,

        // 2. RELASI 1: Tarik semua skill yang dimiliki/dibuat oleh user ini
        skills: {
          select: {
            id: true,
            title: true,
            category: true,
            duration_hours: true,
            is_active: true
          }
        },

        // 3. RELASI 2: Riwayat Swap yang DIAJUKAN user ini (Sebagai Requester)
        // Menggunakan 'requestsMade' sesuai dengan schema.prisma kamu
        requestsMade: {
          select: {
            id: true,
            status: true,
            duration_hours: true,
            notes: true,
            // Tarik data skill yang dipesan agar Frontend bisa menampilkan judulnya
            skill: {
              select: {
                id: true,
                title: true,
                category: true
              }
            },
            // Tarik data si penyedia jasa (Provider)
            provider: {
              select: {
                id: true,
                name: true,
                avatar_url: true,
                average_rating: true
              }
            }
          },
          // Urutkan dari transaksi yang paling baru
          orderBy: { expired_at: 'desc' } 
        },

        // 4. RELASI 3: Riwayat Swap yang DITERIMA user ini (Sebagai Provider)
        // Menggunakan 'requestsReceived' sesuai dengan schema.prisma kamu
        requestsReceived: {
          select: {
            id: true,
            status: true,
            duration_hours: true,
            notes: true,
            // Tarik data skill miliknya yang sedang dipesan
            skill: {
              select: {
                id: true,
                title: true
              }
            },
            // Tarik data si pemesan (Requester)
            requester: {
              select: {
                id: true,
                name: true,
                avatar_url: true,
                average_rating: true
              }
            }
          },
          // Urutkan dari pesanan yang paling baru masuk
          orderBy: { expired_at: 'desc' }
        }
      }
    });

    if (!userProfile) {
      return next(new AppError('Data profil tidak ditemukan di sistem.', 404));
    }

    res.status(200).json({
      status: 'success',
      data: userProfile
    });

  } catch (error) {
    next(error);
  }
};

// ==========================================
// 2. FUNGSI UNTUK MEMPERBARUI DATA PROFIL
// ==========================================
export const updateProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Tangkap data yang dikirim user dari body request
        const { bio, avatar_url } = req.body;

        // Ambil ID user dari token JWT yang sudah divalidasi
        const userId = req.user.id;

        // Cari data user di database berdasarkan ID
        const currentUser = await prisma.user.findUnique({ where: {id: userId} });

        // Jika user tidak ditemukan di database
        if(!currentUser) {
            return next(new AppError('User tidak ditemukan', 404));
        }

        // Gabungkan data lama dengan data baru untuk kalkulasi
        const updateData = {...currentUser, bio, avatar_url };

        // Hitung Persentase kelengkapan profil
        const completionPercentage = calculateCompletion(updateData);

        // Simpan perubahan ke dalam database
        const updateUser = await prisma.user.update({
            where: {id: userId},
            data: {
                bio,
                avatar_url,
                profile_completion: completionPercentage,
            },
            // Pilih kolom yang aman untuk dikembalikan ke frontend (tanpa password_hash)
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
       next(error);
    }
};