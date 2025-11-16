/**
 * Products API
 * Handles all product-related API calls
 */

import apiClient from './client';
import { API_CONFIG } from './config';
import { ApiResponse, Product, CreateProductRequest } from './types';

export const productsApi = {
  /**
   * Get all products (public)
   */
  async getAll(active: boolean = true): Promise<ApiResponse<Product[]>> {
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.USER.PRODUCTS, {
        params: { active },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get featured products
   */
  async getFeatured(): Promise<ApiResponse<Product[]>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.USER.PRODUCTS}/featured`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get products by category
   */
  async getByCategory(category: string): Promise<ApiResponse<Product[]>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.USER.PRODUCTS}/category/${category}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get product by ID
   */
  async getById(id: string): Promise<ApiResponse<Product>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.USER.PRODUCTS}/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get product by slug
   */
  async getBySlug(slug: string): Promise<ApiResponse<Product>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.USER.PRODUCTS}/slug/${slug}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create product (admin)
   */
  async create(data: CreateProductRequest): Promise<ApiResponse<Product>> {
    try {
      const response = await apiClient.post(
        API_CONFIG.ENDPOINTS.ADMIN.PRODUCTS,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update product (admin)
   */
  async update(
    id: string,
    data: Partial<CreateProductRequest>
  ): Promise<ApiResponse<Product>> {
    try {
      const response = await apiClient.put(
        `${API_CONFIG.ENDPOINTS.ADMIN.PRODUCTS}/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete product (admin)
   */
  async delete(id: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.delete(
        `${API_CONFIG.ENDPOINTS.ADMIN.PRODUCTS}/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
