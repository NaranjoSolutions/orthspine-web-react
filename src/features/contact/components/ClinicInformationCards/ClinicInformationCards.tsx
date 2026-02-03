import React from 'react';
import { EnvironmentOutlined, ClockCircleOutlined, CarOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { CLINIC_ADDRESS, OPERATING_HOURS, PARKING_INFO, ACCESSIBILITY_INFO } from '../../config/contact.config';
import styles from './ClinicInformationCards.module.scss';

/**
 * Information card type definition
 */
interface InfoCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

/**
 * ClinicInformationCards Component
 * Displays essential clinic information in card format
 *
 * Features:
 * - Address information
 * - Hours of operation
 * - Parking details
 * - Accessibility information
 * - Clean, icon-based design
 * - Responsive layout
 */
export const ClinicInformationCards: React.FC = () => {
  const infoCards: InfoCard[] = [
    {
      id: 'address',
      icon: <EnvironmentOutlined />,
      title: 'Address',
      content: CLINIC_ADDRESS.FULL,
    },
    {
      id: 'hours',
      icon: <ClockCircleOutlined />,
      title: 'Hours of Operation',
      content: (
        <>
          {OPERATING_HOURS.WEEKDAY.LABEL}: {OPERATING_HOURS.WEEKDAY.HOURS}
          <br />
          {OPERATING_HOURS.WEEKEND.LABEL}: {OPERATING_HOURS.WEEKEND.HOURS}
        </>
      ),
    },
  ];

  return (
    <div className={styles.infoCardsContainer}>
      <div className={styles.sectionTitle}>Clinic Information</div>
      <div className={styles.cardsGrid}>
        {infoCards.map((card) => (
          <div key={card.id} className={styles.infoCard}>
            <div className={styles.iconWrapper}>{card.icon}</div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardText}>{card.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
