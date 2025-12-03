/**
 * Patient Domain Types
 * Type definitions for patient management features
 */

/**
 * Patient entity
 */
export interface Patient {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  dateOfBirth: string; // ISO 8601 format (YYYY-MM-DD)
  address?: string;
  medicalHistory?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Patient form data for create/update operations
 */
export interface PatientFormData {
  fullName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  address?: string;
  medicalHistory?: string;
}

/**
 * Patient list filters
 */
export interface PatientFilters {
  search?: string;
  sortBy?: 'fullName' | 'dateOfBirth' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Patient pagination parameters
 */
export interface PatientPagination {
  page: number;
  pageSize: number;
  total: number;
}

/**
 * Patient state for Redux
 */
export interface PatientState {
  patients: Patient[];
  selectedPatient: Patient | null;
  filters: PatientFilters;
  pagination: PatientPagination;
  isLoading: boolean;
  error: string | null;
}
