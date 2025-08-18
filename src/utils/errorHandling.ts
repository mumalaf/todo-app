// 에러 처리를 위한 유틸리티 함수들

/**
 * API 에러 타입 정의
 */
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

/**
 * 에러 객체를 표준화된 문자열로 변환
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (typeof error === 'object' && error !== null) {
    const apiError = error as ApiError;
    if (apiError.message) {
      return apiError.message;
    }
  }
  
  return '알 수 없는 오류가 발생했습니다.';
}

/**
 * API 에러를 처리하고 표준화된 에러 메시지를 반환
 */
export function handleApiError(error: unknown): string {
  const message = getErrorMessage(error);
  
  // 네트워크 에러 체크
  if (message.includes('fetch') || message.includes('network')) {
    return '네트워크 오류: 인터넷 연결을 확인해주세요.';
  }
  
  // 서버 응답 에러 체크
  if (message.includes('404')) {
    return '요청한 데이터를 찾을 수 없습니다.';
  }
  
  if (message.includes('500')) {
    return '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
  }
  
  return message;
}

/**
 * 에러를 콘솔에 로깅
 */
export function logError(error: unknown, context?: string): void {
  const message = getErrorMessage(error);
  const prefix = context ? `[${context}]` : '[Error]';
  console.error(`${prefix} ${message}`, error);
}

/**
 * 비동기 함수를 안전하게 실행하고 에러를 처리
 */
export async function safeAsync<T>(
  asyncFn: () => Promise<T>,
  context?: string
): Promise<{ data?: T; error?: string }> {
  try {
    const data = await asyncFn();
    return { data };
  } catch (error) {
    const errorMessage = handleApiError(error);
    if (context) {
      logError(error, context);
    }
    return { error: errorMessage };
  }
}