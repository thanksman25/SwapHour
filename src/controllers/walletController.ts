import { Response, NextFunction } from 'express';
import prisma from '../utils/prismaClient';
import { AuthRequest } from '../middlewares/authMiddleware';

export const getMyTransactions = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const transactions = await prisma.walletTransaction.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' }
    });
    res.status(200).json({ status: 'success', data: transactions });
  } catch (error) { next(error); }
};
