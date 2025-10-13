import React from 'react';
import { Button } from 'antd';
import styles from './CTASection.module.scss';

/**
 * CTASection Component
 * Call-to-action section to book an appointment
 */
export const CTASection: React.FC = () => {
  const handleBookAppointment = () => {
    // TODO: Navigate to appointment booking page or contact
    console.log('Book Appointment clicked');
  };

  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Ready to Take the Next Step?</h2>
        <p className={styles.description}>
          Allow us to help you on your path to a pain-free life. Contact us today for more information or to schedule a
          consultation.
        </p>
        <Button type="primary" size="large" className={styles.ctaButton} onClick={handleBookAppointment}>
          Schedule a Consultation
        </Button>
      </div>
    </section>
  );
};
