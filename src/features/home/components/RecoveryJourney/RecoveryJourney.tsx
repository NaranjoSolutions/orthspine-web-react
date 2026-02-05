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
          ¿Listo para Comenzar su Viaje de Recuperación?
        </h2>
        <p className={styles.subtitle}>
          Dé el primer paso hacia una vida sin dolor hoy. Nuestros expertos están listos para ayudarle a recuperarse y
          prosperar.
        </p>
        <div className={styles.buttonGroup}>
          <Button
            type="primary"
            size="large"
            className={styles.primaryButton}
            onClick={handleScheduleAppointment}
            aria-label="Agendar una cita con nuestra clínica"
          >
            Agendar una Cita
          </Button>
          <Button
            type="default"
            size="large"
            className={styles.secondaryButton}
            onClick={handleLearnMore}
            aria-label="Conocer más sobre nuestros servicios"
          >
            Conocer Más
          </Button>
        </div>
      </div>
    </section>
  );
};
