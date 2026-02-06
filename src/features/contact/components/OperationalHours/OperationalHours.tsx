import React from 'react';
import { clinicInformation, parseScheduleEntry } from '@/shared/resources/clinic-information';
import styles from './OperationalHours.module.scss';

/**
 * OperationalHours Component
 * Displays clinic operational hours from shared clinic information
 *
 * Features:
 * - Weekly schedule display from clinic-information.ts
 * - Clear visual hierarchy
 */
export const OperationalHours: React.FC = () => {
  // Parse schedule from shared clinic information
  // Schedule format: ["Todos los días: Abierto 24/7"] or multiple entries like ["Lunes a Viernes: 8:00 am - 5:30 pm", "Sábados: 8:30 am - 12:00 pm"]
  const schedule = clinicInformation.schedule.map((item) => parseScheduleEntry(item));

  return (
    <div className={styles.operationalHours}>
      <h2 className={styles.title}>Operational Hours</h2>

      <div className={styles.scheduleList}>
        {schedule.map((item, index) => (
          <div key={index} className={styles.scheduleItem}>
            <span className={styles.day}>{item.label}</span>
            <span className={styles.hours}>{item.hours}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
