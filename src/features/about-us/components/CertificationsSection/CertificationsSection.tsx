import React from 'react';
import styles from './CertificationsSection.module.scss';

/**
 * CertificationsSection Component
 * Displays professional certifications with placeholder logos
 * @returns React component with certification logos
 */
export const CertificationsSection: React.FC = () => {
  const certifications = [
    'CERT LOGO 1',
    'CERT LOGO 2',
    'CERT LOGO 3',
    'CERT LOGO 4',
  ];

  return (
    <section className={styles.certificationsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>OUR PROFESSIONAL CERTIFICATIONS</h2>
        <div className={styles.logosGrid}>
          {certifications.map((cert, index) => (
            <div key={index} className={styles.logoPlaceholder}>
              <span className={styles.logoText}>{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};