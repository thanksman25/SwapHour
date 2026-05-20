import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

// Buat koneksi ke database menggunakan driver asli PostgreSQL
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

// Pasang jembatan penghubung (adapter) untuk Prisma
const adapter = new PrismaPg(pool);

// Masukkan adapter ke dalam mesin Prisma
const prisma = new PrismaClient({ adapter });

export default prisma;