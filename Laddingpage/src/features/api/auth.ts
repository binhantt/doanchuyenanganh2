import apiClient from './client';
import { API_CONFIG } from './config';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      fullName: string;
      role: string;
    };
  };
  message?: string;
}

export interface VerifyResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      email: string;
      fullName: string;
      role: string;
    };
  };
}

/**
 * Login user
 */
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    API_CONFIG.ENDPOINTS.USER.AUTH_LOGIN,
    data
  );
  return response.data;
};

/**
 * Register new user
 */
export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    API_CONFIG.ENDPOINTS.USER.AUTH_REGISTER,
    data
  );
  return response.data;
};

/**
 * Verify token
 */
export const verifyToken = async (token: string): Promise<VerifyResponse> => {
  const response = await apiClient.post<VerifyResponse>(
    API_CONFIG.ENDPOINTS.USER.AUTH_VERIFY,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

/**
 * Auth utilities
 */
export const authUtils = {
  /**
   * Save auth data to localStorage
   */
  saveAuth: (token: string, user: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
  },

  /**
   * Get auth data from localStorage
   */
  getAuth: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      return { token, user };
    }
    return { token: null, user: null };
  },

  /**
   * Clear auth data from localStorage
   */
  clearAuth: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  },

  /**
   * Get token
   */
  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  },
};
