import { Response, NextFunction } from 'express';
import prisma from '../utils/prismaClient';
import { AppError } from '../utils/AppError';
import { AuthRequest } from '../middlewares/authMiddleware';

export const createRating = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { swap_id, score, comment } = req.body;
    const raterId = req.user.id; // User yang sedang login (pemberi rating)

    // 1. Validasi skor rating (harus antara 1 sampai 5)
    if (score < 1 || score > 5) {
      return next(new AppError('Skor rating harus antara 1 dan 5', 400));
    }

    // 2. Cek apakah swap ini ada dan statusnya sudah 'completed'
    const swapReq = await prisma.swapRequest.findUnique({ where: { id: swap_id } });
    if (!swapReq || swapReq.status !== 'completed') {
      return next(new AppError('Rating hanya bisa diberikan pada Swap yang sudah selesai', 400));
    }

    // 3. Tentukan siapa yang dinilai (Ratee)
    // Jika rater adalah Requester, maka Ratee adalah Provider. Begitu sebaliknya.
    let rateeId = '';
    if (swapReq.requester_id === raterId) {
      rateeId = swapReq.provider_id;
    } else if (swapReq.provider_id === raterId) {
      rateeId = swapReq.requester_id;
    } else {
      return next(new AppError('Anda tidak terlibat dalam Swap ini', 403));
    }

    // 4. TRANSAKSI ATOMIK: Buat Rating, Kalkulasi Ulang Rata-Rata, & Kirim Notifikasi
    const result = await prisma.$transaction(async (tx) => {
      // a. Buat data rating
      const newRating = await tx.rating.create({
        data: {
          swap_id,
          rater_id: raterId,
          ratee_id: rateeId,
          score,
          comment
        }
      });

      // b. Hitung ulang rata-rata rating milik user yang dinilai
      // Agregasi database: ambil rata-rata (avg) dan jumlah data (count) dari kolom 'score'
      const aggregations = await tx.rating.aggregate({
        where: { ratee_id: rateeId },
        _avg: { score: true },
        _count: { score: true }
      });

      const newAverage = aggregations._avg.score || 0;
      const newCount = aggregations._count.score || 0;

      // c. Perbarui profil User dengan nilai rata-rata terbaru
      await tx.user.update({
        where: { id: rateeId },
        data: {
          average_rating: newAverage,
          total_ratings: newCount
        }
      });

      // d. Kirim Notifikasi ke Ratee
      await tx.notification.create({
        data: {
          user_id: rateeId,
          type: 'new_rating',
          message: `Seseorang memberikan Anda rating ${score} bintang!`,
          reference_id: swap_id
        }
      });

      return newRating;
    });

    res.status(201).json({ status: 'success', message: 'Rating berhasil diberikan', data: result });
  } catch (error: any) { 
    // Tangkap error jika melanggar unique constraint (user memberi rating 2x di swap yang sama)
    if (error.code === 'P2002') {
      return next(new AppError('Anda sudah memberikan rating untuk pertukaran ini', 400));
    }
    next(error); 
  }
};