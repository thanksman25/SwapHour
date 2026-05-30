import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prismaClient';
import { AppError } from '../utils/AppError';
import { AuthRequest } from '../middlewares/authMiddleware';

// ==========================================
// 1. CREATE SKILL
// ==========================================
export const createSkill = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Ubah 'name' menjadi 'title' sesuai database
    const { title, category, description, duration_hours } = req.body;
    
    const newSkill = await prisma.skill.create({
      data: {
        title,
        category,
        description,
        duration_hours,
        user: { 
          connect: { id: req.user.id } // Menyambungkan relasi ke tabel User
        }
      }
    });

    res.status(201).json({ status: 'success', data: newSkill });
  } catch (error) { next(error); }
};

// ==========================================
// 2. READ SKILLS 
// ==========================================
export const getSkills = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, is_active } = req.query;
    const filter: any = {};

    if (category) {
      filter.category = {
        equals: String(category),
        mode: 'insensitive'
      };
    }
    
    if (is_active !== undefined) {
      filter.is_active = is_active === 'true'; 
    }

    const skills = await prisma.skill.findMany({ 
      where: filter,
      include: {
        user: {
          select: { id: true, name: true, avatar_url: true }
        }
      }
    });
    res.status(200).json({ status: 'success', results: skills.length, data: skills });
  } catch (error) { next(error); }
};

// ==========================================
// 2.5. READ SKILL BY ID 
// ==========================================
export const getSkillById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const skill = await prisma.skill.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, avatar_url: true, bio: true, average_rating: true, total_ratings: true }
        }
      }
    });
    
    if (!skill) {
      return next(new AppError('Skill tidak ditemukan', 404));
    }
    
    res.status(200).json({ status: 'success', data: skill });
  } catch (error) { next(error); }
};

// ==========================================
// 3. UPDATE SKILL 
// ==========================================
export const updateSkill = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Tegaskan ke TypeScript bahwa id ini pasti sebuah string
    const id = req.params.id as string; 
    
    // Ubah 'name' menjadi 'title'
    const { title, category, description, is_active } = req.body;

    const existingSkill = await prisma.skill.findUnique({ where: { id } });
    
    // Ubah pengecekan menjadi user_id
    if (!existingSkill || existingSkill.user_id !== req.user.id) {
      return next(new AppError('Skill tidak ditemukan atau Anda tidak berhak mengubahnya', 403));
    }

    const updatedSkill = await prisma.skill.update({
      where: { id },
      data: { title, category, description, is_active } // Diubah menjadi title
    });

    res.status(200).json({ status: 'success', data: updatedSkill });
  } catch (error) { next(error); }
};

// ==========================================
// 4. DELETE SKILL 
// ==========================================
export const deleteSkill = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Tegaskan ke TypeScript bahwa id ini pasti sebuah string
    const id = req.params.id as string; 

    const existingSkill = await prisma.skill.findUnique({ where: { id } });
    
    // Ubah pengecekan menjadi user_id
    if (!existingSkill || existingSkill.user_id !== req.user.id) {
      return next(new AppError('Skill tidak ditemukan atau Anda tidak berhak menghapusnya', 403));
    }

    await prisma.skill.delete({ where: { id } });
    res.status(204).json({ status: 'success', data: null }); 
  } catch (error) { next(error); }
};