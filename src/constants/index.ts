// 앱 전체에서 사용되는 상수들

export const APP_CONFIG = {
  name: 'Todo App',
  version: '1.0.0',
  description: 'Simple and elegant todo application'
} as const;

export const API_CONFIG = {
  baseUrl: 'https://assignment-todolist-api.vercel.app/api',
  timeout: 10000,
  retryAttempts: 3
} as const;

export const STORAGE_KEYS = {
  tenantId: 'tenantId',
  theme: 'theme',
  language: 'language'
} as const;

export const IMAGE_CONFIG = {
  maxSizeMB: 5,
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  defaultQuality: 0.8
} as const;

export const UI_CONFIG = {
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1280
  },
  animations: {
    fast: 150,
    normal: 300,
    slow: 500
  }
} as const;

export const ERROR_MESSAGES = {
  network: '네트워크 오류: 인터넷 연결을 확인해주세요.',
  server: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  notFound: '요청한 데이터를 찾을 수 없습니다.',
  validation: '입력된 데이터가 올바르지 않습니다.',
  unauthorized: '권한이 없습니다.',
  forbidden: '접근이 거부되었습니다.',
  generic: '알 수 없는 오류가 발생했습니다.'
} as const;

export const EMPTY_STATE_MESSAGES = {
  todoEmpty: {
    title: '',
    description: '할 일이 없어요. \n TODO를 새롭게 추가해주세요!',
    imageSrc: '/img/empty/write_lg.png',
    imageAlt: '할 일이 없어요'
  },
  doneEmpty: {
    title: '',
    description: '아직 다 한 일이 없어요. \n 해야 할 일을 체크해보세요!',
    imageSrc: '/img/empty/empty_lg.png',
    imageAlt: '다 한 일이 없어요'
  }
} as const;