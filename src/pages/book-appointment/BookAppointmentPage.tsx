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
          <h1 className={styles.title}>Reservar una cita</h1>
          <p className={styles.comingSoonBadge}>Próximamente</p>
          <p className={styles.description}>
            Estamos trabajando para hacer más fácil que nunca reservar su cita en línea. Mientras tanto, por favor llámenos o visite nuestra clínica para programar su visita.
          </p>
        </div>
      </section>
    </div>
  );
};

export default BookAppointmentPage;
