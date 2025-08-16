'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Todo } from '@/types/todo';
import { AsyncState } from '@/types/common';
import { UpdateItemRequest } from '@/types/api';
import { todoApi } from '@/services/todoApi';

interface UseApiTodoDetailReturn extends AsyncState<Todo> {
  uploading: boolean;
  handleComplete: () => Promise<void>;
  handleDelete: () => Promise<void>;
  handleImageUpload: (file: File) => Promise<string>;
  handleSave: (memo?: string) => Promise<void>;
  updateTodo: (updates: UpdateItemRequest) => Promise<Todo | undefined>;
}

export function useApiTodoDetail(todoId: string): UseApiTodoDetailReturn {
  const router = useRouter();
  const [state, setState] = useState<AsyncState<Todo>>({
    data: null,
    loading: true,
    error: null
  });
  const [uploading, setUploading] = useState(false);

  const loadTodo = useCallback(async () => {
    if (!todoId) return;
    
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const fetchedTodo = await todoApi.getTodo(todoId);
      setState({ data: fetchedTodo, loading: false, error: null });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '할 일을 불러오는데 실패했습니다.';
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      router.push('/');
    }
  }, [todoId, router]);

  useEffect(() => {
    loadTodo();
  }, [loadTodo]);

  const updateTodo = useCallback(async (updates: UpdateItemRequest): Promise<Todo | undefined> => {
    if (!state.data) return;

    try {
      setState(prev => ({ ...prev, error: null }));
      const updatedTodo = await todoApi.updateTodo(state.data.id, updates);
      setState(prev => ({ ...prev, data: updatedTodo }));
      return updatedTodo;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '할 일 수정에 실패했습니다.';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw err;
    }
  }, [state.data]);

  const handleComplete = useCallback(async (): Promise<void> => {
    if (state.data) {
      await updateTodo({ isCompleted: !state.data.isCompleted });
    }
  }, [state.data, updateTodo]);

  const handleDelete = useCallback(async (): Promise<void> => {
    if (!state.data) return;
    
    try {
      setState(prev => ({ ...prev, error: null }));
      await todoApi.deleteTodo(state.data.id);
      router.push('/');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '할 일 삭제에 실패했습니다.';
      setState(prev => ({ ...prev, error: errorMessage }));
    }
  }, [state.data, router]);

  const handleImageUpload = useCallback(async (file: File): Promise<string> => {
    try {
      setUploading(true);
      setState(prev => ({ ...prev, error: null }));
      const imageUrl = await todoApi.uploadImage(file);
      await updateTodo({ imageUrl });
      return imageUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '이미지 업로드에 실패했습니다.';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw err;
    } finally {
      setUploading(false);
    }
  }, [updateTodo]);

  const handleSave = useCallback(async (memo?: string): Promise<void> => {
    if (state.data) {
      try {
        await updateTodo({ memo });
        router.push('/');
      } catch (err) {
        // 에러는 이미 updateTodo에서 처리됨
      }
    }
  }, [state.data, updateTodo, router]);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    uploading,
    handleComplete,
    handleDelete,
    handleImageUpload,
    handleSave,
    updateTodo,
  };
}