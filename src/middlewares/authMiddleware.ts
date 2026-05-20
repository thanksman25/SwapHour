import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { AppError } from '../utils/AppError';

// Memperluas interface Request Express agar bisa menyimpan data user
export interface AuthRequest extends Request {
  user?: any;
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Anda belum login. Silakan berikan token akses.', 401));
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Simpan payload token ke dalam request
    next();
  } catch (error) {
    return next(new AppError('Token tidak valid atau sudah kedaluwarsa.', 401));
  }
};