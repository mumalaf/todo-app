'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Item } from '@/types/item';
import { AsyncState } from '@/types/common';
import { UpdateItemRequest } from '@/types/api';
import { itemApi } from '@/services/itemApi';
import { handleApiError } from '@/utils/errorHandling';

interface UseApiItemDetailReturn extends AsyncState<Item> {
  uploading: boolean;
  handleComplete: () => Promise<void>;
  handleDelete: () => Promise<void>;
  handleImageUpload: (file: File) => Promise<string>;
  handleSave: (memo?: string, name?: string) => Promise<void>;
  updateItem: (updates: UpdateItemRequest) => Promise<Item | undefined>;
}

export function useApiItemDetail(itemId: number): UseApiItemDetailReturn {
  const router = useRouter();
  const [state, setState] = useState<AsyncState<Item>>({
    data: null,
    loading: true,
    error: null
  });
  const [uploading, setUploading] = useState(false);

  const loadItem = useCallback(async () => {
    if (!itemId || itemId <= 0) {
      setState({ data: null, loading: false, error: '유효하지 않은 할 일 ID입니다.' });
      return;
    }
    
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const fetchedItem = await itemApi.getItem(itemId);
      setState({ data: fetchedItem, loading: false, error: null });
    } catch (err) {
      const errorMessage = handleApiError(err);
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      
      // API 에러인 경우 자동으로 메인 페이지로 이동하지 않음
      // 사용자가 에러 메시지를 볼 수 있도록 함
    }
  }, [itemId]);

  useEffect(() => {
    loadItem();
  }, [loadItem]);

  const updateItem = useCallback(async (updates: UpdateItemRequest): Promise<Item | undefined> => {
    if (!state.data) return;

    try {
      setState(prev => ({ ...prev, error: null }));
      const updatedItem = await itemApi.updateItem(state.data.id, updates);
      setState(prev => ({ ...prev, data: updatedItem }));
      return updatedItem;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setState(prev => ({ ...prev, error: errorMessage }));
      throw new Error(errorMessage);
    }
  }, [state.data]);

  const handleComplete = useCallback(async (): Promise<void> => {
    if (state.data) {
      await updateItem({ isCompleted: !state.data.isCompleted });
    }
  }, [state.data, updateItem]);

  const handleDelete = useCallback(async (): Promise<void> => {
    if (!state.data) return;
    
    try {
      setState(prev => ({ ...prev, error: null }));
      await itemApi.deleteItem(state.data.id);
      router.push('/');
    } catch (err) {
      const errorMessage = handleApiError(err);
      setState(prev => ({ ...prev, error: errorMessage }));
    }
  }, [state.data, router]);

  const handleImageUpload = useCallback(async (file: File): Promise<string> => {
    try {
      setUploading(true);
      setState(prev => ({ ...prev, error: null }));
      const imageUrl = await itemApi.uploadImage(file);
      await updateItem({ imageUrl });
      return imageUrl;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setState(prev => ({ ...prev, error: errorMessage }));
      throw new Error(errorMessage);
    } finally {
      setUploading(false);
    }
  }, [updateItem]);

  const handleSave = useCallback(async (memo?: string, name?: string): Promise<void> => {
    if (state.data) {
      try {
        const updates: UpdateItemRequest = {};
        if (memo !== undefined) updates.memo = memo;
        if (name !== undefined && name.trim() !== '') updates.name = name.trim();
        
        if (Object.keys(updates).length > 0) {
          await updateItem(updates);
        }
        router.push('/');
      } catch {
        // 에러는 이미 updateItem에서 처리됨
      }
    }
  }, [state.data, updateItem, router]);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    uploading,
    handleComplete,
    handleDelete,
    handleImageUpload,
    handleSave,
    updateItem,
  };
}