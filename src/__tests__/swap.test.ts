import request from 'supertest';
import app from '../../src/index';
import { generateToken } from '../../src/utils/jwt';

// ============================================================
// Mock Prisma
// ============================================================
jest.mock('../../src/utils/prismaClient', () => ({
  skill: { findUnique: jest.fn() },
  user: { findUnique: jest.fn() },
  swapRequest: { findUnique: jest.fn(), update: jest.fn() },
  notification: { create: jest.fn() },
  $transaction: jest.fn(),
}));

import prisma from '../../src/utils/prismaClient';

const REQUESTER_ID = 'requester-001';
const PROVIDER_ID = 'provider-001';
const REQUESTER_TOKEN = `Bearer ${generateToken(REQUESTER_ID)}`;
const PROVIDER_TOKEN = `Bearer ${generateToken(PROVIDER_ID)}`;

// ============================================================
// TEST SUITE: SWAP
// ============================================================
describe('SWAP - Request & Respond', () => {

  // ---------- CREATE SWAP REQUEST ----------
  describe('POST /api/swaps', () => {

    it('berhasil membuat swap request jika profil >= 80% dan saldo cukup', async () => {
      // Skill milik provider
      (prisma.skill.findUnique as jest.Mock).mockResolvedValue({
        id: 'skill-001',
        title: 'Belajar Python',
        user_id: PROVIDER_ID,
        duration_hours: 2,
      });
      // Requester dengan profil 90% dan saldo 5
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: REQUESTER_ID,
        profile_completion: 90,
        credit_hours: 5,
      });
      // Simulasi transaksi berhasil
      (prisma.$transaction as jest.Mock).mockResolvedValue({
        id: 'swap-001',
        status: 'pending',
      });

      const res = await request(app)
        .post('/api/swaps')
        .set('Authorization', REQUESTER_TOKEN)
        .send({ skill_id: 'skill-001', notes: 'Tolong ajarkan saya' });

      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
    });

    it('gagal jika profil kurang dari 80%', async () => {
      (prisma.skill.findUnique as jest.Mock).mockResolvedValue({
        id: 'skill-001',
        title: 'Belajar Python',
        user_id: PROVIDER_ID,
        duration_hours: 2,
      });
      // Profil baru 50%
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: REQUESTER_ID,
        profile_completion: 50,
        credit_hours: 5,
      });

      const res = await request(app)
        .post('/api/swaps')
        .set('Authorization', REQUESTER_TOKEN)
        .send({ skill_id: 'skill-001' });

      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/profil harus minimal 80%/i);
    });

    it('gagal jika saldo tidak mencukupi', async () => {
      (prisma.skill.findUnique as jest.Mock).mockResolvedValue({
        id: 'skill-001',
        title: 'Belajar Python',
        user_id: PROVIDER_ID,
        duration_hours: 10, // butuh 10 jam
      });
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: REQUESTER_ID,
        profile_completion: 90,
        credit_hours: 2, // saldo hanya 2 jam
      });

      const res = await request(app)
        .post('/api/swaps')
        .set('Authorization', REQUESTER_TOKEN)
        .send({ skill_id: 'skill-001' });

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/saldo/i);
    });

    it('gagal jika mencoba request skill milik sendiri', async () => {
      (prisma.skill.findUnique as jest.Mock).mockResolvedValue({
        id: 'skill-001',
        user_id: REQUESTER_ID, // skill milik requester sendiri
        duration_hours: 2,
      });
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: REQUESTER_ID,
        profile_completion: 90,
        credit_hours: 5,
      });

      const res = await request(app)
        .post('/api/swaps')
        .set('Authorization', REQUESTER_TOKEN)
        .send({ skill_id: 'skill-001' });

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/milik sendiri/i);
    });

    it('gagal jika tidak membawa token', async () => {
      const res = await request(app)
        .post('/api/swaps')
        .send({ skill_id: 'skill-001' });

      expect(res.status).toBe(401);
    });
  });

  // ---------- RESPOND SWAP REQUEST ----------
  describe('PATCH /api/swaps/:id/respond', () => {

    it('provider berhasil menerima (accept) swap request', async () => {
      (prisma.swapRequest.findUnique as jest.Mock).mockResolvedValue({
        id: 'swap-001',
        provider_id: PROVIDER_ID,
        requester_id: REQUESTER_ID,
        status: 'pending',
      });
      (prisma.swapRequest.update as jest.Mock).mockResolvedValue({
        id: 'swap-001',
        status: 'active',
      });
      (prisma.notification.create as jest.Mock).mockResolvedValue({});

      const res = await request(app)
        .patch('/api/swaps/swap-001/respond')
        .set('Authorization', PROVIDER_TOKEN)
        .send({ action: 'accept' });

      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('active');
    });

    it('provider berhasil menolak (reject) swap request dan saldo dikembalikan', async () => {
      (prisma.swapRequest.findUnique as jest.Mock).mockResolvedValue({
        id: 'swap-001',
        provider_id: PROVIDER_ID,
        requester_id: REQUESTER_ID,
        status: 'pending',
        duration_hours: 2,
      });
      (prisma.$transaction as jest.Mock).mockResolvedValue({
        id: 'swap-001',
        status: 'rejected',
      });

      const res = await request(app)
        .patch('/api/swaps/swap-001/respond')
        .set('Authorization', PROVIDER_TOKEN)
        .send({ action: 'reject' });

      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('rejected');
    });

    it('gagal jika bukan provider yang merespons', async () => {
      (prisma.swapRequest.findUnique as jest.Mock).mockResolvedValue({
        id: 'swap-001',
        provider_id: 'provider-lain', // bukan provider yang login
        status: 'pending',
      });

      const res = await request(app)
        .patch('/api/swaps/swap-001/respond')
        .set('Authorization', PROVIDER_TOKEN)
        .send({ action: 'accept' });

      expect(res.status).toBe(400);
    });
  });
});
