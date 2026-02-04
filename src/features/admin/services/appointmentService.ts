import type {
  AdminAppointment,
  AppointmentFormData,
  AppointmentFilters,
  DoctorOption,
  PatientOption,
} from '../types/appointment.types';
import { AppointmentStatus } from '../types/appointment.types';

/**
 * Mock appointments data for development
 * TODO: Replace with real API calls when backend is ready
 */
const mockAppointments: AdminAppointment[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Jane Doe',
    patientDisplayId: 'P-12345',
    patientPhone: '(123) 456-7890',
    patientEmail: 'jane.doe@email.com',
    doctorId: '1',
    doctorName: 'Dr. Marcus Holloway',
    serviceType: 'New Patient Consultation',
    dateTime: '2024-10-26T10:30:00Z',
    reasonForVisit:
      'Patient reports experiencing persistent lower back pain for the last two weeks, radiating down the left leg. Pain worsens with prolonged sitting.',
    status: AppointmentStatus.CONFIRMED,
    notes: 'First visit for spine evaluation',
    createdAt: '2024-10-20T10:00:00Z',
    updatedAt: '2024-10-20T10:00:00Z',
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Maria Garcia',
    patientDisplayId: 'P-12346',
    patientPhone: '(234) 567-8901',
    patientEmail: 'maria.garcia@email.com',
    doctorId: '2',
    doctorName: 'Dr. Johnson',
    serviceType: 'Follow-up Visit',
    dateTime: '2024-10-26T11:00:00Z',
    reasonForVisit: 'Post-surgery follow-up to check recovery progress and address any concerns.',
    status: AppointmentStatus.PENDING,
    notes: 'Post-surgery checkup',
    createdAt: '2024-10-20T11:00:00Z',
    updatedAt: '2024-10-20T11:00:00Z',
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Robert Johnson',
    patientDisplayId: 'P-12347',
    patientPhone: '(345) 678-9012',
    patientEmail: 'robert.j@email.com',
    doctorId: '1',
    doctorName: 'Dr. Arlene McCoy',
    serviceType: 'Post-Operative Check',
    dateTime: '2024-10-27T09:00:00Z',
    reasonForVisit: 'Post-operative check to ensure proper healing and recovery.',
    status: AppointmentStatus.CANCELLED,
    notes: 'Patient requested cancellation',
    createdAt: '2024-10-21T10:00:00Z',
    updatedAt: '2024-10-25T15:30:00Z',
  },
  {
    id: '4',
    patientId: '4',
    patientName: 'Patricia Williams',
    patientDisplayId: 'P-12348',
    patientPhone: '(456) 789-0123',
    patientEmail: 'patricia.w@email.com',
    doctorId: '3',
    doctorName: 'Dr. Smith',
    serviceType: 'Initial Consultation',
    dateTime: '2024-10-27T09:30:00Z',
    reasonForVisit: 'Initial consultation for chronic neck pain assessment.',
    status: AppointmentStatus.COMPLETED,
    notes: 'Completed successfully',
    createdAt: '2024-10-21T11:00:00Z',
    updatedAt: '2024-10-27T10:00:00Z',
  },
  {
    id: '5',
    patientId: '5',
    patientName: 'David Brown',
    patientDisplayId: 'P-12349',
    patientPhone: '(567) 890-1234',
    patientEmail: 'david.brown@email.com',
    doctorId: '2',
    doctorName: 'Dr. Johnson',
    serviceType: 'Follow-up Visit',
    dateTime: '2024-10-28T14:00:00Z',
    reasonForVisit: 'Follow-up visit to review test results and discuss treatment plan.',
    status: AppointmentStatus.RESCHEDULED,
    notes: 'Rescheduled from previous date',
    createdAt: '2024-10-22T10:00:00Z',
    updatedAt: '2024-10-26T12:00:00Z',
  },
  // Add more mock data for pagination testing
  {
    id: '6',
    patientId: '6',
    patientName: 'Emma Wilson',
    patientDisplayId: 'P-12350',
    patientPhone: '(678) 901-2345',
    patientEmail: 'emma.w@email.com',
    doctorId: '1',
    doctorName: 'Dr. Arlene McCoy',
    serviceType: 'Initial Consultation',
    dateTime: '2024-10-28T10:00:00Z',
    reasonForVisit: 'Initial consultation for spine evaluation.',
    status: AppointmentStatus.CONFIRMED,
    createdAt: '2024-10-23T10:00:00Z',
    updatedAt: '2024-10-23T10:00:00Z',
  },
  {
    id: '7',
    patientId: '7',
    patientName: 'Michael Anderson',
    patientDisplayId: 'P-12351',
    patientPhone: '(789) 012-3456',
    patientEmail: 'michael.a@email.com',
    doctorId: '2',
    doctorName: 'Dr. Johnson',
    serviceType: 'Follow-up Visit',
    dateTime: '2024-10-29T11:30:00Z',
    reasonForVisit: 'Follow-up visit for ongoing treatment monitoring.',
    status: AppointmentStatus.PENDING,
    createdAt: '2024-10-24T10:00:00Z',
    updatedAt: '2024-10-24T10:00:00Z',
  },
  {
    id: '8',
    patientId: '8',
    patientName: 'Sarah Martinez',
    patientDisplayId: 'P-12352',
    patientPhone: '(890) 123-4567',
    patientEmail: 'sarah.m@email.com',
    doctorId: '3',
    doctorName: 'Dr. Smith',
    serviceType: 'Post-Operative Check',
    dateTime: '2024-10-29T15:00:00Z',
    reasonForVisit: 'Post-operative check to assess healing progress.',
    status: AppointmentStatus.CONFIRMED,
    createdAt: '2024-10-25T10:00:00Z',
    updatedAt: '2024-10-25T10:00:00Z',
  },
];

/**
 * Mock doctors data
 */
const mockDoctors: DoctorOption[] = [
  { id: '1', name: 'Dr. Arlene McCoy', specialty: 'Orthopedic Spine Surgeon' },
  { id: '2', name: 'Dr. Johnson', specialty: 'Physical Therapy' },
  { id: '3', name: 'Dr. Smith', specialty: 'Pain Management' },
];

/**
 * Mock patients data for dropdown
 */
const mockPatientOptions: PatientOption[] = [
  { id: '1', name: 'Johnathan Smith', email: 'john.smith@example.com' },
  { id: '2', name: 'Maria Garcia', email: 'maria.garcia@example.com' },
  { id: '3', name: 'Robert Johnson', email: 'robert.j@example.com' },
  { id: '4', name: 'Patricia Williams', email: 'patricia.w@example.com' },
  { id: '5', name: 'David Brown', email: 'david.brown@example.com' },
  { id: '6', name: 'Emma Wilson', email: 'emma.w@example.com' },
  { id: '7', name: 'Michael Anderson', email: 'michael.a@example.com' },
  { id: '8', name: 'Sarah Martinez', email: 'sarah.m@example.com' },
];

/**
 * Counter for generating unique IDs
 */
let appointmentIdCounter = 1000;

/**
 * AppointmentService
 * Service layer for appointment management operations
 *
 * Design Patterns:
 * - Repository Pattern: Centralized data access
 * - Service Layer: Business logic separation
 * - Promise-based API: Async operations
 *
 * Architecture:
 * - Facade Pattern: Simple interface for complex operations
 * - Separation of Concerns: Data access logic isolated
 *
 * Future Enhancement:
 * - Replace mock data with HTTP calls to backend API
 * - Add caching layer for better performance
 * - Add retry logic for failed requests
 */
class AppointmentService {
  /**
   * Get appointments with filters and pagination
   */
  async getAppointments(
    filters: AppointmentFilters,
    page: number,
    pageSize: number,
  ): Promise<{ appointments: AdminAppointment[]; total: number }> {
    // Simulate API delay
    await this.delay(300);

    let filteredAppointments = [...mockAppointments];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredAppointments = filteredAppointments.filter(
        (apt) =>
          apt.patientName.toLowerCase().includes(searchLower) ||
          apt.doctorName.toLowerCase().includes(searchLower) ||
          apt.reasonForVisit.toLowerCase().includes(searchLower),
      );
    }

    // Apply doctor filter
    if (filters.doctorId && filters.doctorId !== 'all') {
      filteredAppointments = filteredAppointments.filter((apt) => apt.doctorId === filters.doctorId);
    }

    // Apply status filter
    if (filters.status && filters.status !== 'all') {
      filteredAppointments = filteredAppointments.filter((apt) => apt.status === filters.status);
    }

    // Apply date range filter
    if (filters.dateRange) {
      const { start, end } = filters.dateRange;
      filteredAppointments = filteredAppointments.filter((apt) => {
        const aptDate = new Date(apt.dateTime);
        return aptDate >= new Date(start) && aptDate <= new Date(end);
      });
    }

    // Apply sorting
    const sortBy = filters.sortBy || 'dateTime';
    const sortOrder = filters.sortOrder || 'desc';
    filteredAppointments.sort((a, b) => {
      let aValue: string | Date = a[sortBy as keyof AdminAppointment] as string;
      let bValue: string | Date = b[sortBy as keyof AdminAppointment] as string;

      if (sortBy === 'dateTime' || sortBy === 'createdAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    // Apply pagination
    const total = filteredAppointments.length;
    const startIndex = (page - 1) * pageSize;
    const paginatedAppointments = filteredAppointments.slice(startIndex, startIndex + pageSize);

    return {
      appointments: paginatedAppointments,
      total,
    };
  }

  /**
   * Get a single appointment by ID
   */
  async getAppointmentById(id: string): Promise<AdminAppointment> {
    await this.delay(200);
    const appointment = mockAppointments.find((apt) => apt.id === id);
    if (!appointment) {
      throw new Error('Appointment not found');
    }
    return appointment;
  }

  /**
   * Create a new appointment
   */
  async createAppointment(data: AppointmentFormData): Promise<AdminAppointment> {
    await this.delay(500);

    const newAppointment: AdminAppointment = {
      id: String(++appointmentIdCounter),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockAppointments.unshift(newAppointment);
    return newAppointment;
  }

  /**
   * Update an existing appointment
   */
  async updateAppointment(id: string, data: Partial<AppointmentFormData>): Promise<AdminAppointment> {
    await this.delay(500);

    const index = mockAppointments.findIndex((apt) => apt.id === id);
    if (index === -1) {
      throw new Error('Appointment not found');
    }

    const updatedAppointment = {
      ...mockAppointments[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    mockAppointments[index] = updatedAppointment;
    return updatedAppointment;
  }

  /**
   * Delete an appointment
   */
  async deleteAppointment(id: string): Promise<void> {
    await this.delay(300);

    const index = mockAppointments.findIndex((apt) => apt.id === id);
    if (index === -1) {
      throw new Error('Appointment not found');
    }

    mockAppointments.splice(index, 1);
  }

  /**
   * Cancel an appointment
   */
  async cancelAppointment(id: string): Promise<AdminAppointment> {
    return this.updateAppointment(id, { status: AppointmentStatus.CANCELLED });
  }

  /**
   * Reschedule an appointment
   */
  async rescheduleAppointment(id: string, newDateTime: string): Promise<AdminAppointment> {
    return this.updateAppointment(id, {
      dateTime: newDateTime,
      status: AppointmentStatus.RESCHEDULED,
    });
  }

  /**
   * Get available doctors
   */
  async getDoctors(): Promise<DoctorOption[]> {
    await this.delay(200);
    return mockDoctors;
  }

  /**
   * Get available patients for dropdown
   */
  async getPatientOptions(): Promise<PatientOption[]> {
    await this.delay(200);
    return mockPatientOptions;
  }

  /**
   * Simulate API delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const appointmentService = new AppointmentService();
