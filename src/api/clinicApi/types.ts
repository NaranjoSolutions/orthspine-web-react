// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user?: User;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
  phone?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Testimonial Types
export interface Testimonial {
  testimonialId: string;
  firstName: string;
  lastName: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateTestimonialRequest = Omit<Testimonial, 'testimonialId' | 'status' | 'createdAt' | 'updatedAt'>;
export type UpdateTestimonialRequest = Partial<Omit<Testimonial, 'testimonialId' | 'createdAt' | 'updatedAt'>>;

export interface TestimonialFilters {
  status?: 'pending' | 'approved' | 'rejected';
  rating?: number;
  limit?: number;
  offset?: number;
  search?: string;
}

// Email Types
export interface ContactFormRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface AppointmentRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  service: string;
  notes?: string;
}

export interface SendVerificationCodeRequest {
  email: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  messageId?: string;
}

// API Error Types
export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}
