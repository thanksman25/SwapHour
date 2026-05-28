// Shared TypeScript types untuk seluruh FE-2

export interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar_url?: string;
  credit_hours: number;
  profile_completion: number;
  average_rating: number;
  total_ratings: number;
  is_active: boolean;
  created_at: string;
}

export interface Skill {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  category: string;
  duration_hours: number;
  is_active: boolean;
  created_at: string;
  user?: Pick<User, 'id' | 'name' | 'avatar_url' | 'average_rating'>;
}

export type SwapStatus = 'pending' | 'active' | 'completed' | 'rejected' | 'expired';

export interface SwapRequest {
  id: string;
  requester_id: string;
  provider_id: string;
  skill_id: string;
  status: SwapStatus;
  duration_hours: number;
  notes?: string;
  requester_completed: boolean;
  provider_completed: boolean;
  expired_at: string;
  created_at: string;
  skill?: Pick<Skill, 'id' | 'title' | 'category'>;
  requester?: Pick<User, 'id' | 'name' | 'avatar_url'>;
  provider?: Pick<User, 'id' | 'name' | 'avatar_url'>;
}

export type TxType = 'credit' | 'debit' | 'hold' | 'release';

export interface WalletTransaction {
  id: string;
  user_id: string;
  swap_id?: string;
  type: TxType;
  amount: number;
  balance_after: number;
  description: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  message: string;
  is_read: boolean;
  reference_id?: string;
  created_at: string;
}

// API Response wrappers
export interface ApiResponse<T> {
  status: 'success' | 'error';
  data: T;
  message?: string;
}

export interface ApiListResponse<T> {
  status: 'success' | 'error';
  results: number;
  data: T[];
}
