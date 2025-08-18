import { Item } from '@/types/item';
import { getCurrentTenantId } from '@/lib/tenantConfig';
import { 
  CreateItemRequest, 
  UpdateItemRequest, 
  ApiError,
  ImageUploadResponse 
} from '@/types/api';
import { validateImageFile } from '@/utils/imageValidation';
import { logError } from '@/utils/errorHandling';

const API_BASE_URL = 'https://assignment-todolist-api.vercel.app/api';

/**
 * 할 일 API 서비스 클래스
 * - 할 일 CRUD 작업을 위한 API 호출들을 용엡하게 관리
 * - 테넌트 ID 기반의 API 호출
 * - 이미지 업로드 지원
 */
export class ItemApiService {
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
      logError(error, 'API Request');
      if (error instanceof TypeError) {
        throw new Error('네트워크 오류: 인터넷 연결을 확인해주세요.');
      }
      throw error;
    }
  }

  /**
   * 할 일 목록 조회
   * @returns 모든 할 일 데이터 배열
   */
  async getItems(): Promise<Item[]> {
    const response = await this.request<Item[]>(`/${this.tenantId}/items`);
    return response;
  }

  /**
   * 특정 할 일 상세 조회
   * @param id 할 일 ID
   * @returns 할 일 상세 데이터
   */
  async getItem(id: number): Promise<Item> {
    const response = await this.request<Item>(`/${this.tenantId}/items/${id}`);
    return response;
  }

  /**
   * 새로운 할 일 생성
   * @param data 할 일 생성 데이터
   * @returns 생성된 할 일 데이터
   */
  async createItem(data: CreateItemRequest): Promise<Item> {
    const response = await this.request<Item>(`/${this.tenantId}/items`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  }

  /**
   * 할 일 정보 수정
   * @param id 할 일 ID
   * @param data 수정할 데이터
   * @returns 수정된 할 일 데이터
   */
  async updateItem(id: number, data: UpdateItemRequest): Promise<Item> {
    const response = await this.request<Item>(`/${this.tenantId}/items/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return response;
  }

  /**
   * 할 일 삭제
   * @param id 삭제할 할 일 ID
   */
  async deleteItem(id: number): Promise<void> {
    await this.request(`/${this.tenantId}/items/${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * 이미지 파일 업로드
   * - 파일 검증: 영어 파일명, 5MB 이하, 지원 형식
   * @param file 업로드할 이미지 파일
   * @returns 업로드된 이미지 URL
   */
  async uploadImage(file: File): Promise<string> {
    // 이미지 파일 검증
    const validationError = validateImageFile(file);
    if (validationError) {
      throw new Error(validationError.message);
    }

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${API_BASE_URL}/${this.tenantId}/images/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('이미지 업로드 실패');
      }

      const result: ImageUploadResponse = await response.json();
      return result.url;
    } catch (error) {
      logError(error, 'Image Upload');
      if (error instanceof Error) {
        throw error; // 기존 에러 메시지 유지
      }
      throw new Error('이미지 업로드 중 오류가 발생했습니다.');
    }
  }

  // 테넌트 ID 초기화 (개발/테스트용)
  resetTenantId(): void {
    this.tenantId = getCurrentTenantId();
  }
}

// 싱글톤 인스턴스 생성
export const itemApi = new ItemApiService();

// 개발 환경에서 디버깅용
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as unknown as Record<string, unknown>).itemApi = itemApi;
}