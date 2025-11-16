/**
 * Orders API
 * Handles all order-related API calls
 */

import apiClient from './client';
import { API_CONFIG } from './config';
import { ApiResponse } from './types';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productType: 'package' | 'service' | 'product' | 'menu';
  quantity: number;
  unitPrice: number;
  subtotal: number;
  description?: string;
}

export interface CreateOrderRequest {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  items: OrderItem[];
  weddingDate: string;
  guestCount: number;
  venue: string;
  notes?: string;
  paymentMethod: 'bank_transfer' | 'momo' | 'zalopay' | 'cash';
  promotionCode?: string;
  discountAmount?: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  items: OrderItem[];
  totalPrice: number;
  notes?: string;
  eventDate?: string;
  promotionCode?: string;
  discountAmount?: number;
  status: 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export const ordersApi = {
  /**
   * Create order
   */
  async create(data: CreateOrderRequest): Promise<ApiResponse<Order>> {
    try {
      const response = await apiClient.post(
        API_CONFIG.ENDPOINTS.USER.ORDERS,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get orders by email
   */
  async getByEmail(email: string): Promise<ApiResponse<Order[]>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.USER.ORDERS}/email/${email}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get order by ID
   */
  async getById(id: string): Promise<ApiResponse<Order>> {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.USER.ORDERS}/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
