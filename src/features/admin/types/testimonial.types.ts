/**
 * Testimonial Domain Types
 * Type definitions for testimonial management features
 */

/**
 * Testimonial Status
 */
export enum TestimonialStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

/**
 * Testimonial entity
 */
export interface Testimonial {
  id: string;
  patientName: string;
  message: string;
  rating: number;
  status: TestimonialStatus;
  dateAdded: string; // ISO 8601 format
  createdAt: string;
  updatedAt: string;
}

/**
 * Testimonial form data for create/update operations
 */
export interface TestimonialFormData {
  patientName: string;
  message: string;
  rating: number;
  status: TestimonialStatus;
}

/**
 * Testimonial list filters
 */
export interface TestimonialFilters {
  search?: string;
  status?: TestimonialStatus | 'all';
  sortBy?: 'patientName' | 'dateAdded' | 'rating';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Testimonial pagination parameters
 */
export interface TestimonialPagination {
  page: number;
  pageSize: number;
  total: number;
}

/**
 * Testimonial state for Redux
 */
export interface TestimonialState {
  testimonials: Testimonial[];
  selectedTestimonial: Testimonial | null;
  filters: TestimonialFilters;
  pagination: TestimonialPagination;
  isLoading: boolean;
  error: string | null;
}
