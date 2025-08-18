import { Item, ItemFilter, ItemStats } from '@/types/item';

/**
 * 클래스명을 조건부로 결합하는 유틸리티 함수
 */
export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Item 목록을 필터링하는 함수
 */
export function filterItems(items: Item[], filter: ItemFilter): Item[] {
  switch (filter) {
    case 'completed':
      return items.filter(item => item.isCompleted);
    case 'active':
      return items.filter(item => !item.isCompleted);
    default:
      return items;
  }
}

/**
 * Item 통계를 계산하는 함수
 */
export function calculateItemStats(items: Item[]): ItemStats {
  return {
    total: items.length,
    completed: items.filter(item => item.isCompleted).length,
    active: items.filter(item => !item.isCompleted).length
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

// 이미지 검증 기능은 utils/imageValidation.ts로 이동됨

/**
 * 디바운스 함수
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
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