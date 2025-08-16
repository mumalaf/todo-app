'use client';

import { useState } from 'react';
import TodoItem from '@/components/TodoItem';
import SearchInput from '@/components/ui/SearchInput';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import EmptyState from '@/components/ui/EmptyState';
import ResponsiveHeader from '@/components/header/ResponsiveHeader';
import { useApiTodos } from '@/hooks/useApiTodos';

export default function Home() {
  const { data: todos, loading, error, addTodo, toggleTodo, refetch } = useApiTodos();
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        await addTodo(newTodo.trim());
        setNewTodo('');
      } catch (err) {
        // 에러는 이미 훅에서 처리됨
      }
    }
  };

  const todoItems = todos.filter(todo => !todo.isCompleted);
  const completedItems = todos.filter(todo => todo.isCompleted);
  const isEmpty = todoItems.length === 0 && completedItems.length === 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner size="lg" message="할 일을 불러오는 중..." />
      </div>
    );
  }

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
      <div className="max-w-6xl mx-auto p-8">

        {/* Input Section */}
        <div className="flex gap-2 sm:gap-4 mb-8 items-center">
          <div className="flex-1 min-w-0">
            <SearchInput
              value={newTodo}
              onChange={setNewTodo}
              placeholder="할 일을 입력해주세요"
              width={800}
              height={80}
              className="w-full"
            />
          </div>
          <button
            onClick={handleAddTodo}
            className="hover:opacity-80 transition-opacity"
          >
            <img 
              src={isEmpty ? "/btn/add_lg_purple.png" : "/btn/add_lg.png"}
              alt="추가하기" 
              className="h-12 w-auto hidden md:block"
            />
            <img 
              src={isEmpty ? "/btn/add_sm_purple.png" : "/btn/add_sm.png"}
              alt="추가하기" 
              className="h-8 w-auto block md:hidden"
            />
          </button>
        </div>

        {/* Todo Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* TO DO Section */}
          <div>
            <div className="mb-6">
              <img src="/img/todo/todo.png" alt="TO DO" className="h-12 w-auto" />
            </div>
            <div className="space-y-4">
              {todoItems.length > 0 ? (
                todoItems.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                  />
                ))
              ) : (
                <EmptyState
                  title="할 일이 없어요"
                  description="할 일이 없어요.\nTODO를 새롭게 추가해주세요!"
                  imageSrc="/img/empty/write_lg.png"
                  imageAlt="할 일이 없어요"
                />
              )}
            </div>
          </div>

          {/* DONE Section */}
          <div>
            <div className="mb-6">
              <img src="/img/done/done.png" alt="DONE" className="h-12 w-auto" />
            </div>
            <div className="space-y-4">
              {completedItems.length > 0 ? (
                completedItems.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                  />
                ))
              ) : (
                <EmptyState
                  title="다 한 일이 없어요"
                  description="아직 다 한 일이 없어요.\n해야 할 일을 체크해보세요!"
                  imageSrc="/img/empty/empty_lg.png"
                  imageAlt="다 한 일이 없어요"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
