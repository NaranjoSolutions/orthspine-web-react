/**
 * Patient Domain Types
 * Type definitions for patient management features
 */

/**
 * Patient Status
 */
export enum PatientStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DISCHARGED = 'discharged',
}

/**
 * Medical Note Category
 */
export enum MedicalNoteCategory {
  INTAKE = 'Intake',
  CONSULTATION = 'Consultation',
  POST_OP = 'Post-Op',
  FOLLOW_UP = 'Follow-Up',
  GENERAL = 'General',
}

/**
 * Physician entity
 */
export interface Physician {
  id: string;
  name: string;
  specialty: string;
}

/**
 * Appointment entity
 */
export interface Appointment {
  id: string;
  patientId: string;
  physicianId: string;
  date: string; // ISO 8601 format
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

/**
 * Medical Note entity
 */
export interface MedicalNote {
  id: string;
  patientId: string;
  date: string; // ISO 8601 format
  author: string;
  category: MedicalNoteCategory;
  content: string;
  createdAt: string;
}

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
  // Extended fields for details view
  patientId?: string; // Display ID like "789-123-456"
  status?: PatientStatus;
  primaryPhysicianId?: string;
  nextAppointmentDate?: string;
  avatarUrl?: string;
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
 * Medical Note form data
 */
export interface MedicalNoteFormData {
  category: MedicalNoteCategory;
  content: string;
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
