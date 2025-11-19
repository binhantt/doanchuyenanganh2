/**
 * useConsultation Hook
 * Custom hook for managing consultation bookings
 */

'use client';

import { useState } from 'react';
import { consultationsApi } from '../consultations';

interface ConsultationData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  weddingDate: string;
  guestCount?: number;
  venue?: string;
  serviceType: string;
  budget: string;
  notes?: string;
}

export function useConsultation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitConsultation = async (data: ConsultationData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await consultationsApi.create(data);
      
      if (response.success) {
        setSuccess(true);
        return response.data;
      } else {
        throw new Error(response.message || 'Không thể gửi yêu cầu');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Có lỗi xảy ra';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  };

  return {
    submitConsultation,
    loading,
    error,
    success,
    reset,
  };
}
