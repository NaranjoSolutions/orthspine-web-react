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
        <h2 className={styles.title}>¿Listo para comenzar su recuperación?</h2>
        <p className={styles.description}>
          Únase a cientos de pacientes que han encontrado alivio a través de nuestra atención especializada. Programe su consulta inicial hoy.
        </p>
        <div className={styles.buttonGroup}>
          <Button type="primary" size="large" className={styles.primaryButton} onClick={handleBookAppointment}>
            Agendar Cita Ahora
          </Button>
          <Button size="large" className={styles.secondaryButton} onClick={handleLearnMore}>
            Más Información
          </Button>
        </div>
      </div>
    </section>
  );
};
