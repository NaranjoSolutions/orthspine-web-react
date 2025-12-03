/**
 * Admin Dashboard Domain Types
 * Type definitions for admin dashboard features
 */

/**
 * Dashboard statistics data
 */
export interface DashboardStats {
  totalPatients: number;
  upcomingAppointments: number;
  pendingTestimonials: number;
}

/**
 * Activity type enum
 */
export enum ActivityType {
  PATIENT_REGISTERED = 'patient_registered',
  APPOINTMENT_CONFIRMED = 'appointment_confirmed',
  APPOINTMENT_CANCELLED = 'appointment_cancelled',
  TESTIMONIAL_SUBMITTED = 'testimonial_submitted',
}

/**
 * Recent activity item
 */
export interface RecentActivity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  actor?: string;
}

/**
 * Admin dashboard state
 */
export interface AdminDashboardState {
  stats: DashboardStats | null;
  recentActivities: RecentActivity[];
  isLoading: boolean;
  error: string | null;
}
