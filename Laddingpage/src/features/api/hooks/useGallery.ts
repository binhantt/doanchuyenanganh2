/**
 * useGallery Hook
 * Custom hook for managing gallery data
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { galleryApi } from '../gallery';
import { Gallery } from '../types';

interface UseGalleryOptions {
  autoFetch?: boolean;
  onError?: (error: any) => void;
}

export function useGallery(options: UseGalleryOptions = {}) {
  const { autoFetch = true, onError } = options;

  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGalleries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await galleryApi.getAll();
      if (response.success && response.data) {
        setGalleries(response.data);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch galleries';
      setError(errorMessage);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [onError]);

  const fetchRelated = useCallback(async (relatedType: string, relatedId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await galleryApi.getRelated(relatedType, relatedId);
      if (response.success && response.data) {
        setGalleries(response.data);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch galleries';
      setError(errorMessage);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [onError]);

  useEffect(() => {
    if (autoFetch) {
      fetchGalleries();
    }
  }, [autoFetch, fetchGalleries]);

  return {
    galleries,
    loading,
    error,
    fetchGalleries,
    fetchRelated,
  };
}
