// 이미지 검증을 위한 유틸리티 함수

// 이미지 검증 전용 에러 타입
export interface ImageValidationError {
  type: 'filename' | 'size' | 'format';
  message: string;
}

export const validateImageFile = (file: File): ImageValidationError | null => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ENGLISH_FILENAME_REGEX = /^[a-zA-Z0-9._-]+$/;
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

  // 파일명 검증 (영어만 허용)
  const fileName = file.name;
  if (!ENGLISH_FILENAME_REGEX.test(fileName)) {
    return {
      type: 'filename',
      message: '파일명은 영어, 숫자, 점(.), 언더스코어(_), 하이픈(-)만 사용 가능합니다.'
    };
  }

  // 파일 크기 검증 (5MB 이하)
  if (file.size > MAX_FILE_SIZE) {
    return {
      type: 'size',
      message: '파일 크기는 5MB 이하여야 합니다.'
    };
  }

  // 파일 형식 검증
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      type: 'format',
      message: '지원되는 이미지 형식: JPEG, PNG, GIF, WebP'
    };
  }

  return null; // 검증 통과
};

// 파일 크기 포매팅은 lib/utils.ts에서 임포트
export { formatFileSize } from '@/lib/utils';

/**
 * 이미지 파일인지 확인하는 함수
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}