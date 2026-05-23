import cron from 'node-cron';
import prisma from '../utils/prismaClient';

export const startCronJobs = () => {
  // Jadwal: Menjalankan skrip ini setiap 1 menit (untuk testing) atau gunakan '0 * * * *' untuk setiap 1 jam di production
  cron.schedule('* * * * *', async () => {
    console.log('[CRON] Mengecek request pending yang kedaluwarsa...');

    try {
      // 1. Cari semua Swap Request yang statusnya 'pending' dan expired_at-nya sudah lewat dari waktu sekarang
      const expiredSwaps = await prisma.swapRequest.findMany({
        where: {
          status: 'pending',
          expired_at: { lte: new Date() } // Waktu kadaluwarsa <= waktu detik ini
        }
      });

      if (expiredSwaps.length === 0) return; // Jika tidak ada, berhenti.

      // 2. Proses satu per satu menggunakan Atomic Transaction
      for (const swap of expiredSwaps) {
        await prisma.$transaction(async (tx) => {
          
          // a. Ubah status menjadi expired
          await tx.swapRequest.update({
            where: { id: swap.id },
            data: { status: 'expired' }
          });

          // b. Kembalikan (Refund) saldo yang ditahan ke Requester
          const duration = Number(swap.duration_hours);
          const refundedUser = await tx.user.update({
            where: { id: swap.requester_id },
            data: { credit_hours: { increment: duration } }
          });

          // c. Catat Mutasi Release
          await tx.walletTransaction.create({
            data: {
              user_id: swap.requester_id,
              swap_id: swap.id,
              type: 'release',
              amount: duration,
              balance_after: refundedUser.credit_hours,
              description: `Pengembalian saldo otomatis karena request expired`
            }
          });

          // d. Beri notifikasi ke Requester
          await tx.notification.create({
            data: {
              user_id: swap.requester_id,
              type: 'swap_expired',
              message: `Request Anda telah kedaluwarsa karena tidak ada respons dalam 48 jam. Saldo Anda dikembalikan.`,
              reference_id: swap.id
            }
          });

        });
        console.log(`[CRON] Swap ID ${swap.id} berhasil di-expire dan saldo dikembalikan.`);
      }
    } catch (error) {
      console.error('[CRON Error]:', error);
    }
  });
};