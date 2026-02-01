import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import styles from './RecoveryJourney.module.scss';

/**
 * RecoveryJourney Component
 * Call-to-action section encouraging users to start their recovery journey
 *
 * Features:
 * - Prominent blue background with white text
 * - Motivational title and subtitle
 * - Two call-to-action buttons (Schedule Appointment, Learn More)
 * - Responsive design
 */
export const RecoveryJourney: React.FC = () => {
  const navigate = useNavigate();

  const handleScheduleAppointment = () => {
    navigate(ROUTE_PATHS.BOOK_APPOINTMENT);
  };

  const handleLearnMore = () => {
    navigate(ROUTE_PATHS.SERVICES);
  };

  return (
    <section className={styles.recoveryJourney} aria-labelledby="recovery-journey-title">
      <div className={styles.container}>
        <h2 id="recovery-journey-title" className={styles.title}>
          Ready to Start Your Recovery Journey?
        </h2>
        <p className={styles.subtitle}>
          Take the first step towards a pain-free life today. Our experts are standing by to help you recover and
          thrive.
        </p>
        <div className={styles.buttonGroup}>
          <Button
            type="primary"
            size="large"
            className={styles.primaryButton}
            onClick={handleScheduleAppointment}
            aria-label="Schedule an appointment with our clinic"
          >
            Schedule an Appointment
          </Button>
          <Button
            type="default"
            size="large"
            className={styles.secondaryButton}
            onClick={handleLearnMore}
            aria-label="Learn more about our services"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};
