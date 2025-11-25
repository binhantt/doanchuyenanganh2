export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  images?: Array<{ url: string; alt: string; productName?: string }>;
  products?: Array<{ id: string; name: string; price: number }>;
  action?: OrderAction;
}

export interface OrderAction {
  type: 'order' | 'consultation';
  productId: string;
  productName: string;
  productType: 'package' | 'product' | 'service';
  price: number;
}

export interface OrderFormData {
  productId: string;
  productType: 'package' | 'product' | 'service';
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  weddingDate: string;
  venue: string;
  guestCount?: number;
  notes?: string;
}

export interface ChatResponse {
  success: boolean;
  data?: {
    message: string;
    images?: Array<{ url: string; alt: string; productName?: string }>;
    products?: Array<{ id: string; name: string; price: number }>;
    action?: OrderAction;
    timestamp: string;
  };
  message?: string;
}
