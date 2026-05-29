// Auth helpers — simpan/baca/hapus data auth dari localStorage
import type { User } from '../types';

export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);

export const getUser = (): User | null => {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as User; } catch { return null; }
};

export const setAuth = (token: string, user: User) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = (): boolean => !!getToken();
