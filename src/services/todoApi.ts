import { Todo } from '@/types/todo';
import { getCurrentTenantId } from '@/lib/tenantConfig';
import { 
  CreateItemRequest, 
  UpdateItemRequest, 
  ApiError,
  ImageUploadResponse 
} from '@/types/api';

const API_BASE_URL = 'https://assignment-todolist-api.vercel.app/api';

export class TodoApiService {
  private tenantId: string;

  constructor() {
    this.tenantId = getCurrentTenantId();
  }

  setTenantId(tenantId: string) {
    this.tenantId = tenantId;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const apiError: ApiError = {
          message: errorData.message || `API 요청 실패: ${response.status} ${response.statusText}`,
          status: response.status,
          code: errorData.code
        };
        throw apiError;
      }

      return response.json();
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error('네트워크 오류: 인터넷 연결을 확인해주세요.');
      }
      throw error;
    }
  }

  // 할 일 목록 조회
  async getTodos(): Promise<Todo[]> {
    const response = await this.request<Todo[]>(`/${this.tenantId}/items`);
    return response;
  }

  // 할 일 상세 조회
  async getTodo(id: string): Promise<Todo> {
    const response = await this.request<Todo>(`/${this.tenantId}/items/${id}`);
    return response;
  }

  // 할 일 생성
  async createTodo(data: CreateItemRequest): Promise<Todo> {
    const response = await this.request<Todo>(`/${this.tenantId}/items`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  }

  // 할 일 수정
  async updateTodo(id: string, data: UpdateItemRequest): Promise<Todo> {
    const response = await this.request<Todo>(`/${this.tenantId}/items/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return response;
  }

  // 할 일 삭제
  async deleteTodo(id: string): Promise<void> {
    await this.request(`/${this.tenantId}/items/${id}`, {
      method: 'DELETE',
    });
  }

  // 이미지 업로드
  async uploadImage(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${API_BASE_URL}/images`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('이미지 업로드 실패');
      }

      const result: ImageUploadResponse = await response.json();
      return result.url;
    } catch (error) {
      throw new Error('이미지 업로드 중 오류가 발생했습니다.');
    }
  }

  // 테넌트 ID 초기화 (개발/테스트용)
  resetTenantId(): void {
    this.tenantId = getCurrentTenantId();
  }
}

// 싱글톤 인스턴스 생성
export const todoApi = new TodoApiService();

// 개발 환경에서 디버깅용
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).todoApi = todoApi;
}