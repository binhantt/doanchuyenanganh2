/**
 * useServices Hook
 * Custom hook for managing services data
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { servicesApi } from '../services';
import { Service } from '../types';

interface UseServicesOptions {
  autoFetch?: boolean;
  onError?: (error: any) => void;
}

export function useServices(options: UseServicesOptions = {}) {
  const { autoFetch = true, onError } = options;

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await servicesApi.getAll();
      if (response.success && response.data) {
        setServices(response.data);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch services';
      setError(errorMessage);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [onError]);

  const fetchAvailable = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await servicesApi.getAvailable();
      if (response.success && response.data) {
        setServices(response.data);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch available services';
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
      const response = await servicesApi.getById(id);
      if (response.success && response.data) {
        return response.data;
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch service';
      setError(errorMessage);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [onError]);

  useEffect(() => {
    if (autoFetch) {
      fetchServices();
    }
  }, [autoFetch, fetchServices]);

  return {
    services,
    loading,
    error,
    fetchServices,
    fetchAvailable,
    fetchById,
  };
}
