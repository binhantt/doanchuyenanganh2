import apiClient from './client';
import { API_CONFIG } from './config';

export interface Invitation {
  id: string;
  userId: string;
  templateId: number;
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime: string;
  venue: string;
  venueAddress: string;
  recipientName: string;
  message: string | null;
  coverImage: string | null;
  avatarImage: string | null;
  shareUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  // Additional fields
  groom?: string;
  bride?: string;
  date?: string;
  location?: string;
  customText?: string;
  invitationMessage?: string;
  story?: string;
  coupleImage?: string;
  brideImage?: string;
  groomImage?: string;
  locationImage?: string;
  organization?: string;
  gallery?: string[];
  weddingImages?: string[];
}

export interface CreateInvitationRequest {
  templateId: number;
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime: string;
  venue: string;
  venueAddress: string;
  recipientName: string;
  message?: string;
  coverImage?: string;
  avatarImage?: string;
  story?: string;
  invitationMessage?: string;
  gallery?: string[];
  brideImage?: string;
  groomImage?: string;
  weddingImages?: string[];
  locationImage?: string;
  organization?: string;
}

export interface InvitationResponse {
  success: boolean;
  data: Invitation;
  message?: string;
}

export interface InvitationsResponse {
  success: boolean;
  data: Invitation[];
}

/**
 * Get all user invitations
 */
export const getUserInvitations = async (): Promise<InvitationsResponse> => {
  const token = localStorage.getItem('token');
  const response = await apiClient.get<InvitationsResponse>(
    API_CONFIG.ENDPOINTS.USER.INVITATIONS,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

/**
 * Get invitation by ID
 */
export const getInvitationById = async (id: string): Promise<InvitationResponse> => {
  try {
  const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    console.log('Fetching invitation with ID:', id);
    console.log('API endpoint:', `${API_CONFIG.ENDPOINTS.USER.INVITATIONS}/${id}`);
    
  const response = await apiClient.get<InvitationResponse>(
    `${API_CONFIG.ENDPOINTS.USER.INVITATIONS}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
    
    console.log('API response received:', response.data);
  return response.data;
  } catch (error: any) {
    console.error('Error in getInvitationById:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url,
    });
    throw error;
  }
};

/**
 * Get invitation by share URL (public)
 */
export const getInvitationByShareUrl = async (
  shareUrl: string,
  guestName?: string
): Promise<InvitationResponse> => {
  const params = guestName ? { guestName } : {};
  const response = await apiClient.get<InvitationResponse>(
    `${API_CONFIG.ENDPOINTS.USER.INVITATIONS}/share/${shareUrl}`,
    { params }
  );
  return response.data;
};

/**
 * Create new invitation
 */
export const createInvitation = async (
  data: CreateInvitationRequest
): Promise<InvitationResponse> => {
  const token = localStorage.getItem('token');
  const response = await apiClient.post<InvitationResponse>(
    API_CONFIG.ENDPOINTS.USER.INVITATIONS,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

/**
 * Update invitation
 */
export const updateInvitation = async (
  id: string,
  data: Partial<CreateInvitationRequest>
): Promise<InvitationResponse> => {
  const token = localStorage.getItem('token');
  const response = await apiClient.put<InvitationResponse>(
    `${API_CONFIG.ENDPOINTS.USER.INVITATIONS}/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

/**
 * Delete invitation
 */
export const deleteInvitation = async (id: string): Promise<{ success: boolean }> => {
  const token = localStorage.getItem('token');
  const response = await apiClient.delete<{ success: boolean }>(
    `${API_CONFIG.ENDPOINTS.USER.INVITATIONS}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

/**
 * Invitation Template interfaces
 */
export interface InvitationTemplate {
  id: number;
  name: string;
  description: string;
  thumbnailUrl: string;
  previewUrl?: string;
  price: number;
  category: string;
  designConfig: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    layout: string;
  } | null;
  usageCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateResponse {
  success: boolean;
  data: InvitationTemplate;
}

export interface TemplatesResponse {
  success: boolean;
  data: InvitationTemplate[];
}

/**
 * Get all invitation templates
 */
export const getAllTemplates = async (): Promise<TemplatesResponse> => {
  const response = await apiClient.get<TemplatesResponse>(
    '/user/invitation-templates'
  );
  return response.data;
};

/**
 * Get template by ID
 */
export const getTemplateById = async (id: number): Promise<TemplateResponse> => {
  const response = await apiClient.get<TemplateResponse>(
    `/user/invitation-templates/${id}`
  );
  return response.data;
};

/**
 * Create a guest for an invitation
 */
export const createGuest = async (
  invitationId: string,
  guestData: { name: string; status?: string }
): Promise<{ success: boolean; data: any; message?: string }> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await apiClient.post(
      `/user/guests/invitation/${invitationId}`,
      guestData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error creating guest:', error);
    throw error;
  }
};

export const invitationsApi = {
  getUserInvitations,
  getInvitationById,
  getInvitationByShareUrl,
  createInvitation,
  updateInvitation,
  deleteInvitation,
  getAllTemplates,
  getTemplateById,
  createGuest,
};
