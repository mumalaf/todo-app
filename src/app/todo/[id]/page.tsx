'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ResponsiveHeader from '@/components/header/ResponsiveHeader';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { useApiTodoDetail } from '@/hooks/useApiTodoDetail';

export default function TodoDetailPage() {
  const params = useParams();
  const todoId = params.id as string;
  const [memo, setMemo] = useState('');
  
  const {
    data: todo,
    loading,
    error,
    uploading,
    handleComplete,
    handleDelete,
    handleImageUpload,
    handleSave,
  } = useApiTodoDetail(todoId);

  // todo가 로드되면 memo 초기화
  useEffect(() => {
    if (todo?.memo) {
      setMemo(todo.memo);
    }
  }, [todo?.memo]);

  const onSave = () => {
    handleSave(memo);
  };

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

  if (error || !todo) {
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
          <div className={`flex items-center rounded-full px-8 py-5 border-2 cursor-pointer transition-colors ${
            todo.isCompleted 
              ? 'bg-purple-100 hover:bg-purple-200 border-gray-800' 
              : 'bg-white hover:bg-gray-50 border-gray-800'
          }`}>
            <div className="flex items-center justify-center mr-6" onClick={handleComplete}>
              <img 
                src={todo.isCompleted ? '/ic/checkbox/checked.png' : '/ic/checkbox/unchecked.png'}
                alt={todo.isCompleted ? 'checked' : 'unchecked'}
                className="w-10 h-10"
              />
            </div>
            <span className={`flex-1 text-gray-800 font-medium text-lg ${todo.isCompleted ? 'line-through opacity-70' : ''}`}>
              {todo.name}
            </span>
          </div>
        </div>

        {/* 양쪽 컨테이너 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* 왼쪽 이미지 추가 영역 */}
          <div className="flex items-center justify-center">
            <div className="w-80 h-64 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden">
              {todo.imageUrl ? (
                <img 
                  src={todo.imageUrl} 
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
                    src={todo.imageUrl ? "/btn/edit_flt.png" : "/btn/add_flt.png"}
                    alt={todo.imageUrl ? "수정" : "추가"}
                    className="w-10 h-10 hover:opacity-80 transition-opacity"
                  />
                )}
              </label>
            </div>
          </div>

          {/* 오른쪽 메모 섹션 */}
          <div>
            <div className="relative h-64">
              <img 
                src="/img/memo/image.png" 
                alt="메모" 
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <textarea
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="메모를 입력해주세요"
                  className="w-full h-full bg-transparent border-none outline-none resize-none text-gray-800 placeholder:text-gray-600 text-base leading-relaxed text-center"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 버튼 섹션 */}
        <div className="flex gap-4 justify-end">
          <button
            onClick={onSave}
            className="hover:opacity-80 transition-opacity"
            disabled={uploading}
          >
            <img 
              src={(todo.imageUrl || memo.trim()) ? "/btn/edit_done_green.png" : "/btn/edit_done.png"}
              alt="수정완료" 
              className="h-14 w-auto"
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
              className="h-14 w-auto"
            />
          </button>
        </div>
      </div>
    </div>
  );
}