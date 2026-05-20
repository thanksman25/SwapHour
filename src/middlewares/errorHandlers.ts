import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Format response error standar
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    // Tampilkan stack trace hanya di environment development
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};