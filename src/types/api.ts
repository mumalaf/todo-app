// API 관련 타입 정의

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page?: number;
  limit?: number;
}

// 요청 타입
export interface CreateItemRequest {
  name: string;
  memo?: string;
  imageUrl?: string;
  isCompleted?: boolean;
}

export interface UpdateItemRequest {
  name?: string;
  memo?: string;
  imageUrl?: string;
  isCompleted?: boolean;
}

export interface ImageUploadResponse {
  url: string;
  filename?: string;
}