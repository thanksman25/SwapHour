import { Response, NextFunction } from 'express';
import prisma from '../utils/prismaClient';
import { AuthRequest } from '../middlewares/authMiddleware';

// GET /api/notifications
export const getNotifications = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { user_id: req.user.id },
      orderBy: { created_at: 'desc' } // Urutkan dari yang terbaru
    });
    res.status(200).json({ status: 'success', data: notifications });
  } catch (error) { next(error); }
};

// PATCH /api/notifications/:id/read
export const markAsRead = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    await prisma.notification.update({
      where: { id },
      data: { is_read: true }
    });
    res.status(200).json({ status: 'success', message: 'Notifikasi dibaca' });
  } catch (error) { next(error); }
};