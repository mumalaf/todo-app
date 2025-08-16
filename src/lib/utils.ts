import { Todo, TodoFilter, TodoStats } from '@/types/todo';

/**
 * 클래스명을 조건부로 결합하는 유틸리티 함수
 */
export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Todo 목록을 필터링하는 함수
 */
export function filterTodos(todos: Todo[], filter: TodoFilter): Todo[] {
  switch (filter) {
    case 'completed':
      return todos.filter(todo => todo.isCompleted);
    case 'active':
      return todos.filter(todo => !todo.isCompleted);
    default:
      return todos;
  }
}

/**
 * Todo 통계를 계산하는 함수
 */
export function calculateTodoStats(todos: Todo[]): TodoStats {
  return {
    total: todos.length,
    completed: todos.filter(todo => todo.isCompleted).length,
    active: todos.filter(todo => !todo.isCompleted).length
  };
}

/**
 * 파일 크기를 사람이 읽기 쉬운 형태로 변환
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 이미지 파일인지 확인하는 함수
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

/**
 * 이미지 파일 유효성 검사
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!isImageFile(file)) {
    return { valid: false, error: '이미지 파일만 업로드 가능합니다.' };
  }
  
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return { valid: false, error: '파일 크기는 5MB 이하여야 합니다.' };
  }
  
  return { valid: true };
}

/**
 * 디바운스 함수
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * 날짜 포맷팅 함수
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return '오늘';
  } else if (diffDays === 1) {
    return '어제';
  } else if (diffDays < 7) {
    return `${diffDays}일 전`;
  } else {
    return date.toLocaleDateString('ko-KR');
  }
}