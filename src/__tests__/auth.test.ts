import request from 'supertest';
import app from '../../src/index';

// ============================================================
// Mock Prisma agar test tidak menyentuh database sungguhan
// ============================================================
jest.mock('../../src/utils/prismaClient', () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}));

import prisma from '../../src/utils/prismaClient';

// ============================================================
// TEST SUITE: AUTH
// ============================================================
describe('AUTH - Register & Login', () => {

  // ---------- REGISTER ----------
  describe('POST /api/auth/register', () => {

    it('berhasil register dengan data yang valid', async () => {
      // Siapkan: email belum ada di database
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      // Siapkan: user baru berhasil dibuat
      (prisma.user.create as jest.Mock).mockResolvedValue({
        id: 'user-123',
        name: 'Budi',
        email: 'budi@email.com',
      });

      const res = await request(app)
        .post('/api/auth/register')
        .send({ name: 'Budi', email: 'budi@email.com', password: 'password123' });

      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
      expect(res.body.token).toBeDefined();
    });

    it('gagal register jika email sudah terdaftar', async () => {
      // Siapkan: email sudah ada di database
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: 'user-exist',
        email: 'budi@email.com',
      });

      const res = await request(app)
        .post('/api/auth/register')
        .send({ name: 'Budi', email: 'budi@email.com', password: 'password123' });

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/sudah terdaftar/i);
    });

    it('gagal register jika email tidak valid', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ name: 'Budi', email: 'email-tidak-valid', password: 'password123' });

      expect(res.status).toBe(400);
    });

    it('gagal register jika password kurang dari 6 karakter', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ name: 'Budi', email: 'budi@email.com', password: '123' });

      expect(res.status).toBe(400);
    });
  });

  // ---------- LOGIN ----------
  describe('POST /api/auth/login', () => {

    it('berhasil login dengan email & password yang benar', async () => {
      const bcrypt = require('bcrypt');
      const hashedPassword = await bcrypt.hash('password123', 10);

      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: 'user-123',
        email: 'budi@email.com',
        password_hash: hashedPassword,
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'budi@email.com', password: 'password123' });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.token).toBeDefined();
    });

    it('gagal login jika email tidak ditemukan', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'tidakada@email.com', password: 'password123' });

      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(/salah/i);
    });

    it('gagal login jika password salah', async () => {
      const bcrypt = require('bcrypt');
      const hashedPassword = await bcrypt.hash('password123', 10);

      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: 'user-123',
        email: 'budi@email.com',
        password_hash: hashedPassword,
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'budi@email.com', password: 'passwordsalah' });

      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(/salah/i);
    });
  });
});
