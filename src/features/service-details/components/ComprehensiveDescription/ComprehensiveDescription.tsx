import React from 'react';
import styles from './ComprehensiveDescription.module.scss';

interface ComprehensiveDescriptionProps {
  description: string;
}

/**
 * ComprehensiveDescription Component
 * Displays the comprehensive care description section
 *
 * @param description - Detailed service description
 */
export const ComprehensiveDescription: React.FC<ComprehensiveDescriptionProps> = ({ description }) => {
  return (
    <div className={styles.comprehensiveSection}>
      <h2 className={styles.comprehensiveTitle}>Comprehensive Care</h2>
      <div className={styles.comprehensiveDescription}>
        <p>{description}</p>
      </div>
    </div>
  );
};
