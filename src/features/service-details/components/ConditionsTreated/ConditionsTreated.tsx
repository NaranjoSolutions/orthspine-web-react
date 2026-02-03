import React from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import styles from './ConditionsTreated.module.scss';

interface ConditionsTreatedProps {
  conditions: string[];
}

/**
 * ConditionsTreated Component
 * Displays a grid of conditions treated with checkmark icons
 *
 * @param conditions - Array of condition names
 */
export const ConditionsTreated: React.FC<ConditionsTreatedProps> = ({ conditions }) => {
  if (!conditions || conditions.length === 0) {
    return null;
  }

  return (
    <div className={styles.conditionsSection}>
      <h2 className={styles.sectionTitle}>Conditions We Treat</h2>
      <div className={styles.conditionsGrid}>
        {conditions.map((condition, index) => (
          <div key={index} className={styles.conditionItem}>
            <CheckCircleOutlined className={styles.conditionIcon} />
            <span className={styles.conditionText}>{condition}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
