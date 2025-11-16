/**
 * Testimonials API
 * Handles all testimonial-related API calls
 */

import apiClient from './client';
import { API_CONFIG } from './config';
import { ApiResponse, Testimonial } from './types';

export const testimonialsApi = {
  /**
   * Get all testimonials (public)
   */
  async getAll(active: boolean = true): Promise<ApiResponse<Testimonial[]>> {
    try {
      const response = await apiClient.get(
        API_CONFIG.ENDPOINTS.USER.TESTIMONIALS,
        {
          params: { active },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get testimonials for a service
   */
  async getByService(serviceId: string): Promise<ApiResponse<Testimonial[]>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.USER.TESTIMONIALS}/service/${serviceId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get testimonial by ID
   */
  async getById(id: string): Promise<ApiResponse<Testimonial>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.USER.TESTIMONIALS}/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create testimonial (admin)
   */
  async create(data: Partial<Testimonial>): Promise<ApiResponse<Testimonial>> {
    try {
      const response = await apiClient.post(
        API_CONFIG.ENDPOINTS.ADMIN.TESTIMONIALS,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update testimonial (admin)
   */
  async update(
    id: string,
    data: Partial<Testimonial>
  ): Promise<ApiResponse<Testimonial>> {
    try {
      const response = await apiClient.put(
        `${API_CONFIG.ENDPOINTS.ADMIN.TESTIMONIALS}/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete testimonial (admin)
   */
  async delete(id: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.delete(
        `${API_CONFIG.ENDPOINTS.ADMIN.TESTIMONIALS}/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
