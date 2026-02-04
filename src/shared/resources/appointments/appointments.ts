/**
 * Type definitions for mock appointment data
 */
interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface AppointmentService {
  id: string;
  name: string;
  description: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

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
    name: 'Consulta de Columna',
    description: 'Evaluación integral y tratamiento para afecciones de la columna',
  },
  {
    id: 'knee-consultation',
    name: 'Consulta de Rodilla',
    description: 'Evaluación y tratamiento para problemas de rodilla',
  },
  {
    id: 'initial-consultation',
    name: 'Consulta Inicial',
    description: 'Consulta y evaluación para pacientes nuevos',
  },
  {
    id: 'follow-up',
    name: 'Consulta de Seguimiento',
    description: 'Visita de seguimiento para tratamiento en curso',
  },
];

/**
 * Mock data for doctors
 * In a real application, this would come from an API
 */
export const doctors: Doctor[] = [
  {
    id: 'dr-carter',
    name: 'Dra. Emily Carter',
    specialty: 'Especialista en Columna Ortopédica',
  },
  {
    id: 'dr-martinez',
    name: 'Dr. Carlos Martínez',
    specialty: 'Fisioterapeuta',
  },
];
