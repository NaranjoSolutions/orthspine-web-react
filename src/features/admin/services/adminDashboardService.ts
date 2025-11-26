import { DashboardStats, RecentActivity, ActivityType } from '../types';

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

    const now = new Date();

    return [
      {
        id: '1',
        type: ActivityType.PATIENT_REGISTERED,
        title: 'New Patient Registered: John Doe',
        description: 'by Dr. Smith',
        timestamp: new Date(now.getTime() - 2 * 60 * 1000).toISOString(),
        actor: 'Dr. Smith',
      },
      {
        id: '2',
        type: ActivityType.APPOINTMENT_CONFIRMED,
        title: 'Appointment Confirmed: Jane Smith',
        description: 'for Oct 26, 2023',
        timestamp: new Date(now.getTime() - 15 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        type: ActivityType.TESTIMONIAL_SUBMITTED,
        title: 'New Testimonial Submitted',
        description: 'by Michael Johnson',
        timestamp: new Date(now.getTime() - 60 * 60 * 1000).toISOString(),
        actor: 'Michael Johnson',
      },
      {
        id: '4',
        type: ActivityType.APPOINTMENT_CANCELLED,
        title: 'Appointment Canceled: Emily White',
        description: 'was for Oct 25, 2023',
        timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '5',
        type: ActivityType.PATIENT_REGISTERED,
        title: 'New Patient Registered: Sarah Connor',
        description: 'by Dr. Adams',
        timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
        actor: 'Dr. Adams',
      },
    ];
  }
}

export const adminDashboardService = new AdminDashboardService();
