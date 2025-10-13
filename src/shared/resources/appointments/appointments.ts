import { TimeSlot, AppointmentService, Doctor } from '@/features/appointments/types/appointment.types';

/**
 * Mock data for available time slots
 * In a real application, this would come from an API
 */
export const availableTimeSlots: TimeSlot[] = [
  { id: '1', time: '9:00 AM', available: true },
  { id: '2', time: '10:00 AM', available: true },
  { id: '3', time: '11:00 AM', available: true },
  { id: '4', time: '1:00 PM', available: true },
  { id: '5', time: '2:00 PM', available: true },
  { id: '6', time: '3:00 PM', available: true },
];

/**
 * Mock data for appointment services
 * These correspond to the services offered by the clinic
 */
export const appointmentServices: AppointmentService[] = [
  {
    id: 'spine-consultation',
    name: 'Spine Consultation',
    description: 'Comprehensive evaluation and treatment for spine conditions',
  },
  {
    id: 'knee-consultation',
    name: 'Knee Consultation',
    description: 'Assessment and treatment for knee problems',
  },
  {
    id: 'initial-consultation',
    name: 'Initial Consultation',
    description: 'First-time patient consultation and evaluation',
  },
  {
    id: 'follow-up',
    name: 'Follow-up Appointment',
    description: 'Follow-up visit for ongoing treatment',
  },
];

/**
 * Mock data for doctors
 * In a real application, this would come from an API
 */
export const doctors: Doctor[] = [
  {
    id: 'dr-carter',
    name: 'Dr. Emily Carter',
    specialty: 'Orthopedic Spine Specialist',
  },
  {
    id: 'dr-martinez',
    name: 'Dr. Carlos Martinez',
    specialty: 'Physical Therapist',
  },
];
