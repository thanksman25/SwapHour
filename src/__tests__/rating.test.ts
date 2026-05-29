import request from 'supertest';
import app from '../../src/index';
import { generateToken } from '../../src/utils/jwt';

// ============================================================
// Mock Prisma
// ============================================================
jest.mock('../../src/utils/prismaClient', () => ({
  swapRequest: { findUnique: jest.fn() },
  $transaction: jest.fn(),
}));

import prisma from '../../src/utils/prismaClient';

const REQUESTER_ID = 'requester-001';
const PROVIDER_ID  = 'provider-001';
const REQUESTER_TOKEN = `Bearer ${generateToken(REQUESTER_ID)}`;

// ============================================================
// TEST SUITE: RATING
// ============================================================
describe('RATING - Memberikan Rating', () => {

  describe('POST /api/ratings', () => {

    it('berhasil memberikan rating pada swap yang sudah selesai', async () => {
      (prisma.swapRequest.findUnique as jest.Mock).mockResolvedValue({
        id: 'swap-selesai',
        status: 'completed',
        requester_id: REQUESTER_ID,
        provider_id: PROVIDER_ID,
      });
      (prisma.$transaction as jest.Mock).mockResolvedValue({
        id: 'rating-001',
        score: 5,
        comment: 'Sangat membantu!',
      });

      const res = await request(app)
        .post('/api/ratings')
        .set('Authorization', REQUESTER_TOKEN)
        .send({ swap_id: 'swap-selesai', score: 5, comment: 'Sangat membantu!' });

      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
    });

    it('gagal jika swap belum selesai (status bukan completed)', async () => {
      (prisma.swapRequest.findUnique as jest.Mock).mockResolvedValue({
        id: 'swap-aktif',
        status: 'active', // belum selesai
        requester_id: REQUESTER_ID,
        provider_id: PROVIDER_ID,
      });

      const res = await request(app)
        .post('/api/ratings')
        .set('Authorization', REQUESTER_TOKEN)
        .send({ swap_id: 'swap-aktif', score: 5 });

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/sudah selesai/i);
    });

    it('gagal jika skor di bawah 1', async () => {
      (prisma.swapRequest.findUnique as jest.Mock).mockResolvedValue({
        id: 'swap-selesai',
        status: 'completed',
        requester_id: REQUESTER_ID,
        provider_id: PROVIDER_ID,
      });

      const res = await request(app)
        .post('/api/ratings')
        .set('Authorization', REQUESTER_TOKEN)
        .send({ swap_id: 'swap-selesai', score: 0 });

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/antara 1 dan 5/i);
    });

    it('gagal jika skor di atas 5', async () => {
      (prisma.swapRequest.findUnique as jest.Mock).mockResolvedValue({
        id: 'swap-selesai',
        status: 'completed',
        requester_id: REQUESTER_ID,
        provider_id: PROVIDER_ID,
      });

      const res = await request(app)
        .post('/api/ratings')
        .set('Authorization', REQUESTER_TOKEN)
        .send({ swap_id: 'swap-selesai', score: 6 });

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/antara 1 dan 5/i);
    });

    it('gagal jika user tidak terlibat dalam swap tersebut', async () => {
      const outsiderToken = `Bearer ${generateToken('user-luar')}`;

      (prisma.swapRequest.findUnique as jest.Mock).mockResolvedValue({
        id: 'swap-selesai',
        status: 'completed',
        requester_id: REQUESTER_ID,   // bukan 'user-luar'
        provider_id: PROVIDER_ID,     // bukan 'user-luar'
      });

      const res = await request(app)
        .post('/api/ratings')
        .set('Authorization', outsiderToken)
        .send({ swap_id: 'swap-selesai', score: 4 });

      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/tidak terlibat/i);
    });

    it('gagal jika tidak membawa token', async () => {
      const res = await request(app)
        .post('/api/ratings')
        .send({ swap_id: 'swap-selesai', score: 5 });

      expect(res.status).toBe(401);
    });
  });
});
