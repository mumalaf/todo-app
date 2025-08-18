'use client';

import { useState } from 'react';
import ItemComponent from '@/components/ItemComponent';
import SearchInput from '@/components/ui/SearchInput';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import EmptyState from '@/components/ui/EmptyState';
import ResponsiveHeader from '@/components/header/ResponsiveHeader';
import { useApiItems } from '@/hooks/useApiItems';
import { EMPTY_STATE_MESSAGES } from '@/constants';

/**
 * 할 일 목록 페이지 (/)
 * - 할 일 목록 조회 및 표시
 * - 새로운 할 일 추가
 * - 할 일 완료/미완료 토글
 * - 진행 중/완료된 할 일 분리 표시
 */
export default function Home() {
  const { data: items, loading, error, addItem, toggleItem, refetch } = useApiItems();
  const [newItem, setNewItem] = useState('');

  /**
   * 새로운 할 일을 추가하는 핸들러
   */
  const handleAddItem = async () => {
    if (newItem.trim()) {
      try {
        await addItem(newItem.trim());
        setNewItem('');
      } catch {
        // 에러는 이미 훅에서 처리됨
      }
    }
  };

  // 할 일 목록을 진행 중/완료로 분리
  const activeItems = items.filter(item => !item.isCompleted);
  const completedItems = items.filter(item => item.isCompleted);
  const isEmpty = activeItems.length === 0 && completedItems.length === 0;

  // 로딩 상태 처리
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner size="lg" message="할 일을 불러오는 중..." />
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <ErrorMessage error={error} onRetry={refetch} showRetry />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ResponsiveHeader />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">

        {/* Input Section */}
        <div className="flex gap-2 sm:gap-4 mb-6 sm:mb-8 items-center">
          <div className="flex-1 min-w-0">
            <SearchInput
              value={newItem}
              onChange={setNewItem}
              onEnter={handleAddItem}
              placeholder="할 일을 입력해주세요"
              width={800}
              height={80}
              className="w-full"
            />
          </div>
          <button
            onClick={handleAddItem}
            className="hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <img 
              src={isEmpty ? "/btn/add_lg_purple.png" : "/btn/add_lg.png"}
              alt="추가하기" 
              className="h-10 sm:h-12 w-auto hidden md:block"
            />
            <img 
              src={isEmpty ? "/btn/add_sm_purple.png" : "/btn/add_sm.png"}
              alt="추가하기" 
              className="h-8 w-auto block md:hidden"
            />
          </button>
        </div>

        {/* Item Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* TO DO Section */}
          <div>
            <div className="mb-4 sm:mb-6">
              <img src="/img/todo/todo.png" alt="TO DO" className="h-8 sm:h-10 lg:h-12 w-auto" />
            </div>
            <div className="space-y-4">
              {activeItems.length > 0 ? (
                activeItems.map(item => (
                  <ItemComponent
                    key={item.id}
                    item={item}
                    onToggle={toggleItem}
                  />
                ))
              ) : (
                <EmptyState
                  title={EMPTY_STATE_MESSAGES.todoEmpty.title}
                  description={EMPTY_STATE_MESSAGES.todoEmpty.description}
                  imageSrc={EMPTY_STATE_MESSAGES.todoEmpty.imageSrc}
                  imageAlt={EMPTY_STATE_MESSAGES.todoEmpty.imageAlt}
                />
              )}
            </div>
          </div>

          {/* DONE Section */}
          <div>
            <div className="mb-4 sm:mb-6">
              <img src="/img/done/done.png" alt="DONE" className="h-8 sm:h-10 lg:h-12 w-auto" />
            </div>
            <div className="space-y-4">
              {completedItems.length > 0 ? (
                completedItems.map(item => (
                  <ItemComponent
                    key={item.id}
                    item={item}
                    onToggle={toggleItem}
                  />
                ))
              ) : (
                <EmptyState
                  title={EMPTY_STATE_MESSAGES.doneEmpty.title}
                  description={EMPTY_STATE_MESSAGES.doneEmpty.description}
                  imageSrc={EMPTY_STATE_MESSAGES.doneEmpty.imageSrc}
                  imageAlt={EMPTY_STATE_MESSAGES.doneEmpty.imageAlt}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
