import { BaseEntity } from './common';

export interface Todo extends BaseEntity {
  name: string;
  memo?: string;
  imageUrl?: string;
  isCompleted: boolean;
}

// UI에서 사용하는 필터 타입
export type TodoFilter = 'all' | 'active' | 'completed';

// Todo 상태 관련 타입
export interface TodoStats {
  total: number;
  completed: number;
  active: number;
}