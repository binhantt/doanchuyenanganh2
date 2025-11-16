/**
 * useFAQ Hook
 * Custom hook for managing FAQ data
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { faqApi } from '../faq';
import { FAQ } from '../types';

interface UseFAQOptions {
  autoFetch?: boolean;
  onError?: (error: any) => void;
}

export function useFAQ(options: UseFAQOptions = {}) {
  const { autoFetch = true, onError } = options;

  const [faqs, setFAQs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFAQs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await faqApi.getAll();
      if (response.success && response.data) {
        setFAQs(response.data);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch FAQs';
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
      const response = await faqApi.getByCategory(category);
      if (response.success && response.data) {
        setFAQs(response.data);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch FAQs';
      setError(errorMessage);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [onError]);

  useEffect(() => {
    if (autoFetch) {
      fetchFAQs();
    }
  }, [autoFetch, fetchFAQs]);

  return {
    faqs,
    loading,
    error,
    fetchFAQs,
    fetchByCategory,
  };
}
