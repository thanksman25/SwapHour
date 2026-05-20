import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import 'dotenv/config'

// Import Routes dan Error Handler
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middlewares/errorHandlers';
import { AppError } from './utils/AppError';

// Inisialisasi aplikasi Express
const app = express();
const PORT = process.env.PORT || 5000;

// ================= MIDDLEWARES =================
app.use(express.json()); // Menerima request body berupa JSON
app.use(cors());         // Mengizinkan Akses dari frontend
app.use(helmet());       // Keamanan standar HTTP headers
app.use(morgan('dev'));  // Logger aktivitas di terminal

// ================= ROUTES =================
// Endpoint /health sangat penting untuk mencegah "cold start" server gratisan nanti

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'SwapHour API is running smoothly!',
    });
});

// Pasang rute autentikasi
app.use('/api/auth', authRoutes);

// Tangkap semua rute (endpoint) yang tidak terdaftar (404 not found)
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Rute ${req.originalUrl} tidak ditemukan di server ini!`, 404));
});

// ================= GLOBAL ERROR HANDLER =================
// Wajib diletakkan di bagian paling bawah setelah semua rute!
app.use(errorHandler);

// ================= START SERVER =================
app.listen(PORT, () => {
    console.log(`[SERVER] API SwapHour berjalan di http://localhost:${PORT}`)
})