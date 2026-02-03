import React from 'react';
import { Button } from 'antd';
import styles from './CTASection.module.scss';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/routing/config/routePaths';

/**
 * CTASection Component
 * Call-to-action section to book an appointment or learn more
 * @returns React component with CTA buttons
 */
export const CTASection: React.FC = () => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate(ROUTE_PATHS.BOOK_APPOINTMENT);
  };

  const handleLearnMore = () => {
    navigate(ROUTE_PATHS.SERVICES);
  };

  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Ready to start your recovery?</h2>
        <p className={styles.description}>
          Join hundreds of patients who have found relief through our expert care. Schedule your initial consultation
          today.
        </p>
        <div className={styles.buttonGroup}>
          <Button type="primary" size="large" className={styles.primaryButton} onClick={handleBookAppointment}>
            Book Appointment Now
          </Button>
          <Button size="large" className={styles.secondaryButton} onClick={handleLearnMore}>
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};
