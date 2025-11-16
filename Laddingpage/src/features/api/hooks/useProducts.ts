/**
 * useProducts Hook
 * Custom hook for managing products data
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { productsApi } from '../products';
import { Product } from '../types';

interface UseProductsOptions {
  autoFetch?: boolean;
  onError?: (error: any) => void;
}

export function useProducts(options: UseProductsOptions = {}) {
  const { autoFetch = true, onError } = options;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productsApi.getAll();
      if (response.success && response.data) {
        setProducts(response.data);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch products';
      setError(errorMessage);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [onError]);

  const fetchFeatured = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productsApi.getFeatured();
      if (response.success && response.data) {
        setProducts(response.data);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch featured products';
      setError(errorMessage);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [onError]);

  const fetchByCategory = useCallback(async (category: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productsApi.getByCategory(category);
      if (response.success && response.data) {
        setProducts(response.data);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch products';
      setError(errorMessage);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [onError]);

  useEffect(() => {
    if (autoFetch) {
      fetchProducts();
    }
  }, [autoFetch, fetchProducts]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchFeatured,
    fetchByCategory,
  };
}
