// 공통 타입 정의

// 비동기 상태 관리를 위한 타입
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// 검증 오류 타입
export interface ValidationError {
  field: string;
  message: string;
  type?: 'required' | 'format' | 'size' | 'custom';
}

// 에러 처리를 위한 타입
export interface AppError {
  message: string;
  code?: string;
  details?: unknown;
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