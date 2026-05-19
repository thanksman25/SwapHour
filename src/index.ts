import express, {Request, Response } from 'express';
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import 'dotenv/config'

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

// ================= START SERVER =================
app.listen(PORT, () => {
    console.log(`[SERVER] API SwapHour berjalan di http://localhost:${PORT}`)
})