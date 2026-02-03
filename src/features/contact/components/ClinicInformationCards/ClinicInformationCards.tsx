import React from 'react';
import { EnvironmentOutlined, ClockCircleOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { CLINIC_ADDRESS, OPERATING_HOURS } from '../../config/contact.config';
import { clinicInformation } from '@/shared/resources/clinic-information';
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
 * - Clinic name and address
 * - Hours of operation
 * - Contact phone number
 * - Email address
 * - Clean, icon-based design
 * - Responsive layout
 * - Enhanced visual hierarchy
 */
export const ClinicInformationCards: React.FC = () => {
  const infoCards: InfoCard[] = [
    {
      id: 'address',
      icon: <EnvironmentOutlined />,
      title: 'Location',
      content: (
        <>
          <div className={styles.clinicName}>{clinicInformation.name}</div>
          <div className={styles.addressText}>{CLINIC_ADDRESS.FULL}</div>
        </>
      ),
    },
    {
      id: 'hours',
      icon: <ClockCircleOutlined />,
      title: 'Hours of Operation',
      content: (
        <div className={styles.hoursContent}>
          <div className={styles.hoursRow}>
            <span className={styles.hoursLabel}>{OPERATING_HOURS.WEEKDAY.LABEL}:</span>
            <span className={styles.hoursValue}>{OPERATING_HOURS.WEEKDAY.HOURS}</span>
          </div>
          <div className={styles.hoursRow}>
            <span className={styles.hoursLabel}>{OPERATING_HOURS.WEEKEND.LABEL}:</span>
            <span className={styles.hoursValue}>{OPERATING_HOURS.WEEKEND.HOURS}</span>
          </div>
        </div>
      ),
    },
    {
      id: 'phone',
      icon: <PhoneOutlined />,
      title: 'Phone',
      content: (
        <a href={`tel:${clinicInformation.contact.phones[0]}`} className={styles.contactLink}>
          {clinicInformation.contact.phones[0]}
        </a>
      ),
    },
    {
      id: 'email',
      icon: <MailOutlined />,
      title: 'Email',
      content: (
        <a href={`mailto:${clinicInformation.contact.email}`} className={styles.contactLink}>
          {clinicInformation.contact.email}
        </a>
      ),
    },
  ];

  return (
    <div className={styles.infoCardsContainer}>
      <h2 className={styles.sectionTitle}>Clinic Information</h2>
      <div className={styles.cardsGrid}>
        {infoCards.map((card) => (
          <div key={card.id} className={styles.infoCard}>
            <div className={styles.iconWrapper}>{card.icon}</div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <div className={styles.cardText}>{card.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
