// 공통 타입 정의

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// 컴포넌트 props 공통 타입
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface InteractiveComponentProps extends BaseComponentProps {
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}