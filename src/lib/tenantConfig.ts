// 테넌트 ID 관리
// 실제 운영에서는 사용자 인증 정보나 환경 변수에서 가져올 수 있습니다.

const DEFAULT_TENANT_ID = 'my-todo-app';

export function getCurrentTenantId(): string {
  // 개발 환경에서는 기본 테넌트 ID 사용
  if (process.env.NODE_ENV === 'development') {
    return process.env.NEXT_PUBLIC_TENANT_ID || DEFAULT_TENANT_ID;
  }
  
  // 운영 환경에서는 환경 변수에서 가져오기
  return process.env.NEXT_PUBLIC_TENANT_ID || DEFAULT_TENANT_ID;
}

export function setTenantId(tenantId: string): void {
  // 향후 로컬 스토리지나 쿠키에 저장할 수 있음
  if (typeof window !== 'undefined') {
    localStorage.setItem('tenantId', tenantId);
  }
}

export function getTenantIdFromStorage(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('tenantId');
  }
  return null;
}