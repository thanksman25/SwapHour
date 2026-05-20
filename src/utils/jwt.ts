import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_swaphour';

export const generateToken = (userId: string): string => {
  // Token berlaku 7 hari sesuai spesifikasi Fase 2
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '14d' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};