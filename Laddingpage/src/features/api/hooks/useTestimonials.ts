/**
 * useTestimonials Hook
 * Custom hook for managing testimonials data
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { testimonialsApi } from '../testimonials';
import { Testimonial } from '../types';

interface UseTestimonialsOptions {
  autoFetch?: boolean;
  onError?: (error: any) => void;
}

export function useTestimonials(options: UseTestimonialsOptions = {}) {
  const { autoFetch = true, onError } = options;

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await testimonialsApi.getAll();
      if (response.success && response.data) {
        setTestimonials(response.data);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch testimonials';
      setError(errorMessage);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [onError]);

  const fetchByService = useCallback(async (serviceId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await testimonialsApi.getByService(serviceId);
      if (response.success && response.data) {
        setTestimonials(response.data);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch testimonials';
      setError(errorMessage);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [onError]);

  useEffect(() => {
    if (autoFetch) {
      fetchTestimonials();
    }
  }, [autoFetch, fetchTestimonials]);

  return {
    testimonials,
    loading,
    error,
    fetchTestimonials,
    fetchByService,
  };
}
