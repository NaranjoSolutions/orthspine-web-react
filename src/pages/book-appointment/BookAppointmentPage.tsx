import React from 'react';
import styles from './BookAppointmentPage.module.scss';

/**
 * BookAppointmentPage Component
 * Placeholder page for the upcoming booking appointment feature
 *
 * Features:
 * - Centered "Coming Soon" message
 * - Clear title and supportive description
 * - Accessible semantic HTML structure
 */
export const BookAppointmentPage: React.FC = () => {
  return (
    <div className={styles.bookAppointmentPage}>
      <section className={styles.comingSoonSection}>
        <div className={styles.content}>
          <h1 className={styles.title}>Book an Appointment</h1>
          <p className={styles.comingSoonBadge}>Coming Soon</p>
          <p className={styles.description}>
            We're working on making it easier than ever to book your appointment online. In the meantime, please call us
            or visit our clinic to schedule your visit.
          </p>
        </div>
      </section>
    </div>
  );
};

export default BookAppointmentPage;
