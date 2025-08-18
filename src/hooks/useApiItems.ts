'use client';

import { useState, useEffect, useCallback } from 'react';
import { Item, ItemStats } from '@/types/item';
import { AsyncState } from '@/types/common';
import { UpdateItemRequest } from '@/types/api';
import { itemApi } from '@/services/itemApi';
import { handleApiError } from '@/utils/errorHandling';

interface UseApiItemsReturn extends AsyncState<Item[]> {
  data: Item[];
  stats: ItemStats;
  addItem: (name: string) => Promise<Item>;
  updateItem: (id: number, updates: UpdateItemRequest) => Promise<Item>;
  deleteItem: (id: number) => Promise<void>;
  toggleItem: (id: number) => Promise<void>;
  refetch: () => Promise<void>;
}

/**
 * 할 일 목록 API를 관리하는 커스텀 훅
 * - 할 일 목록 조회, 추가, 수정, 삭제, 토글 기능 제공
 * - 비동기 상태 관리 (로딩, 에러, 데이터)
 * - 통계 정보 제공 (전체, 완료, 진행 중 할 일 수)
 */
export function useApiItems(): UseApiItemsReturn {
  const [state, setState] = useState<AsyncState<Item[]>>({
    data: [],
    loading: true,
    error: null
  });

  /**
   * 할 일 목록을 API로부터 불러오는 함수
   */
  const loadItems = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const fetchedItems = await itemApi.getItems();
      setState({ data: fetchedItems, loading: false, error: null });
    } catch (err) {
      const errorMessage = handleApiError(err);
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  /**
   * 새로운 할 일을 추가하는 함수
   */
  const addItem = useCallback(async (name: string): Promise<Item> => {
    try {
      setState(prev => ({ ...prev, error: null }));
      const newItem = await itemApi.createItem({ name });
      setState(prev => ({ 
        ...prev, 
        data: prev.data ? [...prev.data, newItem] : [newItem] 
      }));
      return newItem;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setState(prev => ({ ...prev, error: errorMessage }));
      throw new Error(errorMessage);
    }
  }, []);

  const updateItem = useCallback(async (id: number, updates: UpdateItemRequest): Promise<Item> => {
    try {
      setState(prev => ({ ...prev, error: null }));
      const updatedItem = await itemApi.updateItem(id, updates);
      setState(prev => ({
        ...prev,
        data: prev.data?.map(item => 
          item.id === id ? updatedItem : item
        ) || []
      }));
      return updatedItem;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setState(prev => ({ ...prev, error: errorMessage }));
      throw new Error(errorMessage);
    }
  }, []);

  const deleteItem = useCallback(async (id: number): Promise<void> => {
    try {
      setState(prev => ({ ...prev, error: null }));
      await itemApi.deleteItem(id);
      setState(prev => ({
        ...prev,
        data: prev.data?.filter(item => item.id !== id) || []
      }));
    } catch (err) {
      const errorMessage = handleApiError(err);
      setState(prev => ({ ...prev, error: errorMessage }));
      throw new Error(errorMessage);
    }
  }, []);

  /**
   * 할 일의 완료/미완료 상태를 토글하는 함수
   */
  const toggleItem = useCallback(async (id: number): Promise<void> => {
    const item = state.data?.find(t => t.id === id);
    if (item) {
      await updateItem(id, { isCompleted: !item.isCompleted });
    }
  }, [state.data, updateItem]);

  // Item 통계 계산
  const stats: ItemStats = {
    total: state.data?.length || 0,
    completed: state.data?.filter(item => item.isCompleted).length || 0,
    active: state.data?.filter(item => !item.isCompleted).length || 0
  };

  return {
    data: state.data || [],
    loading: state.loading,
    error: state.error,
    stats,
    addItem,
    updateItem,
    deleteItem,
    toggleItem,
    refetch: loadItems,
  };
}