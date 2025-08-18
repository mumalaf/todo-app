'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ResponsiveHeader from '@/components/header/ResponsiveHeader';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { useApiItemDetail } from '@/hooks/useApiItemDetail';

/**
 * 할 일 상세 페이지 (/items/[id])
 * - 할 일 내용 수정 (제목, 메모, 상태)
 * - 이미지 업로드 및 관리
 * - 할 일 삭제
 */
export default function ItemDetailPage() {
  const params = useParams();
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const itemId = rawId ? parseInt(rawId, 10) : 0;
  const [memo, setMemo] = useState('');
  const [itemName, setItemName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);

  // 유효하지 않은 ID 처리
  if (!rawId || isNaN(itemId) || itemId <= 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <ErrorMessage error="유효하지 않은 할 일 ID입니다." />
      </div>
    );
  }
  
  const {
    data: item,
    loading,
    error,
    uploading,
    handleComplete,
    handleDelete,
    handleImageUpload,
    handleSave,
  } = useApiItemDetail(itemId);

  // item이 로드되면 memo와 이름 초기화
  useEffect(() => {
    if (item?.memo) {
      setMemo(item.memo);
    }
    if (item?.name) {
      setItemName(item.name);
    }
  }, [item?.memo, item?.name]);

  /**
   * 할 일 정보(메모, 제목) 저장 및 목록 페이지로 이동
   */
  const onSave = () => {
    handleSave(memo, itemName);
  };

  /**
   * 할 일 제목 편집 모드 활성화
   */
  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  /**
   * 할 일 제목 편집 완료
   */
  const handleNameSave = () => {
    setIsEditingName(false);
  };

  /**
   * 할 일 제목 편집 취소
   */
  const handleNameCancel = () => {
    setItemName(item?.name || '');
    setIsEditingName(false);
  };

  /**
   * 이미지 업로드 처리
   * - 파일 검증 (영어 파일명, 5MB 이하)
   * - API로 이미지 업로드 후 할 일에 연결
   */
  const onImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await handleImageUpload(file);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner size="lg" message="할 일을 불러오는 중..." />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <ErrorMessage error={error || '할 일을 찾을 수 없습니다.'} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ResponsiveHeader />
      
      <div className="max-w-4xl mx-auto p-8">
        {/* check-list-detail 컴포넌트 */}
        <div className="mb-8">
          <div className={`flex items-center rounded-full px-8 py-5 border-2 transition-colors ${
            item.isCompleted 
              ? 'bg-purple-100 hover:bg-purple-200 border-gray-800' 
              : 'bg-white hover:bg-gray-50 border-gray-800'
          }`}>
            <div className="flex items-center justify-center mr-6 cursor-pointer" onClick={handleComplete}>
              <img 
                src={item.isCompleted ? '/ic/checkbox/checked.png' : '/ic/checkbox/unchecked.png'}
                alt={item.isCompleted ? 'checked' : 'unchecked'}
                className="w-10 h-10"
              />
            </div>
            <div className="flex-1 flex items-center">
              {isEditingName ? (
                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-800 font-medium text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleNameSave();
                      } else if (e.key === 'Escape') {
                        handleNameCancel();
                      }
                    }}
                  />
                  <button
                    onClick={handleNameSave}
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    저장
                  </button>
                  <button
                    onClick={handleNameCancel}
                    className="text-gray-500 hover:text-gray-600 font-medium"
                  >
                    취소
                  </button>
                </div>
              ) : (
                <div className="flex-1 flex items-center group">
                  <span className={`flex-1 text-gray-800 font-medium text-lg ${item.isCompleted ? 'line-through opacity-70' : ''}`}>
                    {itemName}
                  </span>
                  <button
                    onClick={handleNameEdit}
                    className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <img 
                      src="/ic/edit/edit.png" 
                      alt="편집" 
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 양쪽 컨테이너 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* 왼쪽 이미지 추가 영역 */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-80 h-48 sm:h-56 lg:h-64 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden">
              {item.imageUrl ? (
                <img 
                  src={item.imageUrl} 
                  alt="할 일 이미지" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src="/ic/img/img.png" 
                  alt="이미지 추가" 
                  className="w-20 h-20 opacity-50"
                />
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={onImageUpload}
                className="hidden" 
                id="image-upload"
                disabled={uploading}
              />
              <label htmlFor="image-upload" className="absolute bottom-6 right-6 cursor-pointer">
                {uploading ? (
                  <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <img 
                    src={item.imageUrl ? "/btn/edit_flt.png" : "/btn/add_flt.png"}
                    alt={item.imageUrl ? "수정" : "추가"}
                    className="w-10 h-10 hover:opacity-80 transition-opacity"
                  />
                )}
              </label>
            </div>
          </div>

          {/* 오른쪽 메모 섹션 */}
          <div>
            <div className="relative h-48 sm:h-56 lg:h-64">
              <img 
                src="/img/memo/image.png" 
                alt="메모" 
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <textarea
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="메모를 입력해주세요"
                  className="w-full h-full bg-transparent border-none outline-none resize-none text-gray-800 placeholder:text-gray-600 text-sm sm:text-base leading-relaxed text-center"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 버튼 섹션 */}
        <div className="flex gap-2 sm:gap-4 justify-end flex-wrap">
          <button
            onClick={onSave}
            className="hover:opacity-80 transition-opacity"
            disabled={uploading}
          >
            <img 
              src={(item.imageUrl || memo.trim()) ? "/btn/edit_done_green.png" : "/btn/edit_done.png"}
              alt="수정완료" 
              className="h-10 sm:h-12 lg:h-14 w-auto"
            />
          </button>
          <button
            onClick={handleDelete}
            className="hover:opacity-80 transition-opacity"
            disabled={uploading}
          >
            <img 
              src="/btn/delete.png" 
              alt="삭제하기" 
              className="h-10 sm:h-12 lg:h-14 w-auto"
            />
          </button>
        </div>
      </div>
    </div>
  );
}