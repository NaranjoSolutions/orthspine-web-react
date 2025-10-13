import React from 'react';
import styles from './OperationalHours.module.scss';

/**
 * OperationalHours Component
 * Displays clinic operational hours
 *
 * Features:
 * - Weekly schedule display
 * - Clear visual hierarchy
 */
export const OperationalHours: React.FC = () => {
  const schedule = [
    { day: 'Monday - Friday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 2:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ];

  return (
    <div className={styles.operationalHours}>
      <h2 className={styles.title}>Operational Hours</h2>

      <div className={styles.scheduleList}>
        {schedule.map((item, index) => (
          <div key={index} className={styles.scheduleItem}>
            <span className={styles.day}>{item.day}</span>
            <span className={styles.hours}>{item.hours}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
