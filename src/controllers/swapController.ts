import { Response, NextFunction } from 'express';
import prisma from '../utils/prismaClient';
import { AppError } from '../utils/AppError';
import { AuthRequest } from '../middlewares/authMiddleware';

// ==========================================
// 1. CREATE REQUEST (Meminta Keahlian)
// ==========================================
export const createSwapRequest = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { skill_id, notes } = req.body;
    const requesterId = req.user.id;

    // 1. Ambil data skill dan data pemohon (requester)
    const skill = await prisma.skill.findUnique({ where: { id: skill_id } });
    const requester = await prisma.user.findUnique({ where: { id: requesterId } });

    if (!skill || !requester) {
      return next(new AppError('Skill atau User tidak ditemukan', 404));
    }

    // 2. Cegah user me-request skill miliknya sendiri
    if (skill.user_id === requesterId) {
      return next(new AppError('Tidak bisa me-request skill milik sendiri', 400));
    }

    // 3. Validasi Kelengkapan Profil (Syarat Fase 3: harus > 80%)
    if (requester.profile_completion < 80) {
      return next(new AppError('Profil harus minimal 80% untuk membuat request', 403));
    }

    // 4. Validasi Kecukupan Saldo
    const duration = Number(skill.duration_hours);
    const currentBalance = Number(requester.credit_hours);
    
    if (currentBalance < duration) {
      return next(new AppError('Saldo Jam Kredit tidak mencukupi', 400));
    }

    // 5. TRANSAKSI ATOMIK: Insert Request & Tahan Saldo
    // $transaction memastikan jika satu gagal, semuanya akan di-rollback (dibatalkan)
    const result = await prisma.$transaction(async (tx) => {
      // a. Buat data Swap Request (status default di database adalah 'pending')
      const newRequest = await tx.swapRequest.create({
        data: {
          requester_id: requesterId,
          provider_id: skill.user_id,
          skill_id: skill.id,
          duration_hours: duration,
          notes,
          // Waktu expired kita set 48 jam dari sekarang
          expired_at: new Date(Date.now() + 48 * 60 * 60 * 1000) 
        }
      });

      // b. Kurangi (tahan) saldo pemohon
      const updatedRequester = await tx.user.update({
        where: { id: requesterId },
        data: { credit_hours: { decrement: duration } }
      });

      // c. Catat mutasi Wallet (Hold)
      await tx.walletTransaction.create({
        data: {
          user_id: requesterId,
          swap_id: newRequest.id,
          type: 'hold',
          amount: duration,
          balance_after: updatedRequester.credit_hours,
          description: `Saldo ditahan untuk request skill: ${skill.title}`
        }
      });

      return newRequest;
    });

    res.status(201).json({ status: 'success', data: result });
  } catch (error) { next(error); }
};

// ==========================================
// 2. RESPOND REQUEST (Provider Terima/Tolak)
// ==========================================
export const respondSwapRequest = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // PERBAIKAN: Tegaskan bahwa id adalah sebuah string
    const id = req.params.id as string; 
    const { action } = req.body; // 'accept' atau 'reject'
    const providerId = req.user.id;

    // Cari request yang statusnya pending dan milik provider ini
    const swapReq = await prisma.swapRequest.findUnique({ where: { id } });

    if (!swapReq || swapReq.provider_id !== providerId || swapReq.status !== 'pending') {
      return next(new AppError('Request tidak valid atau Anda tidak berhak', 400));
    }

    if (action === 'accept') {
      // Jika diterima, ubah status jadi active
      const updatedReq = await prisma.swapRequest.update({
        where: { id },
        data: { status: 'active' }
      });
      return res.status(200).json({ status: 'success', data: updatedReq });
    } 
    
    if (action === 'reject') {
      // TRANSAKSI ATOMIK: Tolak dan kembalikan saldo
      const result = await prisma.$transaction(async (tx) => {
        // a. Ubah status jadi rejected
        const rejectedReq = await tx.swapRequest.update({
          where: { id },
          data: { status: 'rejected' }
        });

        // b. Kembalikan saldo pemohon (ditambah kembali)
        const duration = Number(swapReq.duration_hours);
        const refundedUser = await tx.user.update({
          where: { id: swapReq.requester_id },
          data: { credit_hours: { increment: duration } }
        });

        // c. Catat mutasi Wallet (Release)
        await tx.walletTransaction.create({
          data: {
            user_id: swapReq.requester_id,
            swap_id: id,
            type: 'release',
            amount: duration,
            balance_after: refundedUser.credit_hours,
            description: `Pengembalian saldo karena request ditolak`
          }
        });

        return rejectedReq;
      });
      return res.status(200).json({ status: 'success', data: result });
    }

    return next(new AppError('Action tidak dikenali (gunakan accept/reject)', 400));
  } catch (error) { next(error); }
};

// ==========================================
// 3. COMPLETE REQUEST (Eksekusi Penyelesaian)
// ==========================================
export const completeSwapRequest = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // PERBAIKAN: Tegaskan bahwa id adalah sebuah string
    const id = req.params.id as string; 
    const userId = req.user.id;

    const swapReq = await prisma.swapRequest.findUnique({ where: { id } });

    if (!swapReq || swapReq.status !== 'active') {
      return next(new AppError('Request tidak ditemukan atau belum aktif', 400));
    }

    // Tentukan siapa yang menekan tombol selesai
    const isRequester = swapReq.requester_id === userId;
    const isProvider = swapReq.provider_id === userId;

    if (!isRequester && !isProvider) {
      return next(new AppError('Akses ditolak', 403));
    }

    // Update flag konfirmasi berdasarkan siapa yang menekan
    const updateData: any = {};
    if (isRequester) updateData.requester_completed = true;
    if (isProvider) updateData.provider_completed = true;

    // Simpan konfirmasi sementara
    const updatedReq = await prisma.swapRequest.update({
      where: { id },
      data: updateData
    });

    // Cek apakah KEDUA BELAH PIHAK sudah setuju (Tandai Selesai)
    if (updatedReq.requester_completed && updatedReq.provider_completed) {
      
      // TRANSAKSI ATOMIK: Eksekusi final transfer saldo
      await prisma.$transaction(async (tx) => {
        // 1. Ubah status jadi completed
        await tx.swapRequest.update({
          where: { id },
          data: { status: 'completed' }
        });

        // 2. Tambahkan saldo ke Provider
        const duration = Number(swapReq.duration_hours);
        const providerData = await tx.user.update({
          where: { id: swapReq.provider_id },
          data: { credit_hours: { increment: duration } }
        });

        // 3. Catat Wallet Mutasi: Credit untuk Provider (Penerimaan)
        await tx.walletTransaction.create({
          data: {
            user_id: swapReq.provider_id,
            swap_id: id,
            type: 'credit',
            amount: duration,
            balance_after: providerData.credit_hours,
            description: `Pembayaran masuk dari Swap ID: ${id}`
          }
        });

        // 4. Catat Wallet Mutasi: Debit untuk Requester (Pencatatan final dari Hold)
        // Kita hanya mencatat history 'debit', tidak memotong saldo lagi karena sudah dipotong di awal
        const requesterData = await tx.user.findUnique({ where: { id: swapReq.requester_id } });
        await tx.walletTransaction.create({
          data: {
            user_id: swapReq.requester_id,
            swap_id: id,
            type: 'debit',
            amount: duration,
            balance_after: requesterData!.credit_hours,
            description: `Pembayaran sukses untuk Swap ID: ${id}`
          }
        });
      });

      return res.status(200).json({ status: 'success', message: 'Swap berhasil diselesaikan!' });
    }

    // Jika baru satu pihak yang konfirmasi
    res.status(200).json({ status: 'success', message: 'Menunggu pihak lain mengkonfirmasi selesai.' });
  } catch (error) { next(error); }
};