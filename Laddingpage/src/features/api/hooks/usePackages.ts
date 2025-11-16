/**
 * usePackages Hook
 * Custom hook for managing packages data
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { packagesApi } from '../packages';
import { Package, ApiResponse } from '../types';

interface UsePackagesOptions {
  autoFetch?: boolean;
  onError?: (error: any) => void;
}

export function usePackages(options: UsePackagesOptions = {}) {
  const { autoFetch = true, onError } = options;

  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await packagesApi.getAll();
      if (response.success && response.data) {
        setPackages(response.data);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch packages';
      setError(errorMessage);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [onError]);

  const fetchPopular = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await packagesApi.getPopular();
      if (response.success && response.data) {
        setPackages(response.data);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch popular packages';
      setError(errorMessage);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [onError]);

  const fetchById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await packagesApi.getById(id);
      if (response.success && response.data) {
        return response.data;
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch package';
      setError(errorMessage);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [onError]);

  const fetchBySlug = useCallback(async (slug: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await packagesApi.getBySlug(slug);
      if (response.success && response.data) {
        return response.data;
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch package';
      setError(errorMessage);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [onError]);

  useEffect(() => {
    if (autoFetch) {
      fetchPackages();
    }
  }, [autoFetch, fetchPackages]);

  return {
    packages,
    loading,
    error,
    fetchPackages,
    fetchPopular,
    fetchById,
    fetchBySlug,
  };
}
