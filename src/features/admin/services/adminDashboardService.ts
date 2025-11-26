import { DashboardStats, RecentActivity, ActivityType } from '../types';
import { getRelativeDate } from '@/shared/utils/dateUtils';

/**
 * Admin Dashboard Service
 * Handles business logic for admin dashboard
 * Currently uses mock data - will be replaced with real API calls
 */
class AdminDashboardService {
  /**
   * Fetch dashboard statistics
   * TODO: Replace with real API call
   */
  async getDashboardStats(): Promise<DashboardStats> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      totalPatients: 1204,
      upcomingAppointments: 15,
      pendingTestimonials: 8,
    };
  }

  /**
   * Fetch recent activities
   * TODO: Replace with real API call
   */
  async getRecentActivities(): Promise<RecentActivity[]> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
      {
        id: '1',
        type: ActivityType.PATIENT_REGISTERED,
        title: 'New Patient Registered: John Doe',
        description: 'by Dr. Smith',
        timestamp: getRelativeDate(-0.0014), // ~2 minutes ago
        actor: 'Dr. Smith',
      },
      {
        id: '2',
        type: ActivityType.APPOINTMENT_CONFIRMED,
        title: 'Appointment Confirmed: Jane Smith',
        description: `for ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}`,
        timestamp: getRelativeDate(-0.01), // ~15 minutes ago
      },
      {
        id: '3',
        type: ActivityType.TESTIMONIAL_SUBMITTED,
        title: 'New Testimonial Submitted',
        description: 'by Michael Johnson',
        timestamp: getRelativeDate(-0.042), // ~1 hour ago
        actor: 'Michael Johnson',
      },
      {
        id: '4',
        type: ActivityType.APPOINTMENT_CANCELLED,
        title: 'Appointment Canceled: Emily White',
        description: `was for ${new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString()}`,
        timestamp: getRelativeDate(-0.125), // ~3 hours ago
      },
      {
        id: '5',
        type: ActivityType.PATIENT_REGISTERED,
        title: 'New Patient Registered: Sarah Connor',
        description: 'by Dr. Adams',
        timestamp: getRelativeDate(-1), // Yesterday
        actor: 'Dr. Adams',
      },
    ];
  }
}

export const adminDashboardService = new AdminDashboardService();
