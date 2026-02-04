import React from 'react';
import { FileTextOutlined, MedicineBoxOutlined, RocketOutlined, TrophyOutlined } from '@ant-design/icons';
import styles from './TreatmentApproach.module.scss';

interface TreatmentApproachProps {
  approaches: string[];
}

/**
 * TreatmentApproach Component
 * Displays treatment approach steps with numbered icons
 *
 * @param approaches - Array of treatment approach descriptions
 */
export const TreatmentApproach: React.FC<TreatmentApproachProps> = ({ approaches }) => {
  if (!approaches || approaches.length === 0) {
    return null;
  }

  // Icons for treatment approach steps
  const approachIcons = [<FileTextOutlined />, <MedicineBoxOutlined />, <RocketOutlined />, <TrophyOutlined />];

  return (
    <div className={styles.approachSection}>
      <h2 className={styles.sectionTitle}>Nuestro Enfoque de Tratamiento</h2>
      <div className={styles.approachGrid}>
        {approaches.map((approach, index) => (
          <div key={index} className={styles.approachCard}>
            <div className={styles.approachNumber}>
              <span className={styles.numberText}>{String(index + 1).padStart(2, '0')}</span>
              <div className={styles.approachIcon}>{approachIcons[index] || <MedicineBoxOutlined />}</div>
            </div>
            <h3 className={styles.approachTitle}>{approach}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
