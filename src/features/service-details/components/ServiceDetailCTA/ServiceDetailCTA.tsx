import React from 'react';
import { Button } from 'antd';
import { CalendarOutlined, TeamOutlined } from '@ant-design/icons';
import styles from './ServiceDetailCTA.module.scss';

interface ServiceDetailCTAProps {
  onScheduleAppointment: () => void;
  onViewTeam: () => void;
}

/**
 * ServiceDetailCTA Component
 * Displays call-to-action section with appointment and team buttons
 *
 * @param onScheduleAppointment - Handler for schedule appointment button click
 * @param onViewTeam - Handler for view team button click
 */
export const ServiceDetailCTA: React.FC<ServiceDetailCTAProps> = ({ onScheduleAppointment, onViewTeam }) => {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        <h2 className={styles.ctaTitle}>No Permita que una Lesión lo Mantenga Fuera del Juego</h2>
        <p className={styles.ctaSubtitle}>
          Nuestros especialistas están aquí para ayudarle a navegar cada paso de su proceso de recuperación con confianza.
        </p>
        <div className={styles.ctaButtons}>
          <Button
            type="primary"
            size="large"
            icon={<CalendarOutlined />}
            className={styles.scheduleButton}
            onClick={onScheduleAppointment}
          >
            Agendar Cita Ahora
          </Button>
          <Button size="large" icon={<TeamOutlined />} className={styles.teamButton} onClick={onViewTeam}>
            Ver Nuestro Equipo
          </Button>
        </div>
      </div>
    </section>
  );
};
