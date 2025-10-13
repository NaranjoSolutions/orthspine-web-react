import React, { useState } from 'react';
import { SelectDateTime } from '@/features/appointments/components/SelectDateTime';
import { Confirm } from '@/features/appointments/components/Confirm';
import { Success } from '@/features/appointments/components/Success';
import {
  AppointmentDetails,
  TimeSlot,
  BOOKING_STEPS,
} from '@/features/appointments/types/appointment.types';
import { appointmentServices, doctors } from '@/shared/resources/appointments/appointments';
import styles from './BookAppointmentPage.module.scss';

/**
 * BookAppointmentPage Component
 * Main page for appointment booking flow
 *
 * Features:
 * - Multi-step booking process
 * - Step 1: Select date and time
 * - Step 2: Confirm appointment details
 * - Step 3: Success confirmation
 *
 * Flow:
 * 1. User selects date and time slot
 * 2. User confirms appointment details
 * 3. Appointment is booked and confirmation shown
 */
export const BookAppointmentPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(BOOKING_STEPS.SELECT_DATE_TIME);
  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails>({
    service: appointmentServices[0], // Default to first service (Spine Consultation)
    date: new Date(),
    timeSlot: { id: '', time: '', available: true },
    doctor: doctors[0], // Default to first doctor
    patientName: 'Sophia Clark', // In a real app, this would come from auth context
  });

  const handleDateTimeSelect = (date: Date, timeSlot: TimeSlot) => {
    setAppointmentDetails({
      ...appointmentDetails,
      date,
      timeSlot,
    });
    setCurrentStep(BOOKING_STEPS.CONFIRM);
  };

  const handleBack = () => {
    setCurrentStep(BOOKING_STEPS.SELECT_DATE_TIME);
  };

  const handleConfirm = () => {
    // In a real app, this would make an API call to book the appointment
    console.log('Booking appointment:', appointmentDetails);
    setCurrentStep(BOOKING_STEPS.SUCCESS);
  };

  return (
    <div className={styles.bookAppointmentPage}>
      {currentStep === BOOKING_STEPS.SELECT_DATE_TIME && <SelectDateTime onNext={handleDateTimeSelect} />}
      {currentStep === BOOKING_STEPS.CONFIRM && (
        <Confirm appointmentDetails={appointmentDetails} onBack={handleBack} onConfirm={handleConfirm} />
      )}
      {currentStep === BOOKING_STEPS.SUCCESS && <Success appointmentDetails={appointmentDetails} />}
    </div>
  );
};

export default BookAppointmentPage;
