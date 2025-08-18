# TODO 애플리케이션

Next.js, TypeScript, Tailwind CSS로 구현된 할 일 관리 애플리케이션입니다.

## 🎯 주요 기능

- ✅ **할 일 관리**: 생성, 조회, 수정, 삭제
- 📝 **할 일 상세 정보**: 제목 편집, 메모 작성, 상태 변경
- 🖼️ **이미지 업로드**: 할 일에 이미지 첨부 (영어 파일명, 5MB 이하)
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크탑 최적화
- 🔄 **실시간 동기화**: API와의 실시간 데이터 동기화

## 🛠️ 기술 스택

- **프레임워크**: Next.js 15+ (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS v4
- **상태 관리**: React Hooks (useState, useEffect, useCallback)
- **API 통신**: Fetch API with error handling
- **폼 관리**: React Hook Form + Zod
- **아이콘**: Lucide React
- **상태 관리**: Zustand (일부 사용)

## 📁 프로젝트 구조

```
src/
├── app/                      # Next.js App Router
│   ├── page.tsx             # 메인 할 일 목록 페이지 (/)
│   ├── todo/[id]/           # 할 일 상세 페이지 (/items/{id})
│   ├── layout.tsx           # 전역 레이아웃
│   └── globals.css          # 전역 스타일
├── components/              # 재사용 가능한 컴포넌트
│   ├── header/             # 헤더 컴포넌트들
│   │   ├── HeaderCombined.tsx
│   │   ├── HeaderFull.tsx
│   │   ├── HeaderLogo.tsx
│   │   └── ResponsiveHeader.tsx
│   ├── ui/                 # UI 기본 컴포넌트들
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── EmptyState.tsx
│   │   └── SearchInput.tsx
│   └── TodoItem.tsx        # 할 일 아이템 컴포넌트
├── hooks/                  # 커스텀 React 훅
│   ├── useApiTodos.ts     # 할 일 목록 관리 훅
│   └── useApiTodoDetail.ts # 할 일 상세 관리 훅
├── services/              # API 서비스 레이어
│   └── todoApi.ts         # 할 일 API 클라이언트
├── types/                 # TypeScript 타입 정의
│   ├── todo.ts           # 할 일 관련 타입
│   ├── api.ts            # API 요청/응답 타입
│   └── common.ts         # 공통 유틸리티 타입
├── utils/                # 유틸리티 함수
│   └── imageValidation.ts # 이미지 업로드 검증
├── lib/                  # 라이브러리 설정
│   ├── utils.ts          # 일반 유틸리티
│   └── tenantConfig.ts   # 테넌트 관리
└── constants/            # 상수 정의
    └── index.ts         # 전역 상수
```

## 🎨 UI/UX 특징

### 반응형 디자인
- **모바일**: 375px 이상, 단일 컬럼 레이아웃
- **태블릿**: 768px 이상, 적응형 요소 크기
- **데스크탑**: 1024px 이상, 2컬럼 레이아웃

### 컬러 시스템
- **주요 색상**: Purple 계열 (Purple 100, 200, 500)
- **회색 음영**: Slate 계열 (100~900)
- **상태 색상**: Rose (에러), Lime (성공), Amber (경고)

## 🔧 주요 기능 구현

### 1. 할 일 목록 페이지 (/)
- 진행 중인 할 일과 완료된 할 일 분리 표시
- 실시간 할 일 추가 (입력 + 엔터키 또는 버튼 클릭)
- 완료/미완료 상태 토글
- 빈 상태에 대한 사용자 친화적 UI

### 2. 할 일 상세 페이지 (/items/[id])
- **제목 편집**: 인라인 편집 모드 (편집/저장/취소)
- **상태 변경**: 체크박스를 통한 완료/미완료 토글
- **메모 작성**: 자유로운 메모 입력 및 수정
- **이미지 첨부**: 
  - 파일 검증 (영어 파일명, 5MB 이하, 지원 형식)
  - 드래그 앤 드롭 또는 클릭 업로드
  - 이미지 미리보기 및 수정

### 3. 이미지 업로드 검증
```typescript
// 검증 규칙
- 파일명: 영어, 숫자, '.', '_', '-'만 허용
- 파일 크기: 5MB 이하
- 지원 형식: JPEG, PNG, GIF, WebP
```

## 🚀 시작하기

### 필수 요구사항
- Node.js 18 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:3000 열기
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 타입 체크
npm run lint
```

## 🌐 API 연동

외부 API와 연동하여 데이터를 관리합니다:

**Base URL**: `https://assignment-todolist-api.vercel.app/api`

### API 엔드포인트
- `GET /{tenantId}/items` - 할 일 목록 조회
- `POST /{tenantId}/items` - 새 할 일 생성
- `GET /{tenantId}/items/{id}` - 할 일 상세 조회
- `PATCH /{tenantId}/items/{id}` - 할 일 수정
- `DELETE /{tenantId}/items/{id}` - 할 일 삭제
- `POST /images` - 이미지 업로드

### 데이터 구조
```typescript
interface Todo {
  id: string;
  name: string;
  memo?: string;
  imageUrl?: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## 📱 반응형 브레이크포인트

```javascript
// tailwind.config.js
screens: {
  'mobile': '375px',   // 모바일
  'tablet': '768px',   // 태블릿
  'desktop': '1024px'  // 데스크탑
}
```