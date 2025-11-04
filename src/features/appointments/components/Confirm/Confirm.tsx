import React from 'react';
import { Button } from 'antd';
import { AppointmentDetails } from '@/features/appointments/types/appointment.types';
import dayjs from 'dayjs';
import styles from './Confirm.module.scss';

interface ConfirmProps {
  appointmentDetails: AppointmentDetails;
  onBack: () => void;
  onConfirm: () => void;
}

/**
 * Confirm Component
 * Shows appointment details for confirmation before booking
 *
 * Features:
 * - Display selected service, date, time, and patient info
 * - Back button to edit selections
 * - Confirm button to complete booking
 */
export const Confirm: React.FC<ConfirmProps> = ({ appointmentDetails, onBack, onConfirm }) => {
  return (
    <div className={styles.confirm}>
      <div className={styles.breadcrumb}>
        <span>Book Appointment</span>
        <span className={styles.separator}>/</span>
        <span>Select Time</span>
        <span className={styles.separator}>/</span>
        <span className={styles.current}>Confirm</span>
      </div>

      <div className={styles.card}>
        <h1 className={styles.title}>Confirm Your Appointment</h1>
        <p className={styles.subtitle}>Please review the details below before confirming.</p>

        <div className={styles.details}>
          <div className={styles.detailRow}>
            <span className={styles.label}>Service</span>
            <span className={styles.value}>{appointmentDetails.service.name}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.label}>Date</span>
            <span className={styles.value}>{dayjs(appointmentDetails.date).format('MMMM D, YYYY')}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.label}>Time</span>
            <span className={styles.value}>{appointmentDetails.timeSlot.time}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.label}>Patient</span>
            <span className={styles.value}>{appointmentDetails.patientName || 'Sophia Clark'}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <Button size="large" onClick={onBack}>
            Back
          </Button>
          <Button type="primary" size="large" onClick={onConfirm}>
            Confirm Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};
