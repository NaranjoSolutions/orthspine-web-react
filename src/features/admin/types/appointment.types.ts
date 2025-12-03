/**
 * Appointment Management Types
 * Type definitions for appointment management features in admin panel
 */

/**
 * Appointment Status
 */
export enum AppointmentStatus {
  CONFIRMED = 'confirmed',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  RESCHEDULED = 'rescheduled',
}

/**
 * Appointment entity for admin management
 */
export interface AdminAppointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  dateTime: string; // ISO 8601 format
  reasonForVisit: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Appointment form data for create/update operations
 */
export interface AppointmentFormData {
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  dateTime: string;
  reasonForVisit: string;
  status: AppointmentStatus;
  notes?: string;
}

/**
 * Appointment list filters
 */
export interface AppointmentFilters {
  search?: string;
  doctorId?: string;
  status?: AppointmentStatus | 'all';
  dateRange?: {
    start: string;
    end: string;
  };
  sortBy?: 'dateTime' | 'patientName' | 'status' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Appointment pagination parameters
 */
export interface AppointmentPagination {
  page: number;
  pageSize: number;
  total: number;
}

/**
 * Appointment state for Redux
 */
export interface AppointmentState {
  appointments: AdminAppointment[];
  selectedAppointment: AdminAppointment | null;
  filters: AppointmentFilters;
  pagination: AppointmentPagination;
  isLoading: boolean;
  error: string | null;
}

/**
 * Doctor option for dropdown
 */
export interface DoctorOption {
  id: string;
  name: string;
  specialty: string;
}

/**
 * Patient option for dropdown
 */
export interface PatientOption {
  id: string;
  name: string;
  email: string;
}
