/**
 * Consultations API
 * Handles all consultation/booking-related API calls
 */

import apiClient from './client';
import { API_CONFIG } from './config';
import { ApiResponse, Consultation, CreateConsultationRequest } from './types';

export const consultationsApi = {
  /**
   * Get all consultations (admin)
   */
  async getAll(status?: string): Promise<ApiResponse<Consultation[]>> {
    try {
      const params: any = {};
      if (status) params.status = status;

      const response = await apiClient.get(
        API_CONFIG.ENDPOINTS.ADMIN.CONSULTATIONS,
        { params }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get consultation by ID
   */
  async getById(id: string): Promise<ApiResponse<Consultation>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.ADMIN.CONSULTATIONS}/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create consultation (public)
   */
  async create(
    data: CreateConsultationRequest
  ): Promise<ApiResponse<Consultation>> {
    try {
      const response = await apiClient.post(
        API_CONFIG.ENDPOINTS.USER.CONSULTATIONS,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update consultation status (admin)
   */
  async updateStatus(
    id: string,
    status: 'pending' | 'contacted' | 'completed' | 'cancelled'
  ): Promise<ApiResponse<Consultation>> {
    try {
      const response = await apiClient.put(
        `${API_CONFIG.ENDPOINTS.ADMIN.CONSULTATIONS}/${id}`,
        { status }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete consultation (admin)
   */
  async delete(id: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.delete(
        `${API_CONFIG.ENDPOINTS.ADMIN.CONSULTATIONS}/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
