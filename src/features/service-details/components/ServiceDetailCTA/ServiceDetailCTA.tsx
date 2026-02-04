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
        <h2 className={styles.ctaTitle}>Don't Let an Injury Keep You Out of the Game</h2>
        <p className={styles.ctaSubtitle}>
          Our specialists are here to help you navigate every step of your recovery journey with confidence.
        </p>
        <div className={styles.ctaButtons}>
          <Button
            type="primary"
            size="large"
            icon={<CalendarOutlined />}
            className={styles.scheduleButton}
            onClick={onScheduleAppointment}
          >
            Schedule Appointment Now
          </Button>
          <Button size="large" icon={<TeamOutlined />} className={styles.teamButton} onClick={onViewTeam}>
            View Our Team
          </Button>
        </div>
      </div>
    </section>
  );
};
