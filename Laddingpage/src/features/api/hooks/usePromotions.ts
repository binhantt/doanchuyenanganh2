'use client';

import { useState, useCallback } from 'react';
import { promotionsApi, Promotion, CreatePromotionRequest, UpdatePromotionRequest } from '../promotions';

export function usePromotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async (active?: boolean) => {
    try {
      setLoading(true);
      setError(null);
      const response = await promotionsApi.getAll(active);
      if (response.success && response.data) {
        setPromotions(response.data);
      } else {
        setError(response.message || 'Failed to fetch promotions');
      }
    } catch (err: any) {
      setError(err.message || 'Error fetching promotions');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await promotionsApi.getById(id);
      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.message || 'Failed to fetch promotion');
        return null;
      }
    } catch (err: any) {
      setError(err.message || 'Error fetching promotion');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchByCode = useCallback(async (code: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await promotionsApi.getByCode(code);
      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.message || 'Promotion code not found');
        return null;
      }
    } catch (err: any) {
      setError(err.message || 'Error fetching promotion');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchByService = useCallback(async (serviceId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await promotionsApi.getByService(serviceId);
      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.message || 'Failed to fetch promotions');
        return [];
      }
    } catch (err: any) {
      setError(err.message || 'Error fetching promotions');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchByPackage = useCallback(async (packageId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await promotionsApi.getByPackage(packageId);
      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.message || 'Failed to fetch promotions');
        return [];
      }
    } catch (err: any) {
      setError(err.message || 'Error fetching promotions');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (data: CreatePromotionRequest) => {
    try {
      setLoading(true);
      setError(null);
      const response = await promotionsApi.create(data);
      if (response.success && response.data) {
        setPromotions([...promotions, response.data]);
        return response.data;
      } else {
        setError(response.message || 'Failed to create promotion');
        return null;
      }
    } catch (err: any) {
      setError(err.message || 'Error creating promotion');
      return null;
    } finally {
      setLoading(false);
    }
  }, [promotions]);

  const update = useCallback(async (id: string, data: UpdatePromotionRequest) => {
    try {
      setLoading(true);
      setError(null);
      const response = await promotionsApi.update(id, data);
      if (response.success && response.data) {
        setPromotions(promotions.map(p => p.id === id ? response.data : p));
        return response.data;
      } else {
        setError(response.message || 'Failed to update promotion');
        return null;
      }
    } catch (err: any) {
      setError(err.message || 'Error updating promotion');
      return null;
    } finally {
      setLoading(false);
    }
  }, [promotions]);

  const remove = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await promotionsApi.delete(id);
      if (response.success) {
        setPromotions(promotions.filter(p => p.id !== id));
        return true;
      } else {
        setError(response.message || 'Failed to delete promotion');
        return false;
      }
    } catch (err: any) {
      setError(err.message || 'Error deleting promotion');
      return false;
    } finally {
      setLoading(false);
    }
  }, [promotions]);

  return {
    promotions,
    loading,
    error,
    fetchAll,
    fetchById,
    fetchByCode,
    fetchByService,
    fetchByPackage,
    create,
    update,
    remove,
  };
}
