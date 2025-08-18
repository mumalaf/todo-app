export interface Item {
  id: number;
  tenantId: string;
  name: string;
  memo: string | null;
  imageUrl: string | null;
  isCompleted: boolean;
}

// UI에서 사용하는 필터 타입
export type ItemFilter = 'all' | 'active' | 'completed';

// Item 상태 관련 타입
export interface ItemStats {
  total: number;
  completed: number;
  active: number;
}