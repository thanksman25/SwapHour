import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../utils/prismaClient';
import { generateToken } from '../utils/jwt';
import { AppError } from '../utils/AppError';
import { validationResult } from 'express-validator';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Cek apakah ada error dari express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new AppError(errors.array()[0]?.msg || 'Input tidak valid', 400));
    }

    const { email, password, name } = req.body;

    // Cek email duplikat
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return next(new AppError('Email sudah terdaftar!', 400));
    }

    // Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru (credit_hours otomatis 5.00 dari skema DB)
    const newUser = await prisma.user.create({
      data: { email, password_hash: hashedPassword, name },
    });

    const token = generateToken(newUser.id);

    res.status(201).json({
      status: 'success',
      message: 'Registrasi berhasil',
      token,
      data: { user: { id: newUser.id, name: newUser.name, email: newUser.email } }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError(errors.array()[0]?.msg || 'Input tidak valid', 400));
    }

    const { email, password } = req.body;

    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return next(new AppError('Email atau password salah.', 401));
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return next(new AppError('Email atau password salah.', 401));
    }

    const token = generateToken(user.id);

    res.status(200).json({
      status: 'success',
      message: 'Login berhasil',
      token,
    });
  } catch (error) {
    next(error);
  }
};