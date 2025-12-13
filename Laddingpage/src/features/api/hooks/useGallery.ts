/**
 * useGallery Hook
 * Custom hook for managing gallery data
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { galleryApi } from '../gallery';
import { Gallery, GalleryAlbum } from '../types';

interface UseGalleryOptions {
  autoFetch?: boolean;
  onError?: (error: any) => void;
}

export function useGallery(options: UseGalleryOptions = {}) {
  const { autoFetch = true, onError } = options;

  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
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

  const fetchAlbums = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await galleryApi.getAllAlbums();
      if (response.success && response.data) {
        setAlbums(response.data);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch albums';
      setError(errorMessage);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [onError]);

  const fetchAlbumById = useCallback(async (albumId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await galleryApi.getAlbumById(albumId);
      if (response.success && response.data) {
        return response.data;
      }
      return null;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch album';
      setError(errorMessage);
      onError?.(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [onError]);

  const fetchImagesByAlbum = useCallback(async (albumId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await galleryApi.getImagesByAlbum(albumId);
      if (response.success && response.data) {
        setGalleries(response.data);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch album images';
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
      fetchAlbums();
    }
  }, [autoFetch, fetchAlbums]);

  return {
    galleries,
    albums,
    loading,
    error,
    fetchGalleries,
    fetchAlbums,
    fetchAlbumById,
    fetchImagesByAlbum,
    fetchRelated,
  };
}
