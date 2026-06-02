import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';

// Import Routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import skillRoutes from './routes/skillRoutes';

// Import Error Handlers
import { errorHandler } from './middlewares/errorHandlers';
import { AppError } from './utils/AppError';

import swapRoutes from './routes/swapRoutes';
import walletRoutes from './routes/walletRoutes';

import ratingRoutes from './routes/ratingRoutes';
import notificationRoutes from './routes/notificationRoutes';
import { startCronJobs } from './cron/expireRequests'; // Import asisten Cron

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/swagger'; // Import dari file yang baru dibuat

// Inisialisasi aplikasi Express
const app = express();
const PORT = process.env.PORT || 5000;

// ================= MIDDLEWARES GLOBAL =================
app.use(express.json()); // Menerima request body berupa JSON
// app.use(cors());         // Mengizinkan akses dari frontend

const corsOptions = {
  origin: [
    'http://localhost:5173', // Untuk testing lokal
    'https://swaphour-app.vercel.app' // Domain frontend Vercel kamu
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Wajib di-true jika pakai JWT di Cookie atau butuh kredensial
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(helmet());       // Keamanan standar HTTP headers
app.use(morgan('dev'));  // Logger aktivitas di terminal untuk memudahkan tracking error

// ================= ROUTES =================
// ENDPOINT WARM-UP (Mitigasi Cold Start Render)
// 1. Endpoint Health Check (Sangat penting untuk mencegah "cold start" di server gratisan)
// Render menidurkan server gratis setelah 15 menit tidak aktif.
// Endpoint ringan ini bisa dipanggil oleh UptimeRobot atau CronJob eksternal 
// setiap 10 menit agar server tetap "terjaga".
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'SwapHour API is awake and running smoothly!',
        timestamp: new Date().toISOString()
    });
});

// 2. Rute Aplikasi Utama
// Menyambungkan URL dasar dengan router yang tepat.
app.use('/api/auth', authRoutes);     // Mengurus Register & Login
app.use('/api/users', userRoutes);    // Mengurus Update Profile
app.use('/api/skills', skillRoutes);  // Mengurus CRUD Katalog Skill
app.use('/api/swaps', swapRoutes);    // Mengurus Mesin Utama Swap & Wallet
app.use('/api/wallet', walletRoutes); // Mengurus Riwayat Transaksi Wallet
app.use('/api/ratings', ratingRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ================= PENANGKAP ERROR 404 =================
// Tangkap semua rute (endpoint) yang tidak terdaftar (404 Not Found)
app.use((req: Request, res: Response, next: NextFunction) => {

  console.log("Rute yang diakses:", req.originalUrl);
  next(new AppError(`Rute ${req.originalUrl} tidak ditemukan di server ini!`, 404));
});

// ================= GLOBAL ERROR HANDLER =================
// Jaring pengaman terakhir. Wajib diletakkan di bagian PALING BAWAH dari semua middleware!
app.use(errorHandler);

// ================= START SERVER =================
// ================= START CRON JOBS =================
startCronJobs();
// Asisten otomatis sekarang akan menyala bersamaan dengan server
app.listen(PORT, () => {
    console.log(`[SERVER] API SwapHour berjalan di http://localhost:${PORT}`);
});

export default app;
module.exports = app;
