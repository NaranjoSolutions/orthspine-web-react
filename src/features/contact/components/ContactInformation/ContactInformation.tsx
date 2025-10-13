import React from 'react';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { clinicInformation } from '@/shared/resources/clinic-information';
import styles from './ContactInformation.module.scss';

/**
 * ContactInformation Component
 * Displays clinic contact information with icons
 *
 * Features:
 * - Phone number with icon
 * - Email address with icon
 * - Physical address with icon
 */
export const ContactInformation: React.FC = () => {
  const { contact, location } = clinicInformation;

  return (
    <div className={styles.contactInformation}>
      <h2 className={styles.title}>Contact Information</h2>

      <div className={styles.infoItem}>
        <div className={styles.iconWrapper}>
          <PhoneOutlined className={styles.icon} />
        </div>
        <div className={styles.infoContent}>
          <a href={`tel:${contact.phones[0]}`} className={styles.infoValue}>
            {contact.phones[0]}
          </a>
        </div>
      </div>

      <div className={styles.infoItem}>
        <div className={styles.iconWrapper}>
          <MailOutlined className={styles.icon} />
        </div>
        <div className={styles.infoContent}>
          <a href={`mailto:${contact.email}`} className={styles.infoValue}>
            {contact.email}
          </a>
        </div>
      </div>

      <div className={styles.infoItem}>
        <div className={styles.iconWrapper}>
          <EnvironmentOutlined className={styles.icon} />
        </div>
        <div className={styles.infoContent}>
          <span className={styles.infoValue}>{location.address}</span>
        </div>
      </div>
    </div>
  );
};
