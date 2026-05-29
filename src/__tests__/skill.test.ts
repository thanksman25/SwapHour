import request from 'supertest';
import app from '../../src/index';
import { generateToken } from '../../src/utils/jwt';

// ============================================================
// Mock Prisma
// ============================================================
jest.mock('../../src/utils/prismaClient', () => ({
  skill: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

import prisma from '../../src/utils/prismaClient';

// Token valid untuk simulasi user yang sudah login
const USER_ID = 'user-abc';
const TOKEN = generateToken(USER_ID);
const AUTH_HEADER = `Bearer ${TOKEN}`;

// ============================================================
// TEST SUITE: SKILL
// ============================================================
describe('SKILL - CRUD Skill', () => {

  // ---------- CREATE SKILL ----------
  describe('POST /api/skills', () => {

    it('berhasil membuat skill baru jika sudah login', async () => {
      (prisma.skill.create as jest.Mock).mockResolvedValue({
        id: 'skill-001',
        title: 'Belajar React',
        category: 'Programming',
        description: 'Mengajarkan React dari nol',
        duration_hours: 2,
        user_id: USER_ID,
      });

      const res = await request(app)
        .post('/api/skills')
        .set('Authorization', AUTH_HEADER)
        .send({
          title: 'Belajar React',
          category: 'Programming',
          description: 'Mengajarkan React dari nol',
          duration_hours: 2,
        });

      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
      expect(res.body.data.title).toBe('Belajar React');
    });

    it('gagal membuat skill jika tidak ada token (belum login)', async () => {
      const res = await request(app)
        .post('/api/skills')
        .send({ title: 'Belajar React', category: 'Programming' });

      expect(res.status).toBe(401);
    });
  });

  // ---------- GET ALL SKILLS ----------
  describe('GET /api/skills', () => {

    it('berhasil mengambil daftar semua skill', async () => {
      (prisma.skill.findMany as jest.Mock).mockResolvedValue([
        { id: 'skill-001', title: 'React', category: 'Programming' },
        { id: 'skill-002', title: 'Design UI', category: 'Design' },
      ]);

      const res = await request(app).get('/api/skills');

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.results).toBe(2);
      expect(res.body.data).toHaveLength(2);
    });

    it('berhasil filter skill berdasarkan category', async () => {
      (prisma.skill.findMany as jest.Mock).mockResolvedValue([
        { id: 'skill-001', title: 'React', category: 'Programming' },
      ]);

      const res = await request(app).get('/api/skills?category=Programming');

      expect(res.status).toBe(200);
      expect(res.body.data[0].category).toBe('Programming');
    });
  });

  // ---------- UPDATE SKILL ----------
  describe('PATCH /api/skills/:id', () => {

    it('berhasil update skill milik sendiri', async () => {
      (prisma.skill.findUnique as jest.Mock).mockResolvedValue({
        id: 'skill-001',
        user_id: USER_ID, // milik user yang login
      });
      (prisma.skill.update as jest.Mock).mockResolvedValue({
        id: 'skill-001',
        title: 'React Advanced',
        is_active: true,
      });

      const res = await request(app)
        .put('/api/skills/skill-001')
        .set('Authorization', AUTH_HEADER)
        .send({ title: 'React Advanced' });

      expect(res.status).toBe(200);
      expect(res.body.data.title).toBe('React Advanced');
    });

    it('gagal update skill milik orang lain', async () => {
      (prisma.skill.findUnique as jest.Mock).mockResolvedValue({
        id: 'skill-001',
        user_id: 'user-orang-lain', // bukan milik user yang login
      });

      const res = await request(app)
        .put('/api/skills/skill-001')
        .set('Authorization', AUTH_HEADER)
        .send({ title: 'Coba Ubah' });

      expect(res.status).toBe(403);
    });
  });

  // ---------- DELETE SKILL ----------
  describe('DELETE /api/skills/:id', () => {

    it('berhasil menghapus skill milik sendiri', async () => {
      (prisma.skill.findUnique as jest.Mock).mockResolvedValue({
        id: 'skill-001',
        user_id: USER_ID,
      });
      (prisma.skill.delete as jest.Mock).mockResolvedValue({});

      const res = await request(app)
        .delete('/api/skills/skill-001')
        .set('Authorization', AUTH_HEADER);

      expect(res.status).toBe(204);
    });

    it('gagal menghapus skill milik orang lain', async () => {
      (prisma.skill.findUnique as jest.Mock).mockResolvedValue({
        id: 'skill-001',
        user_id: 'user-orang-lain',
      });

      const res = await request(app)
        .delete('/api/skills/skill-001')
        .set('Authorization', AUTH_HEADER);

      expect(res.status).toBe(403);
    });
  });
});
