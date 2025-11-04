import React from 'react';
import { Button } from 'antd';
import { CheckCircleOutlined, CalendarOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import { AppointmentDetails } from '@/features/appointments/types/appointment.types';
import dayjs from 'dayjs';
import styles from './Success.module.scss';

interface SuccessProps {
  appointmentDetails: AppointmentDetails;
}

/**
 * Success Component
 * Shows confirmation that appointment was successfully booked
 *
 * Features:
 * - Success icon and message
 * - Appointment details summary
 * - Actions to add to calendar or return to dashboard
 */
export const Success: React.FC<SuccessProps> = ({ appointmentDetails }) => {
  const navigate = useNavigate();

  const handleReturnToDashboard = () => {
    navigate(ROUTE_PATHS.HOME);
  };

  const handleAddToCalendar = () => {
    // In a real app, this would generate a calendar file or use calendar API
    console.log('Add to calendar clicked');
  };

  const formattedDate = dayjs(appointmentDetails.date).format('MMMM D, YYYY');
  const timeRange = `${appointmentDetails.timeSlot.time} - ${dayjs(appointmentDetails.date).hour(11).minute(0).format('h:mm A')}`;

  return (
    <div className={styles.success}>
      <div className={styles.card}>
        <div className={styles.iconContainer}>
          <CheckCircleOutlined className={styles.successIcon} />
        </div>

        <h1 className={styles.title}>Appointment Booked!</h1>
        <p className={styles.message}>
          Your appointment has been successfully scheduled. A confirmation email has been sent.
        </p>

        <div className={styles.detailsBox}>
          <h2 className={styles.detailsTitle}>Appointment Details</h2>

          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Date</span>
              <span className={styles.detailValue}>{formattedDate}</span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Time</span>
              <span className={styles.detailValue}>{timeRange}</span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Service</span>
              <span className={styles.detailValue}>{appointmentDetails.service.name}</span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Doctor</span>
              <span className={styles.detailValue}>{appointmentDetails.doctor.name}</span>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Button size="large" icon={<HomeOutlined />} onClick={handleReturnToDashboard}>
            Return to Home
          </Button>
          <Button type="primary" size="large" icon={<CalendarOutlined />} onClick={handleAddToCalendar}>
            Add to Calendar
          </Button>
        </div>
      </div>
    </div>
  );
};
