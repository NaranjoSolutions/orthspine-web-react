/**
 * Appointment Types
 * Type definitions for appointment booking feature
 */

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface AppointmentService {
  id: string;
  name: string;
  description: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

export interface AppointmentDetails {
  service: AppointmentService;
  date: Date;
  timeSlot: TimeSlot;
  doctor: Doctor;
  patientName?: string;
}

export interface BookingStep {
  step: number;
  title: string;
}

export const BOOKING_STEPS = {
  SELECT_DATE_TIME: 1,
  CONFIRM: 2,
  SUCCESS: 3,
} as const;
