'use client';

import { useState, useEffect, useCallback } from 'react';
import { Todo, TodoStats } from '@/types/todo';
import { AsyncState } from '@/types/common';
import { UpdateItemRequest } from '@/types/api';
import { todoApi } from '@/services/todoApi';

interface UseApiTodosReturn extends AsyncState<Todo[]> {
  data: Todo[];
  stats: TodoStats;
  addTodo: (name: string, memo?: string) => Promise<Todo>;
  updateTodo: (id: string, updates: UpdateItemRequest) => Promise<Todo>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useApiTodos(): UseApiTodosReturn {
  const [state, setState] = useState<AsyncState<Todo[]>>({
    data: [],
    loading: true,
    error: null
  });

  const loadTodos = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const fetchedTodos = await todoApi.getTodos();
      setState({ data: fetchedTodos, loading: false, error: null });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '할 일을 불러오는데 실패했습니다.';
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const addTodo = useCallback(async (name: string, memo?: string): Promise<Todo> => {
    try {
      setState(prev => ({ ...prev, error: null }));
      const newTodo = await todoApi.createTodo({ name, memo });
      setState(prev => ({ 
        ...prev, 
        data: prev.data ? [...prev.data, newTodo] : [newTodo] 
      }));
      return newTodo;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '할 일 추가에 실패했습니다.';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw err;
    }
  }, []);

  const updateTodo = useCallback(async (id: string, updates: UpdateItemRequest): Promise<Todo> => {
    try {
      setState(prev => ({ ...prev, error: null }));
      const updatedTodo = await todoApi.updateTodo(id, updates);
      setState(prev => ({
        ...prev,
        data: prev.data?.map(todo => 
          todo.id === id ? updatedTodo : todo
        ) || []
      }));
      return updatedTodo;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '할 일 수정에 실패했습니다.';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw err;
    }
  }, []);

  const deleteTodo = useCallback(async (id: string): Promise<void> => {
    try {
      setState(prev => ({ ...prev, error: null }));
      await todoApi.deleteTodo(id);
      setState(prev => ({
        ...prev,
        data: prev.data?.filter(todo => todo.id !== id) || []
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '할 일 삭제에 실패했습니다.';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw err;
    }
  }, []);

  const toggleTodo = useCallback(async (id: string): Promise<void> => {
    const todo = state.data?.find(t => t.id === id);
    if (todo) {
      await updateTodo(id, { isCompleted: !todo.isCompleted });
    }
  }, [state.data, updateTodo]);

  // Todo 통계 계산
  const stats: TodoStats = {
    total: state.data?.length || 0,
    completed: state.data?.filter(todo => todo.isCompleted).length || 0,
    active: state.data?.filter(todo => !todo.isCompleted).length || 0
  };

  return {
    data: state.data || [],
    loading: state.loading,
    error: state.error,
    stats,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    refetch: loadTodos,
  };
}